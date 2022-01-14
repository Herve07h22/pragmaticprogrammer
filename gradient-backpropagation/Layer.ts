import { math } from "./math";

function checkSize(matrix: math.Matrix, size: number) {
  if (matrix.size()[0] !== size) {
    throw new Error(
      `Invalid input dimension Expected : ${size} Got : ${matrix.size()[0]}`
    );
  }
}

export class Layer {
  weights: math.Matrix;
  constructor(
    public inputDimension: number,
    public outputDimension: number,
    public activationMethod: (x: number) => number,
    public derivedActivationMethod: (x: number) => number,
    public learningRate: number
  ) {
    this.weights = math.matrix(
      math.random([this.inputDimension, this.outputDimension], 0, 1)
    );
  }

  h(inputs: math.Matrix): math.Matrix {
    checkSize(inputs, this.inputDimension);
    return math.multiply(inputs, this.weights);
  }

  g(inputs: math.Matrix): math.Matrix {
    checkSize(inputs, this.outputDimension);
    return math.map(inputs, (x) => this.activationMethod(x));
  }

  gprime(inputs: math.Matrix): math.Matrix {
    checkSize(inputs, this.outputDimension);
    return math.map(inputs, (x) => this.derivedActivationMethod(x));
  }

  forward(inputs: math.Matrix): math.Matrix {
    return this.g(this.h(inputs));
  }

  computeErrorForPreviousLayer(errors: math.Matrix): math.Matrix {
    checkSize(errors, this.outputDimension);
    return math.multiply(errors, math.transpose(this.weights));
  }

  backward(
    inputs: math.Matrix,
    weightedErrorsFromPreviousLayer: math.Matrix
  ): math.Matrix {
    checkSize(weightedErrorsFromPreviousLayer, this.outputDimension);
    const h = this.h(inputs);
    const gprime = this.gprime(h);
    const errors = math.dotMultiply(
      weightedErrorsFromPreviousLayer,
      gprime
    ) as math.Matrix;

    const errorsToBackward = this.computeErrorForPreviousLayer(errors);
    const dW = math.multiply(
      math.reshape(inputs.clone(), [this.inputDimension, 1]),
      math.transpose(math.reshape(errors.clone(), [this.outputDimension, 1]))
    );

    this.weights = math.add(
      this.weights,
      math.multiply(-this.learningRate, dW)
    ) as math.Matrix;
    return errorsToBackward;
  }
}
