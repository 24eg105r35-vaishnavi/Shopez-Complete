import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Seller Dashboard — ShopEZ" }] }),
  component: Dashboard,
});

const ORDERS = [
  { id: "SHZ-8A2F1B", customer: "Alex Morgan", total: 249.99, status: "Shipped", date: "2026-07-01" },
  { id: "SHZ-91CDE2", customer: "Priya Kapoor", total: 89.5, status: "Processing", date: "2026-07-02" },
  { id: "SHZ-77AB03", customer: "Jordan Lee", total: 149.99, status: "Delivered", date: "2026-06-28" },
  { id: "SHZ-33FF12", customer: "Sam Patel", total: 45.0, status: "Processing", date: "2026-07-03" },
  { id: "SHZ-56A9E0", customer: "Riley Chen", total: 199.0, status: "Shipped", date: "2026-07-04" },
];

function Dashboard() {
  const revenue = ORDERS.reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: "Revenue", value: formatPrice(revenue), icon: DollarSign },
    { label: "Orders", value: ORDERS.length.toString(), icon: ShoppingBag },
    { label: "Products", value: PRODUCTS.length.toString(), icon: Package },
    { label: "Growth", value: "+18.2%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">Seller dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your store performance and recent orders.
        </p>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border">
          <div className="border-b p-5">
            <h2 className="font-semibold">Recent orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-5 py-3 font-medium">{o.id}</td>
                    <td className="px-5 py-3">{o.customer}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          o.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : o.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Top products</h2>
          <ul className="space-y-3">
            {PRODUCTS.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                </div>
                <div className="text-sm font-semibold">{formatPrice(p.price)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
