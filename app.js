//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book){
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

//Delete Book
UI.prototype.deleteBook = function(target){
   if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
   } 
}

//Clear fields
UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

//show alert
UI.prototype.showAlert = function(message, className){
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

    //Timeout after 3s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}

//Event Listner for add book
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

    //show success alert
    ui.showAlert('Book deleted!', 'success');

    e.preventDefault();
})