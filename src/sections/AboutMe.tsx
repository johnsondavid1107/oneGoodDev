import { motion } from 'framer-motion';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1200&fit=crop',
    alt: 'Placeholder photo 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop',
    alt: 'Placeholder photo 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=600&fit=crop',
    alt: 'Placeholder photo 3',
  },
];

export default function AboutMe() {
  return (
    <section id="about-me" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-24"
        >
          <div>
            <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">
              About me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-500 tracking-tight">
              The person behind<br />the code
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:mt-12">
            <div className="space-y-5 text-muted text-base md:text-lg leading-relaxed font-light">
              <p>
                I'm a developer who believes technology should solve real problems for real people.
                My background spans full-stack development, AI integration, and building tools that
                actually get used.
              </p>
              <p>
                Every project I take on gets my full attention. No shortcuts, no half-measures —
                just honest work that speaks for itself.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Photo collage — asymmetric 3-image layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_0.75fr] gap-4 md:gap-6 lg:gap-8 items-start"
        >
          {/* Left — tall portrait */}
          <div className="rounded-2xl overflow-hidden bg-secondary">
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover object-[50%_10%] mix-blend-overlay"
              style={{ aspectRatio: '2 / 3' }}
              loading="lazy"
            />
          </div>

          {/* Right — stacked: small square + wider landscape */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden bg-secondary max-w-[15rem]">
              <img
                src={photos[1].src}
                alt={photos[1].alt}
                className="w-full h-full object-cover mix-blend-overlay"
                style={{ aspectRatio: '1 / 1' }}
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-secondary">
              <img
                src={photos[2].src}
                alt={photos[2].alt}
                className="w-full h-full object-cover mix-blend-overlay"
                style={{ aspectRatio: '3 / 2' }}
                loading="lazy"
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
