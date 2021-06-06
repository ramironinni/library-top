window.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.info = function () {
        return `${this.title} by ${this.author}. ${this.pages} pages. Read: ${
            this.read ? "yes" : "no"
        }`;
    };

    const addBookForm = document.getElementById("add-book-form");
    addBookForm.addEventListener("submit", addBookToLibrary);

    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    function addBookToLibrary(e) {
        e.preventDefault();
        const newBook = new Book(
            title.value,
            author.value,
            pages.value,
            read.checked
        );
        myLibrary.push(newBook);
        console.log(myLibrary);
    }

    function displayBooks() {}
});
