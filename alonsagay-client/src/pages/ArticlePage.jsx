import Button from '../components/Button';

import Article1 from '../assets/article2a.jpg';
import Article2 from '../assets/article2b.jpg';
import Article3 from '../assets/article2c.jpg';
import Article4 from '../assets/article2d.jpg';

const articles = [
  {
    image: Article1,
    category: 'Fresh Taste',
    title: 'Fresh Calamansi Juice',
    description:
      'Natural, tangy, and refreshing. A perfect drink for hot days, school breaks, and bonding moments.',
  },
  {
    image: Article2,
    category: 'Local Goodness',
    title: 'Healthy and Local',
    description:
      'Gawang lokal at swak sa bawat tahanan. Made to celebrate the familiar taste Filipinos love.',
  },
  {
    image: Article3,
    category: 'Everyday Refreshment',
    title: 'Sweet and Refreshing',
    description:
      'A citrusy drink that helps cool you down and keeps every moment light, fresh, and enjoyable.',
  },
  {
    image: Article4,
    category: 'Pinoy Pride',
    title: 'Makabayan Flavors',
    description:
      'Pinoy na lasa, pride ng ating bayan. A refreshing product inspired by local flavor and quality.',
  },
];

const ArticlePage = () => (
  <main className="min-h-screen w-full bg-[#fff9ea]">
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 pb-12 pt-8 sm:px-8 lg:px-12">
      {/* Hero Section */}
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
            Discover stories about Ivanka Calamansi Juice, from its fresh citrus
            taste to its proudly Pinoy flavor. Learn why this tangy and
            refreshing drink is perfect for everyday moments.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              to="/"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white !shadow-lg !shadow-green-900/25 hover:!bg-green-800"
            >
              Back Home
            </Button>

            <Button
              to="/about"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-2 !border-green-800 !bg-transparent !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-green-900 hover:!bg-green-900 hover:!text-white"
            >
              About Ivanka
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-green-900/10">
          <img
            src={Article1}
            alt="Fresh Ivanka Calamansi Juice"
            className="h-full min-h-[360px] w-full object-cover sm:min-h-[460px] lg:min-h-[520px]"
          />
        </div>
      </section>

      {/* Intro Section */}
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
            These articles highlight what makes Ivanka Calamansi Juice special:
            its fresh taste, local inspiration, refreshing sweetness, and
            proudly Pinoy identity.
          </p>
        </div>
      </section>

      {/* Article Cards Section */}
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

        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <article
              key={article.title}
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
                  Article {index + 1} / {article.category}
                </p>

                <h3 className="mt-3 min-h-[56px] text-xl font-black text-green-900">
                  {article.title}
                </h3>

                <div className="mt-3 h-1 w-10 rounded-full bg-yellow-500" />

                <p className="mt-4 min-h-[96px] text-sm leading-6 text-zinc-700">
                  {article.description}
                </p>

                <Button
                  to="/articles"
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
      </section>
    </div>
  </main>
);

export default ArticlePage;