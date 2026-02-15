import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2025_EXAM1: ExamPaper = {
    id: 'mm-2025-exam1',
    year: 2025,
    subject: Subject.METHODS,
    title: "Exam 1 (Tech-Free)",
    questions: [
        {
            id: 'mm-25-1-q1a',
            number: 'Question 1a',
            text: "Let $y = x^2 \\cos(x)$. Find $\\frac{dy}{dx}$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Product Rule",
            answer: "$2x\\cos(x) - x^2\\sin(x)$",
            markingGuide: [
                "Apply product rule: $u=x^2, v=\\cos(x)$.",
                "$\\frac{dy}{dx} = 2x\\cos(x) - x^2\\sin(x)$.",
                "A – brackets not required around argument, either order, clearly only 2 terms."
            ]
        },
        {
            id: 'mm-25-1-q1b',
            number: 'Question 1b',
            text: "Let $f(x) = 6\\sqrt{x+1} + 5$. Find the gradient of the tangent to $y=f(x)$ at $x=8$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Tangents",
            answer: "$1$",
            markingGuide: [
                "Write $f(x) = 6(x+1)^{1/2} + 5$.",
                "M – attempt at derivative: $f'(x) = \\frac{3}{\\sqrt{x+1}}$.",
                "A – $f'(8) = \\frac{3}{\\sqrt{9}} = \\frac{3}{3} = 1$."
            ]
        },
        {
            id: 'mm-25-1-q2',
            number: 'Question 2',
            text: "Let $g(x)$ be a function defined for $x > -\\frac{3}{2}$ so that $g'(x) = \\frac{1}{2x+3}$ and $g(1) = 0$. Find $g(x)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Antidifferentiation",
            answer: "$g(x) = \\frac{1}{2} \\log_e(2x+3) - \\frac{1}{2} \\log_e(5)$",
            markingGuide: [
                "M – integrate to get $g(x) = \\frac{1}{2} \\log_e(2x+3) + c$, must have $+c$.",
                "A – apply $g(1)=0$: $c = -\\frac{1}{2}\\log_e(5)$. Any correct form, base $e$ or $\\ln$."
            ]
        },
        {
            id: 'mm-25-1-q3a',
            number: 'Question 3a',
            text: "Let $f: [0, 2\\pi] \\to R, f(x) = 2\\cos(2x) + 1$.\n\nState the range of $f$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$[-1, 3]$",
            markingGuide: [
                "Range: $[-1, 3]$ or equivalent, between $-1$ and $3$ inclusive.",
                "A – not $y=$ or $f=$, just the interval."
            ]
        },
        {
            id: 'mm-25-1-q3b',
            number: 'Question 3b',
            text: "Let $f: [0, 2\\pi] \\to R, f(x) = 2\\cos(2x) + 1$.\n\nSolve $f(x) = 0$ for $x$.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$x = \\frac{\\pi}{3}, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, \\frac{5\\pi}{3}$",
            markingGuide: [
                "$2\\cos(2x) + 1 = 0 \\implies \\cos(2x) = -\\frac{1}{2}$.",
                "M – see base angle of $\\frac{\\pi}{3}$.",
                "M – see 2 correct results for $2x$.",
                "A – 4 correct values only: $x = \\frac{\\pi}{3}, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, \\frac{5\\pi}{3}$."
            ]
        },
        {
            id: 'mm-25-1-q3c',
            number: 'Question 3c',
            text: "Let $f: [0, 2\\pi] \\to R, f(x) = 2\\cos(2x) + 1$.\n\nSketch the graph of $y = f(x)$ for $x \\in [\\frac{\\pi}{2}, \\frac{3\\pi}{2}]$ on the axes provided. Label the endpoints with their coordinates.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "Graph from $(\\frac{\\pi}{2}, -1)$ to $(\\frac{3\\pi}{2}, -1)$ with correct shape",
            markingGuide: [
                "M – accurately represents correct shape with symmetry and correct range, may extend beyond domain.",
                "A – correct endpoints labelled: $(\\frac{\\pi}{2}, -1)$ and $(\\frac{3\\pi}{2}, -1)$, graph restricted to domain."
            ]
        },
        {
            id: 'mm-25-1-q4a',
            number: 'Question 4a',
            text: "The probability distribution for the discrete random variable $X$ is given in the table below, where $k$ is a positive real number.\n\n| $x$ | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|\n| $\\Pr(X=x)$ | $\\frac{4}{k}$ | $\\frac{2k}{75}$ | $\\frac{k}{75}$ | $\\frac{2}{k}$ |\n\nShow that $k = 10$ or $k = 15$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Discrete Distributions",
            answer: "$k = 10$ or $k = 15$",
            markingGuide: [
                "Sum of probabilities = 1: $\\frac{4}{k} + \\frac{2k}{75} + \\frac{k}{75} + \\frac{2}{k} = 1$.",
                "$\\frac{6}{k} + \\frac{3k}{75} = 1 \\implies \\frac{6}{k} + \\frac{k}{25} = 1$.",
                "M – multiply through: $150 + k^2 = 25k$.",
                "A – $k^2 - 25k + 150 = 0 \\implies (k-10)(k-15) = 0$."
            ]
        },
        {
            id: 'mm-25-1-q4bi',
            number: 'Question 4b.i',
            text: "Let $k = 15$.\n\nFind $\\Pr(X > 1)$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Discrete Distributions",
            answer: "$\\frac{1}{3}$",
            markingGuide: [
                "With $k=15$: $\\Pr(X=2) = \\frac{15}{75} = \\frac{1}{5}$, $\\Pr(X=3) = \\frac{2}{15}$.",
                "$\\Pr(X > 1) = \\frac{1}{5} + \\frac{2}{15} = \\frac{3+2}{15} = \\frac{5}{15} = \\frac{1}{3}$."
            ]
        },
        {
            id: 'mm-25-1-q4bii',
            number: 'Question 4b.ii',
            text: "Let $k = 15$.\n\nFind $E(X)$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Discrete Distributions",
            answer: "$\\frac{6}{5}$ or $1.2$",
            markingGuide: [
                "Probs: $\\frac{4}{15}, \\frac{6}{15}, \\frac{3}{15}, \\frac{2}{15}$.",
                "$E(X) = 0 \\cdot \\frac{4}{15} + 1 \\cdot \\frac{6}{15} + 2 \\cdot \\frac{3}{15} + 3 \\cdot \\frac{2}{15} = \\frac{6+6+6}{15} = \\frac{18}{15} = \\frac{6}{5}$."
            ]
        },
        {
            id: 'mm-25-1-q5a',
            number: 'Question 5a',
            text: "Solve $e^{2x} - 8e^x + 7 = 0$ for $x$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Exponentials",
            answer: "$x = 0$ or $x = \\log_e(7)$",
            markingGuide: [
                "Let $u = e^x$: $u^2 - 8u + 7 = 0$.",
                "M – $(u-1)(u-7) = 0$, so $e^x = 1$ or $e^x = 7$.",
                "A – $x = 0$ or $x = \\log_e(7)$."
            ]
        },
        {
            id: 'mm-25-1-q5b',
            number: 'Question 5b',
            text: "Let $g(x) = e^{2x} - 8e^x + 7$, where $x \\in R$. The function $g(x)$ has exactly one stationary point, a local minimum.\n\nFind the largest value of $a$ such that when $g$ is restricted to the domain $(-\\infty, a]$, it has an inverse function.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Exponentials",
            answer: "$a = \\log_e(4)$",
            markingGuide: [
                "Find stationary point: $g'(x) = 2e^{2x} - 8e^x = 0$.",
                "M – $2e^x(e^x - 4) = 0 \\implies e^x = 4$.",
                "A – $x = \\log_e(4)$. Function is one-to-one on $(-\\infty, \\log_e(4)]$."
            ]
        },
        {
            id: 'mm-25-1-q6a',
            number: 'Question 6a',
            text: "Consider the binomial random variable $X \\sim \\text{Bi}(6, \\frac{1}{4})$.\n\nFind $\\text{var}(X)$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$\\frac{9}{8}$",
            markingGuide: [
                "$\\text{var}(X) = np(1-p) = 6 \\times \\frac{1}{4} \\times \\frac{3}{4} = \\frac{18}{16} = \\frac{9}{8}$."
            ]
        },
        {
            id: 'mm-25-1-q6b',
            number: 'Question 6b',
            text: "Consider the binomial random variable $X \\sim \\text{Bi}(6, \\frac{1}{4})$.\n\nDetermine $\\Pr(X \\ge 5)$. Give your answer in the form $\\frac{a}{2^b}$, where $a, b \\in Z$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$\\frac{19}{2^{12}}$",
            markingGuide: [
                "$\\Pr(X=5) = \\binom{6}{5}(\\frac{1}{4})^5(\\frac{3}{4})^1 = \\frac{18}{4^6}$.",
                "$\\Pr(X=6) = (\\frac{1}{4})^6 = \\frac{1}{4^6}$.",
                "M – correct binomial expressions.",
                "A – $\\Pr(X \\ge 5) = \\frac{19}{4^6} = \\frac{19}{2^{12}}$."
            ]
        },
        {
            id: 'mm-25-1-q7a',
            number: 'Question 7a',
            text: "Let $f: R \\to R, f(x) = x^3 - x^2 - 16x - 20$.\n\nVerify that $x = 5$ is a solution of $f(x) = 0$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$f(5) = 125 - 25 - 80 - 20 = 0$",
            markingGuide: [
                "Substitute: $f(5) = 125 - 25 - 80 - 20 = 0$ ✓."
            ]
        },
        {
            id: 'mm-25-1-q7b',
            number: 'Question 7b',
            text: "Express $f(x)$ in the form $(x+d)^2(x-5)$, where $d \\in R$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$f(x) = (x+2)^2(x-5)$, so $d = 2$",
            markingGuide: [
                "Divide $f(x)$ by $(x-5)$: $f(x) = (x-5)(x^2+4x+4)$.",
                "M – polynomial division or factor theorem.",
                "A – $(x-5)(x+2)^2$, so $d=2$."
            ]
        },
        {
            id: 'mm-25-1-q7c',
            number: 'Question 7c',
            text: "Consider the graph of $y = f(x)$, as shown.\n\nComplete the coordinate pairs of all axial intercepts of $y = f(x)$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$(-2, 0)$, $(5, 0)$, $(0, -20)$",
            markingGuide: [
                "x-intercepts at $x = -2$ (touch) and $x = 5$ (cross).",
                "y-intercept: $f(0) = -20$.",
                "All three coordinate pairs: $(-2, 0)$, $(5, 0)$, $(0, -20)$."
            ]
        },
        {
            id: 'mm-25-1-q7di',
            number: 'Question 7d.i',
            text: "Let $g: R \\to R, g(x) = x + 2$.\n\nState the coordinates of the stationary point of inflection for the graph of $y = f(x)g(x)$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$(-2, 0)$",
            markingGuide: [
                "$f(x)g(x) = (x+2)^2(x-5)(x+2) = (x+2)^3(x-5)$.",
                "Stationary point of inflection at $x = -2$ (triple root).",
                "Coordinates: $(-2, 0)$."
            ]
        },
        {
            id: 'mm-25-1-q7dii',
            number: 'Question 7d.ii',
            text: "Write down the values of $x$ for which $f(x)g(x) \\ge 0$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomials",
            answer: "$x = -2$ or $x \\ge 5$",
            markingGuide: [
                "$y = (x+2)^3(x-5)$. Quartic, positive leading coefficient.",
                "Zero at $x=-2$ (inflection, touches) and $x=5$ (crosses).",
                "$y \\ge 0$ when $x = -2$ or $x \\ge 5$."
            ]
        },
        {
            id: 'mm-25-1-q8a',
            number: 'Question 8a',
            text: "Consider $f(x) = \\begin{cases} \\frac{3}{8}(4-3x) & 0 \\le x \\le \\frac{4}{3} \\\\ 0 & \\text{otherwise} \\end{cases}$.\n\nThe continuous random variable $X$ has probability density function $f(x)$.\n\nFind $k$ such that $\\Pr(X > k) = \\frac{9}{16}$.",
            marks: 3,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$k = \\frac{1}{3}$",
            markingGuide: [
                "$\\Pr(X > k) = \\int_k^{4/3} \\frac{3}{8}(4-3x)\\,dx = \\frac{9}{16}$.",
                "Note: $f(x)$ is linear from $\\frac{3}{2}$ at $x=0$ to $0$ at $x=\\frac{4}{3}$. The region from $k$ to $\\frac{4}{3}$ forms a triangle.",
                "Area = $\\frac{1}{2}(\\frac{4}{3}-k) \\cdot f(k) = \\frac{1}{2}(\\frac{4}{3}-k) \\cdot \\frac{3}{8}(4-3k) = \\frac{9}{16}(\\frac{4}{3}-k)^2$.",
                "Solve $\\frac{9}{16}(\\frac{4}{3}-k)^2 = \\frac{9}{16}$, so $(\\frac{4}{3}-k)^2 = 1$.",
                "$\\frac{4}{3}-k = \\pm 1$, giving $k = \\frac{1}{3}$ or $k = \\frac{7}{3}$.",
                "Since $0 \\le k \\le \\frac{4}{3}$, $k = \\frac{1}{3}$."
            ]
        },
        {
            id: 'mm-25-1-q8b',
            number: 'Question 8b',
            text: "The function $h(x)$ is a transformation of $f(x)$ such that $h(x) = mf(x) + n$, where $m$ and $n$ are real numbers.\n\nFind $\\int_0^{4/3} h(x)\\,dx$ in terms of $m$ and $n$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Integration",
            answer: "$m + \\frac{4n}{3}$",
            markingGuide: [
                "$\\int_0^{4/3} h(x)\\,dx = \\int_0^{4/3} [mf(x) + n]\\,dx$.",
                "$= m\\int_0^{4/3} f(x)\\,dx + n\\int_0^{4/3} 1\\,dx$.",
                "Since $f$ is a PDF, $\\int_0^{4/3} f(x)\\,dx = 1$.",
                "M – recognise $\\int f = 1$ and set up correctly.",
                "A – $= m + \\frac{4n}{3}$."
            ]
        },
        {
            id: 'mm-25-1-q9a',
            number: 'Question 9a',
            text: "Consider the functions $f: R \\setminus \\{1\\} \\to R, f(x) = \\frac{w^2}{(x-1)^2}$ and $g: R \\to R, g(x) = (x-w)^2$, where $w \\in R$.\n\nIf $w = -3$, find the four solutions to $f(x) = g(x)$.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Intersection Analysis",
            answer: "$x = -1-\\sqrt{7},\\, -1+\\sqrt{7},\\, -2,\\, 0$",
            markingGuide: [
                "$\\frac{9}{(x-1)^2} = (x+3)^2 \\implies \\left(\\frac{3}{x-1}\\right)^2 = (x+3)^2$.",
                "Take square root: $(x-1)(x+3) = \\pm 3$.",
                "Case 1: $x^2+2x-3 = 3 \\implies x^2+2x-6 = 0 \\implies x = -1 \\pm \\sqrt{7}$.",
                "Case 2: $x^2+2x-3 = -3 \\implies x^2+2x = 0 \\implies x(x+2) = 0 \\implies x = 0, -2$.",
                "M – setting up squared equation correctly.",
                "M – solving one case.",
                "A – all four solutions."
            ]
        },
        {
            id: 'mm-25-1-q9bi',
            number: 'Question 9b.i',
            text: "Consider the case where $w > 0$.\n\nFind, in terms of $w$, the coordinates of the minimum point of the graph of $y = (x-1)(x-w)$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Quadratics",
            answer: "$\\left(\\frac{w+1}{2}, -\\frac{(w-1)^2}{4}\\right)$",
            markingGuide: [
                "Axis of symmetry: $x = \\frac{1+w}{2}$.",
                "M – find x-coordinate of vertex.",
                "$y = (\\frac{w+1}{2}-1)(\\frac{w+1}{2}-w) = \\frac{w-1}{2} \\cdot \\frac{1-w}{2} = -\\frac{(w-1)^2}{4}$.",
                "A – coordinates $\\left(\\frac{w+1}{2}, -\\frac{(w-1)^2}{4}\\right)$."
            ]
        },
        {
            id: 'mm-25-1-q9bii',
            number: 'Question 9b.ii',
            text: "Hence, or otherwise, find the positive values of $w$ for which $f(x) = g(x)$ has exactly three solutions.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Intersection Analysis",
            answer: "$w = 3 - 2\\sqrt{2}$ or $w = 3 + 2\\sqrt{2}$",
            markingGuide: [
                "$f(x)=g(x) \\implies (x-1)(x-w) = \\pm w$.",
                "The parabola $y=(x-1)(x-w)$ intersects $y=w$ (2 solutions always for $w>0$) and $y=-w$.",
                "For exactly 3 total solutions, $y=-w$ must be tangent to the parabola (1 solution).",
                "Set vertex value equal to $-w$: $-\\frac{(w-1)^2}{4} = -w$.",
                "$(w-1)^2 = 4w \\implies w^2 - 6w + 1 = 0$.",
                "A – $w = 3 \\pm 2\\sqrt{2}$. Both positive."
            ]
        }
    ]
};
