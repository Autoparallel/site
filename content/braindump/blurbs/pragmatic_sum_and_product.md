+++
title = "pragmatic sum and product"
date = "2024-04-18"
[taxonomies]
tags = ["category theory", "programming"]
+++

I wrote a blog on [algebra and computation](../../longform/holy_trinity/algebra-as-computation/) that took a deep dive into the sum and product types in programming languages. 
Briefly, I want to show you a corollary from this discussion that yields some insight for how you can structure some code.

Something that commonly happens is that we have two data types that have shared components that we want to work with. 
Let's take an example here:
```rust
struct Home {
    home_type: String,
    street_address: String,
    city: String,
    state: String,
    zip: String,
}

struct Office {
    business_name: String,
    street_address: String,
    city: String,
    state: String,
    zip: String,
}
```
These are [product types](../../longform/holy_trinity/algebra-as-computation/#product) in Rust.
Briefly, product types are a means of enforcing that all the data is present as it is required for construction and they give us a way to have the data come in "chunks" that we can work with.
The structure of products is such that they can be split and therefore resused, nested, and extended for convenience and modularity.
Those are powerful perks that we want.

For instance, above, we can see that `Home` and `Office` share some components, so given these are product types, we can refactor into the following:
```rust
struct Address {
    street_address: String,
    city: String,
    state: String,
    zip: String,
}

struct Home {
    home_type: String,
    address: Address,
}

struct Office {
    business_name: String,
    address: Address,
}
```
What we can notice here is that since we are nesting a product type in another product type, we can now build extensible structures that can be easily manipulated. 
If need be, we can handle addresses separately, or construct new types from here that contain an address, e.g.:
```rust
pub struct Apartment {
    unit_number: String,
    address: Address,
}

pub struct School {
    school_name: String,
    address: Address,
}
```
One can then know that functionality can be yielded from product types that nest in the `Address` type like so:
```rust
trait Addressable {
    fn get_address(&self) -> Address;
}
```

In summary, if you see shared context in products, it can be excised and made into its own product type, then it can be nested in the original product types.
It points to the fact that some things may just need to have the `Address` type attached to them, and now this can be enforced with something like the trait above.

On the other hand, what if we had two sum types that shared some components?
Let's take an example here:
```rust
enum SharedSpaces {
    School(School),
    Office(Office),
    Apartment(Apartment),
}

enum Residential {
    Home(Home),
    Apartment(Apartment),
}
```
These are [coproduct (sum) types (really, enumerations)](../../longform/holy_trinity/algebra-as-computation/#enumerations-tagged-unions) in Rust.
These in particular have an almost opposite data structure to products.
Instead of all components being occupied, these enforce only a single variant is occupied.
So, if that is the case, it tells us that these types should **not** be split up since combining these enumerations yields a strictly more flexible and general type where, instead of the extra structures being reused, the extra structures can now be *easily avoided* if we didn't even need them.
Sums, in essence, want to be combined and not split as we get a means of ducking out of the extra data if we don't need it.
For example, we combine like so:
```rust
enum Building {
    Home(Home),
    Office(Office),
    Apartment(Apartment),
    School(School),
}
```
and if we wanted to match only on the residential types, we can do so:
```rust
fn is_residential(building: Building) -> bool {
    match building {
        Building::Home(_) | Building::Apartment(_) => true,
        _ => false,
    }
}
```
where the `_` allows us to ignore the extra data that we don't need which is a powerful feature of sum types.

In short:
- product types with shared context should be broken into shared factors and nested for extensibility and modularity since they can be easily attached to one another.
- sum types with shared context should be combined into a single instance for generality and flexibility since they have can easily duck out of extra data.