import Button from '../components/Button';
import AboutImage from '../assets/about1a.png';
import AboutVG1 from '../assets/AboutVG1.jpg';
import AboutVG2 from '../assets/AboutVG2.jpg';
import AboutVG3 from '../assets/AboutVG3.jpg';
import AboutVG4 from '../assets/AboutVG4.jpg';

const AboutPage = () => {
  // Array of visual grid images
  const visualGridImages = [AboutVG1, AboutVG2, AboutVG3, AboutVG4];

  return (
    <div className="flex w-full flex-col gap-6 bg-[#fdf7e7]"> {/* Light beige background */}

      {/* Hero Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* Hero image placeholder */}
          <div className="flex h-72 w-full items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src={AboutImage}
              alt="Profile Hero"
              className="h-full w-full object-cover" // Fit the image to placeholder
            />
          </div>

          {/* Hero Text */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 sm:text-5xl leading-tight">
              About Our Wireframe Studio
            </h1>
            <p className="mt-4 text-lg text-zinc-900 max-w-lg">
              Learn more about our low-fidelity design system, layout consistency, and hero sections.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>

        </div>
      </section>

      {/* Profile Overview / KPI Section */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Years', value: 5 },
            { label: 'Projects', value: 16 },
            { label: 'Clients', value: 9 },
            { label: 'Focus Areas', value: 3 },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-[#f3efdd] p-5 flex flex-col items-center"
            >
              <p className="text-2xl font-bold text-green-900">{item.value}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Blocks */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left Content */}
          <div className="space-y-4">
            {['Intro Block', 'Experience Block', 'Details Block'].map((title) => (
              <article
                key={title}
                className="rounded-xl bg-[#f3efdd] p-5"
              >
                <h3 className="text-lg font-semibold text-green-900">{title}</h3>
                <p className="mt-3 text-sm text-zinc-800">
                  Placeholder content for {title.toLowerCase()}.
                </p>
              </article>
            ))}
          </div>

          {/* Right Visual Grid */}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-700">Visual Grid</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {visualGridImages.map((img, i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-2xl overflow-hidden">
                  <img src={img} alt={`Visual ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
                </div>
              ))}
            </div>
            <Button className="mt-4">View Section</Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;