import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ArticleService from '../../services/articleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  const loadArticles = async () => {
    try {
      const data = await ArticleService.getArticles();

      const activeArticles = data.filter(
        (article) => article.status === 'active'
      );

      setArticles(activeArticles);
    } catch (err) {
      setError(err.message || 'Unable to load articles.');
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <main className="min-h-screen bg-[#fff9ea]">
      <section className="mx-auto w-full max-w-[1300px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mb-10">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
            Ivanka Articles
          </p>

          <h1 className="mt-3 text-5xl font-black text-green-950">
            Fresh Stories About Calamansi
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
            Articles added from the admin dashboard are shown here when their
            status is active.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        {articles.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-black text-green-900">
              No active articles yet
            </h2>

            <p className="mt-3 text-zinc-600">
              Add or activate an article from the dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-[#edf5d9]">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🍋</span>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-green-800">
                    {article.slug}
                  </p>

                  <h2 className="mt-3 text-2xl font-black text-green-950">
                    {article.title}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-600">
                    {article.preview || article.paragraphs[0]}
                  </p>

                  <Link
                    to={`/articles/${article.slug}`}
                    className="mt-6 inline-flex rounded-full bg-green-900 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-green-800"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ArticleListPage;