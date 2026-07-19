import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { getProduct } from "@/lib/products";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ShopEZ` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">Product not found</div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center">Something went wrong</div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to shop
        </Link>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-xl border bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.category}
            </div>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{product.rating}</span>
              <span>· {product.reviews} reviews</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-4 text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-md border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-accent"
                >
                  −
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-accent">
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.id, qty);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="flex-1 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {added ? "✓ Added to cart" : "Add to cart"}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="h-5 w-5" />
                Free shipping over $50
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck className="h-5 w-5" />
                Secure checkout
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw className="h-5 w-5" />
                30-day returns
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold mb-3">Customer reviews</h3>
              <div className="space-y-3">
                {[
                  { name: "Alex M.", stars: 5, text: "Exactly as described. Love it!" },
                  { name: "Priya K.", stars: 4, text: "Great value, shipping was fast." },
                  { name: "Jordan L.", stars: 5, text: "Would buy again." },
                ].map((r) => (
                  <div key={r.name} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{r.name}</span>
                      <span className="flex gap-0.5">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
