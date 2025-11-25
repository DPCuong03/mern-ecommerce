import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`/api/products/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  useEffect(() => {
    if (query.trim() !== "") {
      fetchResults();
    }
  }, [query]);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {results?.length === 0 && (
        <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
          No products found
        </h2>
      )}

      {results?.map((result) => (
        <ProductCard key={result._id} product={result} />
      ))}
    </motion.div>
  );
};

export default SearchPage;
