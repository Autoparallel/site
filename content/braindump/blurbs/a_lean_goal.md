+++
title = "a lean goal"
date = "2024-04-22"
[taxonomies]
tags = ["mathematics", "programming", "cryptography", "lean"]
+++

I have been working with Lean 4 for a few days now and I have been enjoying it quite a bit.
My current goal is to extend some of the very recent work that [proves the group law on elliptic curves](https://arxiv.org/pdf/2302.10640.pdf).
It may be a bit ambitious, but I like the idea of a challenge and the upshot is well worth it in my opinion.

Essentially, what has been shown now is that the points on an elliptic curve form a group, and this is defined in [`Mathlib/AlgebraicGeometry/EllipticCurve/Group.lean`](https://github.com/leanprover-community/mathlib4/blob/master/Mathlib/AlgebraicGeometry/EllipticCurve/Group.lean), specifically
```lean
noncomputable instance instAddCommGroupPoint : AddCommGroup W.Point where
  nsmul := nsmulRec
  zsmul := zsmulRec
  zero_add := zero_add
  add_zero := add_zero
  add_left_neg := add_left_neg
  add_comm := add_comm
  add_assoc := add_assoc
```
So, we know that the points on an elliptic curve form an abelian (additive commutative) group.

From here, if we wanted to use this for elliptic curve cryptography (ECC) we would specifically want to restrict to the case where the field for the curve is a finite field.
On my end, I've worked on this a bit to get an instance of a `Group` from the points on an elliptic curve over a finite field.
See this snippet:
```lean
def ECPoints {k : Type} [Field k] [Fintype k] (E : EllipticCurve k) : Type := E.toAffine.Point

noncomputable instance ECPointsCommGroup {k : Type} [Field k] [Fintype k] (E : EllipticCurve k) : AddCommGroup (ECPoints E) :=
WeierstrassCurve.Affine.Point.instAddCommGroupPoint

noncomputable instance ECPointsGroup {k : Type} [Field k] [Fintype k] (E : EllipticCurve k) : Group (ECPoints E) :=
  {
    one := AddCommGroup.toAddGroup.zero,
    mul := AddCommGroup.toAddGroup.add,
    inv := AddCommGroup.toAddGroup.neg,
    one_mul := AddCommGroup.toAddGroup.zero_add,
    mul_assoc := AddCommGroup.toAddGroup.add_assoc,
    mul_one := AddCommGroup.toAddGroup.add_zero,
    mul_left_inv := AddCommGroup.toAddGroup.add_left_neg,
  }
```
One useful fact for us if we want to use this for cryptography is the following theorem:

**Theorem:** The group of points on an elliptic curve over a finite field is cyclic or the product of two cyclic groups.

One can find a reference [here](http://koclab.cs.ucsb.edu/teaching/ecc/eccPapers/Washington-ch04.pdf) for this theorem.
Anyway, it took me a bit, but we had to create a new proposition in Lean which defines the notion that a group is the product of two cyclic groups:
```lean
def IsProductOfTwoCyclicGroups (G : Type*) [Group G] : Prop :=
  ∃ (H K : Subgroup G), IsCyclic H ∧ IsCyclic K ∧ Nontrivial H ∧ Nontrivial K ∧ Nonempty (G ≃* H.prod K)
```
but once we had this, we were ready to state our theorem:
```lean
theorem point_group_is_cyclic_or_product_of_cyclic {k : Type} [Field k] [Fintype k] (E : EllipticCurve k) [Group (ECPoints E)] :
  IsCyclic (ECPoints E) ∨ IsProductOfTwoCyclicGroups (ECPoints E) := by
  sorry
```
Right now, this remains unproven in Lean (the `sorry` keyword is a placeholder for a proof), but I am excited to work on this and see where it goes.
Once this is proven, it would be nice to refine this with other results in order to be able to classify which curves are cyclic groups and which are a product. 
Further, we would then want to be able to construct the generators for those groups in a formal way.
This would allow us to then do some cryptography!

---

I will continue to work in my [`Autoparallel/shred` repository](https://github.com/Autoparallel/shred), so if you want to see progress or contribute, feel free to check it out!