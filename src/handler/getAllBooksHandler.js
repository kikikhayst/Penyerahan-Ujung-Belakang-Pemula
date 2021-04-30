const book = require('../books');

const Success = (h, { code, ...data }) => {
  const response = h
    .response({
      status: 'success',
      ...data,
    });

  return response;
};

const getAllBooksHandler = (request, h) => {
  const {
    finished,
    name,
    reading,
  } = request.query;

  let Books = book;

  if (reading) {
    const hasReading = reading === '1';
    Books = book.filter((b) => b.reading === hasReading);
  }

  if (finished) {
    const hasFinished = finished === '1';
    Books = book.filter((b) => b.finished === hasFinished);
  }

  if (name) {
    Books = book.filter((b) => b.name.toUpperCase().includes(name.toUpperCase()));
  }

  const getAllBooks = Books.map((b) => ({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));

  return Success(h, {
    data: {
      books: getAllBooks,
    },
  });
};

module.exports = { getAllBooksHandler };
