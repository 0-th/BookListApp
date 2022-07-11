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
    //    Array of books fromm the storage
        const storedBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '343434',
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '454545',
            }
        ];

       const books = storedBooks;
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

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store class: Handles storage

// Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

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

    //create Book object with info from form fields
    const book = new Book(title, author, isbn);

    //add book to UI
    UI.addBookToList(book);

    //clear fields after event
    UI.clearFields();
    });

// Event: remove a book
