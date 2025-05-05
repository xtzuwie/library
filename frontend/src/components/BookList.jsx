import { Link } from "react-router";
import { useLibraryStore } from "../store/libraryStore";
import { useEffect } from "react";

const BookList = () => {
const {books, fetchbooks} = useLibraryStore();

useEffect(() => {
  fetchbooks();
}, [fetchbooks])


  // Display first 5 books only
  const limitedBooks = books.slice(0,5);
  
  return (
    <div className="text-[#252422] bg-white-300 px-4 md:px-12 pb-20">
      <h1 className="py-6 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl">Most Searched Book&rsquo;s</h1>

      <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-6xl mx-auto">
        {limitedBooks.map((book, index) => (
          <Link key={index} to={`/book/${book._id}`} className="block">
            <div className="cursor-pointer w-36 md:w-40 xl:w-44 shadow-sm hover:shadow-md rounded-b-md">
              <div className="h-48 md:h-52 xl:h-60 bg-gray-900">
                <img src={book.image} alt="book_img" className="w-full h-full object-cover object-center"/>
              </div>

              <div className="p-2">
                <h2 className="mb-2 font-semibold text-base md:text-lg">{book.title}</h2>
                <p className="text-sm md:text-base">{book.author}</p>
              </div>
            </div>
          </Link> 
        ))}
      </div>
    </div>
  )
};

export default BookList
