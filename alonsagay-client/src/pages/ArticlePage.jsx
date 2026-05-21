import Button from '../components/Button';
import ArticleHero from '../assets/article1a.png'; // Hero image
import Article2a from '../assets/article2a.jpg';
import Article2b from '../assets/article2b.jpg';
import Article2c from '../assets/article2c.jpg';
import Article2d from '../assets/article2d.jpg';

const ArticlePage = () => {
  // Array of article images
  const articleImages = [Article2a, Article2b, Article2c, Article2d];

  return (
    <div className="flex w-full flex-col gap-6 bg-[#fdf7e7]"> {/* Light beige background */}

      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* Hero image */}
          <div className="flex h-72 w-full items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src={ArticleHero}
              alt="woman advertising calamansi juice"
              className="h-full w-full object-cover rounded-[1.25rem]"
            />
          </div>

          {/* Hero Text */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 sm:text-5xl leading-tight">
              Featured Articles
            </h1>
            <p className="mt-4 text-lg text-zinc-900 max-w-lg">
              A simple grid layout for article thumbnails, titles, short descriptions, and clear actions.
            </p>

            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>

        </div>
      </section>

      {/* Article Cards */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articleImages.map((img, i) => (
            <article
              key={i}
              className="rounded-xl bg-[#f3efdd] p-4 flex flex-col"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl overflow-hidden">
                <img src={img} alt={`Article ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                Article {(i + 1).toString().padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-green-900">
                Article Title {i + 1}
              </h3>
              <p className="mt-2 text-sm text-zinc-800">
                Placeholder description for Article {i + 1}.
              </p>
              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;