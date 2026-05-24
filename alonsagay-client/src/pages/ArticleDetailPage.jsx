import { useParams } from 'react-router-dom';
import Button from '../components/Button';

import Article1 from '../assets/article2a.jpg';
import Article2 from '../assets/article2b.jpg';
import Article3 from '../assets/article2c.jpg';
import Article4 from '../assets/article2d.jpg';

const articles = [
  {
    id: 1,
    image: Article1,
    category: 'Fresh Taste',
    title: 'Fresh Calamansi Juice',
    description:
      'Natural, tangy, and refreshing. A perfect drink for hot days, school breaks, and bonding moments.',
    content:
      'Ivanka Calamansi Juice brings a fresh and tangy flavor that feels perfect for everyday refreshment. With its citrus taste and local inspiration, it is made for hot afternoons, school breaks, family meals, and bonding moments with friends.',
  },
  {
    id: 2,
    image: Article2,
    category: 'Local Goodness',
    title: 'Healthy and Local',
    description:
      'Gawang lokal at swak sa bawat tahanan. Made to celebrate the familiar taste Filipinos love.',
    content:
      'Ivanka celebrates a taste that many Filipinos know and love. Its calamansi-inspired flavor gives every bottle a local identity while keeping the drink refreshing, simple, and enjoyable for every household.',
  },
  {
    id: 3,
    image: Article3,
    category: 'Everyday Refreshment',
    title: 'Sweet and Refreshing',
    description:
      'A citrusy drink that helps cool you down and keeps every moment light, fresh, and enjoyable.',
    content:
      'Sweet, tangy, and cool, Ivanka Calamansi Juice is made for moments when you need something refreshing. It is a drink that fits casual hangouts, warm weather, and simple daily cravings.',
  },
  {
    id: 4,
    image: Article4,
    category: 'Pinoy Pride',
    title: 'Makabayan Flavors',
    description:
      'Pinoy na lasa, pride ng ating bayan. A refreshing product inspired by local flavor and quality.',
    content:
      'Ivanka Calamansi Juice carries a proudly Pinoy identity. From its citrus flavor to its local-inspired branding, it highlights the familiar taste of calamansi and turns it into a refreshing drink made with pride.',
  },
];

const ArticleDetailPage = () => {
  const { id } = useParams();

  const article = articles.find((item) => item.id === Number(id));

  if (!article) {
    return (
      <main className="min-h-screen w-full bg-[#fff9ea]">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-center px-5 text-center">
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

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-green-900 sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-700">
              {article.description}
            </p>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700">
              {article.content}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
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
};

export default ArticleDetailPage;