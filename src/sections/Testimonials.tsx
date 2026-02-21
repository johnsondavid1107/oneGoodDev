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
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-20"
                >
                    What clients say
                </motion.h2>

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
                            <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-10">
                                "{testimonials[current].quote}"
                            </p>
                            <footer className="text-muted">
                                <span className="font-semibold text-foreground">{testimonials[current].name}</span>
                                {' — '}
                                <span>{testimonials[current].role}</span>
                            </footer>
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8">
                    <button onClick={prev} aria-label="Previous" className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <button onClick={next} aria-label="Next" className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
