#!/usr/bin/env python3
"""Generate PDF question papers from ATAR Master exam and training data using tectonic."""

import re, os, glob, subprocess, sys
from pathlib import Path

TECTONIC = "/opt/homebrew/bin/tectonic"
PROJECT = Path(os.path.expanduser("~/projects/atar-master"))
EXAM_DIR = PROJECT / "src/data/exams"
TRAIN_DIR = PROJECT / "src/data/training"
OUTPUT = PROJECT / "public/pdfs"
TEX_TMP = PROJECT / ".tex-tmp"

PREAMBLE = r"""\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage[top=2cm, bottom=2cm, left=2cm, right=2cm]{geometry}
\usepackage{fancyhdr}
\usepackage{amsmath,amssymb,amsfonts}
\usepackage{mathtools}
\usepackage{enumitem}
\usepackage{multicol}
\usepackage{hyperref}
\hypersetup{colorlinks=false}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[R]{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
"""

def make_doc(header, body, solutions=""):
    head = PREAMBLE + f"\\fancyhead[C]{{\\textbf{{{header}}}}}\n\n\\begin{{document}}\n\n"
    sol = ""
    if solutions:
        sol = "\n\\newpage\n\\section*{Solutions}\n\n" + solutions + "\n"
    return head + body + sol + "\n\\end{document}\n"

def parse_ts_exam(filepath):
    """Parse a .ts exam file and extract questions."""
    text = open(filepath, encoding='utf-8').read()
    
    year_m = re.search(r'year:\s*(\d{4})', text)
    year = int(year_m.group(1)) if year_m else 0
    title_m = re.search(r"title:\s*[\"'`]([^\"'`]+)", text)
    title = title_m.group(1) if title_m else ""
    
    questions = []
    # Find question blocks - match opening { with id: to closing }
    # Use a more robust approach: find each id: and extract the block
    q_starts = [m.start() for m in re.finditer(r'\{\s*\n?\s*id:', text)]
    
    for i, start in enumerate(q_starts):
        # Find the matching closing brace by counting braces
        depth = 0
        end = start
        for j in range(start, len(text)):
            if text[j] == '{': depth += 1
            elif text[j] == '}': 
                depth -= 1
                if depth == 0:
                    end = j + 1
                    break
        block = text[start:end]
        
        def extract_str(key):
            # backtick strings (may be multiline)
            m = re.search(rf'{key}:\s*`(.*?)`', block, re.DOTALL)
            if m: return m.group(1)
            # double-quoted
            m = re.search(rf'{key}:\s*"((?:[^"\\]|\\.)*)"', block, re.DOTALL)
            if m: return m.group(1)
            # single-quoted
            m = re.search(rf"""{key}:\s*'((?:[^'\\]|\\.)*)'""", block, re.DOTALL)
            if m: return m.group(1)
            return ""
        
        def extract_num(key):
            m = re.search(rf'{key}:\s*(\d+)', block)
            return int(m.group(1)) if m else 0
        
        def extract_enum(key):
            m = re.search(rf'{key}:\s*\w+\.(\w+)', block)
            return m.group(1) if m else ""
        
        qtext = sanitize_latex(unescape_ts(extract_str('text')))
        answer = sanitize_latex(unescape_ts(extract_str('answer')))
        number = extract_str('number') or f"Q{i+1}"
        marks = extract_num('marks')
        topic = extract_enum('topic')
        subTopic = extract_str('subTopic')
        
        # markingGuide array - extract quoted strings carefully
        mg_m = re.search(r'markingGuide:\s*\[(.*?)\]\s*,?\s*\n', block, re.DOTALL)
        marking = []
        if mg_m:
            mg_text = mg_m.group(1)
            # Match double-quoted strings (handling escaped quotes)
            raw = re.findall(r'"((?:[^"\\]|\\.)*)"', mg_text, re.DOTALL)
            if not raw:
                # Try backtick strings
                raw = re.findall(r'`(.*?)`', mg_text, re.DOTALL)
            marking = [sanitize_latex(unescape_ts(m)) for m in raw]
        
        if qtext:
            questions.append({
                'number': number, 'text': qtext, 'marks': marks,
                'topic': topic, 'subTopic': subTopic,
                'answer': answer, 'markingGuide': marking,
            })
    
    return {'year': year, 'title': title, 'questions': questions, 'filename': os.path.basename(filepath)}

