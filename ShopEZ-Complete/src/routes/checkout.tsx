import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ShopEZ" }] }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const [placed, setPlaced] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const orderId = "SHZ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setPlaced(orderId);
    clear();
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold">Order confirmed</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order <span className="font-semibold">{placed}</span>{" "}
            is being processed.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Continue shopping
          </button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Shipping information</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full name" required />
                <Field label="Email" type="email" required />
                <Field label="Address" className="sm:col-span-2" required />
                <Field label="City" required />
                <Field label="ZIP" required />
              </div>
            </section>
            <section className="rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Payment (demo)</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" required />
                <Field label="Expiry" placeholder="MM/YY" required />
                <Field label="CVC" placeholder="123" required />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                This is a demo checkout — no real card is charged.
              </p>
            </section>
          </div>

          <aside className="h-fit rounded-xl border p-6">
            <h2 className="font-semibold">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">
                    {product.name} × {qty}
                  </span>
                  <span>{formatPrice(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <Row label="Tax" value={formatPrice(tax)} />
              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={detailed.length === 0}
              className="mt-6 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Place order
            </button>
          </aside>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
