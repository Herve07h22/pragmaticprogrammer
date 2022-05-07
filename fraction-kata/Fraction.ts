
export class Fraction {
    private numerateur:number;
    private denominateur:number;
    constructor(numerateur:number, denominateur?:number) {
        this.numerateur = numerateur
        if (denominateur === 0) throw new Error("Dénominateur zéro")
        this.denominateur = denominateur || 1
        this.numerateur = numerateur
    }
    add (terme:Fraction) {
        if (terme.numerateur === 0) return this.reduire();
        if (terme.denominateur === this.denominateur) return new Fraction(this.numerateur+terme.numerateur, this.denominateur).reduire()
        return new Fraction(this.numerateur*terme.denominateur+terme.numerateur*this.denominateur, this.denominateur*terme.denominateur).reduire()
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