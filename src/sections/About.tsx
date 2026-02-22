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
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">The Philosophy</h2>
                    <div className="space-y-8 text-xl md:text-2xl text-muted leading-relaxed">
                        <p>
                            Let's skip the agency fluff. I build software for everyday people, small business owners, and founders who need a reliable hands-on technical partner.
                        </p>
                        <p className="text-foreground">
                            It starts with listening. Before writing a single line of code, I want to understand exactly how your business works and where the friction is.
                        </p>
                        <p>
                            I build thoughtfully and pragmatically using AI. You don't need buzzwords, you need results. Whether it's a completely new idea, streamlining a workflow, or fixing a pain point, the goal is always clear, robust, and maintainable software.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
