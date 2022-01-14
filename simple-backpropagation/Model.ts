import { Estimator } from "./Estimator";

export function train<Features>(
  estimator: Estimator<Features>,
  sells: Array<{ price: number; features: Features }>
) {
  for (let sell of sells) {
    // Get the total estimated price and the feedback of the estimators
    const price = estimator.estimate(sell.features);
    // Calculate the error
    const error = sell.price - price;
    // Back propagation
    estimator.feedback(sell.features, error);
    console.log(`-- training model. error = ${Math.abs(error)}`);
  }
}

export function error<Features>(
  estimator: Estimator<Features>,
  sells: Array<{ price: number; features: Features }>
) {
  const errors: number[] = [];
  for (let sell of sells) {
    const price = estimator.estimate(sell.features);
    const error = Math.abs(sell.price - price);
    errors.push(error);
  }
  return errors.reduce((sum, error) => error + sum, 0) / errors.length;
}
