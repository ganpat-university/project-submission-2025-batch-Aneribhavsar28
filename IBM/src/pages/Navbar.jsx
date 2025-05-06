// import React, { useState } from 'react';
// import { Menu, X, Film, Search } from 'lucide-react';

// const Navbar = ({ onSearch }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };

//   return (
//     <nav className="bg-gray-800 fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <Film className="h-8 w-8 text-red-500" />
//             <span className="ml-2 text-xl font-bold text-white">MovieMate</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="flex items-center space-x-4">
//               <a href="#" className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Home</a>
//               <a href="#" className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Popular</a>
//               <a href="#" className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Top Rated</a>
//               <a href="#" className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Upcoming</a>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:block flex-1 max-w-md mx-4">
//             <form onSubmit={handleSubmit} className="relative">
//               <input
//                 type="text"
//                 placeholder="Search movies..."
//                 className="w-full bg-gray-700 text-white rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </button>
//             </form>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-400 hover:text-white focus:outline-none"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
//             <a href="#" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Popular</a>
//             <a href="#" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Top Rated</a>
//             <a href="#" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Upcoming</a>
//             <form onSubmit={handleSubmit} className="relative mt-3">
//               <input
//                 type="text"
//                 placeholder="Search movies..."
//                 className="w-full bg-gray-700 text-white rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useCallback } from 'react';
import { Menu, X, Film, Search } from 'lucide-react';
import debounce from 'lodash/debounce';

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-bold text-white">MovieMate</span>
          </div>

         
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#trending" className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Trending</a>
              <a href="#popular" className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Popular</a>
              <a href="#top-rated" className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Top Rated</a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#trending" className="text-white block px-3 py-2 rounded-md text-base font-medium">Trending</a>
            <a href="#popular" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Popular</a>
            <a href="#top-rated" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Top Rated</a>
            <div className="relative px-3 py-2">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-gray-700 text-white rounded-full px-4 py-1 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-6 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;