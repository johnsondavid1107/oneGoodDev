import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        quote: "I came in with a napkin sketch and walked away with a real, working app. The whole process felt easy — even for someone like me who doesn't speak tech.",
        name: "Maria T.",
        role: "Owner, Local Bakery",
    },
    {
        quote: "What I appreciated most was being kept in the loop at every step. No surprises. Just honest communication and a product that actually shipped.",
        name: "James R.",
        role: "Small Business Consultant",
    },
    {
        quote: "I've worked with agencies before and it usually felt impersonal. This felt human. Like working with someone who genuinely cared about solving my problem.",
        name: "Alicia M.",
        role: "Founder, Wellness Studio",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => (i === 0 ? testimonials.length - 1 : i - 1));
    const next = () => setCurrent(i => (i === testimonials.length - 1 ? 0 : i + 1));

    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">In their words</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 tracking-tight">
                        What it's actually like
                    </h2>
                </motion.div>

                <div className="relative min-h-[260px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.45 }}
                            className="absolute px-4"
                        >
                            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal italic leading-relaxed text-foreground/90 mb-10">
                                "{testimonials[current].quote}"
                            </p>
                            <footer className="text-muted text-sm md:text-base tracking-wide">
                                <span className="font-medium text-foreground not-italic">{testimonials[current].name}</span>
                                <span className="mx-3 text-foreground/20">—</span>
                                <span className="font-light">{testimonials[current].role}</span>
                            </footer>
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8">
                    <button onClick={prev} aria-label="Previous" className="p-3 rounded-lg border border-foreground/[0.08] hover:border-primary/30 hover:text-primary transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(232,226,214,0.04)] hover:shadow-[3px_3px_0px_0px_rgba(200,149,108,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-primary w-8' : 'bg-foreground/10 w-4 hover:bg-foreground/20'}`}
                            />
                        ))}
                    </div>
                    <button onClick={next} aria-label="Next" className="p-3 rounded-lg border border-foreground/[0.08] hover:border-primary/30 hover:text-primary transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(232,226,214,0.04)] hover:shadow-[3px_3px_0px_0px_rgba(200,149,108,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
