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
    <header className="flex justify-around items-center p-4">
      <div className="flex-1">
        <Image src="/logo.svg" alt="Norpay Logo" width={178} height={43} />
      </div>

      <ul className="flex gap-12">
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

      <div className="flex-1 flex justify-end">
        <Button className="-translate-x-24">Connect wallet</Button>
      </div>
    </header>
  );
}
