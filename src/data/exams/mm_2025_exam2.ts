import { type ExamPaper, Subject, Topic } from "../../types";

export const MM_2025_EXAM2: ExamPaper = {
    id: 'mm-2025-exam2',
    year: 2025,
    subject: Subject.METHODS,
    title: "Exam 2 (Tech-Active)",
    questions: [
        // =====================================================================
        // SECTION A: Multiple Choice (20 Questions, 20 marks)
        // =====================================================================
        {
            id: 'mm-25-2-mc1',
            number: 'Question 1',
            text: "A function that has a range of $[6, 12]$ is",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Trig Functions",
            answer: "C",
            markingGuide: ["Range $[6, 12]$: mean $= 9$, amplitude $= 3$. $9 - 3\\cos(6x)$ has range $[9-3, 9+3] = [6, 12]$."],
            options: [
                { label: "A", text: "$f: R \\to R, f(x) = 6 + 3\\cos(9x)$" },
                { label: "B", text: "$f: R \\to R, f(x) = 6 + 6\\cos(3x)$" },
                { label: "C", text: "$f: R \\to R, f(x) = 9 - 3\\cos(6x)$" },
                { label: "D", text: "$f: R \\to R, f(x) = 9 - 6\\cos(3x)$" }
            ]
        },
        {
            id: 'mm-25-2-mc2',
            number: 'Question 2',
            text: "All asymptotes of the graph of $y = 2\\tan\\left(\\pi\\left(x+\\frac{1}{2}\\right)\\right)$ are given by",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Trig Asymptotes",
            answer: "A",
            markingGuide: ["Period is $1$. Asymptotes of $\\tan(\\theta)$ at $\\theta = \\frac{\\pi}{2} + n\\pi$. So $\\pi(x+\\frac{1}{2}) = \\frac{\\pi}{2} + n\\pi \\implies x = n$, i.e. $x = k, k \\in Z$."],
            options: [
                { label: "A", text: "$x = k, k \\in Z$" },
                { label: "B", text: "$x = 2k, k \\in Z$" },
                { label: "C", text: "$x = 2k+1, k \\in Z$" },
                { label: "D", text: "$x = \\frac{4k+1}{2}, k \\in Z$" }
            ]
        },
        {
            id: 'mm-25-2-mc3',
            number: 'Question 3',
            text: "The graph of $y = f(x)$ is shown. Which one of the following options best represents the graph of $y = f(-x) + 2$?",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "B",
            markingGuide: ["Reflect in $y$-axis, then translate $2$ units up."],
            options: [
                { label: "A", text: "Graph A" },
                { label: "B", text: "Graph B" },
                { label: "C", text: "Graph C" },
                { label: "D", text: "Graph D" }
            ]
        },
        {
            id: 'mm-25-2-mc4',
            number: 'Question 4',
            text: "Consider the system of equations $kx + 3y = k^2$ and $2x + (2k+1)y = 6-2k$, where $k \\in R$.\n\nFind the value(s) of $k$ for which this system has no real solutions.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Simultaneous Equations",
            answer: "A",
            markingGuide: [
                "Determinant $\\Delta = k(2k+1) - 6 = 2k^2 + k - 6 = (2k-3)(k+2) = 0$ when $k = \\frac{3}{2}$ or $k = -2$.",
                "$k = -2$: equations become $-2x+3y=4$ and $2x-3y=10$ (parallel, no solution).",
                "$k = \\frac{3}{2}$: equations are consistent (infinite solutions).",
                "So no solutions only when $k = -2$."
            ],
            options: [
                { label: "A", text: "$k = -2$ only" },
                { label: "B", text: "$k = \\frac{3}{2}$ only" },
                { label: "C", text: "$k = -2$ or $\\frac{3}{2}$" },
                { label: "D", text: "$k \\in R \\setminus \\{-2, \\frac{3}{2}\\}$" }
            ]
        },
        {
            id: 'mm-25-2-mc5',
            number: 'Question 5',
            text: "Which of the following sets represents a function that has an inverse function?",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "B",
            markingGuide: ["Must be a one-to-one function. B: $\\{(-1, 3), (2, 2), (3, 1)\\}$ is a function with no repeated $y$-values, hence one-to-one."],
            options: [
                { label: "A", text: "$\\{(1, 3), (2, 0), (2, 1)\\}$" },
                { label: "B", text: "$\\{(-1, 3), (2, 2), (3, 1)\\}$" },
                { label: "C", text: "$\\{(-1, 3), (0, 1), (1, 3)\\}$" },
                { label: "D", text: "$\\{(1, 0), (2, 3), (1, 3)\\}$" }
            ]
        },
        {
            id: 'mm-25-2-mc6',
            number: 'Question 6',
            text: "The trapezium rule is used, with two trapeziums, to estimate the area bounded by the graph of $y = f(x)$, the $x$-axis and the lines $x = 0$ and $x = 1$.\n\nFor which function will the trapezium rule estimate be larger than the exact area?",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Trapezium Rule",
            answer: "B",
            markingGuide: ["Trapezium rule overestimates when the graph is concave up ($f''(x) > 0$). $f(x) = x^3 + 1$ is concave up for $x > 0$."],
            options: [
                { label: "A", text: "$f(x) = 3 - e^x$" },
                { label: "B", text: "$f(x) = x^3 + 1$" },
                { label: "C", text: "$f(x) = 3\\sin(x) + 1$" },
                { label: "D", text: "$f(x) = \\log_e(x+3)$" }
            ]
        },
        {
            id: 'mm-25-2-mc7',
            number: 'Question 7',
            text: "Consider the algorithm below.\n\n$n \\leftarrow 17$\n$k \\leftarrow 5$\n**while** $n > k$\n$\\quad n \\leftarrow n - k$\n$\\quad$**print** $n$\n**end while**\n\nIn order, the values printed by the algorithm are",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Algorithms",
            answer: "C",
            markingGuide: ["$17>5$: $n=12$, print $12$. $12>5$: $n=7$, print $7$. $7>5$: $n=2$, print $2$. $2 \\not> 5$: stop."],
            options: [
                { label: "A", text: "$12$" },
                { label: "B", text: "$12, 7$" },
                { label: "C", text: "$12, 7, 2$" },
                { label: "D", text: "$12, 7, 2, -3$" }
            ]
        },
        {
            id: 'mm-25-2-mc8',
            number: 'Question 8',
            text: "A random sample of $n$ Victorian households is taken to estimate the proportion of all Victorian households that have vegetable gardens. The approximate 95% confidence interval calculated using this sample is $(0.248, 0.552)$, correct to three decimal places.\n\nThe number of households, $n$, in the sample is",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Confidence Intervals",
            answer: "C",
            markingGuide: [
                "$\\hat{p} = \\frac{0.248 + 0.552}{2} = 0.4$, margin $= 0.152$.",
                "$1.96\\sqrt{\\frac{0.4 \\times 0.6}{n}} = 0.152$. Solving: $n = 40$."
            ],
            options: [
                { label: "A", text: "$10$" },
                { label: "B", text: "$28$" },
                { label: "C", text: "$40$" },
                { label: "D", text: "$49$" }
            ]
        },
        {
            id: 'mm-25-2-mc9',
            number: 'Question 9',
            text: "One day, at a particular school, $m$ students walked to school and the remaining $n$ students travelled to school using a different form of transport.\n\nOf the $m$ students who walked, 20% took at least 30 minutes to get to school.\nOf the $n$ students who used a different form of transport, 40% took at least 30 minutes to get to school.\n\nGiven that a randomly selected student took at least 30 minutes to get to school, the probability that they walked to school is given by",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Bayes Theorem",
            answer: "A",
            markingGuide: ["$\\frac{0.2m}{0.2m + 0.4n} = \\frac{m}{m + 2n}$."],
            options: [
                { label: "A", text: "$\\frac{m}{m+2n}$" },
                { label: "B", text: "$\\frac{2n}{m+2n}$" },
                { label: "C", text: "$\\frac{m}{5(m+n)}$" },
                { label: "D", text: "$\\frac{1}{3}$" }
            ]
        },
        {
            id: 'mm-25-2-mc10',
            number: 'Question 10',
            text: "Consider $f: R \\to R, f(x) = 2x^2 + x - 1$ and $g: R \\to R, g(x) = \\sin(x)$.\n\nThe inequality $(f \\circ g)(x) > 0$ is satisfied when",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Inequalities",
            answer: "C",
            markingGuide: [
                "$2\\sin^2(x) + \\sin(x) - 1 > 0$.",
                "$(2\\sin(x) - 1)(\\sin(x) + 1) > 0$.",
                "$\\sin(x) > \\frac{1}{2}$ or $\\sin(x) < -1$ (impossible).",
                "So $\\frac{1}{2} < \\sin(x) \\le 1$."
            ],
            options: [
                { label: "A", text: "$\\sin(x) \\le -1$" },
                { label: "B", text: "$-1 < \\sin(x) < 0$" },
                { label: "C", text: "$\\frac{1}{2} < \\sin(x) \\le 1$" },
                { label: "D", text: "$0 < \\sin(x) < \\frac{1}{2}$" }
            ]
        },
        {
            id: 'mm-25-2-mc11',
            number: 'Question 11',
            text: "The chart below shows the daily price of a stock market share over a 30-day period.\n\nOver which of the following time intervals did the daily price undergo the greatest average rate of change?",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Rates of Change",
            answer: "D",
            markingGuide: ["Use a ruler to draw line segments for each option. Day 14 to day 28 has the steepest positive slope, hence the greatest average rate of change."],
            options: [
                { label: "A", text: "day 3 to day 10" },
                { label: "B", text: "day 3 to day 17" },
                { label: "C", text: "day 14 to day 21" },
                { label: "D", text: "day 14 to day 28" }
            ]
        },
        {
            id: 'mm-25-2-mc12',
            number: 'Question 12',
            text: "For a normal random variable $X$, it is known that $\\Pr(X > 200) = 0.325$ and $\\Pr(180 < X < 200) = 0.589$.\n\nThe mean and standard deviation of $X$ are closest to",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Normal Distribution",
            answer: "D",
            markingGuide: [
                "$\\Pr(X < 180) = 1 - 0.325 - 0.589 = 0.086$.",
                "Using inverse normal: mean $\\approx 195$, standard deviation $\\approx 11$."
            ],
            options: [
                { label: "A", text: "$190$ and $10$" },
                { label: "B", text: "$190$ and $11$" },
                { label: "C", text: "$195$ and $10$" },
                { label: "D", text: "$195$ and $11$" }
            ]
        },
        {
            id: 'mm-25-2-mc13',
            number: 'Question 13',
            text: "The graphs of $y = f(x)$ and $y = g(x)$ are sketched on the same set of axes.\n\nWhich of the following could be the graph of $y = (g \\circ f)(x)$?",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Composite Graphs",
            answer: "C",
            markingGuide: ["Analyze domain/range mappings through both functions. Option C reflects the correct composite behaviour."],
            options: [
                { label: "A", text: "Graph A" },
                { label: "B", text: "Graph B" },
                { label: "C", text: "Graph C" },
                { label: "D", text: "Graph D" }
            ]
        },
        {
            id: 'mm-25-2-mc14',
            number: 'Question 14',
            text: "Let $f$ be the probability density function for a continuous random variable $X$, where\n\n$f(x) = \\begin{cases} k\\sin(x) & 0 \\le x < \\frac{\\pi}{4} \\\\ k\\cos(x) & \\frac{\\pi}{4} \\le x \\le \\frac{\\pi}{2} \\\\ 0 & \\text{otherwise} \\end{cases}$\n\nand $k$ is a positive real number.\n\nThe value of $k$ is",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous PDF",
            answer: "B",
            markingGuide: [
                "$\\int_0^{\\pi/4} k\\sin(x)\\,dx + \\int_{\\pi/4}^{\\pi/2} k\\cos(x)\\,dx = 1$.",
                "$k[-\\cos(x)]_0^{\\pi/4} + k[\\sin(x)]_{\\pi/4}^{\\pi/2} = 1$.",
                "$k(1 - \\frac{1}{\\sqrt{2}}) + k(1 - \\frac{1}{\\sqrt{2}}) = 1$.",
                "$2k(1 - \\frac{1}{\\sqrt{2}}) = 1 \\implies k = \\frac{1}{2 - \\sqrt{2}}$."
            ],
            options: [
                { label: "A", text: "$\\frac{1}{\\sqrt{2}}$" },
                { label: "B", text: "$\\frac{1}{2 - \\sqrt{2}}$" },
                { label: "C", text: "$\\sqrt{2} + 2$" },
                { label: "D", text: "$2 - \\sqrt{2}$" }
            ]
        },
        {
            id: 'mm-25-2-mc15',
            number: 'Question 15',
            text: "The graph of $y = g(x)$ passes through the point $(1, 3)$.\n\nThe graph of $y = 1 - g(2x - 3)$ must pass through the point",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "B",
            markingGuide: [
                "Need $2x - 3 = 1 \\implies x = 2$.",
                "$y = 1 - g(1) = 1 - 3 = -2$.",
                "Point is $(2, -2)$."
            ],
            options: [
                { label: "A", text: "$(-1, -2)$" },
                { label: "B", text: "$(2, -2)$" },
                { label: "C", text: "$(-1, 2)$" },
                { label: "D", text: "$(2, 2)$" }
            ]
        },
        {
            id: 'mm-25-2-mc16',
            number: 'Question 16',
            text: "Consider the function $h(x) = a\\log_e(bx)$, where $a, b \\in R \\setminus \\{0\\}$.\n\nGiven that its derivative $h'(x)$ has range $(0, \\infty)$, which of the following **must** be true?",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Derivatives",
            answer: "D",
            markingGuide: [
                "$h'(x) = \\frac{a}{x}$. Range $(0, \\infty)$ requires:",
                "If $b > 0$: domain $x > 0$, need $a > 0$, so $ab > 0$.",
                "If $b < 0$: domain $x < 0$, need $a < 0$, so $ab > 0$.",
                "In both cases $ab > 0$."
            ],
            options: [
                { label: "A", text: "$a > 0$ only" },
                { label: "B", text: "$a > 0$ and $b < 0$" },
                { label: "C", text: "$a > 0$ and $b > 0$" },
                { label: "D", text: "$ab > 0$" }
            ]
        },
        {
            id: 'mm-25-2-mc17',
            number: 'Question 17',
            text: "Given that $f: R \\to R$ satisfies $\\int_1^2 f(x)\\,dx > \\int_1^3 f(x)\\,dx$, the graph of $y = f(x)$ could be",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Integral Properties",
            answer: "A",
            markingGuide: [
                "$\\int_1^2 f(x)\\,dx > \\int_1^3 f(x)\\,dx \\implies \\int_2^3 f(x)\\,dx < 0$.",
                "Need net signed area on $[2, 3]$ to be negative. Option A is the only graph where this holds."
            ],
            options: [
                { label: "A", text: "Graph A" },
                { label: "B", text: "Graph B" },
                { label: "C", text: "Graph C" },
                { label: "D", text: "Graph D" }
            ]
        },
        {
            id: 'mm-25-2-mc18',
            number: 'Question 18',
            text: "Consider the following graphs, which represent probability mass functions.\n\nWhich pair of these probability mass functions has the same mean?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Mean Calculation",
            answer: "D",
            markingGuide: ["Calculate $E(X) = \\sum x \\cdot p(x)$ for each graph. Probability mass functions II and IV both have a mean equal to $3$."],
            options: [
                { label: "A", text: "I and II" },
                { label: "B", text: "I and IV" },
                { label: "C", text: "II and III" },
                { label: "D", text: "II and IV" }
            ]
        },
        {
            id: 'mm-25-2-mc19',
            number: 'Question 19',
            text: "Let $A$ be a point on the line $y = x + c$ and $B$ be a point on the curve $y = \\log_e(x - 1)$.\n\nIf $A$ and $B$ are placed such that the line segment $AB$ has the minimum possible length, and this length is $\\sqrt{2}$, the value of $c$ must be",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Min Distance",
            answer: "D",
            markingGuide: [
                "At point $B$, the gradient of the curve must equal $1$ (parallel to line).",
                "$\\frac{1}{x-1} = 1 \\implies x = 2$, $y = 0$. Point $B = (2, 0)$.",
                "Distance from $(2, 0)$ to line $x - y + c = 0$: $\\frac{|2 + c|}{\\sqrt{2}} = \\sqrt{2}$.",
                "$|2 + c| = 2 \\implies c = 0$ or $c = -4$.",
                "Only $c = 0$ gives the line above the curve (valid minimum)."
            ],
            options: [
                { label: "A", text: "$\\sqrt{2} - 2$" },
                { label: "B", text: "$\\sqrt{2}$" },
                { label: "C", text: "$1$" },
                { label: "D", text: "$0$" }
            ]
        },
        {
            id: 'mm-25-2-mc20',
            number: 'Question 20',
            text: "Let $a > 1$, and consider the functions $f: R \\to R, f(x) = a^x$ and $g: R \\to R, g(x) = a^{2x+2}$.\n\nWhich one of the following sequences of transformations, when applied to $f(x)$, does **not** produce $g(x)$?",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "C",
            markingGuide: [
                "$g(x) = a^{2x+2} = a^{2(x+1)}$.",
                "Option C: dilation by factor $a$ from $x$-axis, then dilation by factor $\\frac{1}{2}$ from $y$-axis, then translation 1 unit right gives $a \\cdot a^{2(x-1)} = a^{2x-1}$, not $a^{2x+2}$."
            ],
            options: [
                { label: "A", text: "dilation by a factor of $\\frac{1}{2}$ from the $y$-axis, then translation by $1$ unit in the negative direction of the $x$-axis" },
                { label: "B", text: "dilation by a factor of $\\frac{1}{2}$ from the $y$-axis, then dilation by a factor of $a^2$ from the $x$-axis" },
                { label: "C", text: "dilation by a factor of $a$ from the $x$-axis, then dilation by a factor of $\\frac{1}{2}$ from the $y$-axis, then translation by $1$ unit in the positive direction of the $x$-axis" },
                { label: "D", text: "dilation by a factor of $a^3$ from the $x$-axis, then translation by $1$ unit in the positive direction of the $x$-axis, then dilation by a factor of $\\frac{1}{2}$ from the $y$-axis" }
            ]
        },

        // =====================================================================
        // SECTION B: Extended Response
        // =====================================================================

        // --- Question 1 (13 marks) ---
        {
            id: 'mm-25-2-q1a',
            number: 'Question 1a',
            text: "Let $g: R \\to R$ be defined by $g(x) = 4x^3 - 3x^4$.\n\nFind the coordinates of both stationary points of $g$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Stationary Points",
            answer: "$(0, 0)$ and $(1, 1)$",
            markingGuide: [
                "$g'(x) = 12x^2 - 12x^3 = 12x^2(1 - x) = 0$.",
                "$x = 0$ or $x = 1$.",
                "A – $(0, 0)$. A – $(1, 1)$. (2 correct $x$-values earns 1 mark.)"
            ]
        },
        {
            id: 'mm-25-2-q1b',
            number: 'Question 1b',
            text: "Sketch the graph of $y = g(x)$ on the axes below, labelling the stationary points and axial intercepts with their coordinates.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Graph Sketching",
            answer: "Quartic with stationary inflection at $(0, 0)$, local max at $(1, 1)$, $x$-intercepts at $(0, 0)$ and $(\\frac{4}{3}, 0)$",
            markingGuide: [
                "A – intercepts $(0, 0)$ and $(\\frac{4}{3}, 0)$ labelled.",
                "A – local max at $(1, 1)$ and correct graph shape."
            ]
        },
        {
            id: 'mm-25-2-q1c',
            number: 'Question 1c',
            text: "Complete the following gradient table with appropriate values of $x$ and $g'(x)$ to show that $g$ has a stationary point of inflection.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Nature of Stationary Points",
            answer: "Table showing $g'(x) > 0$ either side of $x = 0$, e.g. $g'(-1) = -24 < 0$... (corrected: need positive either side). E.g. $x = -1$: $g'(-1) = 12+12 = 24 > 0$; $x = 0$: $g'(0) = 0$; $x = 0.5$: $g'(0.5) = 12(0.25)(0.5) = 1.5 > 0$",
            markingGuide: [
                "A – middle column has $x = 0$ and $g'(0) = 0$.",
                "A – left column has a negative $x$-value with positive gradient, right column has $x \\in (0, 1)$ with positive gradient."
            ]
        },
        {
            id: 'mm-25-2-q1d',
            number: 'Question 1d',
            text: "Find the average value of $g$ between $x = 0$ and $x = 2$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Average Value",
            answer: "$-\\frac{8}{5}$",
            markingGuide: [
                "M – $\\frac{1}{2}\\int_0^2 (4x^3 - 3x^4)\\,dx$, allow missing $dx$.",
                "$= \\frac{1}{2}\\left[x^4 - \\frac{3x^5}{5}\\right]_0^2 = \\frac{1}{2}\\left(16 - \\frac{96}{5}\\right) = \\frac{1}{2} \\cdot \\left(-\\frac{16}{5}\\right) = -\\frac{8}{5}$.",
                "A – $-\\frac{8}{5}$."
            ]
        },
        {
            id: 'mm-25-2-q1e',
            number: 'Question 1e',
            text: "Let $h$ be the result after applying a sequence of transformations to $g$, such that $h$ has a stationary point of inflection at $(1, 0)$ and a local maximum at $(-1, 1)$.\n\nWrite down a possible sequence of three transformations to map from $g$ to $h$.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Transformations",
            answer: "e.g. Reflect in $y$-axis, dilate by factor 2 from $y$-axis, translate 1 unit right",
            markingGuide: [
                "A – reflect in $y$-axis (anywhere in sequence).",
                "A – dilate by factor 2 from $y$-axis (anywhere in sequence).",
                "A – 3 correct transformations in a correct order. Multiple valid sequences exist."
            ]
        },
        {
            id: 'mm-25-2-q1f',
            number: 'Question 1f',
            text: "Let $X \\sim \\text{Bi}(4, p)$ be a binomial random variable.\n\nShow that $\\Pr(X \\ge 3) = g(p)$ for all $p \\in [0, 1]$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$\\Pr(X \\ge 3) = 4p^3(1-p) + p^4 = 4p^3 - 3p^4 = g(p)$",
            markingGuide: [
                "M – evidence of binomial formula with either $\\binom{4}{3}p^3(1-p)$ or $\\binom{4}{4}p^4$.",
                "M – complete algebraic working to show that $\\Pr(X \\ge 3) = 4p^3 - 3p^4 = g(p)$."
            ]
        },

        // --- Question 2 (14 marks) ---
        {
            id: 'mm-25-2-q2a',
            number: 'Question 2a',
            text: "Let $f: R \\to R, f(x) = \\frac{x}{2} + 7$ and $g: R \\to R, g(x) = Ae^{kx}$, where $A, k \\in R$.\n\nThe graphs of $y = f(x)$ and $y = g(x)$ intersect at the points $(-12, 1)$ and $(2, 8)$.\n\nWrite down two simultaneous equations in terms of $A$ and $k$. Solve them, using algebra, to show that $A = 2^{18/7}$ and $k = \\frac{3}{14}\\log_e(2)$.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Exponentials",
            answer: "$A = 2^{18/7}$ and $k = \\frac{3}{14}\\log_e(2)$",
            markingGuide: [
                "A – simultaneous equations: $1 = Ae^{-12k}$ and $8 = Ae^{2k}$.",
                "M – divide: $8 = e^{14k} \\implies k = \\frac{\\ln 8}{14} = \\frac{3\\ln 2}{14}$.",
                "M – substitute back and correct algebraic working to find $A = 2^{18/7}$."
            ]
        },
        {
            id: 'mm-25-2-q2b',
            number: 'Question 2b',
            text: "Find the value of $b$, where $b \\in R$, such that $g(x)$ can be expressed in the form $g(x) = A \\times 2^{bx}$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Exponentials",
            answer: "$b = \\frac{3}{14}$",
            markingGuide: [
                "$e^{kx} = e^{\\frac{3\\ln 2}{14}x} = 2^{\\frac{3x}{14}}$. So $b = \\frac{3}{14}$.",
                "A – $\\frac{3}{14}$ (accept $\\frac{3}{14}$)."
            ]
        },
        {
            id: 'mm-25-2-q2c',
            number: 'Question 2c',
            text: "Use a definite integral to evaluate the area bounded by the graphs of $y = f(x)$ and $y = g(x)$, where $x \\in [-12, 2]$.\n\nGive the area correct to two decimal places.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Area Between Curves",
            answer: "$15.87$",
            markingGuide: [
                "M – correct method involving definite integral, allow missing $dx$.",
                "A – $15.8719\\ldots \\approx 15.87$."
            ]
        },
        {
            id: 'mm-25-2-q2di',
            number: 'Question 2d.i',
            text: "Let $h(x) = f(x) - g(x)$.\n\nWrite down an expression for the derivative of $h(x)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Derivatives",
            answer: "$h'(x) = \\frac{1}{2} - Ake^{kx}$",
            markingGuide: [
                "A – $\\frac{1}{2} - Ake^{kx}$ or equivalent forms."
            ]
        },
        {
            id: 'mm-25-2-q2dii',
            number: 'Question 2d.ii',
            text: "Find the maximum value of $h(x)$, where $x \\in [-12, 2]$.\n\nGive your answer correct to two decimal places.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Optimization",
            answer: "$1.72$",
            markingGuide: [
                "A – $1.71974\\ldots \\approx 1.72$."
            ]
        },
        {
            id: 'mm-25-2-q2e',
            number: 'Question 2e',
            text: "Let $g^{-1}$ be the inverse of $g$.\n\nFind the points where the graph of $y = g^{-1}(x)$ intersects with the graph of $y = 2(x - 7)$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Inverse Functions",
            answer: "$(1, -12)$ and $(8, 2)$",
            markingGuide: [
                "M – recognise that $y = 2(x-7)$ is the inverse of $f(x)$, or find the rule for $g^{-1}$.",
                "Intersections of $g^{-1}$ and $f^{-1}$ correspond to reflections of original intersections across $y = x$.",
                "A – both points $(1, -12)$ and $(8, 2)$."
            ]
        },
        {
            id: 'mm-25-2-q2fi',
            number: 'Question 2f.i',
            text: "Let $F$ be an anti-derivative of $f$ that passes through $(0, c)$, where $c \\in R$.\n\nShow that it is **not** possible for the graph of $y = F(x)$ to pass through both $(-12, 1)$ and $(2, 8)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Antidifferentiation",
            answer: "See marking guide",
            markingGuide: [
                "$F(x) = \\frac{x^2}{4} + 7x + c$.",
                "M – find general antiderivative and attempt to find one value of $c$.",
                "Using $(-12, 1)$: $36 - 84 + c = 1 \\implies c = 49$. Then $F(2) = 1 + 14 + 49 = 64 \\ne 8$.",
                "M – justification that no antiderivative passes through both points."
            ]
        },
        {
            id: 'mm-25-2-q2fii',
            number: 'Question 2f.ii',
            text: "The graph of $y = F(x)$ can be dilated by a factor of $m$ from the $x$-axis such that its image passes through both $(-12, 1)$ and $(2, 8)$.\n\nFind the values of $m$ and $c$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Antidifferentiation",
            answer: "$m = \\frac{1}{8}, c = 8$",
            markingGuide: [
                "M – simultaneous equations with $mF(x)$: $m(36 - 84 + c) = 1$ and $m(1 + 14 + c) = 8$.",
                "A – $m = \\frac{1}{8}$ and $c = 8$."
            ]
        },

        // --- Question 3 (14 marks) ---
        {
            id: 'mm-25-2-q3ai',
            number: 'Question 3a.i',
            text: "The time taken for a driver to travel to work each day, in minutes, is modelled by a continuous random variable $T$ with probability density function\n\n$f(t) = \\begin{cases} \\frac{1}{1215000}(t-29)(59-t)^3 & 29 \\le t \\le 59 \\\\ 0 & \\text{otherwise} \\end{cases}$\n\nFind the mean time taken, in minutes, for the driver to travel to work each day.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$39$",
            markingGuide: [
                "A – $39$ (minutes)."
            ]
        },
        {
            id: 'mm-25-2-q3aii',
            number: 'Question 3a.ii',
            text: "Find the standard deviation of the time taken, in minutes, for the driver to travel to work each day.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$\\frac{10\\sqrt{2}}{\\sqrt{7}}$ or equivalent ($\\approx 5.35$)",
            markingGuide: [
                "C – either correct formula with their mean from 3a.i.",
                "A – exact form, e.g. $\\frac{10\\sqrt{2}}{\\sqrt{7}}$ or equivalent. ($5.34\\ldots$ or variance only earns 1 mark.)"
            ]
        },
        {
            id: 'mm-25-2-q3bi',
            number: 'Question 3b.i',
            text: "The driver allows $k$ minutes to travel to work each day. If the journey takes longer than $k$ minutes, the driver will be late. Whether the driver is late on a particular day is independent of whether they are late on any other day.\n\nIf $k = 47$, write a definite integral to show that the probability of the driver being late is $0.08704$.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$\\int_{47}^{59} \\frac{1}{1215000}(t-29)(59-t)^3\\,dt = 0.08704$",
            markingGuide: [
                "A – $\\int_{47}^{59} f(t)\\,dt$ or $\\int_{47}^{59} \\frac{1}{1215000}(t-29)(59-t)^3\\,dt$."
            ]
        },
        {
            id: 'mm-25-2-q3bii',
            number: 'Question 3b.ii',
            text: "If $k = 47$, find the probability that the driver will be late on at least one day in a five-day working week.\n\nGive your answer correct to four decimal places.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$0.3658$",
            markingGuide: [
                "Let $p = 0.08704$. $\\Pr(\\text{at least one late}) = 1 - (1 - p)^5$.",
                "M – either method (binomial or complement).",
                "A – $0.365752\\ldots \\approx 0.3658$."
            ]
        },
        {
            id: 'mm-25-2-q3biii',
            number: 'Question 3b.iii',
            text: "For $k = 47$, let $\\hat{P}$ be the proportion of days the driver is late in any five-day working week.\n\nFind $\\Pr(0.4 \\le \\hat{P} \\le 0.6)$ correct to four decimal places.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Binomial Distribution",
            answer: "$0.0631$",
            markingGuide: [
                "$\\hat{P} \\in \\{0, 0.2, 0.4, 0.6, 0.8, 1\\}$. Need $\\hat{P} = 0.4$ (2 late) or $\\hat{P} = 0.6$ (3 late).",
                "M – seeing $\\Pr(X = 2) + \\Pr(X = 3)$ where $X \\sim \\text{Bi}(5, 0.08704)$.",
                "A – $0.063145\\ldots \\approx 0.0631$."
            ]
        },
        {
            id: 'mm-25-2-q3biv',
            number: 'Question 3b.iv',
            text: "Find the **integer** $k$ such that the probability, correct to one decimal place, of the driver being late at least once in any five-day working week is $0.2$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$k = 49$",
            markingGuide: [
                "M – setting up $1 - (1 - p)^5 = 0.2$ in terms of $p$ or $k$, or finding the correct $p$ value.",
                "$1 - (1-p)^5 = 0.2 \\implies p = 1 - 0.8^{1/5} \\approx 0.04365$.",
                "Then solve $\\int_k^{59} f(t)\\,dt = 0.04365$ for integer $k$.",
                "A – $k = 49$."
            ]
        },
        {
            id: 'mm-25-2-q3ci',
            number: 'Question 3c.i',
            text: "At a given traffic light, the wait time is modelled by a normal distribution with a mean of 2.5 minutes and a standard deviation of $\\sigma$ minutes.\n\nIf $\\sigma = 0.6$, find the probability that the wait time will be less than 3.5 minutes.\n\nGive your answer correct to two decimal places.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Normal Distribution",
            answer: "$0.95$",
            markingGuide: [
                "A – $0.9522\\ldots \\approx 0.95$."
            ]
        },
        {
            id: 'mm-25-2-q3cii',
            number: 'Question 3c.ii',
            text: "Find the value of $\\sigma$ such that there is a 2% chance of a wait time longer than 3.5 minutes.\n\nGive your answer correct to two decimal places.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Normal Distribution",
            answer: "$0.49$",
            markingGuide: [
                "A – $0.4869\\ldots \\approx 0.49$."
            ]
        },
        {
            id: 'mm-25-2-q3d',
            number: 'Question 3d',
            text: "The driver passes through three traffic lights ($A$, $B$ and $C$) on their journey to work. The probability of each traffic light being red is shown in the table below.\n\n| Traffic light | $A$ | $B$ | $C$ |\n|---|---|---|---|\n| Probability that the traffic light is red | $0.2$ | $0.3$ | $0.1$ |\n\nLet $Y$ be the random variable representing the number of traffic lights that are red on the driver's journey to work. Assume that each traffic light being red is independent of any other traffic light being red.\n\nComplete the following table for the probability distribution of $Y$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Discrete Distributions",
            answer: "$\\Pr(Y=0) = 0.504$, $\\Pr(Y=1) = 0.398$, $\\Pr(Y=2) = 0.092$, $\\Pr(Y=3) = 0.006$",
            markingGuide: [
                "A – at least two correct.",
                "A – all correct (accept equivalent fractions or exact decimals $0.504$, $0.398$, $0.092$, $0.006$)."
            ]
        },

        // --- Question 4 (19 marks) ---
        {
            id: 'mm-25-2-q4a',
            number: 'Question 4a',
            text: "Consider the function $f: \\left[0, \\frac{5\\pi}{2}\\right] \\to R, f(x) = \\sin(x) + 1$.\n\nEvaluate $f\\left(\\frac{2\\pi}{3}\\right)$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$\\frac{\\sqrt{3}}{2} + 1 = \\frac{2 + \\sqrt{3}}{2}$",
            markingGuide: [
                "A – $\\frac{\\sqrt{3}}{2} + 1$ or equivalent forms."
            ]
        },
        {
            id: 'mm-25-2-q4b',
            number: 'Question 4b',
            text: "Find the exact values of $x$ for which $f(x) = \\frac{3}{2}$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{13\\pi}{6}$",
            markingGuide: [
                "$\\sin(x) = \\frac{1}{2}$, $x \\in [0, \\frac{5\\pi}{2}]$.",
                "A – $x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{13\\pi}{6}$."
            ]
        },
        {
            id: 'mm-25-2-q4c',
            number: 'Question 4c',
            text: "There exist real numbers $a$ and $k$ in the interval $\\left(0, \\frac{5\\pi}{2}\\right)$, such that $f(x+k) = f(x)$ for all $x \\in [0, a]$.\n\nFind the value of $k$ and the largest possible value of $a$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Circular Functions",
            answer: "$k = 2\\pi$, $a = \\frac{\\pi}{2}$",
            markingGuide: [
                "A – $k = 2\\pi$ (period of $\\sin$).",
                "A – $a = \\frac{\\pi}{2}$ (largest $a$ such that $[0, a]$ and $[k, a+k]$ both within domain)."
            ]
        },
        {
            id: 'mm-25-2-q4d',
            number: 'Question 4d',
            text: "Consider the tangent to the graph of $y = f(x)$ at the point $A$ where $x = \\frac{2\\pi}{3}$.\n\nFind the equation of the tangent to the graph of $y = f(x)$ at the point where $x = \\frac{2\\pi}{3}$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Lines",
            answer: "$y = -\\frac{1}{2}\\left(x - \\frac{2\\pi}{3}\\right) + \\frac{2+\\sqrt{3}}{2}$",
            markingGuide: [
                "$f'(x) = \\cos(x)$, $f'(\\frac{2\\pi}{3}) = -\\frac{1}{2}$.",
                "A – correct equation in any form. Must have $y =$."
            ]
        },
        {
            id: 'mm-25-2-q4ei',
            number: 'Question 4e.i',
            text: "Apply two iterations of Newton's method to $f$ with $x_0 = \\frac{2\\pi}{3}$.\n\nWrite down $x_2$, correct to one decimal place.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Newton's Method",
            answer: "$5.2$",
            markingGuide: [
                "A – $5.2036\\ldots \\approx 5.2$."
            ]
        },
        {
            id: 'mm-25-2-q4eii',
            number: 'Question 4e.ii',
            text: "On the axes in **part d**, draw the tangent to the graph of $y = f(x)$ at the point where $x = x_1$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Newton's Method",
            answer: "Tangent line at $x = x_1$ drawn on graph",
            markingGuide: [
                "A – tangent should be a straight line, with the point of tangency directly above the $x$-intercept of the dashed line."
            ]
        },
        {
            id: 'mm-25-2-q4fi',
            number: 'Question 4f.i',
            text: "Now consider the line $y = t(x)$, which is the tangent to the graph of $y = f(x)$ at the point $(p, f(p))$, where $p \\in \\left(0, \\frac{5\\pi}{2}\\right)$.\n\nShow that $t(x) = \\cos(p)(x - p) + \\sin(p) + 1$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Lines",
            answer: "See marking guide",
            markingGuide: [
                "M – obtaining $f'(p) = \\cos(p)$.",
                "M – correct substitution and working: $y - f(p) = f'(p)(x - p)$, i.e. $y = \\cos(p)(x-p) + \\sin(p) + 1$."
            ]
        },
        {
            id: 'mm-25-2-q4fii',
            number: 'Question 4f.ii',
            text: "Determine the minimum and maximum possible values for the $y$-intercept of $y = t(x)$, for $p \\in \\left(0, \\frac{5\\pi}{2}\\right)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Optimization",
            answer: "Minimum $\\approx -5.2$, maximum $\\approx 4.1$",
            markingGuide: [
                "$t(0) = -p\\cos(p) + \\sin(p) + 1$.",
                "AA – both values. (1 mark if approximately $4.1$ and $-5.2$.)"
            ]
        },
        {
            id: 'mm-25-2-q4fiii',
            number: 'Question 4f.iii',
            text: "Determine the values of $p$ for which $y = t(x)$ has a unique $x$-intercept that is equal to the $x$-intercept of $y = f(x)$.\n\nGive your answers correct to two decimal places.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Tangent Properties",
            answer: "$p \\approx 4.01$ or $p \\approx 5.41$",
            markingGuide: [
                "Solving $t(x) = 0$ for $x$ when it equals an $x$-intercept of $f$: $\\sin(x) + 1 = 0 \\implies x = \\frac{3\\pi}{2}$.",
                "M – for $p \\approx 4.01$ or $p \\approx 5.41$.",
                "A – both values (method implied)."
            ]
        },
        {
            id: 'mm-25-2-q4gi',
            number: 'Question 4g.i',
            text: "Let $g: \\left[0, \\frac{5\\pi}{2}\\right] \\to R, g(x) = ax^3 + bx^2 + cx + d$ be a polynomial function, where $a, b, c, d \\in R$.\n\nSuppose $g(0) = f(0)$ and $g'(0) = f'(0)$.\n\nShow that $c = 1$ and $d = 1$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Polynomial Approximation",
            answer: "$c = 1, d = 1$",
            markingGuide: [
                "$g(0) = d = f(0) = \\sin(0) + 1 = 1$. M – show $d = 1$.",
                "$g'(0) = c = f'(0) = \\cos(0) = 1$. M – show $c = 1$."
            ]
        },
        {
            id: 'mm-25-2-q4gii',
            number: 'Question 4g.ii',
            text: "If $g(2\\pi) = f(2\\pi)$ and $g'(2\\pi) = f'(2\\pi)$, determine the area bounded by the graphs of $y = f(x)$ and $y = g(x)$, for $x \\in [0, 2\\pi]$.\n\nGive your answer correct to two decimal places.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Area Between Curves",
            answer: "$1.53$",
            markingGuide: [
                "M – correct $a$ and $b$ or integral expression.",
                "A – $1.5325\\ldots \\approx 1.53$."
            ]
        },
        {
            id: 'mm-25-2-q4giii',
            number: 'Question 4g.iii',
            text: "Let $a = 0$, $c = 1$, $d = 1$.\n\nFind $b$ and $r$, such that $g(r) = f(r)$ and $g'(r) = f'(r)$, where $b \\in R$ and $r \\in \\left(0, \\frac{5\\pi}{2}\\right)$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Polynomial Approximation",
            answer: "$b = -\\frac{1}{2\\pi}$, $r = 2\\pi$",
            markingGuide: [
                "With $a = 0$: $g(x) = bx^2 + x + 1$. $g'(x) = 2bx + 1$.",
                "$g(r) = f(r)$ and $g'(r) = f'(r)$ gives two equations.",
                "M – obtaining two equations for $b$ and $r$ or approximate values or one exact value.",
                "A – both exact: $b = -\\frac{1}{2\\pi}$ and $r = 2\\pi$."
            ]
        }
    ]
};
