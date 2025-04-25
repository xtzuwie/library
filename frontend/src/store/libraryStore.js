import { create } from "zustand";
import axios from "axios";

const API_URL = "https://library-fyft.onrender.com/api";    
axios.defaults.withCredentials = true;

export const useLibraryStore = create((set) => ({
    // initial states
    book: null,
    books: [],
    isLoading: false,
    error: null,
    message: null,

    // adding books into the database
    addBook: async (image, title, isbn, author, link, review) => {
        set({isLoading: true, error: null, message: null})

        try {
            const response = await axios.post(`${API_URL}/inventory`, {
                image,
                title,
                isbn,
                author,
                link,
                review,
            });

            const {message, book} = response.data;

            set({book, message, isLoading: false});

            return {message, book};
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error adding book";
            set({ isLoading: false, error: errorMessage });
            return { error: errorMessage };
         }
    },

    // fetching books or displaying books in the UI 
    fetchbooks: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/fetch-books`);

            set({ books: response.data.books, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error fetching books",
            });

            throw error;
        }
    },

    // For searching books
    searchBooks: async (searchTerm) => {
        set({ isLoading: true, error: null });
    
        try {
          const response = await axios.get(`${API_URL}/search?${searchTerm}`);
    
          set({ books: response.data.books, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response.data.message || "Error fetching books.",
          });
          throw error;
        }
      },

    // fetching books by id's
    fetchBook: async (id) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/fetch-book/${id}`);

            set({book: response.data.book, isLoading: false});
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error fetching book.",
              });
              throw error;
        }
    },

    // deleting book
    deleteBook: async (id) => {
        set({ isLoading: true });
        try {
            const response = await axios.delete(`${API_URL}/delete-book/${id}`);
            set({ isLoading: false });
            return { message: response.data.message };
        } catch (error) {
            set({
                isLoading: false,});
            return { error: error.response?.data?.message || "Error deleting book" };
            }
        },

        updateBook: async (id, image, title, isbn, author, link, review) => {
            set({ isLoading: true, error: null, message: null });

            try {
                const response = await axios.post(`${API_URL}/update-book/${id}`,{
                    image, title, isbn, author, link, review,
                });

                const {message, book} = response.data;

                set({book, message, isLoading: false });

                return{message, book}
            } catch (error) {
                set({
                    isLoading: false,
                    error: error.response.data.message || "Error updating book",
                });
            }
        }
}));