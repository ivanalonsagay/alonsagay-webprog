import { Link, useParams } from 'react-router-dom';

import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content';

import HeroImage from '../assets/article1a.png';

const ArticlePage = () => {
  const { id } = useParams();

  const selectedArticle = articles.find((article, index) => {
    const articleId = article.id || index + 1;

    return String(articleId) === String(id);
  });

  if (id && !selectedArticle) {
    return (
      <main className="min-h-screen w-full bg-[#fff9ea]">
        <div className="mx-auto flex min-h-[80vh] w-full max-w-[1200px] flex-col items-center justify-center px-5 text-center">
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

          <Link
            to="/articles"
            className="mt-8 inline-flex rounded-full bg-green-900 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
          >
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  if (selectedArticle) {
    const content = Array.isArray(selectedArticle.content)
      ? selectedArticle.content
      : [selectedArticle.content];

    return (
      <main className="min-h-screen w-full bg-[#fff9ea]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 pb-12 pt-12 sm:px-8 lg:px-12">
          <section className="overflow-hidden rounded-[2rem] border border-green-900/10 bg-[#fffdf5] shadow-2xl shadow-green-900/10">
            <div className="aspect-[16/8] overflow-hidden">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-7 sm:p-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
                <span>📰</span>
                <span>{selectedArticle.category || 'Article'}</span>
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-tight text-green-900 sm:text-5xl lg:text-6xl">
                {selectedArticle.title}
              </h1>

              <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

              <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-700">
                {selectedArticle.description}
              </p>

              <div className="mt-8 space-y-5">
                {content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="max-w-3xl whitespace-pre-wrap text-base leading-8 text-zinc-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-4 border-t border-green-900/10 pt-8">
                <Link
                  to="/articles"
                  className="inline-flex rounded-full bg-green-900 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
                >
                  Back to Articles
                </Link>

                <Link
                  to="/"
                  className="inline-flex rounded-full border-2 border-green-800 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-green-900 transition hover:bg-green-900 hover:text-white"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#fff9ea]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 pb-12 pt-8 sm:px-8 lg:px-12">
        <section className="grid gap-10 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
              <span>📰</span>
              <span>Ivanka Articles</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-green-900 sm:text-6xl lg:text-7xl">
              Stories About Fresh, Local Calamansi Goodness
            </h1>

            <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-700 sm:text-lg">
              Discover stories about Ivanka Calamansi Juice, from its fresh
              citrus taste to its proudly Pinoy flavor. Learn why this tangy and
              refreshing drink is perfect for everyday moments.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex rounded-full bg-green-900 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
              >
                Back Home
              </Link>

              <Link
                to="/about"
                className="inline-flex rounded-full border-2 border-green-800 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-green-900 transition hover:bg-green-900 hover:text-white"
              >
                About Ivanka
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-green-900/10">
            <img
              src={HeroImage}
              alt="Fresh Ivanka Calamansi Juice"
              className="h-full min-h-[360px] w-full object-cover sm:min-h-[460px] lg:min-h-[520px]"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-green-900/10 bg-[#fffdf5] p-7 shadow-lg shadow-green-900/5 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
                Featured Reads
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-green-900 sm:text-4xl">
                Learn more about the flavor behind Ivanka.
              </h2>

              <div className="mt-4 h-1 w-12 rounded-full bg-yellow-500" />
            </div>

            <p className="text-base leading-8 text-zinc-700">
              These articles highlight what makes Ivanka Calamansi Juice
              special: its fresh taste, local inspiration, refreshing sweetness,
              and proudly Pinoy identity.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
                Latest Articles
              </p>

              <h2 className="mt-2 text-3xl font-black text-green-900">
                Fresh Stories for Every Sip
              </h2>
            </div>
          </div>

          <ArticleList articles={articles} />
        </section>
      </div>
    </main>
  );
};

export default ArticlePage;