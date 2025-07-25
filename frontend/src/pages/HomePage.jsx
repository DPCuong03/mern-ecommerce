import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  //{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  //{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  //{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  //{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/routers", name: "Routers", imageUrl: "/router.jpg" },
  { href: "/cameras", name: "Cameras", imageUrl: "/camera.jpg" },
  { href: "/servers", name: "Servers", imageUrl: "/server.jpg" },
  { href: "/printers", name: "Printers", imageUrl: "/printer.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!isLoading && Array.isArray(products) && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12"></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && Array.isArray(products) && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
