export interface IToken {
  symbol: string;
  logoUrl: string;
}

/** For the time being considering 1 USD = 80 INR As a constant */
export function usdToInr(usdValue: number) {
  return Number(usdValue * 80).toFixed(2);
}

export async function getTokenList(): Promise<IToken[]> {
  try {
    const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();
    const tokens = data.symbols
      .filter((symbol: any) => {
        return symbol.symbol.endsWith("USDT");
      })
      .map((symbol: any) => {
        const shortSymbol = symbol.symbol.slice(0, -4).toLowerCase();

        return {
          symbol: symbol.symbol,
          logoUrl: `https://assets.coincap.io/assets/icons/${shortSymbol}@2x.png`,
        };
      });

    return tokens;
  } catch (error) {
    console.error("Error fetching token list:", error);
    throw error;
  }
}
