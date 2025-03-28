import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-around items-center bg-[#D8D2C2] text-[#4A4947]  h-10 shadow-md">
        <Link href="/" className="text-lg flex items-center gap-2 ">
          <Image
            src="/images/kruvasan.svg"
            alt="logo"
            width={50}
            height={50}

          />
          Ana səhifə
        </Link>
        <Link href="/products">Məhsullar</Link>
        <Link href="#">Haqqımızda</Link>
      </nav>
    </header>
  );
}
