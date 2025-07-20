import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
    toast.success("Product added to cart");
  };

  if (loading)
    return <p className="text-center text-white mt-10">Đang tải sản phẩm...</p>;
  if (!product)
    return (
      <p className="text-center text-red-500 mt-10">Không tìm thấy sản phẩm</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20 text-white">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg border border-gray-700"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-emerald-400">
            {product.name}
          </h1>
          <p className="mb-6 text-gray-300">{product.description}</p>

          <p className="text-2xl font-semibold text-yellow-400 mb-6">
            Price: ${product.price.toLocaleString()}
          </p>

          <button
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded text-white font-medium transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
