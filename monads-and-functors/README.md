# Monads and Functors

Both are usefull to create contexts around values.

Think "a box of something".

The difference between a monad and a functor is that a monad is provides a `bind` function. A functor provides a `map` function.
`bind` and `map` requires different parameters :

- `bind` needs a function that returns a monadic value
- `map` needs a function that returns a "raw" value

`bind` is usefull to chain processing functions which may return an error.



## Example of Monad
"Maybe" is a monad :
```
const value = Maybe(12)

// Note that divideBy() return a monadic value Maybe (..)
const divideBy = (denominator:number) => (numerator:number) => denominator === 0 ? Nothing : Just(numerator/denominator)

const newValue = value
                    .bind(divideBy(3))
                    .bind(divideBy(0))
                    .bind(divideBy(2))
```

## Example of Functor
"Array" is a functor :
```
const value = Array(3, 5, 8, 3)

// note that opposite() returns a value
const opposite = (value:number) => -value

const newValue = value.map(opposite)
```

