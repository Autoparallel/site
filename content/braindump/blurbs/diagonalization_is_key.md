+++
title = "diagonalization is key"
date = "2024-04-10"
[extra]
tags = ["math", "algebra", "linear algebra"]
+++

When we first learn linear algebra we are (hopefully) taught how to find eigenvalues and eigenvectors for a matrix so that we can "diagonalize" it.
Have we been told more places that we do this?

**Diagonalization in finite dimensional inner product spaces**

Let's remind ourselves of the concept and it's utility in finite dimensional land.
Let $L \colon V \to V$ be a linear operator on a finite dimensional vector space $V$ over a field $\mathbb{F}$ with an inner product 
$$
\langle \\_ , \\_ \rangle \colon V \times V \to \mathbb{F}.
$$
An example inner product is the Euclidean dot product $\cdot$ which for $\R^n$ is defined as:
$$
\langle \boldsymbol{x}, \boldsymbol{y} \rangle = \boldsymbol{x} \cdot \boldsymbol{y} = x_1 y_1 + \cdots + x_n y_n.
$$

We say $\boldsymbol{e}$ is an *eigenvector* of $L$ with *eigenvalue* $\lambda \in \mathbb{F}$ if:
$$
L \boldsymbol{e} = \lambda \boldsymbol{e}.
$$
If there exists a basis $\boldsymbol{e}_1, \ldots, \boldsymbol{e}_n$ of $V$ such that each $\boldsymbol{e}_i$ is an eigenvector of $L$ with eigenvalue $\lambda_i$, then we say $L$ is *diagonalizable*.

Perhaps most familiarly, we can represent $L$ as an $n \times n$ matrix $[L]$ and when it is diagonalizable, we can define $[P]$ to be the change-of-basis matrix mapping the assumed basis we built $[L]$ from into the *eigen-basis* (basis of the eigenvectors of $L$).
When done properly, we get $[D] = [P]^{-1} [L] [P]$ where $[D]$ looks like:
$$
\begin{bmatrix}
\lambda_1 & 0 & \cdots & 0 \\\\
0 & \lambda_2 & \cdots & 0 \\\\
\vdots & \vdots & \ddots & \vdots \\\\
0 & 0 & \cdots & \lambda_n
\end{bmatrix}
$$
hence the name "diagonalizable" for $L$.

Why was this nice?
First a theorem:

**Theorem:** If $L$, then the basis of eigenvectors of $L$ is orthogonal.

So, without loss of generality, we can assume that $\boldsymbol{e}_i$ are chosen to be normalized to length 1 and orthogonal to each other, i.e., in symbols:
$$
\langle \boldsymbol{e}\_i, \boldsymbol{e}\_j \rangle = \delta\_{ij}.
$$

Now, with all of this, if we get a problem like this:
$$
L \boldsymbol{x} = \boldsymbol{y}
$$
for some $\boldsymbol{y} \in V$, then writing this out in terms of the eigen-basis:
$$
L (x_1 \boldsymbol{e}_1 + \cdots + x_n \boldsymbol{e}_n) = y_1 \boldsymbol{e}_1 + \cdots + y_n \boldsymbol{e}_n \\\\
\Rightarrow \lambda_1 x_1 \boldsymbol{e}_1 + \cdots + \lambda_n x_n \boldsymbol{e}_n = y_1 \boldsymbol{e}_1 + \cdots + y_n \boldsymbol{e}_n
$$
where, critically, we have this identity due to our theorem:
$$
y\_i = \langle \boldsymbol{y}, \boldsymbol{e}\_i \rangle.
$$
This means that our solution is just: $x_i = y_i/\lambda_i$.

Notice that if $\lambda_i =0$, then there is no $x_i$, but this is expected.
Namely, if $\lambda_i = 0$, then $\boldsymbol{e}_i$ is in the kernel of $L$ and so $L \boldsymbol{e}_i = 0$ and we could not have found an element of the domain that maps to $\boldsymbol{y}$.
We can rid of this problem if we assume that $L$ is definite (or, even weaker, invertible).

**Diagonalization in infinite dimensional inner product spaces**

What if we ignore the finite dimensional restriction?
Let's take an example.
Let $I = [0,1] \subset \R$ be the unit interval and consider the set of real valued smooth functions:
$$
C^\infty(I)= \\{ f \colon I \to \R \~\vert\~ f \textrm{ is smooth} \\}.
$$
Note that $C^\infty(I)$ is an (infinite dimensional) vector space over $\R$.

