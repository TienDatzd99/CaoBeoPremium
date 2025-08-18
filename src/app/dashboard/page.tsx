import { useSession } from 'next-auth/react';
import { getOrders } from '@/lib/orders';

export default async function Dashboard() {
  const session = useSession();
  if (!session) return <p>Please login</p>;
  const orders = await getOrders();

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.product.name} - Status: {order.status} - Details: {order.accountDetails}
          </li>
        ))}
      </ul>
    </div>
  );
}