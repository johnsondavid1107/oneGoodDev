import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Listen',
        desc: 'We start with a real conversation. Tell me what you\'re dealing with — a business problem, a half-formed idea, a vision you can\'t shake. No tech jargon needed. Just talk to me like a person.'
    },
    {
        num: '02',
        title: 'Plan',
        desc: 'I\'ll figure out the right approach and the right tools for your specific situation. You\'ll see a clear plan and a design before anything gets built — no surprises.'
    },
    {
        num: '03',
        title: 'Build',
        desc: 'This is the part you don\'t have to think about. I handle the technology, the details, and the decisions so you can focus on running your business.'
    },
    {
        num: '04',
        title: 'Deliver',
        desc: 'You get something that works — and I make sure you know how to use it. I don\'t disappear after launch. If something needs adjusting, I\'m a message away.'
    }
];

export default function Process() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.process-card');

            // Animate line
            gsap.to(lineRef.current, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                }
            });

            // Animate cards
            cards.forEach((card: any, i) => {
                gsap.fromTo(card,
                    { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-32 px-6 bg-background overflow-hidden">
            <div className="max-w-6xl mx-auto" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">How it works</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 tracking-tight">The Process</h2>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-foreground/[0.06] -translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-primary/60 h-0" />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <div key={i} className={`process-card relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>

                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary -translate-x-1/2 translate-y-2 z-10" />

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                    <span className="text-primary/40 font-mono text-xs tracking-wider mb-4">{step.num}</span>
                                    <h3 className="font-serif text-3xl md:text-4xl font-500 mb-4 tracking-tight">{step.title}</h3>
                                    <p className="text-muted leading-relaxed text-base md:text-lg font-light">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Empty space for alternate sides */}
                                <div className="hidden md:block md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
