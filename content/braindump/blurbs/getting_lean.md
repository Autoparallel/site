+++
title = "getting lean"
date = "2024-04-20"
[taxonomies]
tags = ["mathematics", "programming", "lean"]
+++

Today I made my first attempts to work with Lean 4.
I wanted to define a type and prove some properties about it.
Here are some of my thoughts about it so far.

First, I had some gripes trying to work with the Lean 4 environment itself.
I followed the instructions from the [Lean 4 manual](https://lean-lang.org/lean4/doc/quickstart.html) exactly.
For one, opening up a `.lean` file and typing: `import ` *sometimes* yields a menu that shows me available imports though usually I am immediately met with a red underline and an error message.
Sometimes I am able to see the imports, e.g., I can type `import Mathlib` and, when lucky, I see a list of available imports.
Yet past that I still found trying something like `import Mathlib.Top` would filter and show me imports with this prefix, but it did not seem to work with me.
Nonetheless, I am sure I can fix this problem and the Zulip chat seems to be extremely active!

Next, I have found the filesystem organization to be a bit confusing (though maybe it's just a skill issue).
I have become so spoiled with Rust and Cargo that I may just find it difficult to work with a new system.
Not having the ease of a package manager like Cargo is a bit of a bummer as you have to stub something like: `require mathlib from git "https://github.com/leanprover-community/mathlib4"` in your lakefile.


Lastly, I had some kind of issue where I could write a `theorem` using some syntax, but not a `lemma` with the same syntax. 
I'm not quite sure why that's the case, but I'll have to read more.
**Please don't take any of this as a shot at Lean itself**, I'm just finding this to be a bit more challening than I was hoping, but I am sure I will get the hang of it!
I look forward to this challenge and learning with the community!

Now, onto the good stuff.
Defining things like types and functions is a breeze.
For instance, I defined the following:
```lean
def PosNat := { n : Nat // n > 0 }
def prev (n : PosNat) : Nat := n.val - 1
```
which is the type of positive natural numbers and a function that returns the predecessor of a positive natural number as a natural number.
From this, I was challenging myself to prove some statements about this type with this function.

This felt like I was catupulted back to my undergraduate days when I was first learning about proofs.
Because I was too eager, I wanted to immediately jump to proving that this map was injective and surjective, but that was a bit too much for me.
Instead, I took a step back and wanted to prove a helpful statement that would ideally help me out with the injective and surjective proofs.
Let's take a look

Let's write the statement formally here:

**Theorem:** For a positive natural number $n$, the previous value $n-1$ is equal to 0 if and only if $n$ is equal to 1.

Now, let's see how we write this in lean:
```lean
theorem prev_eq_zero_iff_eq_one (n : PosNat) : prev n = 0 ↔ n.val = 1 := by
  apply Iff.intro
  { intro h
    have h1 : n.val - 1 = 0 := h
    have h2 : n.val = 1 := by
      calc
        n.val = n.val - 1 + 1 := by rw [Nat.sub_add_cancel n.property]
        _ = 1 := by rw [h1]
    exact h2
  }
  { intro h
    have h1 : prev n = 0 := by
      calc
        prev n = n.val - 1 := by rfl
         _ = 1 - 1 := by rw [h]
         _ = 0 := by rfl
    exact h1
  }
```
Now, let's break this down:
1. We start by applying the `Iff.intro` tactic to split the proof into two directions. 
The first set of brackets needs to prove that `prev n = 0` implies `n.val = 1` and the second set of brackets needs to prove that `n.val = 1` implies `prev n = 0`.
2. (Prove first direction) We can note that `n.val - 1 = 0` is granted to us by our initial assumption here and by the definition of `prev`.
We follow now by showing that `n.val = 1` by doing a calculation.
Specifically, this calculation is the math:
$$
n = n - 1 + 1 = 1
$$
where we can cancel $-1 + 1$ using the result `Nat.sub_add_cancel` given the property of `n` which is that `n.val > 0`.
All of this yields the first direction.
3. (Prove second direction) This one is a bit easier as we are showing that `n.val = 1` implies `prev n = 0`.
We have our initial assumption and then we want to show `prev n = 0` by calculation again.
This time, we have:
$$
n - 1 = 1 - 1 = 0
$$
with the final equality given to us by the `rfl` tactic which, in this case, extends the equality by reflexivity $1=1$ to yield $1-1 = 0$.

---

We have now proven something, albeit very simple!
What I find really interesting about this is that I can now take this type I've just defined, and work with it programmatically **knowing** that these features about the type are provably true. 
Being able to both prove theorems in math formally is **and** use them for programs is insanely powerful!