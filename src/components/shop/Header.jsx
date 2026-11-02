"use client";
import Link from "next/link";
import Userinfo from "./auth/Userinfo";
import Menu from "./Menu";
import { shopMenu } from "@/data/menu";
import { useCart } from "@/context/useCart";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="bg-black text-white px-5 py-3 shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">  PHAMTHIMY Shop</h1>
          <Menu items={shopMenu} />
        </div>
           <Userinfo />
          <Link
            href="/cart"
            className="cart-icon rounded-md bg-slate-800 px-3 py-1 text-sm font-medium hover:bg-slate-700 transition"
          >
            🛒 Giỏ hàng{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </div>
     
    </header>
  );
}
