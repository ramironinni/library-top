window.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [
        {
            title: "A Study in Scarlet",
            author: "Sir Arthur Ignatius Conan Doyle",
            pages: 221,
            read: true,
        },
        {
            title: "The Call of Cthulhu",
            author: "H. P. Lovecraft",
            pages: 67,
            read: true,
        },
        {
            title: "The Big Four",
            author: "Agatha Christie",
            pages: 125,
            read: false,
        },
    ];

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

    function displayBooks() {
        const booksTilesContainer = document.getElementById(
            "books-tiles-container "
        );
        myLibrary.forEach((book) => {
            const bookTile = document.createElement("div");
            bookTile.classList.add("book-tile");

            const title = document.createElement("p");
            title.innerText = book.title;
            bookTile.appendChild(title);

            const author = document.createElement("p");
            author.innerText = book.author;
            bookTile.appendChild(author);

            const pages = document.createElement("p");
            pages.innerText = `${book.pages} pages.`;
            bookTile.appendChild(pages);

            booksTilesContainer.appendChild(bookTile);
        });
    }

    displayBooks();
});