Now, let's let $L= \frac{d^2}{dx^2}$ be the second derivative operator (also called the [Laplacian](https://en.wikipedia.org/wiki/Laplace_operator)).
This operator is indeed linear and furthermore it is a diagonalizable (or, *self adjoint*) and (negative) definite operator on $C^\infty(I)$.
Now, how can I show you this?
We just consider the eigenvalue problem:
$$
\frac{d^2}{dx^2}f = \lambda^2 f.
$$
which is often called the [Helmholtz equation](https://en.wikipedia.org/wiki/Helmholtz_equation).
Note that $\varphi_\lambda(x)= e^{\lambda x}$ solves this expression for any $\lambda$. 
Hence $\varphi_\lambda(x)$ is an eigen"function" of $L$ with eigenvalue $\lambda^2$.

But I've dropped two key ingredients that we need right now:
1. We need an inner product on $C^\infty(I)$.
2. We need boundary conditions since it doesn't even make sense to consider $\frac{d^2}{dx^2}$ on the endpoints $\\{0,1\\}$.

For the first, we can define the inner product in the same way we define the Euclidean dot product.
That is, we just multiply each component of each vector together, then add them up. 
In continuum land, this is just this integral:
$$
\langle f, g \rangle = \int_0^1 f(x) g(x) dx.
$$
Nice, right?

Let's now consider the second point.
On the endpoints of $I$, we can consider the following boundary conditions:
1. [Periodic boundary conditions](https://en.wikipedia.org/wiki/Periodic_boundary_conditions);
2. [Dirichlet boundary conditions](https://en.wikipedia.org/wiki/Helmholtz_equation);
3. [Neumann boundary conditions](https://en.wikipedia.org/wiki/Neumann_boundary_condition);
4. [Robin boundary conditions](https://en.wikipedia.org/wiki/Robin_boundary_condition).

To keep things simple, let's use periodic boundary conditions which you can imagine take the endpoints $\\{0,1\\}$ of our line segment $I$, and glue them together making a circle.
Formulaically, this just implies that we are looking at the space:
$$
C\_\textrm{p}^\infty(I) = \\{ f \colon I \to \R \~\vert\~ f \textrm{ is smooth and } f(0) = f(1) \\}.
$$
Coming back to our previous answer where we found the eigenfunctions to be $\varphi_\lambda(x) = e^{\lambda x}$, we can now see that the eigenfunctions with the new boundary conditions are:
$$
\varphi_{n}(x) = e^{2\pi i n x}
$$
for $n \in \Z$.
Feel free to check this work and be skeptical that we now have *complex* eigenfunctions.
Ignore the complex numbers for now, they are just a technicality (you sometimes add them in to diagonalize matrices too).
I will just adjust our inner product slightly so that we take the complex conjugate $\*$ of the first function, i.e.:
$$
\langle f, g \rangle = \int_0^1 f(x)^* g(x) dx.
$$
Okay great. 
Now, can we do the same trick we did before to solve problems?

Absolutely.
Note that just as before $\\{\varphi_n\\}$ is an orthonormal basis of $C\_\textrm{p}^\infty(I)$.
Hence, if we have a problem like this:
$$
L f = g
$$
then we can write this out in terms of the eigenbasis:
$$
L \sum\_{n \in \Z} f_n \varphi_n(x) = \sum\_{n \in \Z} g_n \varphi_n(x)\\\\
\Rightarrow \sum\_{n \in \Z} \lambda_n^2 f_n \varphi_n(x) = \sum\_{n \in \Z} g_n \varphi_n(x)
$$
where again $g_n = \langle g, \varphi_n \rangle$.
Lo and behold we should probably write this last bit out:
$$
g_n = \int_0^1 g(x) e^{2 \pi i n x} dx
$$
which is often called the [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform) of $g$.
Just to be clear, because we're on a compact set, the $g_n$ are a discrete set of numbers.
All in all, this means our solution to the problem is:
$$
f_n = \frac{g_n}{4 \pi n^2}.
$$
Incredible, really!

---

There's a lot more to be said here.
We can do this sort of thing for any (definite) linear operator on any [(Hilbert) space](https://en.wikipedia.org/wiki/Hilbert_space).
I'll come back around at some point to show the extension of this and how you can use this same concept to solve problems like those in electromagnetism.