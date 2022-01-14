// import math from "mathjs";
import { Layer } from "./Layer";
import { math } from "./math";
import { realEstatedata } from "./data";
import { toVector } from "./RealEstateFeature";
import { normalize } from "./Model";
import { Matrix } from "mathjs";

async function it(message: string, assertion: () => boolean) {
  if (await assertion()) {
    console.log(`✅ ${message}`);
  } else {
    console.log(`❌ ${message}`);
  }
}

function sameMatrix(m1: math.Matrix, m2: math.Matrix) {
  var same = true;
  const m = math.equal(m1, m2) as math.Matrix;
  m.forEach((x) => {
    if (!x) same = false;
  });
  return same;
}

it("math.matrix is a usefull way to do great things with matrix", () => {
  const weights = math.matrix([
    [1, 0, -1],
    [0, 1, -1],
  ]);
  const inputs = math.matrix([1, 0]);
  const h = math.multiply(inputs, weights);
  return sameMatrix(h, math.matrix([1, 0, -1]));
});

it("A layer can compute the inputs according to its weight", () => {
  const inputs = math.matrix([1, 0]);
  const layer = new Layer(
    2,
    3,
    (x) => x,
    (x) => 1,
    0.1
  );
  const h = layer.h(inputs);
  return h.size()[0] === 3;
});

it("A layer can compute the inputs ", () => {
  const inputs = math.matrix([1, 0]);
  const layer = new Layer(
    2,
    3,
    (x) => (x > 0 ? x : 0),
    (x) => (x > 0 ? 1 : 0),
    0.1
  );
  const f = layer.forward(inputs);
  return f.size()[0] === 3;
});

it("A layer can compute the errors for the previous layer ", () => {
  const errors = math.matrix([0.1, 0.1, 0.1]);
  const layer = new Layer(
    2,
    3,
    (x) => (x > 0 ? x : 0),
    (x) => (x > 0 ? 1 : 0),
    0.1
  );
  const e = layer.computeErrorForPreviousLayer(errors);
  return e.size()[0] === 2;
});

it("A layer can adjust its weights and return the error to the previous layer", () => {
  const inputs = math.matrix([1, 0]);
  const errors = math.matrix([0.1, -0.2, 0.3]);
  const layer = new Layer(
    2,
    3,
    (x) => (x > 0 ? x : 0),
    (x) => (x > 0 ? 1 : 0),
    0.1
  );
  const e = layer.backward(inputs, errors);
  return e.size()[0] === 2;
});

it("A simple model converge", () => {
  const sells = realEstatedata.trainData.map((sell) => ({
    price: sell.price,
    inputs: toVector(sell.features),
  }));

  const { normalizedSells, minPrice, delta } = normalize(sells);

  const layer = new Layer(
    4,
    1,
    (x) => (x > 0 ? x : 0),
    (x) => (x > 0 ? 1 : 0),
    0.1
  );

  for (let sell of normalizedSells) {
    const prediction = layer.forward(math.matrix(sell.inputs));
    const realPrice = sell.price * delta + minPrice;
    const estimatedPrice = prediction.get([0]) * delta + minPrice;
    console.log(
      `Real : ${realPrice.toFixed(0)} Estimated : ${estimatedPrice.toFixed(0)}`
    );

    const error = math.subtract(
      prediction,
      math.matrix([sell.price])
    ) as Matrix;

    // const squareError = math.dot(error, error);

    layer.backward(math.matrix(sell.inputs), error);

    console.log(
      `-- Error=${error.get([0]).toFixed(2)} location=${layer.weights
        .get([0, 0])
        .toFixed(2)} size=${layer.weights
        .get([1, 0])
        .toFixed(2)} age=${layer.weights
        .get([2, 0])
        .toFixed(2)} base=${layer.weights.get([3, 0]).toFixed(2)}`
    );
  }

  return true;
});
