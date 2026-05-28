import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArticleService from '../../services/articleService';

const ArticlePage = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticle = async () => {
    try {
      setIsLoading(true);

      const articles = await ArticleService.getArticles();

      const foundArticle = articles.find(
        (item) => String(item.slug) === String(slug)
      );

      setArticle(foundArticle || null);
    } catch {
      setArticle(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#fff9ea]">
        <div className="mx-auto flex min-h-[70vh] max-w-[900px] items-center justify-center px-5 text-center">
          <p className="text-lg font-bold text-green-900">Loading article...</p>
        </div>
      </main>
    );
  }

  if (!article || article.status !== 'active') {
    return (
      <main className="min-h-screen bg-[#fff9ea]">
        <div className="mx-auto flex min-h-[80vh] max-w-[900px] flex-col items-center justify-center px-5 text-center">
          <div className="mb-6 text-7xl">🍋</div>

          <h1 className="text-4xl font-black text-green-950">
            Article Not Found
          </h1>

          <p className="mt-4 text-zinc-600">
            This article does not exist or is currently inactive.
          </p>

          <Link
            to="/articles"
            className="mt-8 rounded-full bg-green-900 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-green-800"
          >
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9ea]">
      <section className="mx-auto max-w-[1050px] px-5 py-14 sm:px-8 lg:px-12">
        <article className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="flex aspect-[16/8] items-center justify-center bg-[#edf5d9]">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-8xl">🍋</span>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
              {article.slug}
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight text-green-950">
              {article.title}
            </h1>

            <div className="mt-6 h-1 w-14 rounded-full bg-yellow-500" />

            <div className="mt-8 space-y-5">
              {article.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-3xl text-base leading-8 text-zinc-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              to="/articles"
              className="mt-10 inline-flex rounded-full bg-green-900 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-green-800"
            >
              Back to Articles
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ArticlePage;