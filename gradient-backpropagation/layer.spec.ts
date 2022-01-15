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
    /*
    console.log(
      `Real : ${realPrice.toFixed(0)} Estimated : ${estimatedPrice.toFixed(0)}`
    );
    */

    const error = math.subtract(
      prediction,
      math.matrix([sell.price])
    ) as Matrix;

    // const squareError = math.dot(error, error);

    layer.backward(math.matrix(sell.inputs), error);

    /*
    console.log(
      `-- Error=${error.get([0]).toFixed(2)} location=${layer.weights
        .get([0, 0])
        .toFixed(2)} size=${layer.weights
        .get([1, 0])
        .toFixed(2)} age=${layer.weights
        .get([2, 0])
        .toFixed(2)} base=${layer.weights.get([3, 0]).toFixed(2)}`
    );
    */
  }

  return true;
});

it("A complex model converge", () => {
  const data = realEstatedata.trainData.map((sell) => ({
    price: sell.price,
    inputs: toVector(sell.features),
  }));

  const { normalizedSells, minPrice, delta, sells, normalizedToPrintable } =
    normalize(data);

  const layer1 = new Layer(
    4,
    8,
    (x) => x,
    (x) => 1,
    0.05
  );
  const layer2 = new Layer(
    8,
    4,
    (x) => x,
    (x) => 1,
    0.05
  );
  const layer3 = new Layer(
    4,
    1,
    (x) => x,
    (x) => 1,
    0.05
  );

  for (let epoch = 0; epoch < 2; epoch++) {
    console.log("Epoch : " + epoch);
    for (let sell of normalizedSells) {
      const intermediateInputs1 = layer1.forward(math.matrix(sell.inputs));
      const intermediateInputs2 = layer2.forward(intermediateInputs1);
      const prediction = layer3.forward(intermediateInputs2);
      const realPrice = sell.price;
      const estimatedPrice = prediction.get([0]);
      console.log(
        `Real : ${normalizedToPrintable(realPrice).toFixed(
          2
        )} Estimated : ${normalizedToPrintable(estimatedPrice).toFixed(
          2
        )} Error : ${(
          normalizedToPrintable(realPrice) -
          normalizedToPrintable(estimatedPrice)
        ).toFixed(2)}`
      );

      const error = math.subtract(
        prediction,
        math.matrix([sell.price])
      ) as Matrix;

      // const squareError = math.dot(error, error);

      const errors3 = layer3.backward(intermediateInputs2, error);
      const errors2 = layer2.backward(intermediateInputs1, errors3);
      layer1.backward(math.matrix(sell.inputs), errors2);
    }
  }

  return true;
});
