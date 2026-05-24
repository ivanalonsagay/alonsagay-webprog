import Button from '../components/Button';
import HomeImage from '../assets/home1a.png';

const metrics = [
  {
    icon: '🧺',
    value: '12+',
    label: 'Batches Made',
  },
  {
    icon: '🍾',
    value: '24K+',
    label: 'Bottles Sold',
  },
  {
    icon: '👨‍🌾',
    value: '8+',
    label: 'Local Farms Partnered',
  },
  {
    icon: '🍋',
    value: '4',
    label: 'Refreshing Flavors',
  },
];

const features = [
  {
    icon: '🍊',
    title: 'Citrus & Fresh',
    description:
      'Perfect sa init at bonding moments. Refreshing calamansi goodness in every sip.',
    button: 'Buy Fresh',
  },
  {
    icon: '🍋',
    title: 'Healthy & Local',
    description:
      'Swak sa bawat Pinoy na panlasa. Made from locally grown calamansi.',
    button: 'See Ingredients',
  },
  {
    icon: '🇵🇭',
    title: 'Makabayan Flavors',
    description:
      'Pride ng ating bayan, 100% Pinoy-made with love and quality.',
    button: 'Explore Flavors',
  },
];

const HomePage = () => (
  <main className="min-h-screen w-full bg-[#fff9ea]">
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-5 pb-12 pt-8 sm:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="grid gap-10 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
            <span>🌿</span>
            <span>100% Pinoy. 100% Fresh.</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-green-900 sm:text-6xl lg:text-7xl">
            Fresh & Local Ivanka Calamansi Juice
          </h1>

          <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-700 sm:text-lg">
            Tangy, sweet, and 100% Pinoy! Perfect para sa init ng panahon o
            chill moments with friends and family.
          </p>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍋</span>
              <p className="text-sm leading-5 text-zinc-700">
                Real Calamansi <br />
                No Concentrate
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <p className="text-sm leading-5 text-zinc-700">
                Locally Sourced <br />
                Always Fresh
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">🧃</span>
              <p className="text-sm leading-5 text-zinc-700">
                Made with Care <br />
                in the Philippines
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl">♡</span>
              <p className="text-sm leading-5 text-zinc-700">
                Loved by <br />
                Families
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              to="/about"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white !shadow-lg !shadow-green-900/25 hover:!bg-green-800"
            >
              Learn More
            </Button>

            <Button
              to="/articles"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-2 !border-green-800 !bg-transparent !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-green-900 hover:!bg-green-900 hover:!text-white"
            >
              See Ingredients
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-green-900/10">
          <img
            src={HomeImage}
            alt="Ivanka Calamansi Juice"
            className="h-full min-h-[360px] w-full object-cover sm:min-h-[460px] lg:min-h-[520px]"
          />
        </div>
      </section>

      {/* Metrics Section */}
      <section>
        <div className="grid overflow-hidden rounded-2xl border-2 border-green-800/70 bg-[#fffdf5]/80 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex items-center justify-center gap-5 px-6 py-7 text-center ${
                index !== metrics.length - 1
                  ? 'border-b border-green-900/10 sm:border-r lg:border-b-0'
                  : ''
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f2d4] text-3xl">
                {metric.icon}
              </div>

              <div className="text-left">
                <p className="text-3xl font-black leading-none text-green-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-700">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-green-900/10 bg-[#fffdf5] p-7 shadow-lg shadow-green-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
            >
              <div className="flex gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#f5efd9] text-5xl">
                  {feature.icon}
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-black text-green-900">
                    {feature.title}
                  </h3>

                  <div className="mt-3 h-1 w-12 rounded-full bg-yellow-500" />

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-zinc-700">
                    {feature.description}
                  </p>

                  <Button
                    to="/about"
                      className="!mt-5 !inline-flex !w-fit !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-8 !py-3 !text-[11px] !font-black !uppercase !tracking-[0.18em] !text-white !shadow-md !shadow-green-900/20 hover:!bg-green-800"
>
                      {feature.button}
                      <span className="inline-flex -translate-y-[2px] items-center text-base leading-none">
                              ›
                      </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

export default HomePage;