+++
title = "perfect secrecy"
date = "2024-04-06"
[extra]
tags = ["math", "cryptography"]
+++

Encryption is a mapping a space of *messages* $\mathcal{M}$ into a space of *ciphertexts* $\mathcal{C}$ using a set of *ciphers* $\mathcal{T}$. 
To decrypt, we need a set of *keys* $\mathcal{K}$.
So we have for for $C \in \mathcal{C}$ and $K \in \mathcal{K}$:
$$
C : \mathcal{M} \to \mathcal{C}
$$
$$
K : \mathcal{C} \to \mathcal{M}
$$

When do we deem that an encryption scheme gives us *perfect secrecy*?

Let's think about this intuitively first.
Assuming a cryptanalyst has access to a collection of ciphertexts $\\{C_1, C_2, \dots, C_n\\}$ and knows the encryption system being used. 
That is, they know the set of ciphers $\mathcal{T}$ and the set of keys $\mathcal{K}$ as well as the probabilities they are used.
What can they learn about the original messages $\mathcal{M}$ given this information?
If the encryption scheme is perfectly secret, then the cryptanalyst should not be able to learn anything about the original messages without any other information entering their mind.

Said another way, an encryption scheme is perfectly secret if the probability of the cryptanalyst determining any message $M$ does not increase no matter how many ciphertexts $C$ they have received.
Therefore, determining any $M$ given a list of ciphertexts $C$ has the same likelihood as determining $M$ without having received any ciphertexts whatsoever.
The cryptanalyst's best guess is to decipher by brute force using the keys at their disposal.

We can formulate this mathematically.
The probability of $M$ being the message yielding the ciphertext $C$ is $P(M|C)$.
Using Bayes' theorem, we have:
$$
P(M|C) = \frac{P(C|M)P(M)}{P(C)}.
$$
If the encryption scheme is perfectly secret, then we gain no information by observing ciphertexts and hence the probability of getting a ciphertext $C$ given a message $M$ is just that of knowing the message $M$ outright. 
That is:
$$
P(C|M) = P(C).
$$

Two facts follow from the above:
1. The number of ciphertexts $|\mathcal{C}|$ must be at least as large as the number of messages $|\mathcal{M}|$.
2. The number of possible keys $|\mathcal{K}|$ must be at least as large as the number of messages $|\mathcal{M}|$.

**Proof of 1:** For 1, assume that $|\mathcal{C}| = |\mathcal{M}| - 1$.
Without loss of generality, we use the pigeonhole principal to see there is a case for which messages $M_1$ and $M_2$ are encrypted to the same ciphertext $C$, but no other two messages are encrypted to the same ciphertext.
Therefore the probability $P(C|M) > P(C'|M)$ when $C'\neq C$, but $P(M_1) = P(M_2)$ assuming messages are equally likely.
This implies there is a case for which $P(C|M) \neq P(M)$ and hence the encryption scheme is not perfectly secret. 

**Proof of 2:** Assume that we have perfect secrecy with $|\mathcal{K}| = |\mathcal{M}| -1$.
Pigeonhole implies, there are at least two ciphertexts $C_1$ and $C_2$ so that $K(C_1)=K(C_2) = M$, but we can assume without loss of generality that no other two ciphertexts have the same key.
Therefore, $P(M|C) > P(M|C')$ when $C'\neq C_1$ and $C' \neq C_2$. 
However, with perfect secrecy $P(C|M) = P(C)$ and hence $P(M|C) = P(M)$.
Yet, if $P(M)$ is uniformly chosen, then $P(M|C) = P(M)$ for all $C$ and all $M$ which contradicts the fact that we found a case where $P(M|C) > P(M|C')$.

---

I am rather new to cryptography, so I wanted to try to prove these results myself.
I'm not completely sure these proofs are valid and that I have everything right here, but it did seem like it was along the right track.
Please let me know if you see any errors or have any suggestions for improvement.