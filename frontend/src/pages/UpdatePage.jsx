import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useLibraryStore } from "../store/libraryStore";

const UpdatePage = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [review, setReview] = useState("");
  const { isLoading, error, updateBook, fetchBook, book } = useLibraryStore();
  const navigate = useNavigate();
  const params = useParams();

  console.log("Params", params)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !isbn || !author || !link) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await updateBook ( params.id, image, title, isbn, author, link, review);
      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success(response.message || "Book updated successfully!");
      navigate(`/book/${book._id}`);
    } catch (err) {
      toast.error("Something went wrong while updating the book.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBook(params.id)
  }, [fetchBook, params]);

  useEffect(() => {
    if(book){
      setTitle(book.title);
      setIsbn(book.isbn);
      setAuthor(book.author);
      setLink(book.link);
      setReview(book.review);
    }
  }, [book]);

  return (
    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-16">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full max-w-xl mx-auto">
        Update Book
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-5 md:mt-10"
      >
        {/* Book Image */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Book Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the book title"
            className="w-full px-3 py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* ISBN */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">ISBN:</label>
          <input
            type="number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter the book ISBN"
            className="w-full px-3 py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author's name"
            className="w-full px-3 py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* Link */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link to where users can find the book"
            className="w-full px-3 py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* Review */}
        <div className="flex flex-col w-full">
          <label className="md:text-lg">Personal Review (optional):</label>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Your personal review"
            className="w-full px-3 py-2 resize-none text-[#252422] rounded-lg bg-white border border-gray-500"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#403D39] text-[#FFFCF2] py-2 font-medium rounded-lg hover:bg-[#2e2b27] transition"
        >
          {isLoading ? "Adding Book..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
