"use client";

import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import SelectToken from "@/app/SelectToken";
import { getTokenList, usdToInr } from "@/app/utils";

const ws = new WebSocket("wss://stream.binance.com:9443/ws");

export default function Home() {
  const [tokenList, setTokenList] = React.useState<
    Array<{ symbol: string; logoUrl: string }>
  >([]);
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    getTokenList().then((tokens) => {
      setTokenList(tokens);
      setSelectedToken(tokens[0].symbol);
    });

    if (!selectedToken) return;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${selectedToken.toLowerCase()}@ticker`],
          id: 1,
        })
      );
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.s === selectedToken) {
        const tokenValue = message.c;
        setCurrentPrice(tokenValue);
      }
    };

    return () => {
      ws.close();
    };
  }, [selectedToken]);

  return (
    <main className="text-white">
      <div className="w-[470px] mx-auto my-24 px-10 py-12 border-current border-2 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">Current value</div>

            <div className="flex items-center gap-1">
              <Image src="/rupee-sign.svg" alt="ETH" width={14} height={20} />{" "}
              <span className="text-xl text-[#627EEA] font-semibold">
                {usdToInr(currentPrice)}
              </span>
            </div>
          </div>

          <SelectToken>
            <button className="bg-[#1C1731] w-full h-14 rounded-md flex justify-between items-center px-6 py-4">
              <span>Ethereum</span>
              <Image src="/arrow-down.svg" alt="ETH" width={14} height={7} />
            </button>
          </SelectToken>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">
              Amount you want to invest
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="bg-inherit border-[#6E56F8] border-opacity-25 border-[1px] w-full h-14 rounded-md flex justify-between items-center px-6 py-4 placeholder:text-xl placeholder:font-semibold placeholder:text-[#6F6F7E]"
              placeholder="0.00"
            />

            <div className="absolute right-6 top-1 translate-y-1/2 select-none">
              INR
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">
              Estimate Number of ETH You will Get
            </div>
          </div>

          <div>
            <input
              type="text"
              disabled
              className="bg-[#1C1731] w-full h-14 rounded-md flex justify-between items-center px-6 py-4 placeholder:text-xl placeholder:font-semibold placeholder:text-[#6F6F7E]"
              placeholder="0.00"
            />
          </div>
        </div>

        <Button className="mt-6 py-3">Buy</Button>
      </div>
    </main>
  );
}
