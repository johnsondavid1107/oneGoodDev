import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    const rotatingWords = useMemo(
        () => ["solution", "clarity", "right tools", "plan", "results"],
        []
    );

    React.useEffect(() => {
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
            {/* Warm radial glow — subtle atmospheric light */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
                    style={{
                        background: 'radial-gradient(circle, #C8956C 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-sans font-medium tracking-[0.2em] uppercase text-xs mb-8 block">
                        One Good Dev
                    </span>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-500 tracking-tight mb-8 text-foreground">
                        You bring the vision
                        <br />
                        I'll bring the <br />{" "}
                        <span className="relative inline-flex justify-center align-baseline overflow-hidden h-[1.0em] w-[11ch]">
                            {rotatingWords.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="absolute -translate-x-1/2 whitespace-nowrap italic text-primary"
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

                    <p className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-14 font-light leading-relaxed">
                        You shouldn't have to learn AI tools or figure out where to start.
                        Just tell me what you need — I'll take it from there.
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
                        className="px-8 py-4 bg-primary text-background rounded-lg font-medium transition-all duration-200 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(200,149,108,0.25)] shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)] cursor-pointer text-sm tracking-wide"
                    >
                        Tell me what you need
                    </a>
                    <a
                        href="#work"
                        className="px-8 py-4 bg-transparent border border-foreground/10 text-foreground rounded-lg font-medium transition-all duration-200 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(232,226,214,0.06)] shadow-[3px_3px_0px_0px_rgba(232,226,214,0.04)] hover:border-primary/30 hover:text-primary cursor-pointer text-sm tracking-wide"
                    >
                        See what I've built
                    </a>
                </motion.div>
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
