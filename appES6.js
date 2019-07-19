const form = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static showAlert(alertText, alertClass) {
    const alert = document.getElementById('alert');

    // Display Alert and Remove after 3 Seconds
    alert.textContent = alertText;
    alert.className = alertClass;
    setTimeout(() => {
      alert.textContent = '';
      alert.classList.remove(alertClass);
    }, 3000);
  }

  static addNewBook(book) {
    const row = bookList.insertRow(-1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const isbnCell = row.insertCell(2);
    const deleteCell = row.insertCell(3);

    // Populate Table Row
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    isbnCell.textContent = book.isbn;
    deleteCell.innerHTML = `<a href="#">X</a>`;

    // Clear Values (Closure!)
    title.value = '';
    author.value = '';
    isbn.value = '';
  }

  static removeBook(el) {
    if (el.tagName == 'TR') {
      el.remove();
    }
  }
}

class LS {
  static addLocalStorage(book) {
    let titleLS = localStorage.getItem('Title');
    let authorLS = localStorage.getItem('Author');
    let isbnLS = localStorage.getItem('ISBN');

    if (titleLS == null || authorLS == null || isbnLS == null) {
      titleLS = [];
      authorLS = [];
      isbnLS = [];
    } else {
      titleLS = JSON.parse(titleLS);
      authorLS = JSON.parse(authorLS);
      isbnLS = JSON.parse(isbnLS);
    }

    titleLS.push(book.title);
    authorLS.push(book.author);
    isbnLS.push(book.isbn);

    localStorage.setItem('Title', JSON.stringify(titleLS));
    localStorage.setItem('Author', JSON.stringify(authorLS));
    localStorage.setItem('ISBN', JSON.stringify(isbnLS));
  }

  static displayLocalStorage() {
    let titleLS = localStorage.getItem('Title');
    let authorLS = localStorage.getItem('Author');
    let isbnLS = localStorage.getItem('ISBN');

    if (titleLS == null || authorLS == null || isbnLS == null) {
      titleLS = [];
      authorLS = [];
      isbnLS = [];
    } else {
      titleLS = JSON.parse(titleLS);
      authorLS = JSON.parse(authorLS);
      isbnLS = JSON.parse(isbnLS);

      const rows = titleLS.length;

      for (let i = 0; i < titleLS.length; i++) {
        const row = bookList.insertRow(i);
        const titleCell = row.insertCell(0);
        const authorCell = row.insertCell(1);
        const isbnCell = row.insertCell(2);
        const deleteCell = row.insertCell(3);

        // Populate Table Row
        titleCell.textContent = titleLS[i];
        authorCell.textContent = authorLS[i];
        isbnCell.textContent = isbnLS[i];
        deleteCell.innerHTML = `<a href="#">X</a>`;
      }
    }
  }

  static removeLocalStorage(title, author, isbn) {
    let titleLS = JSON.parse(localStorage.getItem('Title'));
    let authorLS = JSON.parse(localStorage.getItem('Author'));
    let isbnLS = JSON.parse(localStorage.getItem('ISBN'));

    titleLS.splice(titleLS.indexOf(title), 1);
    authorLS.splice(authorLS.indexOf(title), 1);
    isbnLS.splice(isbnLS.indexOf(title), 1);

    localStorage.setItem('Title', JSON.stringify(titleLS));
    localStorage.setItem('Author', JSON.stringify(authorLS));
    localStorage.setItem('ISBN', JSON.stringify(isbnLS));
  }
}

// On Window Load
window.addEventListener('load', e => {
  LS.displayLocalStorage();
});

// On Form Submit
form.addEventListener('submit', e => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const isbn = document.getElementById('isbn');

  // Instantiate New Book
  const newBook = new Book(title.value, author.value, isbn.value);

  if (title.value != '' && author.value != '' && isbn.value != '') {
    // Add New Book to List
    UI.addNewBook(newBook);
    UI.showAlert('Book added successfully', 'success');

    // Store New Book in Local Storage
    LS.addLocalStorage(newBook);
  } else {
    // throw error alert
    UI.showAlert('Please check your inputs', 'error');
  }

  e.preventDefault();
});

bookList.addEventListener('click', e => {
  const tr = e.target.parentElement.parentElement;
  const title = tr.children[0].innerHTML;
  const author = tr.children[0].innerHTML;
  const isbn = tr.children[0].innerHTML;

  const newUI = new UI();

  // Remove Book and Show Alert
  UI.removeBook(tr);
  UI.showAlert('Book removed successfully', 'success');
  LS.removeLocalStorage(title, author, isbn);
});
