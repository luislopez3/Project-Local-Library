// Note: Please do not change the name of the functions. The tests use those names to validate your code.

const { findBookById, findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    const isBookOut = book.borrows;
    isBookOut.forEach((borrowed) => {
    if (borrowed.returned === false) {
      total += 1;
      }
    });
  });
  return total;
}


// Helper function to parse the top five results of the next three functions.
function topFive(input) {
  let result = (input).slice(0, 5);
  return result;
}

function getMostCommonGenres(books) {
  const mostCommonGenres = {};
  books.forEach((book) => {
    if (Object.keys(mostCommonGenres).includes(book.genre)) {
      mostCommonGenres[book.genre] += 1;
    } else {
      mostCommonGenres[book.genre] = 1;
    }
  });
  const sortedGenres = Object.fromEntries(
    Object.entries(mostCommonGenres).sort(([,genreA],[,genreB]) => genreB - genreA)
  );
  const sortedGenresArray = [];
  Object.keys(sortedGenres).forEach((genre) => {
    sortedGenresArray.push({ name: genre, count: sortedGenres[genre] });
  });
  return (topFive(sortedGenresArray));
}

function getMostPopularBooks(books) {
  let popularBook = books.map((book) => {
    return({name: book.title, count: book.borrows.length})
   }).sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
   return(topFive(popularBook));
 }

function getMostPopularAuthors(books, authors) {
  const authorBooks = {};    
  authors.forEach((author) => {
    authorBooks[author.id] = 0;
  });    
  books.forEach((book) => {
    authorBooks[book.authorId] += book.borrows.length;
  });    
  const authorBooksByName = {};    
  Object.keys(authorBooks).map(authorId => parseInt(authorId)).forEach((authorId) => {
    authors.forEach((author) => {
      if (author.id === authorId) {
        const fullName = `${author.name.first} ${author.name.last}`;
        authorBooksByName[fullName] = authorBooks[authorId];
      }
    });
  });    
  const sortedAuthors = Object.fromEntries(
    Object.entries(authorBooksByName).sort(([,authorA],[,authorB]) => authorB - authorA)
  );
  const sortedAuthorsArray = [];
  Object.keys(sortedAuthors).forEach((author) => {
    sortedAuthorsArray.push({ name: author, count: sortedAuthors[author] });
  });
  return (topFive(sortedAuthorsArray));
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
