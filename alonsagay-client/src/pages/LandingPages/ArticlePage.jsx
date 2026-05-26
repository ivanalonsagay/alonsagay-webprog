import { useParams } from 'react-router-dom';

import Button from '../../components/Button.jsx';
import articles from '../../data/article-content.js';

function ArticlePage() {
  const { id } = useParams();

  const article = articles.find((article) => article.id === id);

  if (!article) {
    return (
      <main className="min-h-screen w-full bg-[#fff9ea]">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-center px-5 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#edf5d9] text-5xl shadow-lg shadow-green-900/10">
            🍋
          </div>

          <h1 className="text-4xl font-black text-green-900">
            Article Not Found
          </h1>

          <p className="mt-4 max-w-lg text-zinc-700">
            The article you are looking for does not exist or may have been
            moved.
          </p>

          <Button
            to="/articles"
            className="!mt-8 !inline-flex !items-center !justify-center !rounded-full !border-0 !bg-green-900 !px-8 !py-3 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white hover:!bg-green-800"
          >
            Back to Articles
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#fff9ea]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 pb-12 pt-12 sm:px-8 lg:px-12">
        <section className="overflow-hidden rounded-[2rem] border border-green-900/10 bg-[#fffdf5] shadow-2xl shadow-green-900/10">
          <div className="aspect-[16/8] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-7 sm:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
              <span>📰</span>
              <span>{article.category}</span>
            </div>

            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-zinc-600">
              Article
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-green-900 sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {article.id
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </p>

            <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-700">
              {article.description}
            </p>

            <p className="mt-6 max-w-3xl whitespace-pre-wrap text-base leading-8 text-zinc-700">
              {article.content}
            </p>

            <div className="mt-9 flex flex-wrap gap-4 border-t border-green-900/10 pt-8">
              <Button
                to="/articles"
                className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white !shadow-lg !shadow-green-900/25 hover:!bg-green-800"
              >
                Back to Articles
              </Button>

              <Button
                to="/"
                className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-2 !border-green-800 !bg-transparent !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-green-900 hover:!bg-green-900 hover:!text-white"
              >
                Back Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ArticlePage;