def parse_ts_training(filepath):
    """Parse a training .ts file with MC questions."""
    text = open(filepath, encoding='utf-8').read()
    
    questions = []
    q_starts = [m.start() for m in re.finditer(r'\{\s*\n?\s*id:', text)]
    
    for i, start in enumerate(q_starts):
        depth = 0
        end = start
        for j in range(start, len(text)):
            if text[j] == '{': depth += 1
            elif text[j] == '}':
                depth -= 1
                if depth == 0:
                    end = j + 1
                    break
        block = text[start:end]
        
        def extract_str(key):
            m = re.search(rf'{key}:\s*`(.*?)`', block, re.DOTALL)
            if m: return m.group(1)
            m = re.search(rf"""{key}:\s*'((?:[^'\\]|\\.)*)'""", block, re.DOTALL)
            if m: return m.group(1)
            m = re.search(rf'{key}:\s*"((?:[^"\\]|\\.)*)"', block, re.DOTALL)
            if m: return m.group(1)
            return ""
        
        qtext = sanitize_latex(unescape_ts(extract_str('text')))
        title_str = sanitize_latex(unescape_ts(extract_str('title')))
        answer = sanitize_latex(unescape_ts(extract_str('answer')))
        level_m = re.search(r'level:\s*(\d+)', block)
        level = int(level_m.group(1)) if level_m else 0
        
        # Extract options
        options = []
        opt_blocks = re.finditer(r"\{\s*label:\s*['\"](\w+)['\"],\s*text:\s*['\"`](.*?)['\"`],\s*correct:\s*(true|false)", block, re.DOTALL)
        for om in opt_blocks:
            options.append({'label': om.group(1), 'text': sanitize_latex(unescape_ts(om.group(2))), 'correct': om.group(3) == 'true'})
        
        if qtext:
            questions.append({
                'title': title_str, 'text': qtext, 'answer': answer,
                'level': level, 'options': options,
            })
    
    return questions

def unescape_ts(s):
    """Convert TS/JS string escaping to actual characters.
    In TS source: \\\\ -> \\, \\n -> newline, etc."""
    # TS double-quoted strings: \\ is literal backslash
    s = s.replace('\\\\', '\x00BACKSLASH\x00')
    s = s.replace('\\n', '\n')
    s = s.replace('\\t', '\t')
    s = s.replace("\\'", "'")
    s = s.replace('\\"', '"')
    s = s.replace('\x00BACKSLASH\x00', '\\')
    return s

def sanitize_latex(s):
    """Fix common LaTeX issues in question text."""
    # Replace Unicode characters with LaTeX equivalents
    replacements = {
        '•': r'\textbullet{}',
        '√': r'$\sqrt{}$',
        '∘': r'$\circ$',
        '—': '---',
        '–': '--',
        '"': "``",
        '"': "''",
        ''': "'",
        ''': "`",
        '×': r'$\times$',
        '÷': r'$\div$',
        '≤': r'$\le$',
        '≥': r'$\ge$',
        '≠': r'$\ne$',
        '≈': r'$\approx$',
        '∞': r'$\infty$',
        'π': r'$\pi$',
        '⁴': r'${}^4$',
        '⁵': r'${}^5$',
        'ˣ': r'${}^x$',
        '←': r'$\leftarrow$',
        '→': r'$\rightarrow$',
        '−': '-',
        '²': r'${}^2$',
        '³': r'${}^3$',
        '·': r'$\cdot$',
        '⁶': r'${}^6$',
        '⁻': r'${}^{-}$',
        '✓': r'\checkmark{}',
    }
    for k, v in replacements.items():
        s = s.replace(k, v)
    
    # Convert markdown code blocks to LaTeX verbatim
    # First extract code blocks, replace unicode inside them with ASCII
    def code_to_verbatim(m):
        code = m.group(1)
        code = code.replace('←', '<-')
        code = code.replace('→', '->')
        code = code.replace('≤', '<=')
        code = code.replace('≥', '>=')
        code = code.replace('≠', '!=')
        return f'\\begin{{verbatim}}\n{code}\\end{{verbatim}}'
    s = re.sub(r'```\w*\n(.*?)```', code_to_verbatim, s, flags=re.DOTALL)
    
    # Escape & and % outside math mode (skip verbatim)
    s = escape_special_outside_math(s)
    
    return s

