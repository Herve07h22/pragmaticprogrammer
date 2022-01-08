import { Estimator } from "./Estimator";
import { RealEstateFeature } from "./RealEstateFeature";

export class RealEstateEstimator implements Estimator<RealEstateFeature> {
  name:string;
  weight: number=40000;
  convergenceFactor=0.1;
  convolutionMethod: (features: RealEstateFeature) => number;

  constructor(
    name:string,
    convolutionMethod: (features: RealEstateFeature) => number
  ) {
    this.name=name
    this.convolutionMethod = convolutionMethod;
  }

  inspect () {
    console.log(`Estimator ${this.name} weight = ${this.weight}`)
  }

  feedback(features: RealEstateFeature, error: number, debug?:boolean) {
    debug && console.log(`Training estimator ${this.name} weight = ${this.weight} error = ${error}`)
    this.weight = this.weight + error * this.convergenceFactor * this.convolutionMethod(features);
  }

  estimate(features: RealEstateFeature) {
    return this.weight * this.convolutionMethod(features)
  }
}

