import React from 'react';
import ceoPhoto from '../data/Photos/CEO/293192385_579430310347805_3577421571787981368_n.jpg';

interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

const missionPoints: string[] = [
  'Highly secure infrastructure with encrypted storage & backups',
  'Privacy-first workflow: client data never shared or sold',
  'Flexible custom packages tailored to every event scale',
  'Creative excellence powered by pro gear & refined processes',
  'Rapid delivery with quality-controlled editing pipeline'
];

const testimonials: Testimonial[] = [
  {
    quote: 'They treated our memories like priceless art. Incredibly professional and discreet.',
    author: 'Aarav & Meera',
    context: 'Wedding'
  },
  {
    quote: 'Fast turnaround without sacrificing detail. The cinematic film still gives us chills.',
    author: 'Nikita S.',
    context: 'Destination Wedding'
  },
  {
    quote: 'Our brand shoot was seamless—flexible scheduling and stunning color grading.',
    author: 'VisionCraft Studios',
    context: 'Commercial'
  },
  {
    quote: 'Birthday coverage felt effortless. Genuine candid moments we didn’t even notice being captured.',
    author: 'Rohan M.',
    context: 'Birthday Event'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative w-full mt-12 lg:mt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Mission / Copy */}
          <div className="col-span-1 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
              We operate with a mission to protect, respect, and elevate your stories. Security and privacy guide every decision—from encrypted media handling to controlled delivery pathways. Our flexibility ensures every couple, brand, and family receives a bespoke experience without compromise.
            </p>
            <ul className="space-y-2 mb-8">
              {missionPoints.map(point => (
                <li key={point} className="flex items-start gap-2 text-gray-300 text-sm md:text-base">
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal-400"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {/* Removed old button; replaced by form cards below */}
          </div>

          {/* CEO / Leadership */}
          <div className="col-span-1 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-white/10 shadow-lg mb-6">
              <img src={ceoPhoto} alt="CEO" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide mb-2">Founder & Creative Director</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Driving a culture of trust, precision, and artistic integrity—ensuring every frame is treated with respect.
            </p>
          </div>

          {/* Testimonials */}
          <div className="col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-wide">Client Testimonials</h3>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-black/40 border border-white/10 p-4 hover:border-white/30 transition-colors"
              >
                <p className="text-gray-300 text-sm italic mb-3">“{t.quote}”</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-semibold text-white">{t.author}</span>
                  <span>{t.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons Row (light themed) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="bg-white/10 border border-white/20 p-6 md:p-8 hover:bg-white/15 transition-colors select-none flex flex-col">
            <h3 className="text-xl font-display font-semibold text-white mb-3">Get a Quote</h3>
            <p className="text-gray-300 text-sm mb-6">Tell us briefly about your event and receive a tailored estimate.</p>
            <button
              className="mt-auto w-full px-5 py-3 bg-white text-black font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors select-none"
              onClick={() => {
                // Placeholder scroll or potential modal trigger
                const el = document.getElementById('footer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request Quote
            </button>
          </div>
          <div className="bg-white/10 border border-white/20 p-6 md:p-8 hover:bg-white/15 transition-colors select-none flex flex-col">
            <h3 className="text-xl font-display font-semibold text-white mb-3">Contact Us</h3>
            <p className="text-gray-300 text-sm mb-6">Have questions or a custom idea? Reach out directly.</p>
            <button
              className="mt-auto w-full px-5 py-3 bg-white text-black font-semibold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors select-none"
              onClick={() => {
                window.location.href = 'mailto:contact@nextimagelipu.com';
              }}
            >
              Email Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
