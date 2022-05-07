import { Fraction } from "./Fraction"

it("Une fraction peut être la somme de deux entiers dont un zéro", ()=>{
    const somme = new Fraction(2).add(new Fraction(0))
    expect(somme.display()).toBe("2")
})

it("Une fraction peut être la somme de deux entiers ", ()=>{
    const somme = new Fraction(2).add(new Fraction(1))
    expect(somme.display()).toBe("3")
})

it("Une fraction peut être la somme de deux fraction de même dénominateur", ()=>{
    const somme = new Fraction(4,3).add(new Fraction(1,3))
    expect(somme.display()).toBe("5/3")
})

it("Une fraction peut être la somme de deux fraction de dénominateur differents", ()=>{
    const somme = new Fraction(4,5).add(new Fraction(2,3))
    expect(somme.display()).toBe("22/15")
})

it("Une fraction peut être reduite", ()=>{
    const somme = new Fraction(15,12).reduire()
    expect(somme.display()).toBe("5/4")
})

it("Une somme de deux fraction est automatiquement réduite", ()=>{
    const somme = new Fraction(4,5).add(new Fraction(1,5))
    expect(somme.display()).toBe("1")
})
