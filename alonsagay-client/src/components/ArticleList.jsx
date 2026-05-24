import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="group flex h-full flex-col overflow-hidden rounded-3xl border border-green-900/10 bg-[#fffdf5] shadow-lg shadow-green-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-600">
              Article {String(index + 1).padStart(2, '0')} / {article.category}
            </p>

            <h3 className="mt-3 min-h-[56px] text-xl font-black text-green-900">
              {article.title}
            </h3>

            <div className="mt-3 h-1 w-10 rounded-full bg-yellow-500" />

            <p className="mt-4 min-h-[96px] text-sm leading-6 text-zinc-700">
              {article.content[0].substring(0, 135)}...
            </p>

            <Button
              to={`/articles/${article.name}`}
              className="!mt-auto !inline-flex !w-fit !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-8 !py-3 !text-[11px] !font-black !uppercase !tracking-[0.18em] !text-white !shadow-md !shadow-green-900/20 hover:!bg-green-800"
            >
              <span>Read Article</span>

              <span className="inline-flex -translate-y-[2px] items-center text-base leading-none">
                ›
              </span>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;