const data = [
  { price: 204987, features: { age: 1, location: 1, size: 1 } },
  { price: 186861, features: { age: 0, location: 1, size: 1 } },
  { price: 108107, features: { age: 1, location: 1, size: 0 } },
  { price: 81798, features: { age: 0, location: 1, size: 0 } },
  { price: 203803, features: { age: 1, location: 1, size: 1 } },
  { price: 185665, features: { age: 0, location: 1, size: 1 } },
  { price: 106667, features: { age: 1, location: 1, size: 0 } },
  { price: 82685, features: { age: 0, location: 1, size: 0 } },
  { price: 162117, features: { age: 1, location: 0, size: 1 } },
  { price: 147962, features: { age: 0, location: 0, size: 1 } },
  { price: 66611, features: { age: 1, location: 0, size: 0 } },
  { price: 47668, features: { age: 0, location: 0, size: 0 } },
  { price: 168015, features: { age: 1, location: 0, size: 1 } },
  { price: 143989, features: { age: 0, location: 0, size: 1 } },
  { price: 69874, features: { age: 1, location: 0, size: 0 } },
  { price: 40236, features: { age: 0, location: 0, size: 0 } },
  { price: 203040, features: { age: 1, location: 1, size: 1 } },
  { price: 186741, features: { age: 0, location: 1, size: 1 } },
  { price: 109637, features: { age: 1, location: 1, size: 0 } },
  { price: 88021, features: { age: 0, location: 1, size: 0 } },
  { price: 206179, features: { age: 1, location: 1, size: 1 } },
  { price: 188842, features: { age: 0, location: 1, size: 1 } },
  { price: 104724, features: { age: 1, location: 1, size: 0 } },
  { price: 81176, features: { age: 0, location: 1, size: 0 } },
  { price: 168694, features: { age: 1, location: 0, size: 1 } },
  { price: 142704, features: { age: 0, location: 0, size: 1 } },
  { price: 64870, features: { age: 1, location: 0, size: 0 } },
  { price: 43186, features: { age: 0, location: 0, size: 0 } },
  { price: 166685, features: { age: 1, location: 0, size: 1 } },
  { price: 148922, features: { age: 0, location: 0, size: 1 } },
  { price: 61509, features: { age: 1, location: 0, size: 0 } },
  { price: 46419, features: { age: 0, location: 0, size: 0 } },
  { price: 201357, features: { age: 1, location: 1, size: 1 } },
  { price: 180876, features: { age: 0, location: 1, size: 1 } },
  { price: 104699, features: { age: 1, location: 1, size: 0 } },
  { price: 82662, features: { age: 0, location: 1, size: 0 } },
  { price: 202780, features: { age: 1, location: 1, size: 1 } },
  { price: 184172, features: { age: 0, location: 1, size: 1 } },
  { price: 109999, features: { age: 1, location: 1, size: 0 } },
  { price: 88972, features: { age: 0, location: 1, size: 0 } },
  { price: 164839, features: { age: 1, location: 0, size: 1 } },
  { price: 144553, features: { age: 0, location: 0, size: 1 } },
  { price: 68463, features: { age: 1, location: 0, size: 0 } },
  { price: 46839, features: { age: 0, location: 0, size: 0 } },
  { price: 167850, features: { age: 1, location: 0, size: 1 } },
  { price: 140494, features: { age: 0, location: 0, size: 1 } },
  { price: 64478, features: { age: 1, location: 0, size: 0 } },
  { price: 42519, features: { age: 0, location: 0, size: 0 } },
];

const validation = [
  { price: 202148, features: { age: 1, location: 1, size: 1 } },
  { price: 181598, features: { age: 0, location: 1, size: 1 } },
  { price: 107972, features: { age: 1, location: 1, size: 0 } },
  { price: 89914, features: { age: 0, location: 1, size: 0 } },
  { price: 204670, features: { age: 1, location: 1, size: 1 } },
  { price: 180087, features: { age: 0, location: 1, size: 1 } },
  { price: 103730, features: { age: 1, location: 1, size: 0 } },
  { price: 88224, features: { age: 0, location: 1, size: 0 } },
  { price: 168414, features: { age: 1, location: 0, size: 1 } },
  { price: 142257, features: { age: 0, location: 0, size: 1 } },
  { price: 64617, features: { age: 1, location: 0, size: 0 } },
  { price: 45027, features: { age: 0, location: 0, size: 0 } },
  { price: 162615, features: { age: 1, location: 0, size: 1 } },
  { price: 140160, features: { age: 0, location: 0, size: 1 } },
  { price: 66169, features: { age: 1, location: 0, size: 0 } },
  { price: 41361, features: { age: 0, location: 0, size: 0 } },
  { price: 205001, features: { age: 1, location: 1, size: 1 } },
  { price: 185551, features: { age: 0, location: 1, size: 1 } },
  { price: 107755, features: { age: 1, location: 1, size: 0 } },
  { price: 80800, features: { age: 0, location: 1, size: 0 } },
  { price: 201080, features: { age: 1, location: 1, size: 1 } },
  { price: 181304, features: { age: 0, location: 1, size: 1 } },
  { price: 102516, features: { age: 1, location: 1, size: 0 } },
  { price: 80052, features: { age: 0, location: 1, size: 0 } },
  { price: 162803, features: { age: 1, location: 0, size: 1 } },
  { price: 146521, features: { age: 0, location: 0, size: 1 } },
  { price: 61162, features: { age: 1, location: 0, size: 0 } },
  { price: 45063, features: { age: 0, location: 0, size: 0 } },
  { price: 167162, features: { age: 1, location: 0, size: 1 } },
  { price: 140988, features: { age: 0, location: 0, size: 1 } },
  { price: 65645, features: { age: 1, location: 0, size: 0 } },
  { price: 48335, features: { age: 0, location: 0, size: 0 } },
  { price: 202253, features: { age: 1, location: 1, size: 1 } },
  { price: 186253, features: { age: 0, location: 1, size: 1 } },
  { price: 107871, features: { age: 1, location: 1, size: 0 } },
  { price: 84495, features: { age: 0, location: 1, size: 0 } },
  { price: 203528, features: { age: 1, location: 1, size: 1 } },
  { price: 183687, features: { age: 0, location: 1, size: 1 } },
  { price: 105007, features: { age: 1, location: 1, size: 0 } },
  { price: 85517, features: { age: 0, location: 1, size: 0 } },
  { price: 161126, features: { age: 1, location: 0, size: 1 } },
  { price: 144835, features: { age: 0, location: 0, size: 1 } },
  { price: 60245, features: { age: 1, location: 0, size: 0 } },
  { price: 45863, features: { age: 0, location: 0, size: 0 } },
  { price: 165533, features: { age: 1, location: 0, size: 1 } },
  { price: 144973, features: { age: 0, location: 0, size: 1 } },
  { price: 68220, features: { age: 1, location: 0, size: 0 } },
  { price: 45555, features: { age: 0, location: 0, size: 0 } },
];

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const realEstatedata = {
  trainData: shuffle(data),
  validationData: shuffle(validation),
};
