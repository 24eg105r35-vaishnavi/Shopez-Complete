import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../lib/auth-context';
import { SiteHeader, SiteFooter } from '../components/SiteHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { ordersAPI } from '../lib/api';
import { toast } from 'sonner';

export const Route = createFileRoute('/orders')({
  component: OrdersPage,
});

interface Order {
  _id: string;
  orderNumber: string;
  items: any[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getAll();
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Please log in to view your orders</h1>
            <a href="/login" className="mt-4 inline-block text-primary hover:underline">
              Go to login
            </a>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      processing: 'bg-purple-500',
      shipped: 'bg-cyan-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Button onClick={() => (window.location.href = '/')}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{order.orderNumber}</CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="mt-2 font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Items ({order.items.length})</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {order.items.map((item: any, index: number) => (
                          <li key={index}>
                            • Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Payment Status: </span>
                      <Badge variant="outline">{order.paymentStatus}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
