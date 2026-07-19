import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ShopEZ" },
      { name: "description", content: "Learn more about ShopEZ — effortless online shopping." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold">About ShopEZ</h1>
        <p className="mt-4 text-muted-foreground">
          ShopEZ is your one-stop destination for effortless online shopping. With a user-friendly
          interface and a comprehensive product catalog, finding the perfect items has never been
          easier.
        </p>
        <p className="mt-4 text-muted-foreground">
          Seamlessly navigate through detailed product descriptions, customer reviews, and available
          discounts to make informed decisions. Enjoy a secure checkout process and receive instant
          order confirmation.
        </p>
        <p className="mt-4 text-muted-foreground">
          For sellers, our robust dashboard provides efficient order management and insightful
          analytics to drive business growth.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}
