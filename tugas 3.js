document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    });

    
  });  

const books = [];
const RENDER_EVENT = 'render-book';

  function addBook() {
    const textTitle = document.getElementById('inputBookTitle').value;
    const textAuthor = document.getElementById('inputBookAuthor').value;
    const tahunRilis = document.getElementById('inputBookYear').value;
    const generatedID = generateId();
    let bookObject = generatebookObject(generatedID, textTitle, textAuthor,tahunRilis, false);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
   
  }

  function generateId() {
    return +new Date();
  }
   
  function generatebookObject(id, title,author,year,isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted
    }
  }

  document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
  });

  function makeBook(bookObject) {

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;
   
    const authorName = document.createElement('p');
    authorName.innerText = 'Penulis : '+ bookObject.author;
   
    const yearRelease = document.createElement('p');
    yearRelease.innerText = 'Tahun : '+ bookObject.year;
   
    const bookContainer = document.createElement('article');
    bookContainer.classList.add('book_list');
    bookContainer.append(bookTitle,authorName,yearRelease);
   
    const bookArticle = document.createElement('div');
    bookArticle.classList.add('book_item');
    bookArticle.append(bookContainer);
    bookArticle.setAttribute('id', `book-${bookObject.id}`);
    

    if (bookObject.isCompleted === false) {
      let checkBook = document.createElement('div');
      checkBook.classList.add('action');

      let doneBook = document.createElement('button');
      doneBook.classList.add('green');
      doneBook.innerText = 'Selesai Dibaca';

      doneBook.addEventListener('click', function () {
        addTaskToCompleted(bookObject.id);
      });

      let removeBook = document.createElement('button');
      removeBook.classList.add('red');
      removeBook.innerText = 'Hapus Buku';

      removeBook.addEventListener('click', function () {
        removeTaskFromCompleted(bookObject.id);
      });
      checkBook.append(doneBook,removeBook);
   
      bookArticle.append(checkBook);
    } else {
      let checkBook = document.createElement('div');
      checkBook.classList.add('action');

      let doneBook = document.createElement('button');
      doneBook.classList.add("green");
      doneBook.innerText = 'Selesai Dibaca';

      doneBook.addEventListener('click', function () {
        addTaskToCompleted(bookObject.id);
      });

      let removeBook = document.createElement('button');
      removeBook.classList.add("red");
      removeBook.innerText = 'Hapus Buku';

      removeBook.addEventListener('click', function () {
        removeTaskFromCompleted(bookObject.id);
      });

      checkBook.append(doneBook,removeBook);
   
      bookArticle.append(checkBook);

     
      
    }
   



    return bookArticle;
  }

  function findBook(bookId) {
    for (const bookItem of books) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }

  function addTaskToCompleted (bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
   
  }

  function removeTaskFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    
  }
   
   
  function undoTaskFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    
  }

  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }
   
    return -1;
  }


  document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';

    const completedBookList = document.getElementById('completeBookshelfList');
    completedBookList.innerHTML = '';
   
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isCompleted)
        uncompletedBookList.append(bookElement);

      else
        completedBookList.append(bookElement);

    }

  });
  