import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="py-32 px-6 bg-background">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">The promise</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 mb-16 tracking-tight">You won't have to worry...</h2>
                    <div className="space-y-10 text-lg md:text-2xl text-muted leading-[1.8] font-light">
                        <p>
                            There are <i>hundreds</i> of AI tools out there, and new ones every week. It's not a contest over which one is best — it's about knowing which one is right for what you actually need done.
                        </p>
                        <p className="text-foreground font-normal">
                            That's my job, not yours. You tell me the problem or describe the vision, and I take it from there — choosing the right approach, the right tools, and handling every detail so you never have to think about the technology behind it.  <br />All you need is one good dev..
                        </p>
                        <p>
                            Think of it as white glove service for bringing ideas to life. It starts with a conversation, and it ends with something that actually works — and actually makes your day easier.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
