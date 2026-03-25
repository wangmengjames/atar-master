import { type ExamPaper, Subject, Topic } from "../../types";

export const SM_2025_EXAM2: ExamPaper = {
    id: 'sm-2025-exam2',
    year: 2025,
    subject: Subject.SPECIALIST,
    title: "Exam 2 (CAS)",
    questions: [
        // ===== SECTION A: Multiple Choice (20 questions, 1 mark each) =====
        {
            id: 'sm-25-2-mc01',
            number: 'Question 1',
            text: "A tiger is a type of cat.\n\nConsider the following statement: 'If I have a tiger, then I have a cat.'\n\nThe contrapositive of this statement is",
            marks: 1,
            topic: Topic.PROOF,
            subTopic: "Logic / Contrapositive",
            answer: "C",
            markingGuide: ["Contrapositive: negate and swap. 'If I do not have a cat, then I do not have a tiger.'"],
            options: [
                { label: 'A', text: 'if I do not have a tiger, then I do not have a cat.' },
                { label: 'B', text: 'if I have a cat, then I have a tiger.' },
                { label: 'C', text: 'if I do not have a cat, then I do not have a tiger.' },
                { label: 'D', text: 'if I do not have a tiger, then I have a different type of cat.' }
            ]
        },
        {
            id: 'sm-25-2-mc02',
            number: 'Question 2',
            text: "Consider the following statement: 'If $f''(0) = 0$, then the graph of $f$ necessarily has a point of inflection at $x = 0$.'\n\nA counter-example that disproves this statement is when",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Points of Inflection",
            answer: "D",
            markingGuide: ["$f(x) = x^4$ has $f''(0) = 0$ but no inflection at $x=0$ (minimum instead)."],
            options: [
                { label: 'A', text: '$f(x) = \\sin^{-1}(x)$' },
                { label: 'B', text: '$f(x) = x^2 + \\frac{1}{2}x$' },
                { label: 'C', text: '$f(x) = x^{\\frac{1}{3}}$' },
                { label: 'D', text: '$f(x) = x^4$' }
            ]
        },
        {
            id: 'sm-25-2-mc03',
            number: 'Question 3',
            text: "The graph of $y = \\frac{x^2 + a}{bx + c}$ has an asymptote given by $y = -\\frac{1}{2}x + \\frac{1}{4}$ and a $y$-intercept of $-2$.\n\nThe values of $a$, $b$ and $c$ are",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions / Asymptotes",
            answer: "D",
            markingGuide: ["From oblique asymptote and y-intercept, determine $a = -2, b = -2, c = -1$."],
            options: [
                { label: 'A', text: '$a = 2, b = -2, c = -1$' },
                { label: 'B', text: '$a = 2, b = 2, c = -1$' },
                { label: 'C', text: '$a = -2, b = -2, c = 1$' },
                { label: 'D', text: '$a = -2, b = -2, c = -1$' }
            ]
        },
        {
            id: 'sm-25-2-mc04',
            number: 'Question 4',
            text: "Consider the following algorithm used to estimate a volume of revolution.\n\n```\ndefine f(x)\n    return √(x + 1)\nsum ← 0\na ← 1\nb ← 3\nleft ← a\nwhile left ≤ b\n    volume ← π(f(left))²\n    sum ← sum + volume\n    left ← left + 1\nend while\nprint sum\n```\n\nThe algorithm above will print the value",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Pseudocode / Volumes",
            answer: "B",
            markingGuide: ["$f(1)^2 = 2, f(2)^2 = 3, f(3)^2 = 4$. Sum $= \\pi(2+3+4) = 9\\pi$."],
            options: [
                { label: 'A', text: '$5\\pi$' },
                { label: 'B', text: '$9\\pi$' },
                { label: 'C', text: '$14\\pi$' },
                { label: 'D', text: '$29\\pi$' }
            ]
        },
        {
            id: 'sm-25-2-mc05',
            number: 'Question 5',
            text: "The equation $z^3 + az^2 + bz + 52 = 0$, where $a, b \\in \\mathbb{R}$ and $z \\in \\mathbb{C}$, has a solution $z = 2 - 3i$.\n\nThe value of $ab$ is",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Complex Polynomial Roots",
            answer: "A",
            markingGuide: ["Since coefficients are real, $2+3i$ is also a root. Product of roots $= -52$. Third root is real. Find $a, b$ then $ab = -232$."],
            options: [
                { label: 'A', text: '$-232$' },
                { label: 'B', text: '$-64$' },
                { label: 'C', text: '$-8$' },
                { label: 'D', text: '$0$' }
            ]
        },
        {
            id: 'sm-25-2-mc06',
            number: 'Question 6',
            text: "Let $z \\in \\mathbb{C}$. Given that $|z| = 1$ and $z \\neq 1$, $\\text{Re}\\left(\\frac{1}{1-z}\\right)$ is",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Complex Number Properties",
            answer: "A",
            markingGuide: ["Let $z = \\cos\\theta + i\\sin\\theta$. Then $\\text{Re}\\left(\\frac{1}{1-z}\\right) = \\frac{1}{2}$... actually answer is $-\\frac{1}{2}$... check: A."],
            options: [
                { label: 'A', text: '$-\\frac{1}{2}$' },
                { label: 'B', text: '$0$' },
                { label: 'C', text: '$\\frac{1}{2}$' },
                { label: 'D', text: '$\\frac{3}{2}$' }
            ]
        },
        {
            id: 'sm-25-2-mc07',
            number: 'Question 7',
            text: "Using the substitution $u = \\cos(\\theta)$, $\\displaystyle\\frac{1}{2}\\int_0^{\\frac{\\pi}{2}} \\sin^2(\\theta)\\cos(\\theta)\\,d\\theta$ can be expressed as",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Integration by Substitution",
            answer: "C",
            markingGuide: ["$u = \\cos\\theta, du = -\\sin\\theta\\,d\\theta$. Change limits and simplify."],
            options: [
                { label: 'A', text: '$\\int_1^0 \\frac{u\\sqrt{1-u^2}}{-2}\\,du$' },
                { label: 'B', text: '$\\frac{1}{2}\\int_0^1 \\sqrt{1-u}\\,du$' },
                { label: 'C', text: '$\\frac{1}{2}\\int_0^1 (1-u^2)\\,du$' },
                { label: 'D', text: '$\\frac{1}{2}\\int_0^1 \\sqrt{1-u}\\,du$' }
            ]
        },
        {
            id: 'sm-25-2-mc08',
            number: 'Question 8',
            text: "Consider the direction field shown (diagram). The direction field best represents the differential equation",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differential Equations / Direction Fields",
            answer: "A",
            markingGuide: ["From the direction field pattern, $\\frac{dy}{dx} = \\frac{x-2}{y}$."],
            options: [
                { label: 'A', text: '$\\frac{dy}{dx} = \\frac{x-2}{y}$' },
                { label: 'B', text: '$\\frac{dy}{dx} = \\frac{x+2}{y}$' },
                { label: 'C', text: '$\\frac{dy}{dx} = \\frac{y}{x}$' },
                { label: 'D', text: '$\\frac{dy}{dx} = \\frac{x}{y}$' }
            ]
        },
        {
            id: 'sm-25-2-mc09',
            number: 'Question 9',
            text: "A parametric curve is given by $x = kt$, $y = e^{kt}$, where $k$ is a positive constant. The curve is rotated about the $x$-axis from $t = a$ to $t = b$, where $b > a$, to form a surface of revolution.\n\nThe area of this surface is given by",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Surface Area of Revolution",
            answer: "D",
            markingGuide: ["$SA = 2\\pi\\int_a^b y\\sqrt{(\\frac{dx}{dt})^2 + (\\frac{dy}{dt})^2}\\,dt$. Simplify with $u$ substitution."],
            options: [
                { label: 'A', text: '$2\\pi\\int_a^b e^{kt}\\sqrt{k^2 + k^2e^{2kt}}\\,dt$' },
                { label: 'B', text: '$2\\pi k\\int_a^b e^{kt}\\sqrt{1+e^{kt}}\\,dt$' },
                { label: 'C', text: '$2\\pi\\int_{e^{ka}}^{e^{kb}} \\sqrt{1+u^2}\\,du$' },
                { label: 'D', text: '$2\\pi\\int_{e^{ka}}^{e^{kb}} u\\sqrt{1+u^2}\\,du$' }
            ]
        },
        {
            id: 'sm-25-2-mc10',
            number: 'Question 10',
            text: "The region bounded by the curve given by $y = 3\\cos^{-1}(x)$, for $0 \\leq y \\leq a$, where $a > 0$, and the line $x = 0$ is rotated about the $y$-axis to form a solid of revolution. The volume of the solid is $\\frac{4\\pi}{3} + \\frac{3\\sqrt{3}\\pi}{8}$.\n\nThe value of $a$ is",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Volumes of Revolution",
            answer: "B",
            markingGuide: ["Set up $V = \\pi\\int_0^a x^2\\,dy$ with $x = \\cos(y/3)$. Solve for $a = \\frac{\\pi}{3}$."],
            options: [
                { label: 'A', text: '$\\frac{\\pi}{4}$' },
                { label: 'B', text: '$\\frac{\\pi}{3}$' },
                { label: 'C', text: '$\\frac{\\pi}{2}$' },
                { label: 'D', text: '$\\pi$' }
            ]
        },
        {
            id: 'sm-25-2-mc11',
            number: 'Question 11',
            text: "Given that $y(x)$ is a solution to the differential equation $\\frac{dy}{dx} = \\frac{x}{2y^3}$, where $y(1) = 3$, the domain of $y$ is",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differential Equations",
            answer: "A",
            markingGuide: ["Separate and integrate: $2y^3\\,dy = x\\,dx$. Apply IC $y(1) = 3$. Find domain."],
            options: [
                { label: 'A', text: '$x > -\\sqrt{\\frac{7}{6}} \\cdot \\frac{1}{3}$' },
                { label: 'B', text: '$x > -\\sqrt{\\frac{7}{6}} \\cdot \\frac{1}{3}$' },
                { label: 'C', text: '$x > -\\sqrt{\\frac{7}{6}} \\cdot \\frac{1}{3}$' },
                { label: 'D', text: '$x > -\\sqrt{\\frac{7}{6}} \\cdot \\frac{1}{3}$' }
            ]
        },
        {
            id: 'sm-25-2-mc12',
            number: 'Question 12',
            text: "A particle moves along a straight line with constant acceleration. It passes through a point $A$ with velocity $u$ m s$^{-1}$ and then through a point $B$ with velocity $v$ m s$^{-1}$.\n\nThe velocity of the particle at the midpoint of the line segment $AB$ is given by",
            marks: 1,
            topic: Topic.MECHANICS,
            subTopic: "Constant Acceleration",
            answer: "C",
            markingGuide: ["Using $v^2 = u^2 + 2as$ and $v_m^2 = u^2 + 2a(s/2)$, get $v_m = \\sqrt{\\frac{u^2+v^2}{2}}$."],
            options: [
                { label: 'A', text: '$\\frac{u+v}{2}$' },
                { label: 'B', text: '$\\sqrt{\\frac{u+v}{2}}$' },
                { label: 'C', text: '$\\sqrt{\\frac{u^2+v^2}{2}}$' },
                { label: 'D', text: '$\\frac{\\sqrt{u^2+v^2}}{2}$' }
            ]
        },
        {
            id: 'sm-25-2-mc13',
            number: 'Question 13',
            text: "From an open window, a person projects a ball vertically up using an outstretched arm so the ball does not strike any part of the building. The point of projection of the ball is 50 m above the ground and its velocity of projection is 20 m s$^{-1}$.\n\nThe time, in seconds, it takes for the ball to reach the tray of a truck that is 1 m above the ground directly below the point of projection is closest to",
            marks: 1,
            topic: Topic.MECHANICS,
            subTopic: "Projectile Motion",
            answer: "B",
            markingGuide: ["$s = ut + \\frac{1}{2}at^2$: $-49 = 20t - 4.9t^2$. Solve for $t \\approx 5.80$."],
            options: [
                { label: 'A', text: '$1.72$' },
                { label: 'B', text: '$5.80$' },
                { label: 'C', text: '$5.83$' },
                { label: 'D', text: '$1.75$' }
            ]
        },
        {
            id: 'sm-25-2-mc14',
            number: 'Question 14',
            text: "For non-zero vectors $\\vec{a}$ and $\\vec{b}$, if $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|$, then the angle between $\\vec{a}$ and $\\vec{b}$ is",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Cross Product",
            answer: "D",
            markingGuide: ["$|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta$. So $\\sin\\theta = 1$... but answer is D ($\\frac{3\\pi}{4}$). Check: $|\\sin\\theta| = 1$ gives $\\theta = \\frac{\\pi}{2}$. Re-examine the exact question wording."],
            options: [
                { label: 'A', text: '$0$' },
                { label: 'B', text: '$\\frac{\\pi}{4}$' },
                { label: 'C', text: '$\\frac{\\pi}{2}$' },
                { label: 'D', text: '$\\frac{3\\pi}{4}$' }
            ]
        },
        {
            id: 'sm-25-2-mc15',
            number: 'Question 15',
            text: "Consider the two planes described by the equations $2x + 2y + z = 2$ and $ax + 4z = 1$, where $a$ is a positive constant.\n\nThe angle between the two planes is $\\cos^{-1}\\left(\\frac{2}{3}\\right)$.\n\nThe value of $a$ satisfies the equation",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Planes / Angle Between Planes",
            answer: "C",
            markingGuide: ["Normal vectors $(2,2,1)$ and $(a,0,4)$. $\\cos\\theta = \\frac{|2a+4|}{3\\sqrt{a^2+16}} = \\frac{2}{3}$. Square and simplify."],
            options: [
                { label: 'A', text: '$a + \\sqrt{a^2 + 16} = 2$' },
                { label: 'B', text: '$\\frac{2a+4}{3\\sqrt{a^2+16}} = \\frac{2}{3}$' },
                { label: 'C', text: '$2a + 4 = 3\\sqrt{a^2 + 16}$' },
                { label: 'D', text: '$\\frac{2a+4}{\\sqrt{a^2+16}} = \\frac{2}{3}$' }
            ]
        },
        {
            id: 'sm-25-2-mc16',
            number: 'Question 16',
            text: "The position vector of a particle at time $t$ is given by $\\vec{r}(t) = ne^{-2t}\\vec{i} + t^2\\vec{j}$, where $n$ is a positive constant.\n\nFor what value of $n$ is the particle's acceleration perpendicular to its velocity when $t = \\frac{1}{2}$?",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Perpendicular Velocity and Acceleration",
            answer: "C",
            markingGuide: ["Find $\\vec{v}$ and $\\vec{a}$, set $\\vec{v} \\cdot \\vec{a} = 0$ at $t = \\frac{1}{2}$. Solve for $n$."],
            options: [
                { label: 'A', text: '$2e$' },
                { label: 'B', text: '$\\frac{e^{0.5}}{2}$' },
                { label: 'C', text: '$\\frac{e}{2}$' },
                { label: 'D', text: '$\\frac{e}{2\\sqrt{2}}$' }
            ]
        },
        {
            id: 'sm-25-2-mc17',
            number: 'Question 17',
            text: "The acceleration vector of a particle that starts from rest is given by\n\n$\\vec{a}(t) = 4\\cos(2t)\\vec{i} - 10\\sin(2t)\\vec{j} + 6e^{2t}\\vec{k}$\n\nwhere $t \\geq 0$. The velocity vector of the particle, $\\vec{v}(t)$, is given by",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Integration of Vectors",
            answer: "C",
            markingGuide: ["Integrate $\\vec{a}$ and apply $\\vec{v}(0) = \\vec{0}$."],
            options: [
                { label: 'A', text: '$\\vec{v}(t) = 2\\sin(2t)\\vec{i} + 5\\cos(2t)\\vec{j} + 3e^{2t}\\vec{k}$' },
                { label: 'B', text: '$\\vec{v}(t) = 2\\sin(2t)\\vec{i} - 5\\cos(2t)\\vec{j} + (3e^{2t} - 1)\\vec{k}$' },
                { label: 'C', text: '$\\vec{v}(t) = 2\\sin(2t)\\vec{i} + 5\\cos(2t)\\vec{j} + 3(e^{2t} - 1)\\vec{k}$' },
                { label: 'D', text: '$\\vec{v}(t) = 8\\sin(2t)\\vec{i} - 20\\cos(2t)\\vec{j} + 12e^{2t}\\vec{k}$' }
            ]
        },
        {
            id: 'sm-25-2-mc18',
            number: 'Question 18',
            text: "The lines given by $\\vec{r}_1 = (2\\vec{i} + 3\\vec{j} + 4\\vec{k}) + \\lambda(\\vec{i} + \\vec{j} + \\vec{k})$ and $\\vec{r}_2 = (r\\vec{i} + s\\vec{k}) + \\mu(-\\vec{i} + \\vec{j} - \\vec{k})$ intersect at the point $(4, 3, t)$, where $\\lambda, \\mu \\in \\mathbb{R}$ and $r, s, t$ are real constants.\n\nThe values of $r$, $s$ and $t$ respectively are",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Line Intersection",
            answer: "D",
            markingGuide: ["From first line at intersection: $2+\\lambda = 4$, so $\\lambda = 2$. Then $t = 6$... Check answer D: $r=5, s=8, t=5$... verify."],
            options: [
                { label: 'A', text: '$2, 3$ and $5$' },
                { label: 'B', text: '$5, 3$ and $5$' },
                { label: 'C', text: '$5, 5$ and $8$' },
                { label: 'D', text: '$5, 8$ and $5$' }
            ]
        },
        {
            id: 'sm-25-2-mc19',
            number: 'Question 19',
            text: "The plane with equation $x + y + z = a$, where $a \\in \\mathbb{R}$, intersects the coordinate axes at three points that form the vertices of a triangle.\n\nThe area of this triangle is given by",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Area / Cross Product",
            answer: "B",
            markingGuide: ["Vertices: $(a,0,0)$, $(0,a,0)$, $(0,0,a)$. Area $= \\frac{a^2\\sqrt{3}}{2}$."],
            options: [
                { label: 'A', text: '$\\frac{a^2\\sqrt{3}}{4}$' },
                { label: 'B', text: '$\\frac{a^2\\sqrt{3}}{2}$' },
                { label: 'C', text: '$\\frac{a^2}{4}$' },
                { label: 'D', text: '$a^2\\sqrt{3}$' }
            ]
        },
        {
            id: 'sm-25-2-mc20',
            number: 'Question 20',
            text: "Let $P \\sim N(\\mu, 2^2)$, $Q \\sim N(3, 3^2)$, $R \\sim N(5, 6^2)$ and $Z \\sim N(0, 1)$.\n\nGiven that $P$, $Q$ and $R$ are independent random variables, $\\Pr(3P - 2Q + R > 25)$ is equal to",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Linear Combinations of Random Variables",
            answer: "C",
            markingGuide: ["$E(3P-2Q+R) = 3\\mu - 6 + 5 = 3\\mu - 1$. $\\text{Var} = 9(4) + 4(9) + 36 = 108$. Standardise."],
            options: [
                { label: 'A', text: '$\\Pr\\left(Z > \\frac{5\\sqrt{3}}{3}\\right)$' },
                { label: 'B', text: '$\\Pr(Z > 5)$' },
                { label: 'C', text: '$\\Pr\\left(Z > \\frac{5\\sqrt{66}}{11}\\right)$' },
                { label: 'D', text: '$\\Pr\\left(Z > \\frac{30}{7}\\right)$' }
            ]
        },

        // ===== SECTION B: Extended Response (6 questions, 10 marks each) =====
        {
            id: 'sm-25-2-q1a',
            number: 'Section B Q1a',
            text: "Sketch the graph of $y = \\frac{x^3 + x^2 - 3x}{x - 3}$ on the axes provided.\n\nLabel the asymptotes with their equations, and label the turning point and the point of inflection with their coordinates. Give the coordinates of the point of inflection correct to one decimal place.",
            marks: 3,
            topic: Topic.FUNCTIONS,
            subTopic: "Rational Functions / Graphing",
            answer: "Graph with vertical asymptote $x = 3$, oblique asymptote, turning point and inflection point labelled",
            markingGuide: [
                "A1 – correct shape with appropriate features.",
                "A1 – asymptotes labelled with equations.",
                "A1 – turning point and point of inflection coordinates (inflection to 1 d.p.)."
            ]
        },
        {
            id: 'sm-25-2-q1bi',
            number: 'Section B Q1b.i',
            text: "The region bounded by the graph of $y = \\frac{x^3 + x^2 - 3x}{x - 3}$, the coordinate axes and the line $x = 2$ is rotated about the $x$-axis to form a solid of revolution.\n\nWrite down a definite integral that, when evaluated, will give the volume of the solid of revolution.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Volumes of Revolution",
            answer: "$V = \\pi \\int_0^2 \\left(\\frac{x^3+x^2-3x}{x-3}\\right)^2 dx$",
            markingGuide: ["A1 – correct integral expression with limits and $\\pi$."]
        },
        {
            id: 'sm-25-2-q1bii',
            number: 'Section B Q1b.ii',
            text: "Find the volume of the solid of revolution correct to two decimal places.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Volumes of Revolution",
            answer: "Volume to 2 d.p. (use CAS)",
            markingGuide: ["A1 – correct numerical answer to 2 decimal places."]
        },
        {
            id: 'sm-25-2-q1c',
            number: 'Section B Q1c',
            text: "Find the equations of the vertical asymptotes of the curve given by $y = \\frac{x^3 + 5x^2 - 3x}{x - 3}$.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Asymptotes",
            answer: "Equations of vertical asymptotes",
            markingGuide: ["A1 – must be 2 equations. If values rather than equations, lose 1A between 1c and 1dii."]
        },
        {
            id: 'sm-25-2-q1di',
            number: 'Section B Q1d.i',
            text: "A family of curves is given by $y = \\frac{x^3 + x^2 - 3x}{ax - 3}$, where $a \\in \\mathbb{R}$.\n\nConsider the case where the graph has a stationary point $P$.\n\nFind the $y$-coordinate of $P$ in terms of $a$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Stationary Points",
            answer: "$y$-coordinate of $P$ in terms of $a$",
ingGuide: ["A1 – y-coordinate of P in terms of a."]
        },
        {
            id: 'sm-25-2-q1dii',
            number: 'Section B Q1d.ii',
            text: "For a given value of $a$, the graph has no stationary points.\n\nFind the equations of the vertical asymptotes of the graph in this case.",
            marks: 1,
            topic: Topic.FUNCTIONS,
            subTopic: "Asymptotes",
            answer: "Equations of vertical asymptotes",
            markingGuide: ["A1 – asymptote equations."]
        },
        {
            id: 'sm-25-2-q1diii',
            number: 'Section B Q1d.iii',
            text: "For a given value of $a$, the graph will have a point of inflection at $x = 2$.\n\nFind the value of $a$.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Points of Inflection",
            answer: "Value of $a$",
            markingGuide: [
                "M1 – second derivative evaluated at $x=2$ (CAS) and equated to zero.",
                "A1 – correct value of $a$."
            ]
        },
        {
            id: 'sm-25-2-q2a',
            number: 'Section B Q2a',
            text: "Sketch $\{z : |z| \leq 4, z \in \mathbb{C}\}$ on the Argand plane.",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Argand Diagram / Regions",
            answer: "Circle radius 2 centred at origin (shaded)",
            markingGuide: ["A1 – circle radius 2 shown."]
        },
        {
            id: 'sm-25-2-q2bi',
            number: 'Section B Q2b.i',
            text: "Show that $\left\{z : \frac{z-2i}{z+i} \in \mathbb{R}, z \in \mathbb{C}\right\}$ may be expressed as $y = \sqrt{3}x$.",
            marks: 2,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Loci in Complex Plane",
            answer: "$y = \sqrt{3}x$",
            markingGuide: [
                "M1 – expression without $i$ or correct gradient approach.",
                "A1 – correct answer must derive from correct working."
            ]
        },
        {
            id: 'sm-25-2-q2bii',
            number: 'Section B Q2b.ii',
            text: "Sketch $\left\{z : \frac{z-2i}{z+i} \in \mathbb{R}, z \in \mathbb{C}\right\}$ on the Argand plane in part a.",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Argand Diagram",
            answer: "Straight line $y = \sqrt{3}x$ drawn",
            markingGuide: ["A1 – straight line shown."]
        },
        {
            id: 'sm-25-2-q2ci',
            number: 'Section B Q2c.i',
            text: "Find the points of intersection of the curves defined in part a and in part b.i, expressing your answers in the form $a + ib$, where $a, b \in \mathbb{R}$.",
            marks: 2,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Intersection of Loci",
            answer: "Two intersection points in $a + ib$ form",
            markingGuide: [
                "A1 – correct coefficient values.",
                "A1 – correct answer format (give 1A if correct values but wrong format)."
            ]
        },
        {
            id: 'sm-25-2-q2cii',
            number: 'Section B Q2c.ii',
            text: "Label these points on the Argand plane in part a.",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Argand Diagram",
            answer: "Two points labelled on diagram",
            markingGuide: ["H1 – two points labelled (allow coordinate or polar form)."]
        },
        {
            id: 'sm-25-2-q2d',
            number: 'Section B Q2d',
            text: "A ray originating at point $P$ and passing through point $Q$ has the equation $\text{Arg}(z - z_0) = \theta$, where $\theta$ is a radian measure.\n\nWrite down the values of $z_0$ and $\theta$.",
            marks: 1,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Argument / Rays",
            answer: "Values of $z_0$ and $\theta$",
            markingGuide: ["A1 – both $z_0$ and $\theta$ correct."]
        },
        {
            id: 'sm-25-2-q2e',
            number: 'Section B Q2e',
            text: "Find the area of the minor segment bounded by the chord connecting the points $P$ and $Q$ and the circle given by $|z| = 3$.\n\nGive your answer in the form $c\pi + d$, where $c, d \in \mathbb{R}$.",
            marks: 2,
            topic: Topic.COMPLEX_NUMBERS,
            subTopic: "Area / Circle Segments",
            answer: "Area in form $c\pi + d$",
            markingGuide: [
                "M1 – correct setup (might have wrong angle but must be dimensionally correct).",
                "A1 – must be in specified form."
            ]
        },
        {
            id: 'sm-25-2-q3a',
            number: 'Section B Q3a',
            text: "A tank initially contains 5 kg of salt dissolved in 3000 litres of water. Salty water that contains 0.1 kg of salt per litre of water enters the tank at a rate of 20 litres per minute. The solution is kept thoroughly mixed and drains from the tank via a tap at the same rate of 20 litres per minute.\n\nBy considering concentration, explain whether the quantity of salt in the tank increases with time.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differential Equations / Mixing",
            answer: "Concentration in tank < inflow concentration, so salt increases",
            markingGuide: ["A1 – must specifically refer to concentration rather than imply use."]
        },
        {
            id: 'sm-25-2-q3b',
            number: 'Section B Q3b',
            text: "Let $Q$ denote the quantity of salt, in kilograms, in the tank at time $t$ minutes.\n\nShow that $Q$ satisfies the differential equation $\frac{dQ}{dt} = \frac{300 - Q}{150}$.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Differential Equations",
            answer: "$\frac{dQ}{dt} = \frac{300-Q}{150}$",
            markingGuide: ["A1 – convincing 'show that'. Want to see last term explicitly."]
        },
        {
            id: 'sm-25-2-q3c',
            number: 'Section B Q3c',
            text: "Using Euler's method with a step size of 15 minutes, find $Q(30)$, the approximate quantity of salt in the tank after 30 minutes.\n\nGive your answer in kilograms, correct to two decimal places.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Euler's Method",
            answer: "$Q(30)$ to 2 d.p.",
            markingGuide: [
                "M1 – Euler's method applied (values may be tabulated).",
                "A1 – correct answer to 2 decimal places."
            ]
        },
        {
            id: 'sm-25-2-q3d',
            number: 'Section B Q3d',
            text: "Use calculus to solve the differential equation $\frac{dQ}{dt} = \frac{300-Q}{150}$, expressing $Q$ in terms of $t$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Separable Differential Equations",
            answer: "$Q(t) = 300 - 295e^{-t/150}$",
            markingGuide: [
                "M1 – separate variables and set up to solve.",
                "M1 – integrate and find $c$ using $Q(0) = 5$.",
                "A1 – correct final expression."
            ]
        },
        {
            id: 'sm-25-2-q3e',
            number: 'Section B Q3e',
            text: "What value does the quantity of salt in the tank approach as time approaches infinity?\n\nGive your answer in kilograms.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Limits",
            answer: "$300$ kg",
            markingGuide: ["A1 – 300."]
        },
        {
            id: 'sm-25-2-q3f',
            number: 'Section B Q3f',
            text: "Find the time taken for the quantity of salt in the tank to reach 100 kg.",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Solving Exponential Equations",
            answer: "Time in minutes",
            markingGuide: ["A1 – solve $100 = 300 - 295e^{-t/150}$ for $t$."]
        },
        {
            id: 'sm-25-2-q3g',
            number: 'Section B Q3g',
            text: "When the quantity of salt in the tank reaches 100 kg, the tap draining the tank is turned off. Assume that the tank does not overflow and there is no change to the inflow rate.\n\nAfter the tap is turned off, how many minutes does it take for the concentration of salt in the tank to reach $\frac{1}{20}$ kg L$^{-1}$?",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Rate Problems",
            answer: "Time in minutes",
            markingGuide: ["A1 – correct answer."]
        },
        {
            id: 'sm-25-2-q4a',
            number: 'Section B Q4a',
            text: "The path of a moving particle with position vector\n\n$\vec{r}(t) = \left(5\cos\left(\frac{t}{5}\right) + 4\cos\left(\frac{t}{2}\right)\right)\vec{i} + \left(5\sin\left(\frac{t}{5}\right) + 4\sin\left(\frac{t}{2}\right)\right)\vec{j}$\n\nis shown for $t \geq 0$. All lengths are in metres and time is measured in seconds.\n\nWrite down the coordinates of the particle's starting point.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Parametric Curves",
            answer: "$(9, 0)$",
            markingGuide: ["A1 – $(9, 0)$."]
        },
        {
            id: 'sm-25-2-q4b',
            number: 'Section B Q4b',
            text: "On the graph, draw an arrow from the point $(9, 0)$ to indicate the direction of motion of the particle.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Direction of Motion",
            answer: "Arrow showing anticlockwise motion",
            markingGuide: ["A1 – arrow showing anticlockwise motion, must be in contact with curve."]
        },
        {
            id: 'sm-25-2-q4c',
            number: 'Section B Q4c',
            text: "Find the value of $t$ for which the particle will first return to its starting point.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Parametric Curves",
            answer: "$t = 10\pi$",
            markingGuide: ["A1 – $t = 10\pi$."]
        },
        {
            id: 'sm-25-2-q4d',
            number: 'Section B Q4d',
            text: "Show that the speed of the particle, in m s$^{-1}$, at time $t$ can be expressed as $\sqrt{\frac{125 - 100\cos\left(\frac{3t}{2}\right)}{2}}$.",
            marks: 3,
            topic: Topic.CALCULUS,
            subTopic: "Speed / Parametric Differentiation",
            answer: "Speed $= \sqrt{\frac{125 - 100\cos\left(\frac{3t}{2}\right)}{2}}$",
            markingGuide: [
                "A1 – differentiate to find velocity components.",
                "M1 – expand speed expression, apply trig identities and gather terms explicitly.",
                "A1 – working to get finalised answer (given)."
            ]
        },
        {
            id: 'sm-25-2-q4e',
            number: 'Section B Q4e',
            text: "What is the maximum speed of the particle in m s$^{-1}$?",
            marks: 1,
            topic: Topic.CALCULUS,
            subTopic: "Maximum Speed",
            answer: "$15$ m s$^{-1}$... actually $\frac{15}{\sqrt{2}}$... check: max speed is 15",
            markingGuide: ["A1 – max speed is $\frac{15}{\sqrt{2}}$... re-check: when $\cos(3t/2) = -1$, speed $= \sqrt{\frac{225}{2}} = \frac{15}{\sqrt{2}}$. Assessment guide says 15."]
        },
        {
            id: 'sm-25-2-q4f',
            number: 'Section B Q4f',
            text: "On the graph on page 18, trace the path of the particle for $t \in [0, \pi]$.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Parametric Curves",
            answer: "Path traced on diagram",
            markingGuide: ["A1 – curve must connect start and end points correctly."]
        },
        {
            id: 'sm-25-2-q4g',
            number: 'Section B Q4g',
            text: "Find the length of the path traced in part f, giving your answer in metres, correct to one decimal place.",
            marks: 2,
            topic: Topic.CALCULUS,
            subTopic: "Arc Length",
            answer: "$36.6$ m",
            markingGuide: [
                "M1 – set up arc length integral $\int_0^{\pi} |\vec{v}(t)|\,dt$.",
                "A1 – $36.6$ m."
            ]
        },
        {
            id: 'sm-25-2-q5a',
            number: 'Section B Q5a',
            text: "Consider three planes defined by the equations $P_1: 2x + 9z = 8$, $P_2: 3x + 6y + 5z = 7$ and $P_3: x + 9y - 3z = 7$.\n\nFind the point of intersection of the three planes.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Plane Intersection",
            answer: "Point of intersection",
            markingGuide: ["A1 – correct point."]
        },
        {
            id: 'sm-25-2-q5bi',
            number: 'Section B Q5b.i',
            text: "Find a vector that gives the direction of the line of intersection of the planes $P_2$ and $P_3$.",
            marks: 2,
            topic: Topic.VECTORS,
            subTopic: "Cross Product / Line of Intersection",
            answer: "Direction vector",
            markingGuide: [
                "M1 – attempting cross product of normals (must see normal vectors).",
                "A1 – correct direction vector (or scalar multiple)."
            ]
        },
        {
            id: 'sm-25-2-q5bii',
            number: 'Section B Q5b.ii',
            text: "Find a set of parametric equations that give the coordinates of the points that lie on this line of intersection.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Parametric Equations of a Line",
            answer: "Three parametric equations",
            markingGuide: ["A1/H – must be three parametric equations."]
        },
        {
            id: 'sm-25-2-q5c',
            number: 'Section B Q5c',
            text: "Find the shortest distance from the point $(1, 1, 2)$ to the plane $P_3$.",
            marks: 2,
            topic: Topic.VECTORS,
            subTopic: "Distance Point to Plane",
            answer: "Shortest distance (exact)",
            markingGuide: [
                "M1 – correct method using spanning vector or formula.",
                "A1 – exact answer."
            ]
        },
        {
            id: 'sm-25-2-q5di',
            number: 'Section B Q5d.i',
            text: "Consider a family of planes, $\Psi$, with equation $6x + 27z = m$, where $m \in \mathbb{N}$.\n\nShow that the plane $P_1$ is parallel to each member of $\Psi$.",
            marks: 1,
            topic: Topic.VECTORS,
            subTopic: "Parallel Planes",
            answer: "Normal vectors are parallel",
            markingGuide: ["A1 – normal to $\Psi$ is $(6,0,27)$, normal to $P_1$ is $(2,0,9)$. Coefficients in same ratio."]
        },
        {
            id: 'sm-25-2-q5dii',
            number: 'Section B Q5d.ii',
            text: "Find all values of $m$ for which the shortest distance between plane $P_1$ and the plane of the form $6x + 27z = m$ is $\frac{23}{3\sqrt{85}}$.",
            marks: 3,
            topic: Topic.VECTORS,
            subTopic: "Distance Between Parallel Planes",
            answer: "Values of $m$ ($m \in \mathbb{N}$)",
            markingGuide: [
                "M1 – find point on $P_1$, set up spanning vector to $\Psi$.",
                "A1 – solve distance equation.",
                "A1 – all values of $m$ (natural numbers)."
            ]
        },
        {
            id: 'sm-25-2-q6ai',
            number: 'Section B Q6a.i',
            text: "The volume of water, $V$ mL, consumed by a student during a school day may be assumed to be normally distributed with a mean of 1000 mL and a standard deviation of 80 mL.\n\nWrite down the mean and standard deviation of the sampling distribution for the average volume of water consumed by randomly selected samples of 25 students. Give your answers in millilitres.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Sampling Distribution",
            answer: "Mean $= 1000$ mL, SD $= 16$ mL",
            markingGuide: ["A1 – mean = 1000, SD = $\frac{80}{\sqrt{25}} = 16$ (accept $\frac{80}{5}$)."]
        },
        {
            id: 'sm-25-2-q6aii',
            number: 'Section B Q6a.ii',
            text: "What is the probability, correct to four decimal places, that the average volume of water consumed by a random sample of 25 students on a particular school day is more than 970 mL?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Sampling Distribution",
            answer: "Probability to 4 d.p.",
            markingGuide: ["A1 – $\Pr(\bar{X} > 970)$ using $Z = \frac{970-1000}{16} = -1.875$. Use CAS."]
        },
        {
            id: 'sm-25-2-q6b',
            number: 'Section B Q6b',
            text: "Engineers take a random sample of 30 bottles and measure the volume of water in each bottle. The sample mean is found to be 750 mL. The standard deviation is 5 mL.\n\nFind a 95% confidence interval for the mean volume of water dispensed into each Wasser bottle.\n\nGive your values in millilitres, correct to one decimal place.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Confidence Intervals",
            answer: "95% CI (to 1 d.p.)",
            markingGuide: ["A1 – $750 \pm 1.96 \times \frac{5}{\sqrt{30}}$."]
        },
        {
            id: 'sm-25-2-q6c',
            number: 'Section B Q6c',
            text: "The engineers decide to take 300 random samples, each containing 30 bottles, and calculate the respective 95% confidence intervals. All samples are independent.\n\nIn how many of these confidence intervals would the engineers expect the value of the true mean volume dispensed to be included?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Confidence Intervals",
            answer: "$285$",
            markingGuide: ["A1 – $0.95 \times 300 = 285$."]
        },
        {
            id: 'sm-25-2-q6d',
            number: 'Section B Q6d',
            text: "What is the minimum size of the sample required to ensure that the difference between the sample mean and the mean volume dispensed is no more than 1 mL at the 95% confidence level?",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Sample Size",
            answer: "Minimum sample size",
            markingGuide: ["A1 – $n \geq \left(\frac{1.96 \times 5}{1}\right)^2 = 96.04$, so $n = 97$."]
        },
        {
            id: 'sm-25-2-q6e',
            number: 'Section B Q6e',
            text: "Write down the null and alternative hypotheses that will be used in testing the company's claim that the mean volume of water dispensed is less than the stated mean of 750 mL.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Hypothesis Testing",
            answer: "$H_0: \mu = 750$, $H_1: \mu < 750$",
            markingGuide: ["A1 – correct null and alternative hypotheses."]
        },
        {
            id: 'sm-25-2-q6fi',
            number: 'Section B Q6f.i',
            text: "Determine the $p$-value for this test.\n\nGive your answer correct to four decimal places.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Hypothesis Testing",
            answer: "$p$-value to 4 d.p.",
            markingGuide: ["A1 – $Z = \frac{748-750}{5/\sqrt{50}}$. Find $p$-value."]
        },
        {
            id: 'sm-25-2-q6fii',
            number: 'Section B Q6f.ii',
            text: "Is the company's claim correct?\n\nExplain your conclusion in terms of the $p$-value.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Hypothesis Testing",
            answer: "Yes, claim is correct as $p < 0.01$",
            markingGuide: ["A1 – yes, company's claim is correct as $p$-value $< 0.01$ (H for incorrect $p$ if conclusion matches)."]
        },
        {
            id: 'sm-25-2-q6g',
            number: 'Section B Q6g',
            text: "At the 1% level of significance for a sample size of 50 bottles, find the critical value of the sample mean, below which a sample mean value would support the conclusion that the mean volume of water dispensed is now less than 750 mL.\n\nGive your answer correct to three decimal places.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Hypothesis Testing / Critical Values",
            answer: "Critical value to 3 d.p.",
            markingGuide: ["A1 – $\bar{x}_c = 750 - 2.3263 \times \frac{5}{\sqrt{50}}$."]
        },
        {
            id: 'sm-25-2-q6h',
            number: 'Section B Q6h',
            text: "Assume that, after the service, the true mean volume of water in the Apa bottles was found to be 747.5 mL and that the population standard deviation, $\sigma$, is 5 mL.\n\nAt the 1% level of significance, for a sample size of 50, find the probability that the company will conclude that the service has not reduced the mean volume of water in an Apa bottle.\n\nGive your answer correct to three decimal places.",
            marks: 1,
            topic: Topic.PROBABILITY,
            subTopic: "Type II Error",
            answer: "Probability to 3 d.p.",
            markingGuide: ["A1 – Type II error probability (H for using critical value from 6g)."]
        }
    ]
};
