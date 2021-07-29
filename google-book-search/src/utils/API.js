import axios from "axios";
const apiKey = "AIzaSyDf0XoJSlqQM5agP1zQIm_pdXsnr6f2Qgc";

  // Send request to google books to find searched book
  export default {
    getBooksByTitle: function(title) {
        return new Promise((resolve, reject) => {
        axios
            .get("https://www.googleapis.com/books/v1/volumes?q=$" + title + "&key=" + apiKey)
            .then(res => {
            const bookResults = res.data.items;
            const results = bookResults.map(book => {
                const { imageLinks = null } = book.volumeInfo

                const thumbnail = imageLinks ? imageLinks.thumbnail : null
                return {
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: thumbnail,
                    link: book.volumeInfo.previewLink
                };
            });
            resolve(results);
            })
            .catch(err => reject(err));
        });
    },
  getBooks: function() {
    return axios.get("/api/books");
  },
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
}