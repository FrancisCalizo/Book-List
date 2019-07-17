const form = document.getElementById('book-form');
const alert = document.getElementById('alert');

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
  const deleteCell = row.insertCell(3);

  titleCell.textContent = this.title;
  authorCell.textContent = this.author;
  isbnCell.textContent = this.isbn;
  deleteCell.innerHTML = `<a href="#">X</a>`;

  // Display Success Alert and Remove after 3 Seconds
  alert.textContent = 'Book Added';
  alert.className = 'success';
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove('success');
  }, 3000);
};

form.addEventListener('submit', e => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const isbn = document.getElementById('isbn');

  if (title.value != '' && author.value != '' && isbn.value != '') {
    // Instantiate New Book
    const newBook = new Book(title.value, author.value, isbn.value);

    // Add New Book to List
    newBook.addNewBook();
    title.value = '';
    author.value = '';
    isbn.value = '';
  } else {
    // throw error alert
    alert.textContent = 'Please check your input fields.';
    alert.className = 'error';
    setTimeout(() => {
      alert.textContent = '';
      alert.classList.remove('error');
    }, 3000);
  }

  e.preventDefault();
});
