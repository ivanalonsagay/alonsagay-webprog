import Button from '../components/Button';
import HomeImage from '../assets/home1a.png'; // Hero image

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#fdf7e7]">

      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* Hero Text */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 sm:text-5xl leading-tight">
              Ivanka Calamansi Juice
            </h1>
            <p className="mt-4 text-lg text-zinc-900 max-w-lg">
              Fresh, local, at swak sa pang-araw-araw na healthy lifestyle.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about">Learn More</Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>

          {/* Hero image */}
                    <div className="flex h-72 w-full items-center justify-center rounded-[1.25rem] bg-zinc-20 overflow-hidden">
                      <img
                        src={HomeImage}
                        alt="woman drinking calamansi juice"
                        className="h-full w-full object-cover rounded-[1.25rem]"
                      />
                    </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-[#f3efdd] p-5 flex flex-col items-center">
            <span className="text-4xl">🍊</span>
            <h3 className="mt-2 text-lg font-semibold text-green-900">Fresh Calamansi</h3>
            <p className="mt-2 text-sm text-zinc-800">Galing sa local na taniman, natural at matamis.</p>
            <Button className="mt-4">View More</Button>
          </div>

          <div className="rounded-xl bg-[#f3efdd] p-5 flex flex-col items-center">
            <span className="text-4xl">🍋</span>
            <h3 className="mt-2 text-lg font-semibold text-green-900">Healthy Boost</h3>
            <p className="mt-2 text-sm text-zinc-800">Rich in Vitamin C para sa energy at immunity.</p>
            <Button className="mt-4">View More</Button>
          </div>

          <div className="rounded-xl bg-[#f3efdd] p-5 flex flex-col items-center">
            <span className="text-4xl">🥤</span>
            <h3 className="mt-2 text-lg font-semibold text-green-900">Sarap & Swak</h3>
            <p className="mt-2 text-sm text-zinc-800">Perfect sa init ng panahon at kahit sa snack time.</p>
            <Button className="mt-4">View More</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;  