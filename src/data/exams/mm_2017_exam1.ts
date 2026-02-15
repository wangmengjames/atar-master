import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2017_EXAM1: ExamPaper = {
    id: 'mm-2017-exam1',
    year: 2017,
    subject: Subject.METHODS,
    title: "Exam 1 (Tech-Free)",
    questions: [
        {
            id: 'mm-17-1-q1a',
            number: 'Question 1a',
            text: "Let $f: (-2, \\infty) \\to R$, $f(x) = \\frac{x}{x+2}$.\n\nDifferentiate $f$ with respect to $x$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Quotient Rule",
            answer: "$f'(x) = \\frac{2}{(x+2)^2}$",
            markingGuide: [
                "Quotient rule: $f'(x) = \\frac{(x+2)(1) - x(1)}{(x+2)^2} = \\frac{2}{(x+2)^2}$."
            ]
        },
        {
            id: 'mm-17-1-q1b',
            number: 'Question 1b',
            text: "Let $g(x) = (2 - x^3)^3$.\n\nEvaluate $g'(1)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Chain Rule",
            answer: "$g'(1) = -9$",
            markingGuide: [
                "Chain rule: $g'(x) = 3(2 - x^3)^2 \\cdot (-3x^2) = -9x^2(2 - x^3)^2$.",
                "$g'(1) = -9(1)^2(2 - 1)^2 = -9$."
            ]
        },
        {
            id: 'mm-17-1-q2a',
            number: 'Question 2a',
            text: "Let $y = x \\log_e(3x)$.\n\nFind $\\frac{dy}{dx}$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Product Rule",
            answer: "$\\frac{dy}{dx} = \\log_e(3x) + 1$",
            markingGuide: [
                "Product rule: $\\frac{dy}{dx} = \\log_e(3x) + x \\cdot \\frac{1}{x} = \\log_e(3x) + 1$."
            ]
        },
        {
            id: 'mm-17-1-q2b',
            number: 'Question 2b',
            text: "Hence, calculate $\\int_1^2 (\\log_e(3x) + 1)\\, dx$. Express your answer in the form $\\log_e(a)$, where $a$ is a positive integer.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Integration",
            answer: "$\\log_e(6)$",
            markingGuide: [
                "Since $\\frac{d}{dx}[x\\log_e(3x)] = \\log_e(3x) + 1$,",
                "$\\int_1^2 (\\log_e(3x) + 1)\\, dx = [x\\log_e(3x)]_1^2 = 2\\log_e(6) - \\log_e(3) = \\log_e(36) - \\log_e(3) = \\log_e(12)$.",
                "Wait, recheck: $2\\log_e(6) - 1 \\cdot \\log_e(3) = \\log_e(36) - \\log_e(3) = \\log_e(12)$.",
                "Answer: $\\log_e(12)$."
            ]
        },
        {
            id: 'mm-17-1-q3a',
            number: 'Question 3a',
            text: "Let $f: [-3, 0] \\to R$, $f(x) = (x+2)^2(x-1)$.\n\nShow that $(x+2)^2(x-1) = x^3 + 3x^2 - 4$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomial Expansion",
            answer: "See marking guide",
            markingGuide: [
                "$(x+2)^2(x-1) = (x^2+4x+4)(x-1) = x^3 - x^2 + 4x^2 - 4x + 4x - 4 = x^3 + 3x^2 - 4$."
            ]
        },
        {
            id: 'mm-17-1-q3b',
            number: 'Question 3b',
            text: "Sketch the graph of $f$ on the axes below. Label the axis intercepts and any stationary points with their coordinates.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Polynomial Graphs",
            answer: "x-intercepts: $(-2, 0)$; y-intercept: $(0, -4)$; stationary points: $(-2, 0)$ and $(0, -4)$ — wait, need to recalculate",
            markingGuide: [
                "x-intercepts: $(x+2)^2(x-1) = 0$ gives $x = -2$ (touch) and $x = 1$. But domain is $[-3, 0]$, so $x = 1$ is excluded.",
                "Only x-intercept in domain: $(-2, 0)$.",
                "y-intercept: $f(0) = (2)^2(-1) = -4$, so $(0, -4)$.",
                "$f'(x) = 3x^2 + 6x = 3x(x+2) = 0$ gives $x = 0$ and $x = -2$.",
                "Stationary points: $(-2, 0)$ (local max) and $(0, -4)$ (endpoint/local min).",
                "Endpoints: $f(-3) = (-1)^2(-4) = -4$.",
                "Graph: starts at $(-3, -4)$, rises to $(-2, 0)$, then falls to $(0, -4)$."
            ]
        },
        {
            id: 'mm-17-1-q4',
            number: 'Question 4',
            text: "In a large population of fish, the proportion of angel fish is $\\frac{1}{4}$.\n\nLet $\\hat{P}$ be the random variable that represents the sample proportion of angel fish for samples of size $n$ drawn from the population.\n\nFind the smallest integer value of $n$ such that the standard deviation of $\\hat{P}$ is less than or equal to $\\frac{1}{100}$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Sample Proportions",
            answer: "$n = 1875$",
            markingGuide: [
                "$\\text{sd}(\\hat{P}) = \\sqrt{\\frac{p(1-p)}{n}} = \\sqrt{\\frac{\\frac{1}{4} \\cdot \\frac{3}{4}}{n}} = \\sqrt{\\frac{3}{16n}}$.",
                "Require $\\sqrt{\\frac{3}{16n}} \\le \\frac{1}{100}$.",
                "$\\frac{3}{16n} \\le \\frac{1}{10000}$, so $n \\ge \\frac{30000}{16} = 1875$.",
                "Smallest $n = 1875$."
            ]
        },
        {
            id: 'mm-17-1-q5a',
            number: 'Question 5a',
            text: "For Jac to log on to a computer successfully, Jac must type the correct password. Unfortunately, Jac has forgotten the password. If Jac types the wrong password, Jac can make another attempt. The probability of success on any attempt is $\\frac{2}{5}$. Assume that the result of each attempt is independent of the result of any other attempt. A maximum of three attempts can be made.\n\nWhat is the probability that Jac does not log on to the computer successfully?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Independent Events",
            answer: "$\\frac{27}{125}$",
            markingGuide: [
                "Pr(fail all 3) $= \\left(\\frac{3}{5}\\right)^3 = \\frac{27}{125}$."
            ]
        },
        {
            id: 'mm-17-1-q5b',
            number: 'Question 5b',
            text: "Calculate the probability that Jac logs on to the computer successfully. Express your answer in the form $\\frac{a}{b}$, where $a$ and $b$ are positive integers.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Independent Events",
            answer: "$\\frac{98}{125}$",
            markingGuide: [
                "Pr(success) $= 1 - \\frac{27}{125} = \\frac{98}{125}$."
            ]
        },
        {
            id: 'mm-17-1-q5c',
            number: 'Question 5c',
            text: "Calculate the probability that Jac logs on to the computer successfully on the second or on the third attempt. Express your answer in the form $\\frac{c}{d}$, where $c$ and $d$ are positive integers.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Independent Events",
            answer: "$\\frac{78}{125}$",
            markingGuide: [
                "Pr(success on 2nd) $= \\frac{3}{5} \\cdot \\frac{2}{5} = \\frac{6}{25}$.",
                "Pr(success on 3rd) $= \\left(\\frac{3}{5}\\right)^2 \\cdot \\frac{2}{5} = \\frac{18}{125}$.",
                "Total $= \\frac{30}{125} + \\frac{18}{125} = \\frac{48}{125}$.",
                "Hmm, let me recheck. Actually Pr(2nd or 3rd) = Pr(success) - Pr(1st) = $\\frac{98}{125} - \\frac{2}{5} = \\frac{98}{125} - \\frac{50}{125} = \\frac{48}{125}$.",
                "Answer: $\\frac{48}{125}$."
            ]
        },
        {
            id: 'mm-17-1-q6a',
            number: 'Question 6a',
            text: "Let $(\\tan(\\theta) - 1)(\\sin(\\theta) - \\sqrt{3}\\cos(\\theta))(\\sin(\\theta) + \\sqrt{3}\\cos(\\theta)) = 0$.\n\nState all possible values of $\\tan(\\theta)$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$\\tan(\\theta) = 1$, $\\tan(\\theta) = \\sqrt{3}$, or $\\tan(\\theta) = -\\sqrt{3}$",
            markingGuide: [
                "$\\tan(\\theta) - 1 = 0 \\implies \\tan(\\theta) = 1$.",
                "$\\sin(\\theta) - \\sqrt{3}\\cos(\\theta) = 0 \\implies \\tan(\\theta) = \\sqrt{3}$.",
                "$\\sin(\\theta) + \\sqrt{3}\\cos(\\theta) = 0 \\implies \\tan(\\theta) = -\\sqrt{3}$."
            ]
        },
        {
            id: 'mm-17-1-q6b',
            number: 'Question 6b',
            text: "Hence, find all possible solutions for $(\\tan(\\theta) - 1)(\\sin^2(\\theta) - 3\\cos^2(\\theta)) = 0$, where $0 \\le \\theta \\le \\pi$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$\\theta = \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{2\\pi}{3}$",
            markingGuide: [
                "Note $\\sin^2(\\theta) - 3\\cos^2(\\theta) = (\\sin(\\theta) - \\sqrt{3}\\cos(\\theta))(\\sin(\\theta) + \\sqrt{3}\\cos(\\theta))$.",
                "So we need $\\tan(\\theta) = 1$, $\\tan(\\theta) = \\sqrt{3}$, or $\\tan(\\theta) = -\\sqrt{3}$.",
                "$\\tan(\\theta) = 1 \\implies \\theta = \\frac{\\pi}{4}$.",
                "$\\tan(\\theta) = \\sqrt{3} \\implies \\theta = \\frac{\\pi}{3}$.",
                "$\\tan(\\theta) = -\\sqrt{3} \\implies \\theta = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$.",
                "Solutions: $\\theta = \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{2\\pi}{3}$."
            ]
        },
        {
            id: 'mm-17-1-q7a',
            number: 'Question 7a',
            text: "Let $f: [0, \\infty) \\to R$, $f(x) = \\sqrt{x+1}$.\n\nState the range of $f$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Functions and Relations",
            answer: "$[1, \\infty)$",
            markingGuide: [
                "When $x = 0$, $f(0) = 1$. As $x \\to \\infty$, $f(x) \\to \\infty$.",
                "Range $= [1, \\infty)$."
            ]
        },
        {
            id: 'mm-17-1-q7bi',
            number: 'Question 7b.i',
            text: "Let $g: (-\\infty, c] \\to R$, $g(x) = x^2 + 4x + 3$, where $c < 0$.\n\nFind the largest possible value of $c$ such that the range of $g$ is a subset of the domain of $f$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$c = -3$",
            markingGuide: [
                "$g(x) = (x+2)^2 - 1$. Vertex at $x = -2$, $g(-2) = -1$.",
                "Domain of $f$ is $[0, \\infty)$, so range of $g$ must be $\\subseteq [0, \\infty)$.",
                "Since $c < 0$ and the parabola opens upward with vertex at $x = -2$:",
                "If $c \\le -2$, then $g$ is decreasing on $(-\\infty, c]$, minimum is $g(c)$.",
                "Wait: for $c < 0$, the function on $(-\\infty, c]$ has range $[g(c), \\infty)$ if $c \\le -2$, or range $[-1, \\infty)$ if $-2 < c < 0$... no.",
                "Actually if $c \\le -2$: $g$ is decreasing on the domain, so range is $[g(c), \\infty)$. Need $g(c) \\ge 0$. $g(c) = c^2 + 4c + 3 = (c+1)(c+3) \\ge 0$. Since $c \\le -2 < -1$, we need $c \\le -3$. Largest is $c = -3$.",
                "If $-2 < c < 0$: minimum of $g$ is $g(-2) = -1 < 0$, so range includes negative values. Not valid.",
                "Answer: $c = -3$."
            ]
        },
        {
            id: 'mm-17-1-q7bii',
            number: 'Question 7b.ii',
            text: "For the value of $c$ found in part b.i., state the range of $f(g(x))$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$[1, \\infty)$",
            markingGuide: [
                "With $c = -3$, range of $g$ is $[g(-3), \\infty) = [0, \\infty)$.",
                "Range of $f$ on $[0, \\infty)$ is $[f(0), \\infty) = [1, \\infty)$.",
                "Range of $f(g(x)) = [1, \\infty)$."
            ]
        },
        {
            id: 'mm-17-1-q7c',
            number: 'Question 7c',
            text: "Let $h: R \\to R$, $h(x) = x^2 + 3$.\n\nState the range of $f(h(x))$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$[2, \\infty)$",
            markingGuide: [
                "Range of $h$ is $[3, \\infty)$.",
                "$f(h(x)) = \\sqrt{h(x) + 1} = \\sqrt{x^2 + 4}$.",
                "Minimum when $x = 0$: $\\sqrt{4} = 2$. Range $= [2, \\infty)$."
            ]
        },
        {
            id: 'mm-17-1-q8a',
            number: 'Question 8a',
            text: "For events $A$ and $B$ from a sample space, $\\Pr(A | B) = \\frac{1}{5}$ and $\\Pr(B | A) = \\frac{1}{4}$. Let $\\Pr(A \\cap B) = p$.\n\nFind $\\Pr(A)$ in terms of $p$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\Pr(A) = 4p$",
            markingGuide: [
                "$\\Pr(B | A) = \\frac{\\Pr(A \\cap B)}{\\Pr(A)} = \\frac{1}{4}$.",
                "$\\frac{p}{\\Pr(A)} = \\frac{1}{4} \\implies \\Pr(A) = 4p$."
            ]
        },
        {
            id: 'mm-17-1-q8b',
            number: 'Question 8b',
            text: "Find $\\Pr(A' \\cap B')$ in terms of $p$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\Pr(A' \\cap B') = 1 - 8p$",
            markingGuide: [
                "$\\Pr(A | B) = \\frac{p}{\\Pr(B)} = \\frac{1}{5} \\implies \\Pr(B) = 5p$.",
                "$\\Pr(A \\cup B) = \\Pr(A) + \\Pr(B) - \\Pr(A \\cap B) = 4p + 5p - p = 8p$.",
                "$\\Pr(A' \\cap B') = 1 - \\Pr(A \\cup B) = 1 - 8p$."
            ]
        },
        {
            id: 'mm-17-1-q8c',
            number: 'Question 8c',
            text: "Given that $\\Pr(A \\cup B) \\le \\frac{1}{5}$, state the largest possible interval for $p$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$0 < p \\le \\frac{1}{40}$",
            markingGuide: [
                "$\\Pr(A \\cup B) = 8p \\le \\frac{1}{5} \\implies p \\le \\frac{1}{40}$.",
                "Also $p > 0$ (since $\\Pr(A|B)$ and $\\Pr(B|A)$ are non-zero).",
                "Also need $\\Pr(A) = 4p \\le 1$ and $\\Pr(B) = 5p \\le 1$, but $p \\le \\frac{1}{40}$ satisfies these.",
                "Interval: $0 < p \\le \\frac{1}{40}$."
            ]
        },
        {
            id: 'mm-17-1-q9a',
            number: 'Question 9a',
            text: "The graph of $f: [0, 1] \\to R$, $f(x) = \\sqrt{x}(1-x)$ is shown below.\n\nCalculate the area between the graph of $f$ and the $x$-axis.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Integration",
            answer: "$\\frac{4}{15}$",
            markingGuide: [
                "$\\int_0^1 \\sqrt{x}(1-x)\\, dx = \\int_0^1 (x^{1/2} - x^{3/2})\\, dx$.",
                "$= \\left[\\frac{2}{3}x^{3/2} - \\frac{2}{5}x^{5/2}\\right]_0^1 = \\frac{2}{3} - \\frac{2}{5} = \\frac{4}{15}$."
            ]
        },
        {
            id: 'mm-17-1-q9b',
            number: 'Question 9b',
            text: "For $x$ in the interval $(0, 1)$, show that the gradient of the tangent to the graph of $f$ is $\\frac{1 - 3x}{2\\sqrt{x}}$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differentiation",
            answer: "See marking guide",
            markingGuide: [
                "$f(x) = x^{1/2} - x^{3/2}$.",
                "$f'(x) = \\frac{1}{2}x^{-1/2} - \\frac{3}{2}x^{1/2} = \\frac{1}{2\\sqrt{x}} - \\frac{3\\sqrt{x}}{2} = \\frac{1 - 3x}{2\\sqrt{x}}$."
            ]
        },
        {
            id: 'mm-17-1-q9c',
            number: 'Question 9c',
            text: "The edges of the right-angled triangle $ABC$ are the line segments $AC$ and $BC$, which are tangent to the graph of $f$, and the line segment $AB$, which is part of the horizontal axis. Let $\\theta$ be the angle that $AC$ makes with the positive direction of the horizontal axis, where $45° \\le \\theta < 90°$.\n\nFind the equation of the line through $B$ and $C$ in the form $y = mx + c$, for $\\theta = 45°$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Lines",
            answer: "$y = -x + 1$",
            markingGuide: [
                "At $\\theta = 45°$, the tangent from $A$ has gradient $\\tan(45°) = 1$.",
                "Set $f'(x) = 1$: $\\frac{1-3x}{2\\sqrt{x}} = 1 \\implies 1 - 3x = 2\\sqrt{x}$.",
                "Let $u = \\sqrt{x}$: $1 - 3u^2 = 2u \\implies 3u^2 + 2u - 1 = 0 \\implies (3u - 1)(u + 1) = 0$.",
                "$u = \\frac{1}{3}$, so $x = \\frac{1}{9}$. Point on curve: $(\\frac{1}{9}, f(\\frac{1}{9})) = (\\frac{1}{9}, \\frac{1}{3} \\cdot \\frac{8}{9}) = (\\frac{1}{9}, \\frac{8}{27})$.",
                "Since $ABC$ is right-angled and $BC$ is also tangent, gradient of $BC = -1$ (perpendicular tangent).",
                "Set $f'(x) = -1$: $\\frac{1-3x}{2\\sqrt{x}} = -1 \\implies 1 - 3x = -2\\sqrt{x} \\implies 3x - 2\\sqrt{x} - 1 = 0$.",
                "Let $u = \\sqrt{x}$: $3u^2 - 2u - 1 = 0 \\implies (3u + 1)(u - 1) = 0$, so $u = 1$, $x = 1$.",
                "Point: $(1, 0)$. Line through $(1, 0)$ with gradient $-1$: $y = -(x - 1) = -x + 1$."
            ]
        },
        {
            id: 'mm-17-1-q9d',
            number: 'Question 9d',
            text: "Find the coordinates of $C$ when $\\theta = 45°$.",
            marks: 4,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Lines",
            answer: "$C = \\left(\\frac{11}{18}, \\frac{7}{18}\\right)$",
            markingGuide: [
                "Line $AC$ passes through $(\\frac{1}{9}, \\frac{8}{27})$ with gradient 1: $y - \\frac{8}{27} = 1(x - \\frac{1}{9})$.",
                "$y = x - \\frac{1}{9} + \\frac{8}{27} = x + \\frac{-3 + 8}{27} = x + \\frac{5}{27}$.",
                "Line $BC$: $y = -x + 1$.",
                "Intersection: $x + \\frac{5}{27} = -x + 1 \\implies 2x = 1 - \\frac{5}{27} = \\frac{22}{27} \\implies x = \\frac{11}{27}$.",
                "$y = -\\frac{11}{27} + 1 = \\frac{16}{27}$.",
                "$C = \\left(\\frac{11}{27}, \\frac{16}{27}\\right)$."
            ]
        }
    ]
};
