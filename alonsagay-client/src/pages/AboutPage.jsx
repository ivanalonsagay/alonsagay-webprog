import Button from '../components/Button';

import About from '../assets/about1a.png';
import About1 from '../assets/AboutVG1.jpg';
import About2 from '../assets/AboutVG2.jpg';
import About3 from '../assets/AboutVG3.jpg';
import About4 from '../assets/AboutVG4.jpg';

const values = [
  {
    icon: '🍊',
    title: 'Tangy & Fresh',
    description:
      'Made to bring a refreshing calamansi taste perfect for hot days and bonding moments.',
  },
  {
    icon: '🌱',
    title: 'Healthy & Local',
    description:
      'Inspired by locally sourced calamansi and made for the Filipino taste.',
  },
  {
    icon: '🇵🇭',
    title: 'Makabayan Flavors',
    description:
      'A proudly Pinoy drink that celebrates local flavor, freshness, and quality.',
  },
];

const highlights = [
  {
    image: About1,
    label: 'Fresh Taste',
    title: 'Real Calamansi Goodness',
    description: 'Natural, tangy, and refreshing in every sip.',
  },
  {
    image: About2,
    label: 'Local Pride',
    title: 'Made for Every Pinoy',
    description: 'Gawang lokal, swak sa bawat tahanan.',
  },
  {
    image: About3,
    label: 'Refreshing Drink',
    title: 'Perfect for Hot Days',
    description: 'A sweet and citrusy drink for everyday refreshment.',
  },
  {
    image: About4,
    label: 'Pinoy Flavor',
    title: 'Proudly Makabayan',
    description: 'Pinoy na lasa, pride ng ating bayan.',
  },
];

const AboutPage = () => (
  <main className="min-h-screen w-full bg-[#fff9ea]">
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 pb-12 pt-8 sm:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="grid gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
            <span>🌿</span>
            <span>About Ivanka</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-green-900 sm:text-6xl lg:text-7xl">
            Fresh Calamansi Juice Made for Pinoy Moments
          </h1>

          <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-700 sm:text-lg">
            Ivanka Calamansi Juice is all about bringing a tangy, sweet, and
            refreshing local drink to every Filipino home. Inspired by real
            calamansi flavor, our drink is made for init ng panahon, family
            bonding, school breaks, and everyday refreshment.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              to="/"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white !shadow-lg !shadow-green-900/25 hover:!bg-green-800"
            >
              Back Home
            </Button>

            <Button
              to="/articles"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-1!border-green-800 !bg-transparent !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-green-900 hover:!bg-green-900 hover:!text-white"
            >
              Read Articles
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-green-900/10">
          <img
            src={About}
            alt="Ivanka Calamansi Juice"
            className="h-full min-h-[360px] w-full object-cover sm:min-h-[460px] lg:min-h-[520px]"
          />
        </div>
      </section>

      {/* About Story Section */}
      <section className="rounded-[2rem] border border-green-900/10 bg-[#fffdf5] p-7 shadow-lg shadow-green-900/5 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-green-900 sm:text-4xl">
              A simple local drink made cleaner, fresher, and more enjoyable.
            </h2>

            <div className="mt-4 h-1 w-12 rounded-full bg-yellow-500" />
          </div>

          <p className="text-base leading-8 text-zinc-700">
            We created Ivanka Calamansi Juice to celebrate a flavor that many
            Filipinos already love. It is familiar, refreshing, and proudly
            local. From its citrus taste to its clean product style, Ivanka is
            designed to feel fresh, trustworthy, and perfect for everyday
            moments.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-green-900/10 bg-[#fffdf5] p-7 shadow-lg shadow-green-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
            >
              <div className="flex gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#f5efd9] text-5xl">
                  {value.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-green-900">
                    {value.title}
                  </h3>

                  <div className="mt-3 h-1 w-12 rounded-full bg-yellow-500" />

                  <p className="mt-4 text-sm leading-6 text-zinc-700">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section>
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-green-900">
              Product Highlights
            </p>
            <h2 className="mt-2 text-3xl font-black text-green-900">
              What Makes Ivanka Special
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-green-900/10 bg-[#fffdf5] shadow-lg shadow-green-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-600">
                  {item.label}
                </p>

                <h3 className="mt-3 text-xl font-black text-green-900">
                  {item.title}
                </h3>

                <div className="mt-3 h-1 w-10 rounded-full bg-yellow-500" />

                <p className="mt-4 text-sm leading-6 text-zinc-700">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  </main>
);

export default AboutPage;