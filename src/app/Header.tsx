import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", name: "Trade" },
  { href: "#", name: "Earn" },
  { href: "#", name: "Support" },
  { href: "#", name: "About" },
];

export default function Header() {
  return (
    <header className="flex flex-wrap lg:flex-nowrap justify-around items-center p-4">
      <div className="lg:flex-1 order-1 w-1/2 lg:w-auto">
        <Image src="/logo.svg" alt="Norpay Logo" width={178} height={43} />
      </div>

      <ul className="flex justify-center gap-12 order-3 lg:order-2 w-full lg:w-auto mt-4 lg:mt-0">
        {navLinks.map(({ href, name }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={
                href === "/"
                  ? "font-bold text-[#627EEA] border-b-2 border-current p-3"
                  : "font-semibold text-[#5A5A5A]"
              }
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="lg:flex-1 flex justify-end order-2 w-1/2 lg:w-auto">
        <Button className="-lg:translate-x-24">Connect wallet</Button>
      </div>
    </header>
  );
}
