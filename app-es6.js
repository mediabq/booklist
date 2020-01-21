class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.querySelector('#book-list');
        //create tr
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }
    showAlert(message, className){
        //create div
        const div = document.createElement('div');
        //add classes
        div.className = `alert ${className}`;
        //add text
        div.appendChild(document.createTextNode(message));

        //Get parent
        const container = document.querySelector('.container');
        //Get the form
        const form = document.querySelector('#book-form');

        //insert alert inside parent container before the form
        container.insertBefore(div, form);

        //Timeout after 2s
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000)
    }
    deleteBook(target){
        //Instantiate UI
        const ui = new UI();

        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            //show success alert
            ui.showAlert('Book deleted!', 'success');
        }
    }
    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Local storage class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        });
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listner to add a book
document.querySelector('#book-form').addEventListener('submit', function(e){
    // get form values
    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value

    //Instantiate book
    const book = new Book(title, author, isbn)

    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        //Add book to list
        ui.addBookToList(book);

        //Store book in LS
        Store.addBook(book);

        //show success alert
        ui.showAlert('Book added!', 'success');

        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
})

//Event Listner for Delete
document.querySelector('#book-list').addEventListener('click', function(e){
    //Instantiate UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
})