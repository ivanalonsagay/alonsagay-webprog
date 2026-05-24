import { Link, useParams } from 'react-router-dom';
import articles from '../assets/article-content';

const ArticleDetailPage = () => {
  const { id } = useParams();

  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <main className="min-h-screen w-full bg-[#fff9ea] px-5 py-16">
        <div className="mx-auto max-w-[900px] rounded-[2rem] bg-white p-10 text-center shadow-md">
          <h1 className="mb-4 text-4xl font-extrabold text-[#005b2e]">
            Article Not Found
          </h1>

          <p className="mb-8 text-lg text-gray-700">
            The article you are looking for does not exist.
          </p>

          <Link
            to="/articles"
            className="inline-block rounded-full bg-[#065f32] px-8 py-4 font-bold uppercase tracking-widest text-white shadow-md transition hover:bg-[#044d29]"
          >
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#fff9ea]">
      <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <Link
          to="/articles"
          className="mb-8 inline-block rounded-full border-2 border-[#065f32] px-7 py-3 text-sm font-bold uppercase tracking-widest text-[#065f32] transition hover:bg-[#065f32] hover:text-white"
        >
          ← Back to Articles
        </Link>

        <article className="overflow-hidden rounded-[2rem] border border-[#e5dcc3] bg-white shadow-md">
          <img
            src={article.image}
            alt={article.title}
            className="h-[420px] w-full object-cover"
          />

          <div className="p-8 md:p-12">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f0a500]">
              Calamansi Article
            </p>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight text-[#005b2e]">
              {article.title}
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-gray-700">
              {article.description}
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              {article.content}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default ArticleDetailPage;