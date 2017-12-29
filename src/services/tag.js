import db from './../models';

const { Tag } = db;

export default function () {
  return {
    async createBatch(tags, transaction) {
      const bookTags = await Promise.all(tags.map(async (tag) => {
        const [t] = await Tag
          .findOrCreate({
            where: { text: tag.text },
            defaults: {
              text: tag.text,
            },
            transaction,
          });
        return t;
      }));

      return bookTags;
    },
  };
}
