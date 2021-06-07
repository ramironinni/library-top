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

    function addBookToLibrary(e) {
        e.preventDefault();

        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const pages = document.getElementById("pages");
        const read = document.getElementById("read");

        const newBook = new Book(
            title.value,
            author.value,
            pages.value,
            read.checked
        );
        myLibrary.push(newBook);
        displayBooks();
    }

    function displayBooks() {
        const booksTilesContainer = document.getElementById(
            "books-tiles-container"
        );

        booksTilesContainer.innerText = "";

        myLibrary.forEach((book, i) => {
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

            bookTile.dataset.index = i;

            const isRead = book.read;

            const toggleIsRead = createToggleSwitchRead(isRead);
            bookTile.appendChild(toggleIsRead);

            const deleteBtn = createDeleteBtn();
            bookTile.appendChild(deleteBtn);

            booksTilesContainer.appendChild(bookTile);
        });
    }

    function createDeleteBtn() {
        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("material-icons");
        deleteBtn.classList.add("material-icons-outlined");
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerText = "delete_outline";
        deleteBtn.addEventListener("click", deleteBook);
        return deleteBtn;
    }

    function deleteBook(e) {
        const tile = e.target.parentNode;
        const index = tile.dataset.index;
        myLibrary.splice(index, 1);

        tile.parentNode.removeChild(tile);
        displayBooks();
    }

    function createToggleSwitchRead(isRead) {
        const label = document.createElement("label");
        label.classList.add("switch");

        const input = document.createElement("input");
        input.classList.add("switch-input");
        input.type = "checkbox";
        input.checked = isRead;
        input.addEventListener("change", toggleReadState);

        label.appendChild(input);

        const span = document.createElement("span");
        span.classList.add("slider");
        span.classList.add("round");
        label.appendChild(span);
        return label;
    }

    function toggleReadState(e) {
        const tile = e.target.parentNode.parentNode;
        const index = tile.dataset.index;
        myLibrary[index].read = myLibrary[index].read ? false : true;
        displayBooks();
        console.log(myLibrary);
    }

    displayBooks();
});
