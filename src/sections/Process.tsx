import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Listen',
        desc: 'Let\'s start with a conversation. Tell me about your business, the problem you\'re facing, or the idea you can\'t stop thinking about. No tech jargon required.'
    },
    {
        num: '02',
        title: 'Design',
        desc: 'I\'ll map out the user journey and create a clear, premium design that prioritizes usability and aesthetics. You review it before we build.'
    },
    {
        num: '03',
        title: 'Build',
        desc: 'This is where I put my head down and execute. I use modern, robust technologies to build software that is fast, secure, and ready to scale. Powerer by AI.'
    },
    {
        num: '04',
        title: 'Ship',
        desc: 'Launch Day. But I don\'t just hand over the keys and vanish; I make sure everything runs smoothly and that you know exactly how to manage it.'
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
                    <h2 className="text-4xl md:text-5xl font-bold">The Process</h2>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-primary h-0" />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, i) => (
                            <div key={i} className={`process-card relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>

                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 translate-y-2 z-10" />

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                    <span className="text-primary font-mono text-sm tracking-wider mb-4 opacity-80">{step.num}</span>
                                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-muted leading-relaxed text-lg">
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
