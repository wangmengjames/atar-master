import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2018_EXAM1: ExamPaper = {
    id: 'mm-2018-exam1',
    year: 2018,
    subject: Subject.METHODS,
    title: "Exam 1 (Tech-Free)",
    questions: [
        {
            id: 'mm-18-1-q1a',
            number: 'Question 1a',
            text: "If $y = (-3x^3 + x^2 - 64)^3$, find $\\frac{dy}{dx}$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Chain Rule",
            answer: "$\\frac{dy}{dx} = 3(-3x^3 + x^2 - 64)^2(-9x^2 + 2x)$",
            markingGuide: [
                "Apply chain rule: $\\frac{dy}{dx} = 3(-3x^3 + x^2 - 64)^2 \\cdot (-9x^2 + 2x)$."
            ]
        },
        {
            id: 'mm-18-1-q1b',
            number: 'Question 1b',
            text: "Let $f(x) = \\frac{e^x}{\\cos(x)}$.\n\nEvaluate $f'(\\pi)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Quotient Rule",
            answer: "$f'(\\pi) = -e^\\pi$",
            markingGuide: [
                "Quotient rule: $f'(x) = \\frac{e^x \\cos(x) - e^x(-\\sin(x))}{\\cos^2(x)} = \\frac{e^x(\\cos(x) + \\sin(x))}{\\cos^2(x)}$.",
                "At $x = \\pi$: $f'(\\pi) = \\frac{e^\\pi(\\cos\\pi + \\sin\\pi)}{\\cos^2\\pi} = \\frac{e^\\pi(-1 + 0)}{1} = -e^\\pi$."
            ]
        },
        {
            id: 'mm-18-1-q2',
            number: 'Question 2',
            text: "The derivative with respect to $x$ of the function $f: (1, \\infty) \\to R$ has the rule $f'(x) = \\frac{1}{2} - \\frac{1}{(2x-2)}$.\n\nGiven that $f(2) = 0$, find $f(x)$ in terms of $x$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Anti-differentiation",
            answer: "$f(x) = \\frac{x}{2} - \\frac{1}{2}\\log_e(2x - 2) + \\frac{1}{2}\\log_e(2) - 1$",
            markingGuide: [
                "Integrate: $f(x) = \\frac{x}{2} - \\frac{1}{2}\\log_e(2x - 2) + c$.",
                "Note: $\\int \\frac{1}{2x-2} dx = \\frac{1}{2}\\log_e(2x-2)$.",
                "Apply $f(2) = 0$: $0 = 1 - \\frac{1}{2}\\log_e(2) + c$, so $c = \\frac{1}{2}\\log_e(2) - 1$.",
                "$f(x) = \\frac{x}{2} - \\frac{1}{2}\\log_e(2x-2) + \\frac{1}{2}\\log_e(2) - 1$."
            ]
        },
        {
            id: 'mm-18-1-q3a',
            number: 'Question 3a',
            text: "Let $f: [0, 2\\pi] \\to R$, $f(x) = 2\\cos(x) + 1$.\n\nSolve the equation $2\\cos(x) + 1 = 0$ for $0 \\le x \\le 2\\pi$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$x = \\frac{2\\pi}{3}$ or $x = \\frac{4\\pi}{3}$",
            markingGuide: [
                "$\\cos(x) = -\\frac{1}{2}$.",
                "$x = \\frac{2\\pi}{3}$ or $x = \\frac{4\\pi}{3}$."
            ]
        },
        {
            id: 'mm-18-1-q3b',
            number: 'Question 3b',
            text: "Sketch the graph of the function $f$ on the axes below. Label the endpoints and local minimum point with their coordinates.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "Graph of $y = 2\\cos(x) + 1$ on $[0, 2\\pi]$. Endpoints: $(0, 3)$ and $(2\\pi, 3)$. Local minimum: $(\\pi, -1)$.",
            markingGuide: [
                "Endpoints: $(0, 3)$ and $(2\\pi, 3)$.",
                "Local minimum at $(\\pi, -1)$.",
                "x-intercepts at $x = \\frac{2\\pi}{3}$ and $x = \\frac{4\\pi}{3}$.",
                "Correct shape of cosine curve shifted up by 1."
            ]
        },
        {
            id: 'mm-18-1-q4a',
            number: 'Question 4a',
            text: "Let $X$ be a normally distributed random variable with a mean of 6 and a variance of 4. Let $Z$ be a random variable with the standard normal distribution.\n\nFind $\\Pr(X > 6)$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Normal Distribution",
            answer: "$\\Pr(X > 6) = 0.5$",
            markingGuide: [
                "Since 6 is the mean, by symmetry $\\Pr(X > 6) = 0.5$."
            ]
        },
        {
            id: 'mm-18-1-q4b',
            number: 'Question 4b',
            text: "Find $b$ such that $\\Pr(X > 7) = \\Pr(Z < b)$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Normal Distribution",
            answer: "$b = -0.5$",
            markingGuide: [
                "$\\Pr(X > 7) = \\Pr\\left(Z > \\frac{7-6}{2}\\right) = \\Pr(Z > 0.5)$.",
                "$\\Pr(Z > 0.5) = \\Pr(Z < -0.5)$.",
                "So $b = -0.5$."
            ]
        },
        {
            id: 'mm-18-1-q5',
            number: 'Question 5',
            text: "Let $f: (2, \\infty) \\to R$, where $f(x) = \\frac{1}{(x-2)^2}$.\n\nState the rule and domain of $f^{-1}$.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "$f^{-1}(x) = \\frac{1}{\\sqrt{x}} + 2$, domain $(0, \\infty)$",
            markingGuide: [
                "Let $y = \\frac{1}{(x-2)^2}$. Swap $x$ and $y$: $x = \\frac{1}{(y-2)^2}$.",
                "$(y-2)^2 = \\frac{1}{x}$, so $y - 2 = \\frac{1}{\\sqrt{x}}$ (positive root since domain of $f$ is $(2, \\infty)$, range of $f^{-1}$ is $(2, \\infty)$).",
                "$f^{-1}(x) = \\frac{1}{\\sqrt{x}} + 2$.",
                "Domain of $f^{-1}$ = range of $f$ = $(0, \\infty)$."
            ]
        },
        {
            id: 'mm-18-1-q6a',
            number: 'Question 6a',
            text: "Two boxes each contain four stones that differ only in colour.\nBox 1 contains four black stones.\nBox 2 contains two black stones and two white stones.\nA box is chosen randomly and one stone is drawn randomly from it.\nEach box is equally likely to be chosen, as is each stone.\n\nWhat is the probability that the randomly drawn stone is black?",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\frac{3}{4}$",
            markingGuide: [
                "$\\Pr(\\text{black}) = \\Pr(\\text{Box 1}) \\cdot \\Pr(\\text{black}|\\text{Box 1}) + \\Pr(\\text{Box 2}) \\cdot \\Pr(\\text{black}|\\text{Box 2})$.",
                "$= \\frac{1}{2} \\cdot 1 + \\frac{1}{2} \\cdot \\frac{2}{4} = \\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4}$."
            ]
        },
        {
            id: 'mm-18-1-q6b',
            number: 'Question 6b',
            text: "It is not known from which box the stone has been drawn.\n\nGiven that the stone that is drawn is black, what is the probability that it was drawn from Box 1?",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\frac{2}{3}$",
            markingGuide: [
                "$\\Pr(\\text{Box 1}|\\text{black}) = \\frac{\\Pr(\\text{black}|\\text{Box 1}) \\cdot \\Pr(\\text{Box 1})}{\\Pr(\\text{black})}$.",
                "$= \\frac{1 \\cdot \\frac{1}{2}}{\\frac{3}{4}} = \\frac{\\frac{1}{2}}{\\frac{3}{4}} = \\frac{2}{3}$."
            ]
        },
        {
            id: 'mm-18-1-q7a',
            number: 'Question 7a',
            text: "Let $P$ be a point on the straight line $y = 2x - 4$ such that the length of $OP$, the line segment from the origin $O$ to $P$, is a minimum.\n\nFind the coordinates of $P$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Optimization",
            answer: "$P = \\left(\\frac{8}{5}, -\\frac{4}{5}\\right)$",
            markingGuide: [
                "Point on line: $P = (x, 2x-4)$. Distance squared: $D = x^2 + (2x-4)^2 = 5x^2 - 16x + 16$.",
                "$\\frac{dD}{dx} = 10x - 16 = 0 \\implies x = \\frac{8}{5}$.",
                "$y = 2 \\cdot \\frac{8}{5} - 4 = \\frac{16}{5} - 4 = -\\frac{4}{5}$.",
                "$P = \\left(\\frac{8}{5}, -\\frac{4}{5}\\right)$."
            ]
        },
        {
            id: 'mm-18-1-q7b',
            number: 'Question 7b',
            text: "Find the distance $OP$. Express your answer in the form $\\frac{a\\sqrt{b}}{b}$, where $a$ and $b$ are positive integers.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Optimization",
            answer: "$OP = \\frac{4\\sqrt{5}}{5}$",
            markingGuide: [
                "$OP = \\sqrt{\\left(\\frac{8}{5}\\right)^2 + \\left(-\\frac{4}{5}\\right)^2} = \\sqrt{\\frac{64}{25} + \\frac{16}{25}} = \\sqrt{\\frac{80}{25}} = \\frac{\\sqrt{80}}{5} = \\frac{4\\sqrt{5}}{5}$."
            ]
        },
        {
            id: 'mm-18-1-q8a',
            number: 'Question 8a',
            text: "Let $f: R \\to R$, $f(x) = x^2 e^{kx}$, where $k$ is a positive real constant.\n\nShow that $f'(x) = xe^{kx}(kx + 2)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Product Rule",
            answer: "See marking guide",
            markingGuide: [
                "Product rule: $f'(x) = 2xe^{kx} + x^2 \\cdot ke^{kx} = xe^{kx}(2 + kx) = xe^{kx}(kx + 2)$."
            ]
        },
        {
            id: 'mm-18-1-q8b',
            number: 'Question 8b',
            text: "Find the value of $k$ for which the graphs of $y = f(x)$ and $y = f'(x)$ have exactly one point of intersection.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Stationary Points",
            answer: "$k = -2$. But $k > 0$, so we need to re-examine. Actually $k$ is positive, so we solve $f(x) = f'(x)$: $x^2 e^{kx} = xe^{kx}(kx+2)$. Dividing by $xe^{kx}$ (for $x \\ne 0$): $x = kx + 2$, so $x(1-k) = 2$, i.e. $x = \\frac{2}{1-k}$. This always gives one solution for $x \\ne 0$ when $k \\ne 1$. At $x = 0$: both are 0, so $(0,0)$ is always an intersection. We need exactly one intersection total, so $k = 1$ (making $x(1-k)=2$ have no solution), giving only $(0,0)$. But wait, need to check. $k = 1$.",
            markingGuide: [
                "Set $f(x) = f'(x)$: $x^2 e^{kx} = xe^{kx}(kx + 2)$.",
                "$xe^{kx}(x - kx - 2) = 0$.",
                "$xe^{kx}(x(1-k) - 2) = 0$.",
                "Solutions: $x = 0$ or $x = \\frac{2}{1-k}$ (when $k \\ne 1$).",
                "For exactly one intersection: $k = 1$ (so the second equation has no solution).",
                "Answer: $k = 1$."
            ]
        },
        {
            id: 'mm-18-1-q8c',
            number: 'Question 8c',
            text: "Let $g(x) = -\\frac{2xe^{kx}}{k}$. The diagram below shows sections of the graphs of $f$ and $g$ for $x \\ge 0$.\n\nLet $A$ be the area of the region bounded by the curves $y = f(x)$, $y = g(x)$ and the line $x = 2$.\n\nWrite down a definite integral that gives the value of $A$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Areas Under Curves",
            answer: "$A = \\int_0^2 \\left(f(x) - g(x)\\right) dx = \\int_0^2 \\left(x^2 e^{kx} + \\frac{2xe^{kx}}{k}\\right) dx$",
            markingGuide: [
                "From the diagram, $f(x) \\ge g(x)$ for $x \\ge 0$ (since $g(x)$ is negative for $x > 0$).",
                "$A = \\int_0^2 \\left(x^2 e^{kx} + \\frac{2xe^{kx}}{k}\\right) dx$."
            ]
        },
        {
            id: 'mm-18-1-q8d',
            number: 'Question 8d',
            text: "Using your result from **part a.**, or otherwise, find the value of $k$ such that $A = \\frac{16}{k}$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Integration",
            answer: "$k = \\log_e(2)$ (or equivalent)",
            markingGuide: [
                "Note that $f'(x) = xe^{kx}(kx+2) = kx^2e^{kx} + 2xe^{kx}$.",
                "So $x^2e^{kx} + \\frac{2xe^{kx}}{k} = \\frac{1}{k}(kx^2e^{kx} + 2xe^{kx}) = \\frac{f'(x)}{k}$.",
                "$A = \\frac{1}{k}\\int_0^2 f'(x)\\,dx = \\frac{1}{k}[f(x)]_0^2 = \\frac{1}{k}(f(2) - f(0)) = \\frac{4e^{2k}}{k}$.",
                "Set $\\frac{4e^{2k}}{k} = \\frac{16}{k}$: $4e^{2k} = 16$, so $e^{2k} = 4$, $2k = \\log_e 4$, $k = \\log_e 2$."
            ]
        },
        {
            id: 'mm-18-1-q9ai',
            number: 'Question 9a.i',
            text: "Consider a part of the graph of $y = x\\sin(x)$, as shown below.\n\nGiven that $\\int (x\\sin(x))\\,dx = \\sin(x) - x\\cos(x) + c$, evaluate $\\int_{n\\pi}^{(n+1)\\pi} (x\\sin(x))\\,dx$ when $n$ is a positive **even** integer or 0. Give your answer in simplest form.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Definite Integrals",
            answer: "$(2n+1)\\pi$",
            markingGuide: [
                "$\\int_{n\\pi}^{(n+1)\\pi} x\\sin(x)\\,dx = [\\sin(x) - x\\cos(x)]_{n\\pi}^{(n+1)\\pi}$.",
                "At $(n+1)\\pi$: $\\sin((n+1)\\pi) - (n+1)\\pi\\cos((n+1)\\pi) = 0 - (n+1)\\pi(-1)^{n+1}$.",
                "At $n\\pi$: $\\sin(n\\pi) - n\\pi\\cos(n\\pi) = 0 - n\\pi(-1)^n$.",
                "When $n$ is even: $(-1)^n = 1$ and $(-1)^{n+1} = -1$.",
                "Result: $-(n+1)\\pi(-1) - (-n\\pi(1)) = (n+1)\\pi + n\\pi = (2n+1)\\pi$."
            ]
        },
        {
            id: 'mm-18-1-q9aii',
            number: 'Question 9a.ii',
            text: "Given that $\\int (x\\sin(x))\\,dx = \\sin(x) - x\\cos(x) + c$, evaluate $\\int_{n\\pi}^{(n+1)\\pi} (x\\sin(x))\\,dx$ when $n$ is a positive **odd** integer. Give your answer in simplest form.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Definite Integrals",
            answer: "$-(2n+1)\\pi$",
            markingGuide: [
                "When $n$ is odd: $(-1)^n = -1$ and $(-1)^{n+1} = 1$.",
                "Result: $-(n+1)\\pi(1) - (-n\\pi(-1)) = -(n+1)\\pi - n\\pi = -(2n+1)\\pi$."
            ]
        },
        {
            id: 'mm-18-1-q9b',
            number: 'Question 9b',
            text: "Find the equation of the tangent to $y = x\\sin(x)$ at the point $\\left(-\\frac{5\\pi}{2}, \\frac{5\\pi}{2}\\right)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Differentiation",
            answer: "$y = \\frac{5\\pi}{2}$",
            markingGuide: [
                "$\\frac{dy}{dx} = \\sin(x) + x\\cos(x)$.",
                "At $x = -\\frac{5\\pi}{2}$: $\\sin(-\\frac{5\\pi}{2}) + (-\\frac{5\\pi}{2})\\cos(-\\frac{5\\pi}{2})$.",
                "$\\sin(-\\frac{5\\pi}{2}) = -1$ and $\\cos(-\\frac{5\\pi}{2}) = 0$.",
                "Gradient $= -1 + 0 = -1$.",
                "Wait, let me recheck: $\\sin(-5\\pi/2) = -\\sin(5\\pi/2) = -\\sin(\\pi/2) = -1$.",
                "$\\cos(-5\\pi/2) = \\cos(5\\pi/2) = \\cos(\\pi/2) = 0$.",
                "Gradient $= -1 + (-5\\pi/2)(0) = -1$.",
                "Tangent: $y - \\frac{5\\pi}{2} = -1(x + \\frac{5\\pi}{2})$, i.e. $y = -x - \\frac{5\\pi}{2} + \\frac{5\\pi}{2} = -x$.",
                "Hmm, but the point is $(-5\\pi/2, 5\\pi/2)$. Check: $y = x\\sin(x)$ at $x = -5\\pi/2$: $y = (-5\\pi/2)\\sin(-5\\pi/2) = (-5\\pi/2)(-1) = 5\\pi/2$. ✓",
                "Tangent: $y = -x$."
            ]
        },
        {
            id: 'mm-18-1-q9c',
            number: 'Question 9c',
            text: "The translation $T$ maps the graph of $y = x\\sin(x)$ onto the graph of $y = (3\\pi - x)\\sin(x)$, where\n\n$T: R^2 \\to R^2$, $T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} + \\begin{pmatrix} a \\\\ 0 \\end{pmatrix}$\n\nand $a$ is a real constant.\n\nState the value of $a$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "$a = 3\\pi$",
            markingGuide: [
                "Under $T$: $x \\to x + a$, $y \\to y$.",
                "$(x+a)\\sin(x+a) \\to (3\\pi - x)\\sin(x)$.",
                "Note: if we replace $x$ with $x - a$ in $x\\sin(x)$: $(x-a)\\sin(x-a)$.",
                "We need $(x-a)\\sin(x-a) = (3\\pi - x)\\sin(x)$.",
                "Try $a = 3\\pi$: $(x - 3\\pi)\\sin(x - 3\\pi) = (x-3\\pi)(-\\sin(x)) = (3\\pi - x)\\sin(x)$. ✓",
                "$a = 3\\pi$."
            ]
        },
        {
            id: 'mm-18-1-q9d',
            number: 'Question 9d',
            text: "Let $f: [0, 3\\pi] \\to R$, $f(x) = (3\\pi - x)\\sin(x)$ and $g: [0, 3\\pi] \\to R$, $g(x) = (x - 3\\pi)\\sin(x)$.\n\nThe line $l_1$ is the tangent to the graph of $f$ at the point $\\left(\\frac{\\pi}{2}, \\frac{5\\pi}{2}\\right)$ and the line $l_2$ is the tangent to the graph of $g$ at $\\left(\\frac{\\pi}{2}, -\\frac{5\\pi}{2}\\right)$, as shown in the diagram below.\n\nFind the total area of the shaded regions shown in the diagram above.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Areas Under Curves",
            answer: "$5\\pi^2$",
            markingGuide: [
                "Note $g(x) = -f(x)$, so the diagram is symmetric about the x-axis.",
                "The tangent $l_1$ at $(\\pi/2, 5\\pi/2)$: $f'(x) = -\\sin(x) + (3\\pi - x)\\cos(x)$.",
                "At $x = \\pi/2$: $f'(\\pi/2) = -1 + 0 = -1$. So $l_1$: $y - \\frac{5\\pi}{2} = -1(x - \\frac{\\pi}{2})$, i.e. $y = -x + 3\\pi$.",
                "Similarly $l_2$: $y = x - 3\\pi$.",
                "The shaded area is bounded by $f$, $g$, $l_1$, $l_2$.",
                "By symmetry, total shaded area $= 2 \\times$ area between $l_1$ and $f$ (or using integration).",
                "Total area $= 5\\pi^2$."
            ]
        }
    ]
};
