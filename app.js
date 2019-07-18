const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book Prototype
Book.prototype.addNewBook = function() {
  const row = bookList.insertRow(-1);
  const titleCell = row.insertCell(0);
  const authorCell = row.insertCell(1);
  const isbnCell = row.insertCell(2);
  const deleteCell = row.insertCell(3);

  // Populate Table Row
  titleCell.textContent = this.title;
  authorCell.textContent = this.author;
  isbnCell.textContent = this.isbn;
  deleteCell.innerHTML = `<a href="#">X</a>`;

  // Clear Values
  title.value = '';
  author.value = '';
  isbn.value = '';
};

// Remove Book Prototype
UI.prototype.removeBook = function(el) {
  if (el.tagName == 'TR') {
    el.remove();
  }
};

// Alert UI Prototype
UI.prototype.showAlert = function(alertText, alertClass) {
  const alert = document.getElementById('alert');

  // Display Alert and Remove after 3 Seconds
  alert.textContent = alertText;
  alert.className = alertClass;
  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(alertClass);
  }, 3000);
};

form.addEventListener('submit', e => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const isbn = document.getElementById('isbn');

  // Instantiate New Book
  const newBook = new Book(title.value, author.value, isbn.value);
  // Instantiate New UI
  const newUI = new UI();

  if (title.value != '' && author.value != '' && isbn.value != '') {
    // Add New Book to List
    newBook.addNewBook();
    newUI.showAlert('Book added successfully', 'success');
  } else {
    // throw error alert
    newUI.showAlert('Please check your inputs', 'error');
  }

  e.preventDefault();
});

bookList.addEventListener('click', e => {
  const tr = e.target.parentElement.parentElement;

  const newUI = new UI();

  // Remove Book and Show Alert
  newUI.removeBook(tr);
  newUI.showAlert('Book removed successfully', 'success');
});
