export async function getOrders() {
  const res = await fetch('/api/orders');
  return await res.json();
}