def escape_special_outside_math(s):
    """Escape &, %, # characters that are outside $ delimiters and LaTeX environments."""
    result = []
    in_math = False
    env_depth = 0  # track nested environments that allow &
    i = 0
    while i < len(s):
        # Handle backslash-escaped characters (skip them)
        if s[i] == '\\' and i + 1 < len(s) and s[i+1] in '&%#':
            result.append(s[i:i+2])
            i += 2
            continue
        if s[i] == '$':
            if i + 1 < len(s) and s[i+1] == '$':
                result.append('$$')
                in_math = not in_math
                i += 2
                continue
            in_math = not in_math
            result.append('$')
            i += 1
        elif s[i:i+7] == '\\begin{':
            env_m = re.match(r'\\begin\{(cases|array|align\*?|tabular|matrix|pmatrix|bmatrix|vmatrix)\}', s[i:])
            if env_m:
                env_depth += 1
            result.append(s[i])
            i += 1
        elif s[i:i+5] == '\\end{':
            env_m = re.match(r'\\end\{(cases|array|align\*?|tabular|matrix|pmatrix|bmatrix|vmatrix)\}', s[i:])
            if env_m:
                env_depth = max(0, env_depth - 1)
            result.append(s[i])
            i += 1
        elif s[i] == '&' and not in_math and env_depth == 0:
            result.append('\\&')
            i += 1
        elif s[i] == '%' and not in_math:
            result.append('\\%')
            i += 1
        elif s[i] == '#' and not in_math:
            result.append('\\#')
            i += 1
        else:
            result.append(s[i])
            i += 1
    return ''.join(result)

def sanitize_title(t):
    """Make title safe for use in LaTeX text - strip problematic math chars."""
    # Remove LaTeX math inserted by sanitize_latex 
    t = re.sub(r'\$[^$]*\$', '', t)
    # Remove remaining unprotected math chars (but keep \% \& etc)
    t = re.sub(r'(?<!\\)[{}^_]', '', t)
    t = t.strip()
    return t

def fmt_exam_q(q):
    marks = q['marks']
    mark_str = f"\\hfill [{marks} mark{'s' if marks != 1 else ''}]" if marks else ""
    qtext = q['text']
    return f"\\textbf{{{q['number']}}}{mark_str}\n\n{qtext}\n\n\\vspace{{8mm}}\n\n"

def fmt_exam_sol(q):
    lines = f"\\textbf{{{q['number']}}}\n\n"
    if q['answer']:
        lines += f"{q['answer']}\n\n"
    if q['markingGuide']:
        lines += "\\textit{Marking guide:}\n\\begin{itemize}[nosep]\n"
        for mg in q['markingGuide']:
            lines += f"  \\item {mg}\n"
        lines += "\\end{itemize}\n\n"
    return lines

def fmt_training_q(q, idx):
    body = f"\\textbf{{Question {idx}}} (Level {q['level']})"
    if q['title']:
        t = sanitize_title(q['title'])
        body += f" --- \\textit{{{t}}}"
    body += "\n\n"
    body += q['text'] + "\n\n"
    if q['options']:
        body += "\\begin{enumerate}[label=(\\Alph*)]\n"
        for opt in q['options']:
            body += f"  \\item {opt['text']}\n"
        body += "\\end{enumerate}\n\n"
    body += "\\vspace{4mm}\n\n"
    return body

