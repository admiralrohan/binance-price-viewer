import * as React from "react";
import { Barlow } from "next/font/google";

const barlow = Barlow({ weight: ["700"], subsets: ["latin"] });

function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${barlow.className} font-bold rounded-4xl px-4 py-2 text-white bg-gradient-to-br from-[#3387D5] to-[#7A06C9] ${className}`}
      {...props}
    />
  );
}

export default Button;
