import { Link } from "@tanstack/react-router";
import { ShoppingCart, Store, LogOut, User } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth-context";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function SiteHeader() {
  const { count } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="h-4 w-4" />
          </span>
          ShopEZ
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground [&.active]:text-foreground">Shop</Link>
          <Link to="/about" className="hover:text-foreground [&.active]:text-foreground">About</Link>
          {isAuthenticated && user?.role === 'seller' && (
            <Link to="/dashboard" className="hover:text-foreground [&.active]:text-foreground">Dashboard</Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {user.role === 'seller' && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold text-foreground mb-2">ShopEZ</div>
          <p>Your one-stop destination for effortless online shopping.</p>
        </div>
        <div>
          <div className="font-semibold text-foreground mb-2">Shop</div>
          <ul className="space-y-1">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-foreground mb-2">Company</div>
          <ul className="space-y-1">
            <li>About</li>
            <li>Support</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ShopEZ — Demo store
      </div>
    </footer>
  );
}
