// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id ? author : null);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id ? book : null);
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  const result = [];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
    if (isBookReturned) {
      unavailable.push(book);
    }
    else {
      available.push(book);
    }
  });
  result.push(available);
  result.push(unavailable);
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = book.borrows.map((borrows) => {
  let account = accounts.find((account) => account.id === borrows.id);
  return { ...borrows, ...account };
  });
  return(result).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
