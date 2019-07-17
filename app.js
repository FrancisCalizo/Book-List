const form = document.getElementById('book-form');

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// Create UI Prototype
Book.prototype.addNewBook = function() {
  const bookList = document.getElementById('book-list');
  const row = bookList.insertRow(-1);
  const titleCell = row.insertCell(0);
  const authorCell = row.insertCell(1);
  const isbnCell = row.insertCell(2);
};

form.addEventListener('submit', e => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const isbn = document.getElementById('isbn');

  const newBook = new Book(title.value, author.value, isbn.value);

  console.log(newBook.addNewBook());
  e.preventDefault();
});
