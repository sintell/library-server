import db from './../models';

const { Author } = db;

export default function () {
  return {
    async createBatch(authorsData, transaction) {
      const bookAuthors = await Promise.all(authorsData.map(async (author) => {
        const [a] = await Author
          .findOrCreate({
            where: { name: author.name },
            defaults: {
              name: author.name,
            },
            transaction,
          });
        return a;
      }));

      return bookAuthors;
    },
  };
}
