import { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

const GAP = 24;
const CARD_WIDTH = 320;
const SPEED = 0.5;

function ProjectCard({ name, tags, desc, liveUrl, thumbnail }: Project) {
    return (
        <div className="flex flex-col rounded-lg border border-foreground/[0.06] bg-surface p-5 sm:p-6 w-[320px] shrink-0 transition-all duration-300 hover:border-primary/20 hover:bg-surface-alt group cursor-pointer">
            <div className="aspect-video w-full bg-foreground/[0.03] flex items-center justify-center rounded-md mb-5 relative overflow-hidden">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <>
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200,149,108,0.1) 10px, rgba(200,149,108,0.1) 11px)`,
                            }}
                        />
                        <span className="text-lg font-mono text-foreground/10 tracking-widest">_UI</span>
                    </>
                )}
            </div>
            <h3 className="font-serif text-lg font-500 leading-none mb-3 group-hover:text-primary transition-colors duration-300">{name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag, i) => (
                    <span key={i} className="text-xs text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full font-light tracking-wide">{tag}</span>
                ))}
            </div>
            <p className="text-sm md:text-base text-muted leading-relaxed font-light flex-1">{desc}</p>
            {liveUrl && (
                <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="mt-4 flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors duration-200 font-medium tracking-wide"
                >
                    <ExternalLink size={12} />
                    View Project
                </a>
            )}
        </div>
    );
}

export default function Work() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const [hovered, setHovered] = useState(false);

    const setWidth = projects.length * (CARD_WIDTH + GAP);

    const animate = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= setWidth) {
            el.scrollLeft -= setWidth;
        }
        rafRef.current = requestAnimationFrame(animate);
    }, [setWidth]);

    useEffect(() => {
        if (!hovered) {
            rafRef.current = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [hovered, animate]);

    const handleMouseEnter = () => {
        setHovered(true);
        cancelAnimationFrame(rafRef.current);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const scroll = (direction: 'left' | 'right') => {
        scrollRef.current?.scrollBy({
            left: direction === 'left' ? -340 : 340,
            behavior: 'smooth',
        });
    };

    return (
        <section id="work" className="py-32 bg-surface overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">Results</span>
                        <h2 className="font-serif text-4xl md:text-6xl font-500 mb-4 tracking-tight">Problems solved</h2>
                        <p className="text-muted text-base md:text-lg max-w-xl font-light">Every project started with a conversation. Here's what came out the other side.</p>
                    </div>
                </motion.div>
            </div>

            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {[0, 1, 2].map((setIndex) =>
                        projects.map((project) => (
                            <ProjectCard key={`${setIndex}-${project.id}`} {...project} />
                        ))
                    )}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-surface" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-surface" />
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-end gap-3">
                <button
                    onClick={() => scroll('left')}
                    className="p-3 rounded-lg border border-foreground/10 text-foreground/60 hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-pointer"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="p-3 rounded-lg border border-foreground/10 text-foreground/60 hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-pointer"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}
