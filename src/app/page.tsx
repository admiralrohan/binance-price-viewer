"use client";

import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Modal from "@/components/Modal";

const tokenList = [
  "Ethereum",
  "Bitcoin",
  "Tether",
  "BNB",
  "Cardano",
  "Solana",
  "Dogecoin",
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState(tokenList[0]);

  return (
    <main className="text-white">
      <div className="w-[470px] mx-auto my-24 px-10 py-12 border-current border-2 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-[#C5C5C5] text-sm">Current value</div>

            <div className="flex items-center gap-1">
              <Image src="/rupee-sign.svg" alt="ETH" width={14} height={20} />{" "}
              <span className="text-xl text-[#627EEA] font-semibold">
                24882
              </span>
            </div>
          </div>

          <div>
            <button className="bg-[#1C1731] w-full h-14 rounded-md flex justify-between items-center px-6 py-4">
              <span>Ethereum</span>
              <Image src="/arrow-down.svg" alt="ETH" width={14} height={7} />
            </button>
          </div>
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

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        trigger={<button>Open modal</button>}
      >
        <div className="w-[410px] border-2 border-[#3B79D4] rounded-2xl text-white">
          <div className="p-12 flex flex-col gap-4">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsModalOpen(false)}
            >
              <Image src="/cross.svg" alt="Close" width={24} height={24} />
            </button>

            <div className="relative text-[#D2D2D2]">
              <Image
                src="/magnifying-glass.svg"
                alt="Magnifying glass"
                width={17}
                height={17}
                className="absolute left-4 top-1 translate-y-1/2 select-none"
              />

              <input
                type="text"
                placeholder="Search Chains"
                className="rounded-4xl w-full h-10 ps-10 bg-[#0B0819] border-[1px] border-[#6E56F040]"
              />
            </div>

            <ul>
              {tokenList.map((token) => (
                <li key={token}>
                  <button
                    className={
                      "relative h-11 w-full flex justify-start items-center ps-14 " +
                      (selectedToken === token ? " bg-[#1B192D]" : "")
                    }
                  >
                    <span>{token}</span>
                    {selectedToken === token && (
                      <Image
                        src="/tick.svg"
                        alt="Selected token"
                        width={24}
                        height={24}
                        className="absolute right-4"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </main>
  );
}
