import { realEstatedata } from "./data";
import { error, train } from "./Model";
import { Estimator } from "./Estimator";
import { toVector } from "./RealEstateFeature";

// Alex knows how important is the location
const AlexEstimator = new Estimator(
  "Alex",
  4,
  (weights, inputs) => (inputs[0] * weights[0] + inputs[3] * weights[3]) / 2,
  (x) => x,
  (x) => 1,
  []
);
// Bo is sure that the most important is the size of the house
const BoEstimator = new Estimator(
  "Bo",
  4,
  (weights, inputs) => (inputs[1] * weights[1] + inputs[3] * weights[3]) / 2,
  (x) => x,
  (x) => 1,
  []
);

// Casey thinks that people prefer recent houses
const CaseyEstimator = new Estimator(
  "Casey",
  4,
  (weights, inputs) => (inputs[2] * weights[2] + inputs[3] * weights[3]) / 2,
  (x) => x,
  (x) => 1,
  []
);
// Debby is agnostic, and thinks that everything equally counts
const DebbyEstimator = new Estimator(
  "Debby",
  4,
  (weights, inputs) =>
    (inputs[0] * weights[0] +
      inputs[1] * weights[1] +
      inputs[2] * weights[2] +
      inputs[3] * weights[3]) /
    4,
  (x) => x,
  (x) => 1,
  []
);

// Joe is the 1st manager.
const JoeEstimator = new Estimator(
  "Joe",
  4,
  (weights, inputs) =>
    (inputs[0] * weights[0] +
      inputs[1] * weights[1] +
      inputs[2] * weights[2] +
      inputs[3] * weights[3]) /
    4,
  (x) => x,
  (x) => 1,
  [AlexEstimator, BoEstimator, CaseyEstimator, DebbyEstimator]
);

// Murray is a new manager
const MurrayEstimator = new Estimator(
  "Murray",
  4,
  (weights, inputs) =>
    (inputs[0] * weights[0] +
      inputs[1] * weights[1] +
      inputs[2] * weights[2] +
      inputs[3] * weights[3]) /
    4,
  (x) => x,
  (x) => 1,
  [AlexEstimator, BoEstimator, CaseyEstimator, DebbyEstimator]
);

// Final estimator : the mean of Joe's and Murray's
const finalEstimator = new Estimator(
  "Final",
  2,
  (weights, inputs) => (inputs[0] * weights[0] + inputs[1] * weights[1]) / 2,
  (x) => x,
  (x) => 1,
  [JoeEstimator, MurrayEstimator]
);

// Train the mode
train(
  finalEstimator,
  realEstatedata.trainData.map((sell) => ({
    price: sell.price,
    inputs: toVector(sell.features),
  }))
);

// Inspect the model
JoeEstimator.inspect();

// Predict

const meanError = error(
  JoeEstimator,
  realEstatedata.validationData.map((sell) => ({
    price: sell.price,
    inputs: toVector(sell.features),
  }))
);
console.log(`Error : ${meanError} `);
