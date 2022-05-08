
export class Fraction {
    constructor(private numerateur:number, private denominateur:number) {
    }

    static of (numerateur:number | Fraction, denominateur?:number):Fraction {
        if (numerateur instanceof Fraction) {
            return Fraction.of(numerateur.numerateur, numerateur.denominateur)
        }
        if (denominateur === 0) throw new Error("Dénominateur zéro")
        return new Fraction(numerateur, denominateur || 1)
    }
    add (terme:Fraction) {
        if (terme.numerateur === 0) return this.reduire();
        if (this.numerateur === 0) return Fraction.of(terme).reduire()
        if (terme.denominateur === this.denominateur) return new Fraction(this.numerateur+terme.numerateur, this.denominateur).reduire()
        return Fraction.of(this.numerateur*terme.denominateur+terme.numerateur*this.denominateur, this.denominateur*terme.denominateur).reduire()
    }
    reduire() {
        for (let diviseur=2; diviseur<=Math.min(this.numerateur, this.denominateur); diviseur++) {
            if (this.denominateur%diviseur==0 && this.numerateur%diviseur==0) {
                this.denominateur = this.denominateur / diviseur
                this.numerateur = this.numerateur / diviseur
            }
        }
        return this
    }
    display () {
        if (this.denominateur===1) return String(this.numerateur)
        return `${this.numerateur}/${this.denominateur}`
    }
}