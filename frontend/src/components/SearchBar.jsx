import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 shadow-sm w-full 
                 focus-within:ring-2 focus-within:ring-green-400 transition-all"
    >
      <Search className="text-gray-500 w-5 h-5 mr-2" />
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
      />
    </form>
  );
}
