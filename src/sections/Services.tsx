import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesList = [
    {
        title: 'Custom Platforms',
        desc: 'Whether it\'s an internal tool or a customer-facing product, I\'ll build exactly what your business needs — nothing more, nothing less.',
        video: 'videos/custom.mp4',
    },
    {
        title: 'Mobile Apps',
        desc: 'An app that puts your business directly in your customers\' hands, designed to feel natural from the first tap.',
        video: 'videos/mobile.mp4',
    },
    {
        title: 'Idea Validation',
        desc: 'Not sure if your idea will work? I\'ll build a focused prototype so you can test it with real people — before you commit your full budget.',
        video: 'videos/idea.mp4',
    },
    {
        title: 'Workflow Automation',
        desc: 'If you\'re copying data between spreadsheets or juggling five tools to do one thing, I\'ll make that go away.',
        video: 'videos/automation.mp4',
    },
    {
        title: 'Design Refinement',
        desc: 'Something about your product feels off but you can\'t put your finger on it? I\'ll find it and fix it.',
        video: 'videos/design.mp4',
    },
    {
        title: 'Career Materials',
        desc: 'A sharp resume and polished online presence that gets you past the filter and into the conversation.',
        video: 'videos/career.mp4',
    }
];

function ServiceCard({ service, index }: { service: typeof servicesList[0]; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="sticky bg-background border border-foreground/[0.06] rounded-2xl overflow-hidden"
            style={{
                top: `${80 + index * 40}px`,
                zIndex: index + 1,
            }}
        >
            <div
                className="flex flex-col md:flex-row min-h-[70vh] md:min-h-[80vh] cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Left side — title & details */}
                <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16 md:w-1/2">
                    <div>
                        <span className="text-primary/40 font-mono text-xs tracking-wider mb-6 block">0{index + 1}</span>
                        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-500 tracking-tight mb-6">
                            {service.title}
                        </h3>
                        <AnimatePresence>
                            {expanded && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="text-muted text-base md:text-lg leading-relaxed font-light overflow-hidden"
                                >
                                    {service.desc}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="mt-8">
                        <span className="text-muted/50 text-sm font-light tracking-wide">
                            {expanded ? 'Click to collapse' : 'Click for details'}
                        </span>
                    </div>
                </div>

                {/* Right side — media */}
                <div
                    className="relative md:w-1/2 min-h-[40vh] md:min-h-0 bg-surface-alt overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ opacity: 0.6 }}
                >
                    <video
                        ref={videoRef}
                        src={service.video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default function Services() {
    return (
        <section id="services" className="px-4 md:px-6 bg-surface pt-32 pb-16">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">How I can help</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 tracking-tight">Services</h2>
                </motion.div>

                <div className="space-y-6 md:space-y-8 pb-[40vh]">
                    {servicesList.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
