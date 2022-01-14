import { Estimator } from "./Estimator";

export function normalize(sells: Array<{ price: number; inputs: number[] }>) {
  const prices = sells.map((sell) => sell.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const delta = maxPrice - minPrice;

  return {
    minPrice,
    delta,
    normalizedSells: sells.map((sell) => ({
      inputs: sell.inputs,
      price: (sell.price - minPrice) / delta,
    })),
  };
}

export function train(
  finalEstimator: Estimator,
  sells: Array<{ price: number; inputs: number[] }>
) {
  const { normalizedSells, minPrice, delta } = normalize(sells);
  for (let sell of normalizedSells) {
    // Get the total estimated price and the feedback of the estimators
    const price = finalEstimator.estimate(sell.inputs);
    // Calculate the error
    const error = ((sell.price - price) * (sell.price - price)) / 2;
    // Back propagation
    finalEstimator.feedback(finalEstimator.name, sell.inputs, error);
    finalEstimator.adjustWeights(sell.inputs);
    console.log(`-- training model. error = ${Math.abs(error)}`);
  }
}

export function error(
  finalEstimator: Estimator,
  sells: Array<{ price: number; inputs: number[] }>
) {
  const errors: number[] = [];
  for (let sell of sells) {
    const price = finalEstimator.estimate(sell.inputs);
    const error = Math.abs(sell.price - price);
    errors.push(error);
  }
  return errors.reduce((sum, error) => error + sum, 0) / errors.length;
}
