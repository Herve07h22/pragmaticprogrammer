import { realEstatedata } from "./data";
import { train } from "./Model";
import { RealEstateEstimator } from "./RealEstateEstimators";
import { RealEstateFeature, Location, Age, Size } from "./RealEstateFeature";
import { RealEstateGreedyManagerEstimator } from "./RealEstateGreedyManagerEstimator";
import { RealEstateRationnalManagerEstimator } from "./RealEstateRationnalManagerEstimator";

// Alex knows how important is the location
const AlexEstimator = new RealEstateEstimator(
  "Alex",
    (features) => (features.location  + 1)/2
  );
// Bo is sure that the most important is the size of the house
const BoEstimator = new RealEstateEstimator(
  "Bo",
    (features) => (features.size + 1) / 2 
  );
// Casey thinks that people prefer recent houses
const CaseyEstimator = new RealEstateEstimator(
  "Casey",
    (features) => (features.age + 1) / 2 
  );
// Debby is agnostic, and thinks that everything equally counts 
const DebbyEstimator = new RealEstateEstimator(
  "Debby",
    (features) => (features.age + features.location + features.size + 1) / 4 
  );

// Joe is the manager. He has a simple method : take the mean of the estimated prices
const JoeEstimator = new RealEstateRationnalManagerEstimator(
  "Joe",
  [AlexEstimator, BoEstimator, CaseyEstimator, DebbyEstimator]
)

// Murray is a new manager, greedy....
const MurrayEstimator = new RealEstateGreedyManagerEstimator(
  "Murray",
  [AlexEstimator, BoEstimator, CaseyEstimator, DebbyEstimator]
)


// Train the mode
train<RealEstateFeature>(MurrayEstimator, realEstatedata)

// Inspect the model
MurrayEstimator.inspect()

// Predict
const price = MurrayEstimator.estimate({location:Location.city, age:Age.old, size:Size.large})
console.log(`Predicted price : ${price} (expected : 140,000) `) 