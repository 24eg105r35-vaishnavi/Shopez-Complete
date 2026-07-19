import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — ShopEZ" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove, count } = useCart();
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Your cart</h1>
        <p className="text-sm text-muted-foreground mt-1">{count} item(s)</p>

        {detailed.length === 0 ? (
          <div className="mt-10 rounded-xl border p-10 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {detailed.map(({ product, qty, lineTotal }) => (
                <div key={product.id} className="flex gap-4 rounded-xl border p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      to="/product/$id"
                      params={{ id: product.id }}
                      className="font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-md border text-sm">
                        <button
                          className="px-2 py-1 hover:bg-accent"
                          onClick={() => setQty(product.id, qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{qty}</span>
                        <button
                          className="px-2 py-1 hover:bg-accent"
                          onClick={() => setQty(product.id, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{formatPrice(lineTotal)}</div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-xl border p-6">
              <h2 className="font-semibold">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="mt-3 flex justify-between border-t pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-6 block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
