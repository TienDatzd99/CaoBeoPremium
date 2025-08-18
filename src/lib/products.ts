// lib/products.ts
export async function getProducts() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store', // Ensure fresh data during SSR
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  return await res.json();
}