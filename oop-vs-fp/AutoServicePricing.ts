/** **************
 * Interfaces
 * **************/

interface Price {
  calculatePreTaxAmount: () => number;
  calculateVat: () => number;
}

interface TotalPriceCalculator {
  (price: Price): number;
}

/** **************
 * Implementations
 * **************/

const frenchPrice = (preTaxAmount: number, tax: number): Price => ({
  calculatePreTaxAmount: () => preTaxAmount,
  calculateVat: () => preTaxAmount * tax,
});

const luxembourgishPrice = (
  preTaxServiceAmount: number,
  preTaxMaterialAmount: number,
  serviceTax: number,
  materialTax: number
): Price => ({
  calculatePreTaxAmount: () => preTaxServiceAmount + preTaxMaterialAmount,
  calculateVat: () =>
    preTaxServiceAmount * serviceTax + preTaxMaterialAmount * materialTax,
});

const defaultPriceCalculator: TotalPriceCalculator = (price) =>
  price.calculatePreTaxAmount() + price.calculateVat();

const priceCalculatorWithTips: (tipsRate: number) => TotalPriceCalculator =
  (tipsRate) => (price) =>
    defaultPriceCalculator(price) * (1 + tipsRate);

/** **************
 * Use-cases
 * **************/

const price1 = defaultPriceCalculator(frenchPrice(100, 0.2));

const price2 = defaultPriceCalculator(luxembourgishPrice(80, 20, 0.2, 0.12));

const price3 = priceCalculatorWithTips(0.1)(frenchPrice(100, 0.2));

console.log(price1, price2, price3);
