export default function SkeletonProductCard() {
  return (
    <div className="animate-pulse bg-white p-4 rounded">
      <div className="h-44 bg-gray-200 rounded mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  );
}
