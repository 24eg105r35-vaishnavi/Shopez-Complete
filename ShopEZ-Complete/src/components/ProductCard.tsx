import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : 0;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
            -{discount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</div>
        <div className="font-medium leading-snug line-clamp-2">{product.name}</div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {product.rating} ({product.reviews})
          </div>
        </div>
      </div>
    </Link>
  );
}
