import { Estimator } from "./Estimator";
import { RealEstateEstimator } from "./RealEstateEstimators";
import { RealEstateFeature } from "./RealEstateFeature";

export class RealEstateGreedyManagerEstimator implements Estimator<RealEstateFeature> {
    weight:number = 0; // Correction made by the manager
    convergenceFactor = 0.1
    constructor (public name:string, private agents:RealEstateEstimator[]) {}
    estimate (features: RealEstateFeature) {
        // Greedy manager takes the max
        const maxOfPrices:number = this.agents.reduce(
            (
              price,
              estimator
            ) =>  estimator.estimate(features) > price ? estimator.estimate(features) : price,
            0
          );  
          return maxOfPrices + this.weight
    }
    feedback (features: RealEstateFeature, error: number) {
        this.agents.forEach(e => e.feedback(features, error))
        this.weight += error * this.convergenceFactor
    }

    inspect () {
        this.agents.forEach(e => e.inspect())
        console.log(`Estimator ${this.name} weight = ${this.weight}`)
    }

}