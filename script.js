window.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function checkStoredBooks() {
        if (localStorage.length === 0) {
            populateBooksByDefault();
            setInLocalStorage();
        } else {
            getFromLocalStorage();
        }
    }

    function populateBooksByDefault() {
        const defaultBooks = [
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
                title: "The Dark Tower: The Gunslinger",
                author: "Stephen King",
                pages: 224,
                read: false,
            },
            {
                title: "Tales of Mystery and Madness",
                author: "Edgar Allan Poe",
                pages: 144,
                read: true,
            },
            {
                title: "The Big Four",
                author: "Agatha Christie",
                pages: 125,
                read: false,
            },
        ];

        defaultBooks.forEach((book) => myLibrary.push(book));
    }

    function setInLocalStorage() {
        myLibraryJSON = JSON.stringify(myLibrary);
        localStorage.setItem("myLibrary", myLibraryJSON);
    }

    function getFromLocalStorage() {
        const storedBooksJSON = localStorage.getItem("myLibrary");
        const storedBooks = JSON.parse(storedBooksJSON);
        storedBooks.forEach((book) => myLibrary.push(book));
    }
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

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;

        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        setInLocalStorage();
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

            const controlsContainer = document.createElement("div");
            controlsContainer.classList.add("controls-container");

            const isRead = book.read;
            const toggleIsRead = createToggleSwitchRead(isRead);
            controlsContainer.appendChild(toggleIsRead);

            isRead
                ? bookTile.classList.add("book-tile-read")
                : bookTile.classList.remove("book-tile-read");

            const deleteBtn = createDeleteBtn();
            controlsContainer.appendChild(deleteBtn);

            bookTile.appendChild(controlsContainer);

            booksTilesContainer.appendChild(bookTile);
        });
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
        const tile = e.target.parentNode.parentNode.parentNode;
        const index = tile.dataset.index;
        myLibrary[index].read = myLibrary[index].read ? false : true;
        displayBooks();
        console.log(myLibrary);
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
        setInLocalStorage();
        displayBooks();
    }

    checkStoredBooks();

    displayBooks();
});
