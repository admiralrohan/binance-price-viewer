"use client";

import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import SelectToken from "@/app/SelectToken";
import { IToken, usdToInr } from "@/app/utils";
import { useFetchTokens } from "@/app/useFetchTokens";

const ws = new WebSocket("wss://stream.binance.com:9443/ws");

export default function Home() {
  const [tokenList, setTokenList] = React.useState<IToken[]>([]);
  const [currentPrice, setCurrentPrice] = React.useState(0);

  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const selectedTokenLogo =
    tokenList.find((token) => token.symbol === selectedToken)?.logoUrl || "";

  const [investedAmount, setInvestedAmount] = React.useState("");
  const estimatedTokens = (+investedAmount / +usdToInr(currentPrice)).toFixed(
    2
  );

  useFetchTokens({
    ws,
    setTokenList,
    setCurrentPrice,
    selectedToken,
    setSelectedToken,
  });

  return (
    <main className="text-white">
      <div className="w-fit mt-12 mx-auto mb-4 border-[#1C1731] border-[10px] rounded-full">
        {selectedToken && (
          <Image
            src={selectedTokenLogo}
            alt={selectedToken || "Token logo"}
            width={50}
            height={50}
          />
        )}
      </div>

      <div className="w-[470px] mx-auto mb-24 px-10 py-12 border-current border-2 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">Current value</div>

            <div className="flex items-center gap-1">
              {currentPrice > 0 ? (
                <>
                  <Image
                    src="/rupee-sign.svg"
                    alt="ETH"
                    width={14}
                    height={20}
                  />{" "}
                  <span className="text-xl text-[#627EEA] font-semibold">
                    {usdToInr(currentPrice)}
                  </span>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          </div>

          <SelectToken
            tokenList={tokenList}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          >
            <button className="bg-[#1C1731] w-full h-14 rounded-md flex justify-start items-center px-6 py-4">
              {selectedToken && (
                <Image
                  src={selectedTokenLogo}
                  alt={selectedToken || "Token logo"}
                  width={25}
                  height={25}
                />
              )}
              <span className="ms-2 me-auto">{selectedToken}</span>

              <Image
                src="/arrow-down.svg"
                alt="Arrow down"
                width={14}
                height={7}
              />
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
              type="number"
              className="bg-inherit border-[#6E56F8] border-opacity-25 border-[1px] w-full h-14 rounded-md flex justify-between items-center px-6 py-4 placeholder:text-xl placeholder:font-semibold placeholder:text-[#6F6F7E]"
              placeholder="0.00"
              value={investedAmount}
              onChange={(e) => setInvestedAmount(e.target.value)}
            />

            <div className="absolute right-6 top-1 translate-y-1/2 select-none">
              INR
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">
              Estimate Number of {selectedToken} You will Get
            </div>
          </div>

          <div>
            <input
              type="number"
              disabled
              className="bg-[#1C1731] w-full h-14 rounded-md flex justify-between items-center px-6 py-4 placeholder:text-xl placeholder:font-semibold placeholder:text-[#6F6F7E]"
              placeholder="0.00"
              value={estimatedTokens}
            />
          </div>
        </div>

        <Button className="mt-6 py-3">Buy</Button>
      </div>
    </main>
  );
}
