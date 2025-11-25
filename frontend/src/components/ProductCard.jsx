import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      navigate("/login");
      return;
    }
    addToCart(product);
    //toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-900">
      {/* Image */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={product.image}
          alt="product image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Info */}
      <div className="mt-4 px-5 pb-5 flex flex-col flex-1">
        <h5 className="text-xl font-semibold tracking-tight text-white mb-2">
          {product.name}
        </h5>

        <p className="text-2xl font-bold text-emerald-400 mb-4">
          ${product.price}
        </p>

        {/* Nút hành động */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            <ShoppingCart size={20} className="mr-2" />
            {/* Add to cart */}
          </button>

          <Link
            to={`/product/${product._id}`}
            className="flex-1 flex items-center justify-center rounded-lg border border-emerald-500 text-emerald-400 px-4 py-2 text-sm font-medium hover:bg-emerald-800 transition"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
