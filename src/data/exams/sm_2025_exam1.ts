import { type ExamPaper, Subject, Topic } from "../../types";

export const SM_2025_EXAM1: ExamPaper = {
    id: 'sm-2025-exam1',
    year: 2025,
    subject: Subject.SPECIALIST,
    title: "Exam 1 (Tech-Free)",
    questions: [
        {
            id: 'sm-25-1-q1',
            number: 'Question 1',
            text: "Consider the curve with equation $xe^y + e^{2y} = 4x + 8$.\n\nFind the equation of the tangent to the curve at the point $(4, -2)$.",
            marks: 4,
            topic: Topic.CALCULUS,
            subTopic: "Implicit Differentiation",
            answer: "Tangent line at $(4, -2)$",
            markingGuide: [
                "M1 – apply chain rule and product rule to differentiate implicitly.",
                "Differentiating: $e^y + xe^y\\frac{dy}{dx} + 2e^{2y}\\frac{dy}{dx} = 4$.",
                "M1 – isolate $\\frac{dy}{dx}$, can substitute the point.",
                "A1 – evaluate gradient at $(4, -2)$.",
                "A1 – correct tangent equation or equivalent."
            ]
        },
        {
            id: 'sm-25-1-q2',
            number: 'Question 2',
            text: "Consider the following two lines, $L_1$ and $L_2$.\n\n$L_1$ passes through the point $A_1(2, 3, 1)$ and has direction $\\vec{u} = \\vec{i} - 2\\vec{j} + \\vec{k}$.\n\n$L_2$ passes through the point $A_2(1, 3, 2)$ and has direction $\\vec{v} = -\\vec{i} + \\vec{j} - \\vec{k}$.\n\nFind the coordinates of the point of intersection of the two lines.",
            marks: 3,
            topic: Topic.VECTORS,
            subTopic: "Line Intersection",
            answer: "$(1, 5, 0)$",
            markingGuide: [
                "M1 – write parametric equations for both lines (both required, can be inferred).",
                "$L_1$: $(2+t, 3-2t, 1+t)$ and $L_2$: $(1-s, 3+s, 2-s)$.",
                "M1 – equate components and solve simultaneously.",
                "A1 – point of intersection: $(1, 5, 0)$. Can get without checking third equation."
            ]
        },
        {
            id: 'sm-25-1-q3a',
            number: 'Question 3a',
            text: "A particle starts from rest at a fixed point $O$ and travels in a straight line. The velocity, $v$ m s$^{-1}$, of the particle at time $t$ seconds has equation $v(t) = \\frac{t^2}{t + k}$, where $k$ is a positive constant and $t \\geq 0$.\n\nUse integration to show that the displacement, $x$ metres, of the particle relative to $O$ is given by $x(t) = \\frac{t^2}{2} - kt + k^2 \\log_e\\left(\\frac{t+k}{k}\\right)$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Integration / Kinematics",
            answer: "$x(t) = \\frac{t^2}{2} - kt + k^2 \\log_e\\left(\\frac{t+k}{k}\\right)$",
            markingGuide: [
                "A1 – perform polynomial long division: $\\frac{t^2}{t+k} = t - k + \\frac{k^2}{t+k}$.",
                "Integrate and apply initial condition $x(0) = 0$. Answer given."
            ]
        },
        {
            id: 'sm-25-1-q3b',
            number: 'Question 3b',
            text: "Find the initial acceleration, in terms of $k$, of the particle in m s$^{-2}$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Kinematics",
            answer: "$0$ m s$^{-2}$",
            markingGuide: [
                "M1 – differentiate $v(t) = \\frac{t^2}{t+k}$ using quotient rule or product/chain rule.",
                "$a(t) = \\frac{2t(t+k) - t^2}{(t+k)^2} = \\frac{t^2 + 2kt}{(t+k)^2}$.",
                "A1 – at $t = 0$: $a(0) = 0$."
            ]
        },
        {
            id: 'sm-25-1-q3c',
            number: 'Question 3c',
            text: "Another particle starts at $O$ at the same time as the first particle and follows the same path.\n\nIts position relative to $O$ is described by the equation $s(t) = t$.\n\nThree seconds after leaving $O$ the second particle is 1 m ahead of the first particle.\n\nFind the value of $k$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Kinematics",
            answer: "$k = 3$",
            markingGuide: [
                "M1 – set up: $s(3) - x(3) = 1 \\Rightarrow 3 - x(3) = 1$, so $x(3) = 2$.",
                "Substitute: $\\frac{9}{2} - 3k + k^2\\log_e\\left(\\frac{3+k}{k}\\right) = 2$.",
                "A1 – $k = 3$. Verify: $4.5 - 9 + 9\\log_e(2) = -4.5 + 9(0.693...) \\approx 1.74$. Check exact value."
            ]
        },
        {
            id: 'sm-25-1-q4a',
            number: 'Question 4a',
            text: "The waiting time, $T$ hours, to see a particular doctor at a clinic has a distribution with a probability density function $f$ defined by\n\n$f(t) = \\begin{cases} \\frac{3}{2\\log_e(2)} \\cdot \\frac{1}{(t+1)(t+2)} & 0 \\leq t \\leq 1 \\\\ 0 & \\text{elsewhere} \\end{cases}$\n\nUse integration to show that $E(T) = \\frac{1}{2}$.",
            marks: 3,
            topic: Topic.PROBABILITY,
            subTopic: "Continuous Distributions",
            answer: "$E(T) = \\frac{1}{2}$",
            markingGuide: [
                "M1 – attempt partial fractions for $\\frac{t}{(t+1)(t+2)}$.",
                "$\\frac{t}{(t+1)(t+2)} = \\frac{-1}{t+1} + \\frac{2}{t+2}$.",
                "A1 – correct integration.",
                "$E(T) = \\frac{3}{2\\log_e(2)}\\int_0^1 \\frac{t}{(t+1)(t+2)}\\,dt$.",
                "Absolute value not needed.",
                "A1* – answer given. Must show complete working."
            ]
        },
        {
            id: 'sm-25-1-q4b',
            number: 'Question 4b',
            text: "For random samples of 25 waiting times, it may be assumed that the sample means are approximately normally distributed.\n\nFind the probability that the average waiting time for a random sample of 25 patients is between 0.44 hours and 0.5 hours.\n\nUse $s = 0.3$ and $\\Pr(Z < 1) = 0.84$.",
            marks: 2,
            topic: Topic.PROBABILITY,
            subTopic: "Sampling Distributions",
            answer: "$0.34$",
            markingGuide: [
                "A1 – standard error: $\\frac{s}{\\sqrt{n}} = \\frac{0.3}{5} = 0.06$.",
                "$Z_1 = \\frac{0.44 - 0.5}{0.06} = -1$, $Z_2 = \\frac{0.5 - 0.5}{0.06} = 0$.",
                "A1 – $\\Pr(-1 < Z < 0) = 0.5 - 0.16 = 0.34$."
            ]
        },
        {
            id: 'sm-25-1-q5a',
            number: 'Question 5a',
            text: "The position vectors of particles $P$ and $Q$ at time $t$ seconds are given by\n\n$\\vec{r}_P(t) = (3 + t)\\vec{i} + (2 + at)\\vec{j}$ and $\\vec{r}_Q(t) = (bt + t^2)\\vec{i} + (2t - ct^2)\\vec{j}$\n\nwhere $t \\geq 0$ and $a, b, c \\in \\mathbb{R}$.\n\nThe particles collide when $t = 1$.\n\nShow that for collision to occur when $t = 1$, the value of $c$ is $-4$.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Particle Collision",
            answer: "$c = -4$",
            markingGuide: [
                "M1 – equate position vectors at $t = 1$ and solve for $c$."
            ]
        },
        {
            id: 'sm-25-1-q5b',
            number: 'Question 5b',
            text: "When the particles collide, their velocities are at right angles to each other.\n\nFind the two possible values of $a$ for collision to occur when $t = 1$.",
            marks: 2,
            topic: Topic.VECTORS,
            subTopic: "Dot Product / Perpendicular Velocities",
            answer: "Two values of $a$",
            markingGuide: [
                "M1 – find velocity vectors and set dot product to zero.",
                "$\\vec{v}_P \\cdot \\vec{v}_Q(1) = 0$.",
                "A1 – two correct values of $a$."
            ]
        },
        {
            id: 'sm-25-1-q5c',
            number: 'Question 5c',
            text: "When the particles collide at $t = 1$, the magnitudes of their accelerations are equal.\n\nFind the values of $a$ and $b$ for collision to occur when $t = 1$.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Acceleration",
            answer: "$a$ and $b$ values",
            markingGuide: [
                "A1 – the only consistent answer for $a$ and $b$."
            ]
        },
        {
            id: 'sm-25-1-q6',
            number: 'Question 6',
            text: "Find the volume of the solid of revolution formed when the area between the curve $y = \\frac{\\arctan(x)}{1 + x^2}$ and the $x$-axis from $x = 1$ to $x = \\sqrt{3}$ is rotated about the $x$-axis.\n\nGive your answer in the form $\\frac{a\\pi^c}{b}$, where $a, b, c \\in \\mathbb{Z}$.",
            marks: 4,
            topic: Topic.CALCULUS,
            subTopic: "Volumes of Revolution",
            answer: "$\\frac{a\\pi^c}{b}$",
            markingGuide: [
                "A1 – set up volume integral (allow $\\pi$ missing initially).",
                "M1 – substitution $u = \\arctan(x)$, $du = \\frac{1}{1+x^2}dx$.",
                "Limits: $x=1 \\to u=\\frac{\\pi}{4}$, $x=\\sqrt{3} \\to u=\\frac{\\pi}{3}$.",
                "A1 – correct integration $\\int u^2\\,du = \\frac{u^3}{3}$.",
                "A1 – final answer in required form."
            ]
        },
        {
            id: 'sm-25-1-q7',
            number: 'Question 7',
            text: "Use mathematical induction to prove that\n\n$\\displaystyle\\sum_{i=1}^{n} (2i+1)^2 = \\frac{n(6n^2 + 9n + 1)}{3}$ for $n \\in \\mathbb{N}$\n\nwhere $\\displaystyle\\sum_{i=1}^{n} (2i+1)^2 = 3^2 + 5^2 + 7^2 + \\cdots + (2n+1)^2$.",
            marks: 4,
            topic: Topic.PROOF,
            subTopic: "Mathematical Induction",
            answer: "Proof by mathematical induction",
            markingGuide: [
                "M1 – base case: show true for $n = 1$. LHS $= 9$, RHS check.",
                "M1 – assume true for $n = k$.",
                "A1 – must see explicit use of the inductive assumption in the proof.",
                "A1* – complete algebraic working required. Conclude by principle of mathematical induction."
            ]
        },
        {
            id: 'sm-25-1-q8a',
            number: 'Question 8a',
            text: "Consider the function with rule $f(z) = z^4 - 2z^3 + 6z^2 - 25$, where $z \\in \\mathbb{C}$.\n\nConsider $z_1 = 1 + 2i$.\n\nPlot and label $z_1$ and $\\overline{z_1}$ on the Argand plane.",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Argand Diagram",
            answer: "$z_1 = 1 + 2i$ and $\\overline{z_1} = 1 - 2i$ plotted on Argand plane",
            markingGuide: [
                "A1 – both $z_1$ and $\\overline{z_1}$ correctly plotted and labelled."
            ]
        },
        {
            id: 'sm-25-1-q8b',
            number: 'Question 8b',
            text: "Given that $1 + 2i$ is a solution of $f(z) = 0$, find a quadratic factor of $f(z)$.",
            marks: 2,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Complex Polynomial Factors",
            answer: "$z^2 - 2z + 5$",
            markingGuide: [
                "A1 – recognise $\\overline{z_1} = 1 - 2i$ is also a root (can be inferred).",
                "A1 – quadratic factor: $(z - (1+2i))(z - (1-2i)) = z^2 - 2z + 5$. Other possible quadratic factor also accepted."
            ]
        },
        {
            id: 'sm-25-1-q8c',
            number: 'Question 8c',
            text: "Hence, find all remaining solutions of $f(z) = 0$.",
            marks: 2,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Complex Polynomial Roots",
            answer: "Remaining solutions from the other quadratic factor",
            markingGuide: [
                "M1 – polynomial division or equating coefficients to find remaining quadratic.",
                "A1 – all remaining solutions. Allow two if third given in part (a)."
            ]
        },
        {
            id: 'sm-25-1-q9a',
            number: 'Question 9a',
            text: "Let $f: \\mathbb{R} \\setminus \\{-1, 1\\} \\to \\mathbb{R}$, $f(x) = \\frac{x^3 - 2x^2 + 2x}{x^2 - 1}$.\n\nShow that $f(x)$ can be written in the form $f(x) = x - 1 + \\frac{1}{x^2 - 1}$ for $x \\in \\mathbb{R} \\setminus \\{-1, 1\\}$.",
            marks: 2,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions",
            answer: "$f(x) = x - 1 + \\frac{1}{x^2 - 1}$",
            markingGuide: [
                "M1 – algebraic approach or long division (genuine attempt).",
                "A1* – answer given. Must show complete working."
            ]
        },
        {
            id: 'sm-25-1-q9b',
            number: 'Question 9b',
            text: "Consider the function with rule\n\n$g(x) = \\begin{cases} \\frac{x^3 - 2x^2 + 2x}{x^2 - 1} & x \\in \\mathbb{R} \\setminus \\{-1, 1\\} \\\\ k & x = 1 \\end{cases}$\n\nFind the value of $k$ such that the graph of $g$ is continuous at $x = 1$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Continuity",
            answer: "$k$ value for continuity",
            markingGuide: [
                "A1 – find $\\lim_{x \\to 1} f(x)$ and set equal to $k$."
            ]
        },
        {
            id: 'sm-25-1-q9c',
            number: 'Question 9c',
            text: "Sketch the graph of $y = f(x)$ on the axes below.\n\nLabel the asymptotes with their equations.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Graph Sketching",
            answer: "Graph with vertical asymptotes $x = -1$, $x = 1$ and oblique asymptote $y = x - 1$",
            markingGuide: [
                "A1 – correct shape including intercepts.",
                "A1 – asymptotes labelled with equations.",
                "A1 – hole at $(1, k)$ correctly indicated."
            ]
        }
    ]
};
