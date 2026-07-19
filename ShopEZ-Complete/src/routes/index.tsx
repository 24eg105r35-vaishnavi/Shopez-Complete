import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopEZ — Effortless online shopping" },
      {
        name: "description",
        content:
          "Shop electronics, fashion and home goods on ShopEZ. Curated products, honest reviews, and secure checkout.",
      },
      { property: "og:title", content: "ShopEZ — Effortless online shopping" },
      {
        property: "og:description",
        content: "Curated products, honest reviews, and secure checkout on ShopEZ.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => (category === "All" ? true : p.category === category)).filter(
      (p) => p.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [category, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Summer sale — up to 35% off
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Effortless shopping, delivered.
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md">
              ShopEZ brings together the best in electronics, fashion, and home essentials — with
              honest reviews and a secure checkout.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#products"
                className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Shop now
              </a>
              <a
                href="#products"
                className="inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                Browse deals
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
              alt="Shopping"
              className="rounded-2xl shadow-xl aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured products</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} items available</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full sm:w-64 rounded-md border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
