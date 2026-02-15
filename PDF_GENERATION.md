# PDF Generation for ATAR Master

## Setup

- **Tool:** [Tectonic](https://tectonic-typesetting.github.io/) at `/opt/homebrew/bin/tectonic`
- **Script:** `scripts/build_pdfs.py`
- **Output:** `public/pdfs/exams/` and `public/pdfs/training/`

## Usage

```bash
python3 scripts/build_pdfs.py
```

## Results

### Exam PDFs (21 files)
All VCE Mathematical Methods exams from 2016–2025:
- 2016–2025 Exam 1 & Exam 2 (20 papers)
- 2025 Sample exam (1 paper)

Each PDF includes:
- All questions with mark allocations
- Solutions section with answers and marking guides

### Training PDFs (29 files)
All training question sets (~50 MC questions each, ~1,450 total):
- anti-diff, area-curves, avg-rate, basic-algebra, basic-prob, basic-trig
- binomial-dist, circular-fn, composite-fn, cond-prob, confidence-int
- continuous-pdf, definite-int, derivatives, diff-rules, domain-range
- exponential-fn, graphing-basics, inverse-fn, logarithmic-fn, normal-dist
- number-ops, optimisation, polynomial-fn, sample-prop, simult-eq
- stationary-pts, tangent-lines, transformations

Each PDF includes:
- Questions grouped by level (1–5), with MC options
- Solutions section with correct answers and worked solutions

## Total: 50 PDFs, ~3.2 MB

## Technical Notes

The build script (`scripts/build_pdfs.py`):
1. Parses TypeScript exam/training files using regex
2. Generates LaTeX with proper math formatting
3. Handles TS string escaping (`\\` → `\`, `\n` → newline)
4. Sanitizes Unicode characters (√, ², π, etc.) to LaTeX equivalents
5. Escapes `%`, `&`, `#` outside math mode
6. Converts markdown code blocks to `\begin{verbatim}`
7. Compiles via tectonic (auto-downloads TeX packages on first run)

Intermediate `.tex` files are stored in `.tex-tmp/` for debugging.
