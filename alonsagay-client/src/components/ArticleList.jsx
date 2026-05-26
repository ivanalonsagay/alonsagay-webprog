import { Link } from 'react-router-dom';

const ArticleList = ({ articles = [] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => {
        const articleId = article.id || index + 1;

        return (
          <article
            key={articleId}
            className="overflow-hidden rounded-3xl border border-green-900/10 bg-[#fffdf5] shadow-lg shadow-green-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-600">
                {article.category || 'Article'}
              </p>

              <h3 className="mt-3 text-xl font-black text-green-900">
                {article.title}
              </h3>

              <div className="mt-3 h-1 w-10 rounded-full bg-yellow-500" />

              <p className="mt-4 text-sm leading-6 text-zinc-700">
                {article.description}
              </p>

              <Link
                to={`/articles/${articleId}`}
                className="mt-6 inline-flex rounded-full bg-green-900 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
              >
                Read More
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;