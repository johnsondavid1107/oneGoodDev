import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    // Pick words that match your positioning (AI + business outcomes)
    const rotatingWords = useMemo(
        () => ["AI", "automation", "app", "system", "workflow", "solution"],
        []
    );

    useEffect(() => {
        const id = window.setTimeout(() => {
            setWordIndex((prev) => (prev === rotatingWords.length - 1 ? 0 : prev + 1));
        }, 2200);
        return () => window.clearTimeout(id);
    }, [wordIndex, rotatingWords.length]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32"
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-medium tracking-wider uppercase text-sm mb-6 block">
                        One Good Dev
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        You bring the problem
                        <br />
                        I’ll bring the    <br /> {" "}
                        <span className="relative inline-flex justify-center align-baseline overflow-hidden h-[1.0em] w-[11ch]">
                            {rotatingWords.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="absolute -translate-x-1/2 whitespace-nowrap"
                                    initial={{ opacity: 0, y: "-10%" }}
                                    transition={{ type: "spring", stiffness: 50, damping: 14 }}
                                    animate={
                                        wordIndex === i
                                            ? { y: "0%", opacity: 1 }
                                            : { y: wordIndex > i ? "-10%" : "100%", opacity: 0 }
                                    }
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>

                    </h1>

                    <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-12">
                        I’ve already learned the AI tools — so you don’t have to.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-primary text-white rounded-full font-medium transition-transform hover:scale-105"
                    >
                        Start a conversation
                    </a>
                    <a
                        href="#work"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium transition-all hover:bg-white/10"
                    >
                        See my work
                    </a>
                </motion.div>

                <motion.div
                    className="mt-20 flex flex-wrap justify-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    {["Custom builds", "Clear communication", "Built to ship"].map((chip) => (
                        <div
                            key={chip}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted backdrop-blur-sm"
                        >
                            {chip}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
