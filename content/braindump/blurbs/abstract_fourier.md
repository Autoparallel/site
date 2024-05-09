+++
title = "abstract Fourier"
date = "2024-05-09"
[taxonomies]
tags = ["math", "algebra"]
+++

The Fourier transform is such a general and ubiquitous entity in mathematics.
One of my goals is to tie up some loose ends I had in my understanding of all of it.
So, we'll start with at least something here.
As always, there's a tendency to lack a bit of rigor and devout formalism in these blurbs, so take what I'm saying with a grain of salt and DYOR (I hope this pushes you to DYOR!).

What is perhaps the most basic property of the Fourier transform (or anything like it)?
The key concept is algebraic in that the Fourier transform is a isomorphism of algebras that maps convolution to pointwise multiplication which is given in the [convolution theorem](https://en.wikipedia.org/wiki/Convolution_theorem).
In precise settings, you may get more from this property than you might expect.

Let $G$ be a group, then the **Fourier transform** is an isomorphism of algebras $\mathcal{F} : L^2_\mathbb{F}(G) \to L^2_\mathbb{F}(\widehat{G_\mathbb{F}})$ where $\widehat{G_\mathbb{F}}$ is the dual group of $G$.
Briefly, I am obsessively tagging these items with subscripted $\mathbb{F}$ whereas you may see nothing of the sort elsewhere.
What are all of these things?

- $L^2_\mathbb{F}(G)$ is the Hilbert space of square-integrable $\mathbb{F}$-valued functions on $G$ where $\mathbb{F}$ is some field (some of this can be done with a ring $R$ instead and some of this is easiest with $\mathbb{F}=\mathbb{C}$) -- note that I am not really assuming that $G$ is some smooth group or anything as I will mean integration in a very general sense (e.g., sums in discrete land).

- The dual group $\widehat{G}_\mathbb{F}$ is the set of all (continuous) **characters**
$$\chi : G \to \mathbb{F}.$$
The additional important restriction here is that characters are invariant over conjugacy classes in $G$, that is $\chi(hgh^{-1})=\chi(g)$
We will get to details of characters later on.

First, we see that $L^2_\mathbb{F}(G)$ is an algebra under convolution (as multiplication) and pointwise addition.
Let $u, v \in L^2_\mathbb{F}(G)$, then the *convolution* of $u$ and $v$ written as $u \ast v$ is defined by:
$$(u \ast v)(g) = \int_{h \in G} u(h) v(gh^{-1}) d\lambda(h)$$
where, concatenation is the multiplication in $\mathbb{F}$, and we write the group operation in the group $G$ as concatenation with inverse as the superscript $-1$.
Further, I have appended a measure on $G$ via $d\lambda$ which is a translation invariant measure on $G$ called the [**Haar measure**](https://en.wikipedia.org/wiki/Haar_measure).
This means $d\lambda(gh) = d\lambda(g)$ for all $h \in G$ which, in a sense, means that $\lambda$ sees all of $G$ as homogeneous (there's no lumpiness or concentration of mass in $G$ that $\lambda$ sees).

Now, the convolution theorem states that the Fourier transform $\mathcal{F}$ is an isomorphism of algebras in that 
$$
\mathcal{F}(u\ast v) = \mathcal{F}(u) \cdot \mathcal{F}(v)
$$
where $\cdot$ is pointwise multiplication in $L^2(\widehat{G}_\mathbb{F})$.
This is where we want to construct since this property is immensely powerful.

Also very important is that the mapping $L^2_\mathbb{F}(G) \times L^2_\mathbb{F}(G) \to \mathbb{F}$ via:
$$
\langle u, v\rangle \coloneqq \frac{1}{|G|}\int_{g \in G} u(g)^{\textrm{op}} v(g) d\lambda (g)
$$
is an inner product on $L^2_\mathbb{F}(G)$ and $\textrm{op}$ signifies a relevant adjoint used if necessary (we can always construct this inner product and they will always be proportional see [here](http://sporadic.stanford.edu/bump/group/gind2_3.html) which will be helpful later too).
This is where the conjugacy class invariance will really shine.

Here's where things get amazing.
Let's use the following theorem which is, in a sense, a generalization of [Maschke's theorem](https://en.wikipedia.org/wiki/Maschke%27s_theorem) for finite groups which can be proven using the [Wedderburn-Artin theorem](https://en.wikipedia.org/wiki/Wedderburn–Artin_theorem).

**Theorem (Peter-Weyl):** We have that
$$
L^2_\mathbb{F}(G) = \overline{\bigoplus_{\pi \in \Sigma}} E_\pi^{\oplus \dim E_\pi}
$$
where $\Sigma$ is the set of isomorphism classes of irreducible representations of $G$ and the overline denotes the closure in $L^2_\mathbb{F}(G)$.

Now, if we can just find a way to project onto the [irreducible representations](https://en.wikipedia.org/wiki/Irreducible_representation), we can decompose any function in $L^2_\mathbb{F}(G)$ into its characteristic components and with any luck, we tie up some loose ends in my above ramblings.
The means to do so is using another immense result.
First, our notion of characters was as conjugacy class invariant maps $\chi \colon G \to \mathbb{F}$
which (when they're morphisms) pair together with perfectly with the translation invariant measure in our inner product along with the following result give us the power we need:

**Lemma (Schur):** Let $R$ be a ring and $M, N$ be simple $R$-modules. Let $\varphi \in \text{Hom}_R(M, N)$, then $\varphi$ is either an isomorphism or the zero map. 

If we look above, we see that $L^2_\mathbb{F}(G)$ is split into non-isomorphic irreducible representations which just so happen to be simple $\mathbb{F}[G]$-modules (a brief on the relationship [here](https://en.wikipedia.org/wiki/Simple_module#:~:text=If%20k%20is%20a%20field,also%20known%20as%20irreducible%20representations.)).

Then, we can project onto these irreducible representations using the irreducible characters of $G$ since these characters are exactly the functions that split $L^2_\mathbb{F}(G)$ as:

**Corollary:** The projection of $u \in L^2_\mathbb{F}(G)$ onto the irreducible representation $E_\pi$ is given by virtue of the orthogonality of characters as:
$$
\langle \chi_\pi, \chi_{\pi\'} \rangle = \frac{1}{|G|}\int_{g \in G} \chi_\pi(g)^{\textrm{op}} \chi_{\pi\'}(g) d\lambda(g) = \begin{cases} d_{\pi \pi\'} & \pi = \pi\' \\\\ 0 & \pi \neq \pi\' \end{cases}
$$
where $d_{\pi \pi\'}\neq 0$ for all $\pi, \pi\'$. 

Hence, we now have a mapping $\mathcal{F} : L^2\_\mathbb{F}(G) \to L^2\_\mathbb{F}(\widehat{G}\_\mathbb{F})$ which is an isomorphism of algebras and we can project onto the irreducible representations of $G$ using the characters of $G$.
In particular, let $u\in L^2_\mathbb{F}(G)$ then the map $\mathcal{F}$ is given by:
$$
\mathcal{F}(u) = \int_{\pi \in \Sigma} \langle u, \chi_\pi \rangle \chi_\pi
$$
which now is a sum of $\mathbb{F}$-linear combinations of the irreducible characters of $G$ which are exactly elements of $\widehat{G}_\mathbb{F}$ which form a basis for $L^2\_\mathbb{F}(\widehat{G}\_\mathbb{F})$.

The inverse Fourier transform is given by:
$$
\mathcal{F}^{-1}(\mathcal{F}(u)) = \int_{\pi\' \in \Sigma} d_{\pi \pi\'}^{-1}\left\langle \int_{\pi \in \Sigma} \langle u, \chi_\pi \rangle \chi_\pi, \chi_{\pi\'} \right\rangle \chi_{\pi\'} = u
$$
where we have used the orthogonality of characters in the inner product.

This shows that the Fourier transform is an isomorphism of $\mathbb{F}$-vector spaces, but we need to show that it is an isomorphism of algebras.
Now, if we take specifically the component of $u \ast v$ in the irreducible representation $E_\pi$, we have that:
$$
\begin{align*}
\mathcal{F}\_{\chi\_\pi}(u \ast v) &= \langle u \ast v, \chi\_\pi \rangle \\\\
&= \left \langle \int_{h \in G} u(h) v(gh^{-1}) d\lambda(h), \chi_\pi\right \rangle \\\\
&= \int_{l \in G} \int_{h \in G} u(h) v(l h^{-1}) \chi_\pi(l) d\lambda(h) d\lambda(l)
\end{align*}
$$
and we realize that, to get to our intended answer, we need something slightly stronger. 
In particular, if $\chi \colon G \to \mathbb{F}$ is *multiplicative* (i.e., $\chi(gh)=\chi(g)\chi(h)$), then we have that we can do a change of variables $l \mapsto k = lh$ and we get:
$$
\begin{align*}
\mathcal{F}\_{\chi\_\pi}(u \ast v) &= \int_{l \in G} \int_{h \in G} u(h) v(l h^{-1}) \chi_\pi(l) d\lambda(h) d\lambda(l) \\\\
&=\int_{k \in G}\int_{h\in G} u(h) v(k h^{-1}) \chi_{\pi}(k) d\lambda(h) d\lambda(k)\\\\
&= \int_{k \in G} \int_{h \in G} u(h) v(l) \chi_\pi(h)\chi_\pi(l) d\lambda(h) d\lambda(k) & \text{by multiplicativity} \\\\
&= \int_{h \in G} u(h) u(h) \chi_\pi(h) d\lambda(h) \cdot \ \int_{l \in G} v(l) \chi_\pi(l) d\lambda(l) & \text{by translation invariance of $\lambda$}\\\\
&= \mathcal{F}\_{\chi\_\pi}(u) \cdot \mathcal{F}\_{\chi\_\pi}(v)
\end{align*}
$$

Now, we have a nice result that:

**Theorem:** Let $G$ be an abelian group. Then the irreducible representations are 1-dimensional and the Fourier transform is an isomorphism of algebras. That is, all characters of irreducible representations are multiplicative. Lastly, $d_{\pi \pi\'} = 1$ for all $\pi, \pi\'$.

Let's try to think of a function $\delta$ where we can compute the convolution with any function $u$ and get back $u$, i.e., $u \ast \delta = u$ where $v$ is the multiplicative identity element of the convolution algebra.
By definition, we have:
$$
(u \ast \delta)(g) = \int_{h \in G} u(h) \delta(gh^{-1}) = u(g).
$$
Note that we can also write $\delta_g(h) = \delta(gh^{-1})$ by which we see that $\delta_e(h)=\delta(h)$ where $e\in G$ is the identity of $G$. 
Our question now is, given some group $G$, what is this $\delta$?

Given now that we have the Fourier transform as a an algebra isomorphism $\mathcal{F} \colon L^2_\mathbb{F}(G) \to L^2_\mathbb{F}(\widehat{G_\mathbb{F}})$, then we have:
$$
\mathcal{F}(u \ast v) = \mathcal{F}(u) \cdot \mathcal{F}(v)
$$
and:
$$
\mathcal{F}(u) = \mathcal{F}(u \ast \delta) = \mathcal{F}(u) \cdot \mathcal{F}(\delta) = \mathcal{F}(u)
$$
and we see that the isomorphism (as is required) drags the identity in $L^2\_\mathbb{F}(G)$ to the identity in $\mathbb{F}$.

Given our results, we can use the inverse Fourier transform to find this $\delta$.
In particular, we have that the multiplicative identity in $L^2_\mathbb{F}(\widehat{G_\mathbb{F}})$ is $1$ and hence we have:
$$
\begin{align*}
\mathcal{F}^{-1}(1) &= \int_{\pi \in \Sigma} \langle 1, \chi_\pi \rangle \chi_\pi \\\\
\end{align*}
$$

This is where I'll leave off, but we have set the stage for a lot more.
I'll point to [Pontryagin duality](https://en.wikipedia.org/wiki/Pontryagin_duality) which we have almost come to here which is closely related to [space and quantity duality](../braindump/#space-and-quantity-duality).
For the latter point, we see that in a space of functions (quantities) with rich algebraic structure like the multiplicative characters $\chi \colon G \to \mathbb{F}$, we can identify the space itself such as a $g \in $G$ with quantities $\delta_g \in L^2_\mathbb{F}(G)$.
In the best cases, we can topologize the set of such $\delta_g$ and recover the group $G$ itself.


---
It is possible to do this same sort of thing for non-group algebras and the like, but I will leave that for another time.
In case you're interested, see the [Gelfand representation](https://en.wikipedia.org/wiki/Gelfand_representation) for a generalization of this to non-group algebras (and note, you don't *really* need to use $\mathbb{C}$ in the statements you see there).