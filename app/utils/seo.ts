export function generateMeta(title: string, description?: string) {
  return {
    title,
    description: description || `${title} - ShopDemo`,
  };
}
