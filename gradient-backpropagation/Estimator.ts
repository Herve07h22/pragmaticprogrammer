const sum = (inputs: { [key: string]: number }) =>
  Object.keys(inputs).reduce((s, key) => s + inputs[key], 0);

export class Estimator {
  name: string;
  learningRate = 0.1;
  errors: { [key: string]: number } = {}; // Errors from the estimators of the next layer
  weights: number[] = []; // will be trained
  inputEstimators: Estimator[];

  activationMethod: (x: number) => number;
  derivedActivationMethod: (x: number) => number;
  convolutionMethod: (weights: number[], inputs: number[]) => number;

  constructor(
    name: string,
    dimension: number,
    convolutionMethod: (weights: number[], inputs: number[]) => number,
    activationMethod: (x: number) => number,
    derivedActivationMethod: (x: number) => number,
    inputEstimators: Estimator[]
  ) {
    this.name = name;
    this.inputEstimators = inputEstimators;
    this.convolutionMethod = convolutionMethod;
    this.activationMethod = activationMethod;
    this.derivedActivationMethod = derivedActivationMethod;
    for (let i = 0; i < dimension; i++) {
      this.weights[i] = Math.random();
    }
  }

  aggregate(inputs: number[]) {}

  inspect() {
    console.log(`Estimator ${this.name}`);
    console.log("- Weights :", this.weights);
    console.log("- Errors :", this.errors);
  }

  feedback(from: string, inputs: number[], error: number) {
    console.log(`Feedback from ${from} to ${this.name} : ${error}`);
    this.errors[from] =
      this.derivedActivationMethod(
        this.convolutionMethod(this.weights, inputs)
      ) * error;
  }

  adjustWeights(inputs: number[]) {
    const error = sum(this.errors);
    this.inputEstimators.forEach((estimator, i) =>
      estimator.feedback(this.name, inputs, error)
    );

    this.weights = this.weights.map(
      (weight, i) => weight - this.learningRate * error * inputs[i]
    );
  }

  estimate(inputs: number[]) {
    return this.activationMethod(this.convolutionMethod(this.weights, inputs));
  }
}
