import React from "react";
import Image from "next/image";
import Modal from "@/components/Modal";

interface SelectTokenProps {
  children: React.ReactNode;
  tokenList: Array<{ symbol: string; logoUrl: string }>;
  selectedToken: string | null;
}

export default function SelectToken({
  children,
  tokenList,
  selectedToken,
}: SelectTokenProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} trigger={children}>
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

          <ul className="h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {tokenList.map((token) => (
              <li key={token.symbol}>
                <button
                  className={
                    "relative h-11 w-full flex justify-start items-center ps-14 " +
                    (selectedToken === token.symbol ? " bg-[#1B192D]" : "")
                  }
                >
                  <span>{token.symbol}</span>
                  {selectedToken === token.symbol && (
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
  );
}
