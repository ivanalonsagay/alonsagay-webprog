import Button from '../components/Button';

// Import all your article images
import Article1 from '../assets/article2a.jpg';
import Article2 from '../assets/article2b.jpg';
import Article3 from '../assets/article2c.jpg';
import Article4 from '../assets/article2d.jpg';

const ArticlePage = () => {
  // Array of articles with images, title, and description
  const articles = [
    {
      image: Article1,
      title: 'Fresh Calamansi Juice',
      description: 'Natural, tangy, and full of Vitamin C.',
    },
    {
      image: Article2,
      title: 'Healthy and Local',
      description: 'Gawang lokal, swak sa bawat tahanan.',
    },
    {
      image: Article3,
      title: 'Sweet and Refreshing',
      description: 'Perfect na pampatanggal uhaw sa init.',
    },
    {
      image: Article4,
      title: 'Makabayan Flavors',
      description: 'Pinoy na lasa, pride ng ating bayan.',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 bg-[#fdf7e7]"> {/* Light beige background */}

      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* Hero Image */}
          <div className="flex h-72 w-full items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src={Article1} // Use first image as hero
              alt="woman drinking juice"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Hero Text */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 sm:text-5xl leading-tight">
              Featured Articles
            </h1>
            <p className="mt-4 text-lg text-zinc-900 max-w-lg">
              Mga kwento tungkol sa ating masarap at makabayan na produkto!
            </p>

            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>

        </div>
      </section>

      {/* Article Cards Grid */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <article
              key={index}
              className="rounded-xl bg-[#f3efdd] p-4 flex flex-col"
            >
              {/* Article image */}
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-zinc-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover rounded-2xl"
                />
              </div>

              {/* Article details */}
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                Article {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-green-900">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-800">{article.description}</p>

              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;