def fmt_training_sol(q, idx):
    correct = next((o['label'] for o in q['options'] if o['correct']), '?')
    lines = f"\\textbf{{Q{idx}}}: ({correct})"
    if q['answer']:
        lines += f"\n\n{q['answer']}"
    lines += "\n\n"
    return lines

def compile_tex(tex_path, out_dir):
    """Compile .tex to .pdf using tectonic."""
    result = subprocess.run(
        [TECTONIC, str(tex_path), "-o", str(out_dir)],
        capture_output=True, text=True, timeout=120
    )
    if result.returncode != 0:
        print(f"  ERROR compiling {tex_path.name}:")
        print(result.stderr[:500])
        return False
    return True

def build_exam_pdf(exam_data, out_dir):
    """Build PDF for one exam."""
    year = exam_data['year']
    title = exam_data['title']
    fname = exam_data['filename'].replace('.ts', '')
    
    header = f"VCE Mathematical Methods --- {year} {title}"
    body = ""
    sols = ""
    for q in exam_data['questions']:
        body += fmt_exam_q(q)
        sols += fmt_exam_sol(q)
    
    doc = make_doc(header, body, sols)
    
    TEX_TMP.mkdir(parents=True, exist_ok=True)
    tex_file = TEX_TMP / f"{fname}.tex"
    tex_file.write_text(doc, encoding='utf-8')
    
    out_dir.mkdir(parents=True, exist_ok=True)
    if compile_tex(tex_file, out_dir):
        print(f"  ✓ {fname}.pdf ({len(exam_data['questions'])} questions)")
        return True
    return False

def build_training_pdf(filepath, out_dir):
    """Build PDF for one training topic."""
    questions = parse_ts_training(filepath)
    if not questions:
        return False
    
    basename = Path(filepath).stem
    nice_name = basename.replace('-', ' ').title()
    header = f"Training Questions --- {nice_name}"
    
    body = f"\\textit{{{len(questions)} multiple-choice questions}}\n\n\\vspace{{4mm}}\n\n"
    sols = ""
    for i, q in enumerate(questions, 1):
        body += fmt_training_q(q, i)
        sols += fmt_training_sol(q, i)
    
    doc = make_doc(header, body, sols)
    
    TEX_TMP.mkdir(parents=True, exist_ok=True)
    tex_file = TEX_TMP / f"training-{basename}.tex"
    tex_file.write_text(doc, encoding='utf-8')
    
    out_dir.mkdir(parents=True, exist_ok=True)
    if compile_tex(tex_file, out_dir):
        print(f"  ✓ training-{basename}.pdf ({len(questions)} questions)")
        return True
    return False

if __name__ == '__main__':
    exam_dir = OUTPUT / "exams"
    train_dir = OUTPUT / "training"
    
    # Build exam PDFs
    print("=== Building Exam PDFs ===")
    exam_files = sorted(glob.glob(str(EXAM_DIR / "mm_*.ts")))
    exam_count = 0
    for f in exam_files:
        exam = parse_ts_exam(f)
        if exam['questions']:
            if build_exam_pdf(exam, exam_dir):
                exam_count += 1
        else:
            print(f"  WARNING: {os.path.basename(f)}: 0 questions parsed")
    
    # Build training PDFs
    print("\n=== Building Training PDFs ===")
    train_files = sorted(glob.glob(str(TRAIN_DIR / "*.ts")))
    # Skip index/types files
    train_files = [f for f in train_files if os.path.basename(f) not in ('index.ts', 'types.ts')]
    train_count = 0
    for f in train_files:
        if build_training_pdf(f, train_dir):
            train_count += 1
    
    print(f"\n=== Done: {exam_count} exam PDFs, {train_count} training PDFs ===")
    print(f"Output: {OUTPUT}")
