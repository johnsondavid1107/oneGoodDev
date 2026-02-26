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


                            There are a lot of AI tools out there — and trying to keep up with them can feel overwhelming.

                            You don’t need to learn them. You just need the right one, built the right way.






                        </p>
                        <p className="text-foreground">
                            I spend the time learning, testing, and working with modern AI tools so you don’t have to. Whether you’re running a business, exploring a new idea, or trying to solve a problem, you bring the vision and I help choose the right approach and build it into something real.
                        </p>
                        <p>
                            It starts with listening, and it ends with software that actually makes your day easier.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
