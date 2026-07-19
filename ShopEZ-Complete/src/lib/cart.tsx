import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = { productId: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: Product; qty: number; lineTotal: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "shopez_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.id === i.productId);
        if (!product) return null;
        return { product, qty: i.qty, lineTotal: product.price * i.qty };
      })
      .filter(Boolean) as CartCtx["detailed"];

    return {
      items,
      detailed,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: detailed.reduce((s, d) => s + d.lineTotal, 0),
      add: (id, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.productId === id);
          if (existing)
            return prev.map((p) => (p.productId === id ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { productId: id, qty }];
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.productId !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.productId !== id)
            : prev.map((p) => (p.productId === id ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
