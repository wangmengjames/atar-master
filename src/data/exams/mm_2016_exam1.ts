import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2016_EXAM1: ExamPaper = {
    id: 'mm-2016-exam1',
    year: 2016,
    subject: Subject.METHODS,
    title: "Exam 1 (Tech-Free)",
    questions: [
        // =====================================================================
        // Question 1 (4 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q1a',
            number: 'Question 1a',
            text: "Let $y = \\frac{\\cos(x)}{x^2 + 2}$.\n\nFind $\\frac{dy}{dx}$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Quotient Rule",
            answer: "$\\frac{dy}{dx} = \\frac{-\\sin(x)(x^2+2) - 2x\\cos(x)}{(x^2+2)^2}$",
            markingGuide: [
                "Apply quotient rule: $\\frac{dy}{dx} = \\frac{-\\sin(x)(x^2+2) - \\cos(x) \\cdot 2x}{(x^2+2)^2}$.",
                "Simplify: $\\frac{dy}{dx} = \\frac{-(x^2+2)\\sin(x) - 2x\\cos(x)}{(x^2+2)^2}$."
            ]
        },
        {
            id: 'mm-16-1-q1b',
            number: 'Question 1b',
            text: "Let $f(x) = x^2 e^{5x}$.\n\nEvaluate $f'(1)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Product Rule",
            answer: "$f'(1) = 7e^5$",
            markingGuide: [
                "Product rule: $f'(x) = 2xe^{5x} + 5x^2 e^{5x} = xe^{5x}(2 + 5x)$.",
                "Evaluate: $f'(1) = e^5(2 + 5) = 7e^5$."
            ]
        },
        // =====================================================================
        // Question 2 (3 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q2a',
            number: 'Question 2a',
            text: "Let $f : \\left(-\\infty, \\frac{1}{2}\\right] \\to R$, where $f(x) = \\sqrt{1 - 2x}$.\n\nFind $f'(x)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Chain Rule",
            answer: "$f'(x) = \\frac{-1}{\\sqrt{1-2x}}$",
            markingGuide: [
                "$f'(x) = \\frac{1}{2\\sqrt{1-2x}} \\cdot (-2) = \\frac{-1}{\\sqrt{1-2x}}$."
            ]
        },
        {
            id: 'mm-16-1-q2b',
            number: 'Question 2b',
            text: "Find the angle $\\theta$ from the positive direction of the $x$-axis to the tangent to the graph of $f$ at $x = -1$, measured in the anticlockwise direction.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Lines",
            answer: "$\\theta = \\pi - \\arctan\\left(\\frac{1}{\\sqrt{3}}\\right) = \\frac{5\\pi}{6}$",
            markingGuide: [
                "$f'(-1) = \\frac{-1}{\\sqrt{3}}$.",
                "$\\tan(\\theta) = -\\frac{1}{\\sqrt{3}}$, and the gradient is negative, so $\\theta = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$."
            ]
        },
        // =====================================================================
        // Question 3 (5 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q3a',
            number: 'Question 3a',
            text: "Let $f : R \\setminus \\{1\\} \\to R$, where $f(x) = 2 + \\frac{3}{x - 1}$.\n\nSketch the graph of $f$. Label the axis intercepts with their coordinates and label any asymptotes with the appropriate equation.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions",
            answer: "Vertical asymptote: $x = 1$, Horizontal asymptote: $y = 2$, x-intercept: $\\left(-\\frac{1}{2}, 0\\right)$, y-intercept: $(0, -1)$",
            markingGuide: [
                "Vertical asymptote at $x = 1$.",
                "Horizontal asymptote at $y = 2$.",
                "x-intercept: $0 = 2 + \\frac{3}{x-1} \\implies x - 1 = -\\frac{3}{2} \\implies x = -\\frac{1}{2}$. Point $\\left(-\\frac{1}{2}, 0\\right)$.",
                "y-intercept: $f(0) = 2 + \\frac{3}{-1} = -1$. Point $(0, -1)$.",
                "Correct shape: two branches, one in each region divided by $x = 1$."
            ]
        },
        {
            id: 'mm-16-1-q3b',
            number: 'Question 3b',
            text: "Find the area enclosed by the graph of $f$, the lines $x = 2$ and $x = 4$, and the $x$-axis.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Definite Integrals",
            answer: "$4 + 3\\log_e(3)$",
            markingGuide: [
                "$\\int_2^4 \\left(2 + \\frac{3}{x-1}\\right) dx = \\left[2x + 3\\log_e|x-1|\\right]_2^4$.",
                "$= (8 + 3\\log_e 3) - (4 + 3\\log_e 1) = 4 + 3\\log_e(3)$."
            ]
        },
        // =====================================================================
        // Question 4 (3 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q4a',
            number: 'Question 4a',
            text: "A paddock contains 10 tagged sheep and 20 untagged sheep. Four times each day, one sheep is selected at random from the paddock, placed in an observation area and studied, and then returned to the paddock.\n\nWhat is the probability that the number of tagged sheep selected on a given day is zero?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$\\left(\\frac{2}{3}\\right)^4 = \\frac{16}{81}$",
            markingGuide: [
                "$\\Pr(\\text{untagged}) = \\frac{20}{30} = \\frac{2}{3}$. Four independent selections: $\\left(\\frac{2}{3}\\right)^4 = \\frac{16}{81}$."
            ]
        },
        {
            id: 'mm-16-1-q4b',
            number: 'Question 4b',
            text: "What is the probability that at least one tagged sheep is selected on a given day?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Complementary Events",
            answer: "$1 - \\frac{16}{81} = \\frac{65}{81}$",
            markingGuide: [
                "$\\Pr(\\text{at least one tagged}) = 1 - \\Pr(\\text{none tagged}) = 1 - \\frac{16}{81} = \\frac{65}{81}$."
            ]
        },
        {
            id: 'mm-16-1-q4c',
            number: 'Question 4c',
            text: "What is the probability that no tagged sheep are selected on each of six consecutive days?\n\nExpress your answer in the form $\\left(\\frac{a}{b}\\right)^c$, where $a$, $b$ and $c$ are positive integers.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Independent Events",
            answer: "$\\left(\\frac{2}{3}\\right)^{24}$",
            markingGuide: [
                "Each day: $\\left(\\frac{2}{3}\\right)^4$. Six days: $\\left(\\left(\\frac{2}{3}\\right)^4\\right)^6 = \\left(\\frac{2}{3}\\right)^{24}$."
            ]
        },
        // =====================================================================
        // Question 5 (11 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q5ai',
            number: 'Question 5a.i',
            text: "Let $f : (0, \\infty) \\to R$, where $f(x) = \\log_e(x)$ and $g : R \\to R$, where $g(x) = x^2 + 1$.\n\nFind the rule for $h$, where $h(x) = f(g(x))$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Functions",
            answer: "$h(x) = \\log_e(x^2 + 1)$",
            markingGuide: [
                "$h(x) = f(g(x)) = f(x^2+1) = \\log_e(x^2+1)$."
            ]
        },
        {
            id: 'mm-16-1-q5aii',
            number: 'Question 5a.ii',
            text: "State the domain and range of $h$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Domain and Range",
            answer: "Domain: $R$, Range: $[0, \\infty)$",
            markingGuide: [
                "Domain: $R$ (since $x^2 + 1 > 0$ for all $x \\in R$).",
                "Range: $x^2 + 1 \\ge 1$, so $\\log_e(x^2+1) \\ge \\log_e(1) = 0$. Range $= [0, \\infty)$."
            ]
        },
        {
            id: 'mm-16-1-q5aiii',
            number: 'Question 5a.iii',
            text: "Show that $h(x) + h(-x) = f\\left((g(x))^2\\right)$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Function Properties",
            answer: "Proof as shown in marking guide",
            markingGuide: [
                "$h(x) + h(-x) = \\log_e(x^2+1) + \\log_e((-x)^2+1) = \\log_e(x^2+1) + \\log_e(x^2+1) = 2\\log_e(x^2+1) = \\log_e((x^2+1)^2)$.",
                "$f((g(x))^2) = f((x^2+1)^2) = \\log_e((x^2+1)^2)$.",
                "Therefore $h(x) + h(-x) = f((g(x))^2)$."
            ]
        },
        {
            id: 'mm-16-1-q5aiv',
            number: 'Question 5a.iv',
            text: "Find the coordinates of the stationary point of $h$ and state its nature.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Stationary Points",
            answer: "$(0, 0)$ is a local minimum",
            markingGuide: [
                "$h'(x) = \\frac{2x}{x^2+1}$. Set $h'(x) = 0$: $x = 0$.",
                "$h(0) = \\log_e(1) = 0$. So stationary point is $(0, 0)$.",
                "For $x < 0$, $h'(x) < 0$; for $x > 0$, $h'(x) > 0$. So $(0, 0)$ is a local minimum."
            ]
        },
        {
            id: 'mm-16-1-q5bi',
            number: 'Question 5b.i',
            text: "Let $k : (-\\infty, 0] \\to R$, where $k(x) = \\log_e(x^2 + 1)$.\n\nFind the rule for $k^{-1}$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "$k^{-1}(x) = -\\sqrt{e^x - 1}$",
            markingGuide: [
                "Let $y = \\log_e(x^2+1)$. Then $e^y = x^2 + 1$, so $x^2 = e^y - 1$.",
                "Since $x \\le 0$: $x = -\\sqrt{e^y - 1}$.",
                "$k^{-1}(x) = -\\sqrt{e^x - 1}$."
            ]
        },
        {
            id: 'mm-16-1-q5bii',
            number: 'Question 5b.ii',
            text: "State the domain and range of $k^{-1}$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "Domain: $[0, \\infty)$, Range: $(-\\infty, 0]$",
            markingGuide: [
                "Domain of $k^{-1}$ = Range of $k = [0, \\infty)$.",
                "Range of $k^{-1}$ = Domain of $k = (-\\infty, 0]$."
            ]
        },
        // =====================================================================
        // Question 6 (5 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q6a',
            number: 'Question 6a',
            text: "Let $f : [-\\pi, \\pi] \\to R$, where $f(x) = 2\\sin(2x) - 1$.\n\nCalculate the average rate of change of $f$ between $x = -\\frac{\\pi}{3}$ and $x = \\frac{\\pi}{6}$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Average Rate of Change",
            answer: "$\\frac{f(\\pi/6) - f(-\\pi/3)}{\\pi/6 - (-\\pi/3)} = \\frac{0 - (-1 - 1)}{\\pi/2} = \\frac{2}{\\pi/2} = \\frac{4}{\\pi}$",
            markingGuide: [
                "$f\\left(\\frac{\\pi}{6}\\right) = 2\\sin\\left(\\frac{\\pi}{3}\\right) - 1 = 2 \\cdot \\frac{\\sqrt{3}}{2} - 1 = \\sqrt{3} - 1$.",
                "$f\\left(-\\frac{\\pi}{3}\\right) = 2\\sin\\left(-\\frac{2\\pi}{3}\\right) - 1 = 2 \\cdot \\left(-\\frac{\\sqrt{3}}{2}\\right) - 1 = -\\sqrt{3} - 1$.",
                "Average rate $= \\frac{(\\sqrt{3}-1) - (-\\sqrt{3}-1)}{\\frac{\\pi}{6} + \\frac{\\pi}{3}} = \\frac{2\\sqrt{3}}{\\frac{\\pi}{2}} = \\frac{4\\sqrt{3}}{\\pi}$."
            ]
        },
        {
            id: 'mm-16-1-q6b',
            number: 'Question 6b',
            text: "Calculate the average value of $f$ over the interval $-\\frac{\\pi}{3} \\le x \\le \\frac{\\pi}{6}$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Average Value",
            answer: "$\\frac{1}{\\pi/2}\\int_{-\\pi/3}^{\\pi/6}(2\\sin(2x)-1)\\,dx = \\frac{2}{\\pi}\\left(\\frac{1}{2} - \\frac{\\pi}{6}\\right) = \\frac{3 - \\pi}{3\\pi}$",
            markingGuide: [
                "Average value $= \\frac{1}{\\pi/6 - (-\\pi/3)}\\int_{-\\pi/3}^{\\pi/6}(2\\sin(2x)-1)\\,dx = \\frac{2}{\\pi}\\int_{-\\pi/3}^{\\pi/6}(2\\sin(2x)-1)\\,dx$.",
                "$\\int_{-\\pi/3}^{\\pi/6}(2\\sin(2x)-1)\\,dx = \\left[-\\cos(2x) - x\\right]_{-\\pi/3}^{\\pi/6}$.",
                "$= \\left(-\\cos\\frac{\\pi}{3} - \\frac{\\pi}{6}\\right) - \\left(-\\cos\\left(-\\frac{2\\pi}{3}\\right) + \\frac{\\pi}{3}\\right) = \\left(-\\frac{1}{2} - \\frac{\\pi}{6}\\right) - \\left(\\frac{1}{2} + \\frac{\\pi}{3}\\right) = -1 - \\frac{\\pi}{2}$.",
                "Average value $= \\frac{2}{\\pi}\\left(-1 - \\frac{\\pi}{2}\\right) = \\frac{-2}{\\pi} - 1 = -\\frac{2 + \\pi}{\\pi}$."
            ]
        },
        // =====================================================================
        // Question 7 (3 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q7a',
            number: 'Question 7a',
            text: "A company produces motors for refrigerators. There are two assembly lines, Line A and Line B. 5% of the motors assembled on Line A are faulty and 8% of the motors assembled on Line B are faulty. In one hour, 40 motors are produced from Line A and 50 motors are produced from Line B. At the end of an hour, one motor is selected at random from all the motors that have been produced during that hour.\n\nWhat is the probability that the selected motor is faulty? Express your answer in the form $\\frac{1}{b}$, where $b$ is a positive integer.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Conditional Probability",
            answer: "$\\frac{1}{15}$",
            markingGuide: [
                "$\\Pr(\\text{faulty}) = \\frac{40}{90} \\times 0.05 + \\frac{50}{90} \\times 0.08 = \\frac{2}{90} + \\frac{4}{90} = \\frac{6}{90} = \\frac{1}{15}$."
            ]
        },
        {
            id: 'mm-16-1-q7b',
            number: 'Question 7b',
            text: "The selected motor is found to be faulty.\n\nWhat is the probability that it was assembled on Line A? Express your answer in the form $\\frac{1}{c}$, where $c$ is a positive integer.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Bayes' Theorem",
            answer: "$\\frac{1}{3}$",
            markingGuide: [
                "$\\Pr(A | \\text{faulty}) = \\frac{\\Pr(\\text{faulty} \\cap A)}{\\Pr(\\text{faulty})} = \\frac{2/90}{6/90} = \\frac{2}{6} = \\frac{1}{3}$."
            ]
        },
        // =====================================================================
        // Question 8 (6 marks)
        // =====================================================================
        {
            id: 'mm-16-1-q8a',
            number: 'Question 8a',
            text: "Let $X$ be a continuous random variable with probability density function\n\n$f(x) = \\begin{cases} -4x\\log_e(x) & 0 < x \\le 1 \\\\ 0 & \\text{elsewhere} \\end{cases}$\n\nShow by differentiation that $\\frac{x^k}{k^2}(k\\log_e(x) - 1)$ is an antiderivative of $x^{k-1}\\log_e(x)$, where $k$ is a positive real number.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Differentiation",
            answer: "Proof by differentiation as shown in marking guide",
            markingGuide: [
                "Let $F(x) = \\frac{x^k}{k^2}(k\\log_e(x) - 1)$.",
                "$F'(x) = \\frac{kx^{k-1}}{k^2}(k\\log_e(x)-1) + \\frac{x^k}{k^2} \\cdot \\frac{k}{x}$.",
                "$= \\frac{x^{k-1}}{k}(k\\log_e(x)-1) + \\frac{x^{k-1}}{k} = \\frac{x^{k-1}}{k}(k\\log_e(x)-1+1) = x^{k-1}\\log_e(x)$."
            ]
        },
        {
            id: 'mm-16-1-q8bi',
            number: 'Question 8b.i',
            text: "Calculate $\\Pr\\left(X > \\frac{1}{e}\\right)$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$\\frac{2}{e^2}$",
            markingGuide: [
                "$\\Pr\\left(X > \\frac{1}{e}\\right) = \\int_{1/e}^{1} -4x\\log_e(x)\\,dx = -4\\left[\\frac{x^2}{4}\\left(2\\log_e(x) - 1\\right)\\right]_{1/e}^{1}$.",
                "Using the antiderivative with $k=2$: $-4 \\cdot \\frac{x^2}{4}(2\\log_e(x)-1) = -x^2(2\\log_e(x)-1)$.",
                "At $x=1$: $-(1)(0-1) = 1$. At $x=1/e$: $-\\frac{1}{e^2}(-2-1) = \\frac{3}{e^2}$.",
                "$\\Pr = 1 - \\frac{3}{e^2} = \\frac{e^2 - 3}{e^2}$.",
                "Actually: $\\Pr(X > 1/e) = \\int_{1/e}^1 -4x\\log_e(x)\\,dx$. Using $\\int x\\log_e(x)\\,dx = \\frac{x^2}{4}(2\\log_e(x)-1)$.",
                "$= -4\\left[\\frac{x^2}{4}(2\\log_e x - 1)\\right]_{1/e}^1 = -[(2\\cdot 0 - 1) - \\frac{1}{e^2}(-2-1)] = -[-1 + \\frac{3}{e^2}] = 1 - \\frac{3}{e^2} = \\frac{e^2-3}{e^2}$."
            ]
        },
        {
            id: 'mm-16-1-q8bii',
            number: 'Question 8b.ii',
            text: "Hence, explain whether the median of $X$ is greater than or less than $\\frac{1}{e}$, given that $e > \\frac{5}{2}$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Median",
            answer: "The median is greater than $\\frac{1}{e}$",
            markingGuide: [
                "$\\Pr\\left(X > \\frac{1}{e}\\right) = \\frac{e^2-3}{e^2} = 1 - \\frac{3}{e^2}$.",
                "Since $e > \\frac{5}{2}$, $e^2 > \\frac{25}{4}$, so $\\frac{3}{e^2} < \\frac{12}{25} < \\frac{1}{2}$.",
                "Therefore $\\Pr\\left(X > \\frac{1}{e}\\right) > \\frac{1}{2}$, so the median is greater than $\\frac{1}{e}$."
            ]
        },
    ]
};
