// Book class: Models a book
class Book {
    constructor(title, author, isbn) {
       this.title = title;
       this.author = author;
       this.isbn = isbn;
    }
}

// UI class: Handles UI tasks
class UI {
    static displayBooks() {
        //Array of books fromm the local storage
       const books = Store.getBook();
       books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        //Add the book properties to the created row element for display within the table
        row.innerHTML =
            `<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

        list.appendChild(row);
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //get container element to place created element below of it.
        const container = document.querySelector('.container');
        //get form element below container to place created element above of
        const form = document.querySelector('#book-form');
        //insert element between the form and container (but within the container);
        container.insertBefore(div, form);

        //vanish alert after 2.5s
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            //remove element from dom
            el.parentElement.parentElement.remove();

            //get the isbn from the event object by event propagation
            Store.deleteBook(el.parentElement.previousElementSibling.textContent);

            //alert user about book deletion
            UI.showAlert('Book removed', 'success');
        }
    }
}

// Store class: Handles storage
class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBook();
        books.push(book);
        //add books array back to the local storage.
        localStorage.setItem('books', JSON.stringify(books));
    }

    static deleteBook(isbn) {
        const books = Store.getBook();
        books.forEach((book, index) => {
            if (isbn === book.isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: to add a book
form = document.querySelector('#book-form');
form.addEventListener('submit',
    (e) => {
    //prevent default submit event
    e.preventDefault();

    //collect information from form fields
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //create Book object with info from form fields
        const book = new Book(title, author, isbn);

        //add book to UI
        UI.addBookToList(book);

        //add book to storage
        Store.addBook(book);

        //alert user about book addition
        UI.showAlert('Book Added', 'success');

        //clear fields after event
        UI.clearFields();
    }

});


// Event: remove a book
document.querySelector('#book-list').addEventListener('click',
    (e) => {
        //delete book item from ui
        UI.deleteBook(e.target)

    });
