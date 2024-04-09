+++
title = "algebra and codes"
date = "2024-04-08"
[extra]
tags = ["math", "algebra", "codes"]
+++

*Codes* are a means of providing redundancy and consistency checks in data transmission.
What I am finding interesting is how codes are related to algebraic geometry and how they pop their head up in other protocols.
For example, STARKs use Reed-Solomon codes in [FRI](https://hackernoon.com/zero-knowledge-proof-algorithm-zk-stark-fri-protocol) SNARKs can use [linear codes](https://zk-learning.org/assets/lecture7.pdf) and [sumcheck](https://blog.lambdaclass.com/have-you-checked-your-sums/) uses multilinear encoding.
Here's a bit on both [STARKs and SNARKs](https://aszepieniec.github.io/stark-anatomy/).

We can quickly write down the Reed-Solomon code process.
Firstlet $\mathbb{F}\_q$ be a finite field and let $m=\\{m_0, m_1, \ldots, m_{n-1}\\}$ be the message we want to encode written in terms of elements of the field (if written in bits, just combine into field elements).
Then we define a polynomial using this message:
$$
p_m(a)= \sum_{i=0}^{n-1} m_i a^i
$$
If we then take $\\{a_0, a_1, \ldots, a_{n-1}\\} \in \mathbb{F}\_q$ to be distinct points in the finite field, we can evaluate the polynomial at these points to get the codeword:
$$
\\{p_m(a_0), p_m(a_1), \ldots, p_m(a_{n-1})\\}.
$$
That's the encoding process.

We decode using Lagrange interpolation and, since this degree $k-1$ polynomial is uniquely determined by $k$ points, we can recover the message from the codeword even when $n-k$ elements are missing. 

Kicking this up a notch, we can look at Reed-Muller codes which, for all intents and purposes, seem to take Reed-Solomon codes but extend the definition into multivariate polynomials.
We encode a message the same way as Reed-Solomon as we can define a Reed-Muller code from a message $m$ by a multivariate polynomial $p_m(x_1, x_2, \ldots, x_r)$ and then evaluating at points in $\mathbb{F}\_q^r$. 

Where does the algebra or algebraic geometry come in?
I started reading this piece, [Algebraic Geometry Codes](https://www.cs.utexas.edu/~danama/courses/codes/lec7-AG-codes.pdf) which begins quickly by mentioning this:
We take a geometric object $\mathcal{X}$ which is an algebraic variety (zeros of a set of polynomials), get a collection of rational points $\mathcal{P} = \\{P_1, P_2, \ldots, P_n\\}$ on this variety (lie in $\\mathbb{F}\_q$), a set of functions $L=\\{ f \colon \mathcal{X} \to \mathbb{F}\_q\\}$, and finally an evaluation map $\operatorname{ev}\_\mathcal{P} \colon L \to \mathbb{F}\_q^n$ so that $$\operatorname{ev}\_\mathcal{P}(f) = \\{f(P\_1), f(P\_2), \ldots, f(P\_n)\\}.$$

We can see that Reed-Solomon and Reed-Muller codes are examples of algebraic geometry codes.
In particular, Reed-Solomon takes $\mathcal{X}$ to be the affine-line over $\mathbb{F}_q$ and Reed-Muller takes $\mathcal{X}$ to be the $r$-dimensional affine space over $\mathbb{F}_q$.

---

There's a lot of beauty in algebraic varieties, and the paper goes on to describe how the genus of these varieties relates to curves.
Further, it also gets into Riemann-Roch which I'd be interested in seeing how it relates to codes.
