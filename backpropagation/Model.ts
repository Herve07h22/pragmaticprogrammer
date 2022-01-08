import { Estimator } from "./Estimator";

export function train<Features>(
  estimator: Estimator<Features>,
  sells: Array<{ price: number; features: Features }>
) {
  for (let sell of sells) {
    // Get the total estimated price and the feedback of the estimators
    const price = estimator.estimate(sell.features)
    // Calculate the error 
    const error = sell.price - price
    // Back propagation
    estimator.feedback(sell.features, error)
    console.log(`-- training model. error = ${Math.abs(error)}`)
  }
}
