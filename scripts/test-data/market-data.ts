import { faker } from '@faker-js/faker';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}

export function generateMarketData(count: number): MarketData[] {
  const symbols = generateSymbols(count);
  
  return symbols.map(symbol => ({
    symbol,
    price: generatePrice(),
    change: generatePriceChange(),
    volume: generateVolume(),
    marketCap: generateMarketCap()
  }));
}

function generateSymbols(count: number): string[] {
  const symbols = new Set<string>();
  
  while (symbols.size < count) {
    symbols.add(generateSymbol());
  }

  return Array.from(symbols);
}

function generateSymbol(): string {
  const length = faker.number.int({ min: 3, max: 4 });
  return faker.string.alpha({ length, casing: 'upper' });
}

function generatePrice(): number {
  return faker.number.float({ min: 10, max: 1000, precision: 0.01 });
}

function generatePriceChange(): number {
  return faker.number.float({ min: -10, max: 10, precision: 0.01 });
}

function generateVolume(): number {
  return faker.number.int({ min: 100000, max: 10000000 });
}

function generateMarketCap(): number {
  return faker.number.int({ min: 1000000000, max: 1000000000000 });
}