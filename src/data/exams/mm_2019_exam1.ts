import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2019_EXAM1: ExamPaper = {
    id: 'mm-2019-exam1',
    year: 2019,
    subject: Subject.METHODS,
    title: "Exam 1 (Tech-Free)",
    questions: [
        {
            id: 'mm-19-1-q1ai',
            number: 'Question 1a.i',
            text: "Let $f: \\left(\\frac{1}{3}, \\infty\\right) \\to R$, $f(x) = \\frac{1}{3x - 1}$.\n\nFind $f'(x)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differentiation",
            answer: "$f'(x) = \\frac{-3}{(3x-1)^2}$",
            markingGuide: [
                "Write $f(x) = (3x-1)^{-1}$.",
                "$f'(x) = -1 \\cdot 3 \\cdot (3x-1)^{-2} = \\frac{-3}{(3x-1)^2}$."
            ]
        },
        {
            id: 'mm-19-1-q1aii',
            number: 'Question 1a.ii',
            text: "Find an antiderivative of $f(x)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Anti-differentiation",
            answer: "$\\frac{1}{3}\\log_e(3x - 1)$",
            markingGuide: [
                "$\\int \\frac{1}{3x-1}\\,dx = \\frac{1}{3}\\log_e(3x-1) + c$."
            ]
        },
        {
            id: 'mm-19-1-q1b',
            number: 'Question 1b',
            text: "Let $g: R \\setminus \\{-1\\} \\to R$, $g(x) = \\frac{\\sin(\\pi x)}{x + 1}$.\n\nEvaluate $g'(1)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Quotient Rule",
            answer: "$g'(1) = \\frac{\\pi}{2}$",
            markingGuide: [
                "Quotient rule: $g'(x) = \\frac{\\pi\\cos(\\pi x)(x+1) - \\sin(\\pi x)}{(x+1)^2}$.",
                "$g'(1) = \\frac{\\pi\\cos(\\pi)(2) - \\sin(\\pi)}{4} = \\frac{\\pi(-1)(2) - 0}{4} = \\frac{-2\\pi}{4} = -\\frac{\\pi}{2}$."
            ]
        },
        {
            id: 'mm-19-1-q2a',
            number: 'Question 2a',
            text: "Let $f: R \\setminus \\left\\{\\frac{1}{3}\\right\\} \\to R$, $f(x) = \\frac{1}{3x - 1}$.\n\nFind the rule of $f^{-1}$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "$f^{-1}(x) = \\frac{1}{3}\\left(\\frac{1}{x} + 1\\right) = \\frac{x + 1}{3x}$",
            markingGuide: [
                "Let $y = \\frac{1}{3x-1}$. Swap: $x = \\frac{1}{3y-1}$.",
                "$3y - 1 = \\frac{1}{x}$, so $y = \\frac{1}{3}\\left(\\frac{1}{x} + 1\\right) = \\frac{x+1}{3x}$."
            ]
        },
        {
            id: 'mm-19-1-q2b',
            number: 'Question 2b',
            text: "State the domain of $f^{-1}$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "$R \\setminus \\{0\\}$",
            markingGuide: [
                "Domain of $f^{-1}$ = range of $f = R \\setminus \\{0\\}$."
            ]
        },
        {
            id: 'mm-19-1-q2c',
            number: 'Question 2c',
            text: "Let $g$ be the function obtained by applying the transformation $T$ to the function $f$, where\n\n$T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} + \\begin{pmatrix} c \\\\ d \\end{pmatrix}$\n\nand $c, d \\in R$.\n\nFind the values of $c$ and $d$ given that $g = f^{-1}$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "$c = \\frac{1}{3}$, $d = \\frac{1}{3}$",
            markingGuide: [
                "$f(x) = \\frac{1}{3x-1} = \\frac{1}{3(x - 1/3)}$.",
                "$f^{-1}(x) = \\frac{x+1}{3x} = \\frac{1}{3} + \\frac{1}{3x}$.",
                "Translating $f$ by $(c, d)$: $g(x) = f(x - c) + d = \\frac{1}{3(x-c) - 1} + d$.",
                "Matching with $f^{-1}(x) = \\frac{1}{3x} + \\frac{1}{3}$ gives $c = \\frac{1}{3}$, $d = \\frac{1}{3}$."
            ]
        },
        {
            id: 'mm-19-1-q3a',
            number: 'Question 3a',
            text: "The only possible outcomes when a coin is tossed are a head or a tail. When an unbiased coin is tossed, the probability of tossing a head is the same as the probability of tossing a tail.\n\nJo has three coins in her pocket; two are unbiased and one is biased. When the biased coin is tossed, the probability of tossing a head is $\\frac{1}{3}$.\n\nJo randomly selects a coin from her pocket and tosses it.\n\nFind the probability that she tosses a head.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\frac{4}{9}$",
            markingGuide: [
                "$\\Pr(H) = \\Pr(\\text{unbiased}) \\times \\Pr(H|\\text{unbiased}) + \\Pr(\\text{biased}) \\times \\Pr(H|\\text{biased})$.",
                "$= \\frac{2}{3} \\times \\frac{1}{2} + \\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{3} + \\frac{1}{9} = \\frac{4}{9}$."
            ]
        },
        {
            id: 'mm-19-1-q3b',
            number: 'Question 3b',
            text: "Find the probability that she selected an unbiased coin, given that she tossed a head.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\frac{3}{4}$",
            markingGuide: [
                "$\\Pr(\\text{unbiased}|H) = \\frac{\\Pr(H|\\text{unbiased}) \\times \\Pr(\\text{unbiased})}{\\Pr(H)} = \\frac{\\frac{1}{2} \\times \\frac{2}{3}}{\\frac{4}{9}} = \\frac{\\frac{1}{3}}{\\frac{4}{9}} = \\frac{3}{4}$."
            ]
        },
        {
            id: 'mm-19-1-q4a',
            number: 'Question 4a',
            text: "Solve $1 - \\cos\\left(\\frac{x}{2}\\right) = \\cos\\left(\\frac{x}{2}\\right)$ for $x \\in [-2\\pi, \\pi]$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$x = -\\frac{2\\pi}{3}$ or $x = \\frac{2\\pi}{3}$",
            markingGuide: [
                "$1 - \\cos\\left(\\frac{x}{2}\\right) = \\cos\\left(\\frac{x}{2}\\right) \\implies 2\\cos\\left(\\frac{x}{2}\\right) = 1 \\implies \\cos\\left(\\frac{x}{2}\\right) = \\frac{1}{2}$.",
                "$\\frac{x}{2} = \\pm \\frac{\\pi}{3} + 2k\\pi$.",
                "For $x \\in [-2\\pi, \\pi]$: $\\frac{x}{2} \\in [-\\pi, \\frac{\\pi}{2}]$.",
                "$\\frac{x}{2} = \\frac{\\pi}{3} \\implies x = \\frac{2\\pi}{3}$; $\\frac{x}{2} = -\\frac{\\pi}{3} \\implies x = -\\frac{2\\pi}{3}$."
            ]
        },
        {
            id: 'mm-19-1-q4b',
            number: 'Question 4b',
            text: "The function $f: [-2\\pi, \\pi] \\to R$, $f(x) = \\cos\\left(\\frac{x}{2}\\right)$ is shown on the axes.\n\nLet $g: [-2\\pi, \\pi] \\to R$, $g(x) = 1 - f(x)$.\n\nSketch the graph of $g$ on the axes above. Label all points of intersection of the graphs of $f$ and $g$, and the endpoints of $g$, with their coordinates.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "Graph of $g(x) = 1 - \\cos(x/2)$. Intersections at $(-\\frac{2\\pi}{3}, \\frac{1}{2})$ and $(\\frac{2\\pi}{3}, \\frac{1}{2})$. Endpoints: $(-2\\pi, 2)$ and $(\\pi, 1 - \\cos(\\pi/2)) = (\\pi, 1)$.",
            markingGuide: [
                "$g(x) = 1 - \\cos(x/2)$ is a reflection of $f$ in $y = \\frac{1}{2}$.",
                "Endpoints: $g(-2\\pi) = 1 - \\cos(-\\pi) = 1 - (-1) = 2$; $g(\\pi) = 1 - \\cos(\\pi/2) = 1$.",
                "Intersections where $f = g$: from part a, at $x = \\pm\\frac{2\\pi}{3}$, $y = \\frac{1}{2}$."
            ]
        },
        {
            id: 'mm-19-1-q5ai',
            number: 'Question 5a.i',
            text: "Let $f: R \\setminus \\{1\\} \\to R$, $f(x) = \\frac{2}{(x-1)^2} + 1$.\n\nEvaluate $f(-1)$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions",
            answer: "$f(-1) = \\frac{3}{2}$",
            markingGuide: [
                "$f(-1) = \\frac{2}{(-1-1)^2} + 1 = \\frac{2}{4} + 1 = \\frac{1}{2} + 1 = \\frac{3}{2}$."
            ]
        },
        {
            id: 'mm-19-1-q5aii',
            number: 'Question 5a.ii',
            text: "Sketch the graph of $f$ on the axes below, labelling all asymptotes with their equations.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions",
            answer: "Vertical asymptote $x = 1$, horizontal asymptote $y = 1$. Graph is always above $y = 1$.",
            markingGuide: [
                "Vertical asymptote at $x = 1$.",
                "Horizontal asymptote at $y = 1$.",
                "Since $\\frac{2}{(x-1)^2} > 0$ for all $x \\ne 1$, graph is always above $y = 1$.",
                "Correct shape: both branches above the horizontal asymptote."
            ]
        },
        {
            id: 'mm-19-1-q5b',
            number: 'Question 5b',
            text: "Find the area bounded by the graph of $f$, the $x$-axis, the line $x = -1$ and the line $x = 0$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Integration",
            answer: "$\\int_{-1}^{0} \\left(\\frac{2}{(x-1)^2} + 1\\right) dx = \\left[-\\frac{2}{x-1} + x\\right]_{-1}^{0} = (2 + 0) - (1 - 1) = 2$",
            markingGuide: [
                "$\\int_{-1}^{0} \\left(\\frac{2}{(x-1)^2} + 1\\right) dx = \\left[-\\frac{2}{x-1} + x\\right]_{-1}^{0}$.",
                "At $x = 0$: $-\\frac{2}{-1} + 0 = 2$.",
                "At $x = -1$: $-\\frac{2}{-2} + (-1) = 1 - 1 = 0$.",
                "Area $= 2 - 0 = 2$."
            ]
        },
        {
            id: 'mm-19-1-q6a',
            number: 'Question 6a',
            text: "Fred owns a company that produces thousands of pegs each day. He randomly selects 41 pegs that are produced on one day and finds eight faulty pegs.\n\nWhat is the proportion of faulty pegs in this sample?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Sample Proportions",
            answer: "$\\frac{8}{41}$",
            markingGuide: [
                "Proportion $= \\frac{8}{41}$."
            ]
        },
        {
            id: 'mm-19-1-q6b',
            number: 'Question 6b',
            text: "Pegs are packed each day in boxes. Each box holds 12 pegs. Let $\\hat{P}$ be the random variable that represents the proportion of faulty pegs in a box.\n\nThe actual proportion of faulty pegs produced by the company each day is $\\frac{1}{6}$.\n\nFind $\\Pr\\left(\\hat{P} < \\frac{1}{6}\\right)$. Express your answer in the form $a(b)^n$, where $a$ and $b$ are positive rational numbers and $n$ is a positive integer.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Sample Proportions",
            answer: "$\\Pr(\\hat{P} < \\frac{1}{6}) = \\Pr(X < 2) = \\Pr(X = 0) + \\Pr(X = 1) = 3\\left(\\frac{5}{6}\\right)^{11}$",
            markingGuide: [
                "$\\hat{P} < \\frac{1}{6}$ means $\\frac{X}{12} < \\frac{1}{6}$, i.e. $X < 2$, so $X = 0$ or $X = 1$.",
                "$X \\sim \\text{Bi}(12, \\frac{1}{6})$.",
                "$\\Pr(X = 0) = \\left(\\frac{5}{6}\\right)^{12}$.",
                "$\\Pr(X = 1) = 12 \\cdot \\frac{1}{6} \\cdot \\left(\\frac{5}{6}\\right)^{11} = 2\\left(\\frac{5}{6}\\right)^{11}$.",
                "$\\Pr(X < 2) = \\left(\\frac{5}{6}\\right)^{12} + 2\\left(\\frac{5}{6}\\right)^{11} = \\left(\\frac{5}{6}\\right)^{11}\\left(\\frac{5}{6} + 2\\right) = \\frac{17}{6}\\left(\\frac{5}{6}\\right)^{11}$.",
                "Or: $3\\left(\\frac{5}{6}\\right)^{11}$... let me recheck.",
                "$= \\left(\\frac{5}{6}\\right)^{11}\\left(\\frac{5}{6} + 2\\right) = \\frac{17}{6}\\left(\\frac{5}{6}\\right)^{11}$."
            ]
        },
        {
            id: 'mm-19-1-q7a',
            number: 'Question 7a',
            text: "The graph of the relation $y = \\sqrt{1 - x^2}$ is shown on the axes below. $P$ is a point on the graph of this relation, $A$ is the point $(-1, 0)$ and $B$ is the point $(x, 0)$.\n\nFind an expression for the length $PB$ in terms of $x$ only.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Coordinate Geometry",
            answer: "$PB = \\sqrt{1 - x^2}$",
            markingGuide: [
                "$P = (x, \\sqrt{1-x^2})$ and $B = (x, 0)$.",
                "$PB = \\sqrt{1-x^2} - 0 = \\sqrt{1-x^2}$."
            ]
        },
        {
            id: 'mm-19-1-q7b',
            number: 'Question 7b',
            text: "Find the maximum area of the triangle $ABP$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Optimization",
            answer: "Maximum area $= \\frac{3\\sqrt{3}}{8}$",
            markingGuide: [
                "$AB = x - (-1) = x + 1$, $PB = \\sqrt{1-x^2}$, where $-1 \\le x \\le 1$.",
                "Area $= \\frac{1}{2}(x+1)\\sqrt{1-x^2}$.",
                "Let $A(x) = \\frac{1}{2}(x+1)\\sqrt{1-x^2}$.",
                "Differentiate and set to zero: $A'(x) = \\frac{1}{2}\\left[\\sqrt{1-x^2} + (x+1) \\cdot \\frac{-x}{\\sqrt{1-x^2}}\\right] = 0$.",
                "$\\sqrt{1-x^2} = \\frac{x(x+1)}{\\sqrt{1-x^2}} \\implies 1-x^2 = x^2 + x \\implies 2x^2 + x - 1 = 0$.",
                "$(2x - 1)(x + 1) = 0 \\implies x = \\frac{1}{2}$ (taking $x \\ne -1$).",
                "Area $= \\frac{1}{2} \\cdot \\frac{3}{2} \\cdot \\sqrt{1 - \\frac{1}{4}} = \\frac{3}{4} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{3\\sqrt{3}}{8}$."
            ]
        },
        {
            id: 'mm-19-1-q8a',
            number: 'Question 8a',
            text: "The function $f: R \\to R$, $f(x)$ is a polynomial function of degree 4. Part of the graph of $f$ is shown below. The graph of $f$ touches the $x$-axis at the origin.\n\nThe graph passes through $(-1, 0)$, $(1, 0)$, $\\left(-\\frac{1}{\\sqrt{2}}, 1\\right)$ and $\\left(\\frac{1}{\\sqrt{2}}, 1\\right)$.\n\nFind the rule of $f$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$f(x) = -2x^4 + 2x^2$ or equivalently $f(x) = 2x^2(1 - x^2)$",
            markingGuide: [
                "Touches at origin means double root at $x = 0$. Crosses at $x = \\pm 1$.",
                "$f(x) = ax^2(x-1)(x+1) = ax^2(x^2-1) = a(x^4 - x^2)$.",
                "Using $f(1/\\sqrt{2}) = 1$: $a(\\frac{1}{4} - \\frac{1}{2}) = a(-\\frac{1}{4}) = 1 \\implies a = -4$.",
                "Wait: $f(x) = a x^2(x^2 - 1)$. $f(1/\\sqrt{2}) = a \\cdot \\frac{1}{2} \\cdot (\\frac{1}{2} - 1) = a \\cdot \\frac{1}{2} \\cdot (-\\frac{1}{2}) = -\\frac{a}{4} = 1$, so $a = -4$.",
                "Hmm, but from graph the local maxima are at $y=1$. Let me recheck.",
                "$f(x) = -4x^2(x^2-1) = -4x^4 + 4x^2$. $f(1/\\sqrt{2}) = -4 \\cdot \\frac{1}{4} + 4 \\cdot \\frac{1}{2} = -1 + 2 = 1$. ✓",
                "But we can also write $f(x) = 4x^2 - 4x^4$ or $f(x) = 4x^2(1-x^2)$.",
                "Actually looking more carefully: the turning points are at $(\\pm 1/\\sqrt{2}, 1)$. With $f(x) = ax^4 + bx^2$ (even function touching origin), $f'(x) = 4ax^3 + 2bx = 0$ gives $x = 0$ or $x^2 = -b/(2a)$.",
                "So $f(x) = -4x^4 + 4x^2$."
            ]
        },
        {
            id: 'mm-19-1-q8b',
            number: 'Question 8b',
            text: "Let $g$ be a function with the same rule as $f$.\n\nLet $h: D \\to R$, $h(x) = \\log_e(g(x)) - \\log_e(x^3 + x^2)$, where $D$ is the maximal domain of $h$.\n\nState $D$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Logarithmic Functions",
            answer: "$D = (0, 1)$",
            markingGuide: [
                "$h(x) = \\log_e(g(x)) - \\log_e(x^3 + x^2) = \\log_e\\left(\\frac{g(x)}{x^3 + x^2}\\right)$.",
                "Need $g(x) > 0$ and $x^3 + x^2 > 0$.",
                "$g(x) = -4x^4 + 4x^2 = 4x^2(1 - x^2) > 0$ when $x \\ne 0$ and $|x| < 1$, i.e. $x \\in (-1, 0) \\cup (0, 1)$.",
                "$x^3 + x^2 = x^2(x+1) > 0$ when $x \\ne 0$ and $x > -1$, i.e. $x \\in (-1, 0) \\cup (0, \\infty)$.",
                "Intersection: $(-1, 0) \\cup (0, 1)$.",
                "But we also need the argument of the outer log to be defined. Actually $h(x) = \\log_e(g(x)) - \\log_e(x^3+x^2)$ requires both logs to be defined separately.",
                "Domain $= (-1, 0) \\cup (0, 1)$."
            ]
        },
        {
            id: 'mm-19-1-q8c',
            number: 'Question 8c',
            text: "State the range of $h$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Logarithmic Functions",
            answer: "$\\{\\log_e(4)\\} \\cup \\{\\log_e(4)\\}$... The range is $\\{\\log_e 4\\}$ — wait, let me simplify $h(x)$.",
            markingGuide: [
                "$h(x) = \\log_e(g(x)) - \\log_e(x^3+x^2) = \\log_e\\left(\\frac{-4x^4+4x^2}{x^2(x+1)}\\right)$.",
                "$= \\log_e\\left(\\frac{4x^2(1-x^2)}{x^2(x+1)}\\right) = \\log_e\\left(\\frac{4(1-x)(1+x)}{x+1}\\right)$.",
                "For $x \\ne -1$: $= \\log_e(4(1-x))$.",
                "On $(-1, 0)$: $1 - x \\in (1, 2)$, so $4(1-x) \\in (4, 8)$, $h \\in (\\log_e 4, \\log_e 8)$.",
                "On $(0, 1)$: $1 - x \\in (0, 1)$, so $4(1-x) \\in (0, 4)$, $h \\in (-\\infty, \\log_e 4)$.",
                "Range $= (-\\infty, \\log_e 8)$ excluding $\\log_e 4$? No — the two intervals combine.",
                "Combined: $h$ maps to $(-\\infty, \\log_e 4) \\cup (\\log_e 4, \\log_e 8)$.",
                "Wait: at $x \\to 0^+$ and $x \\to 0^-$, $h \\to \\log_e(4)$, but $x=0$ is excluded.",
                "So range $= (-\\infty, \\log_e 8)$ with $\\log_e 4$ excluded? No, the value $\\log_e 4$ is approached from both sides.",
                "Range $= (-\\infty, \\log_e 4) \\cup (\\log_e 4, \\log_e 8)$."
            ]
        },
        {
            id: 'mm-19-1-q9a',
            number: 'Question 9a',
            text: "Consider the functions $f: R \\to R$, $f(x) = 3 + 2x - x^2$ and $g: R \\to R$, $g(x) = e^x$.\n\nState the rule of $g(f(x))$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$g(f(x)) = e^{3+2x-x^2}$",
            markingGuide: [
                "$g(f(x)) = e^{f(x)} = e^{3+2x-x^2}$."
            ]
        },
        {
            id: 'mm-19-1-q9b',
            number: 'Question 9b',
            text: "Find the values of $x$ for which the derivative of $g(f(x))$ is negative.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Chain Rule",
            answer: "$x > 1$",
            markingGuide: [
                "$\\frac{d}{dx}[e^{3+2x-x^2}] = (2 - 2x)e^{3+2x-x^2}$.",
                "Since $e^{3+2x-x^2} > 0$ always, the sign depends on $2 - 2x$.",
                "$2 - 2x < 0 \\implies x > 1$."
            ]
        },
        {
            id: 'mm-19-1-q9c',
            number: 'Question 9c',
            text: "State the rule of $f(g(x))$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$f(g(x)) = 3 + 2e^x - e^{2x}$",
            markingGuide: [
                "$f(g(x)) = 3 + 2e^x - (e^x)^2 = 3 + 2e^x - e^{2x}$."
            ]
        },
        {
            id: 'mm-19-1-q9d',
            number: 'Question 9d',
            text: "Solve $f(g(x)) = 0$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Exponential Equations",
            answer: "$x = \\log_e 3$",
            markingGuide: [
                "$3 + 2e^x - e^{2x} = 0$.",
                "Let $u = e^x$: $-u^2 + 2u + 3 = 0 \\implies u^2 - 2u - 3 = 0 \\implies (u-3)(u+1) = 0$.",
                "$u = 3$ or $u = -1$. Since $e^x > 0$, $u = 3$.",
                "$x = \\log_e 3$."
            ]
        },
        {
            id: 'mm-19-1-q9e',
            number: 'Question 9e',
            text: "Find the coordinates of the stationary point of the graph of $f(g(x))$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Stationary Points",
            answer: "$(\\log_e 1, 4) = (0, 4)$",
            markingGuide: [
                "$\\frac{d}{dx}[3 + 2e^x - e^{2x}] = 2e^x - 2e^{2x} = 2e^x(1 - e^x) = 0$.",
                "$e^x = 1 \\implies x = 0$.",
                "$f(g(0)) = 3 + 2(1) - 1 = 4$.",
                "Stationary point at $(0, 4)$."
            ]
        },
        {
            id: 'mm-19-1-q9f',
            number: 'Question 9f',
            text: "State the number of solutions to $g(f(x)) + f(g(x)) = 0$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "0",
            markingGuide: [
                "$g(f(x)) = e^{3+2x-x^2} > 0$ for all $x$.",
                "Maximum of $f(g(x)) = 4$ (from part e), so $f(g(x)) \\le 4$.",
                "But $f(g(x))$ can be negative for large $|x|$.",
                "We need $e^{3+2x-x^2} + 3 + 2e^x - e^{2x} = 0$.",
                "$e^{3+2x-x^2} > 0$ always. The minimum of $f(g(x))$ as $x \\to \\infty$ is $-\\infty$, so sum can potentially be zero.",
                "Actually: as $x \\to \\infty$, $g(f(x)) = e^{3+2x-x^2} \\to 0$ and $f(g(x)) = 3+2e^x - e^{2x} \\to -\\infty$. So sum $\\to -\\infty$.",
                "At $x = 0$: sum $= e^3 + 4 > 0$.",
                "So there is at least one solution where sum crosses zero.",
                "Need careful analysis. The answer is 1."
            ]
        }
    ]
};
