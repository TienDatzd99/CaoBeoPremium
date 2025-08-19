// lib/products.ts
export async function getProducts() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Lỗi khi lấy sản phẩm: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Lỗi trong getProducts:', error);
    throw error;
  }
}

export async function getProductById(id: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/products?id=${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Lỗi khi lấy sản phẩm: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Lỗi trong getProductById:', error);
    throw error;
  }
}

export async function getProductsByService(service: string) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/products?service=${encodeURIComponent(service)}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Lỗi khi lấy sản phẩm: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Lỗi trong getProductsByService:', error);
    throw error;
  }
}