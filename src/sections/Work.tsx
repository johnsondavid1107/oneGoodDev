import { motion } from 'framer-motion';

const projects = [
    { id: 1, name: 'Workflow Automator', tags: ['React', 'API', 'Node.js'], desc: 'A custom dashboard connecting 5 disparate tools to save a logistics team 20 hours a week.' },
    { id: 2, name: 'Boutique E-commerce', tags: ['Next.js', 'Stripe'], desc: 'High-end shopping experience with fluid transitions and custom checkout.' },
    { id: 3, name: 'Local Services App', tags: ['Mobile', 'React Native'], desc: 'iOS & Android app allowing customers to book and track home services in real-time.' },
    { id: 4, name: 'SaaS MVP', tags: ['React', 'Tailwind', 'Supabase'], desc: 'Rapid prototype built in 4 weeks to help founders secure seed funding.' },
    { id: 5, name: 'Inventory Tracker', tags: ['PWA', 'Offline First'], desc: 'Tablet-optimized progressive web app for warehouse staff to scan barcodes offline.' },
    { id: 6, name: 'Clinic Scheduling', tags: ['Full Stack', 'Calendar Sync'], desc: 'HIPAA-compliant patient portal and admin calendar synchronization system.' },
];

function ProjectCard({ name, tags, desc }: { name: string; tags: string[]; desc: string }) {
    return (
        <div className="flex flex-col rounded-lg border-t border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4 sm:p-6 w-[300px] shrink-0 transition-colors duration-300 hover:from-white/8 hover:to-white/5">
            <div className="aspect-video w-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center rounded-md mb-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAweDh2OGgtOHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] mix-blend-overlay" />
                <span className="text-2xl font-mono text-white/20">_UI</span>
            </div>
            <h3 className="font-semibold text-base leading-none mb-3">{name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag, i) => (
                    <span key={i} className="text-xs text-muted bg-white/5 px-2 py-1 rounded">{tag}</span>
                ))}
            </div>
            <p className="text-sm text-muted leading-relaxed">{desc}</p>
        </div>
    );
}

export default function Work() {
    return (
        <section id="work" className="py-32 bg-[#16181d] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
                        <p className="text-muted text-lg max-w-xl">A selection of recent projects built from scratch to solve real problems.</p>
                    </div>
                </motion.div>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center">
                <div className="group flex [--gap:1.5rem] [gap:var(--gap)] [--duration:35s] overflow-hidden">
                    <div className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
                        {projects.map((project) => (
                            <ProjectCard key={`a-${project.id}`} {...project} />
                        ))}
                    </div>
                    <div className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]" aria-hidden>
                        {projects.map((project) => (
                            <ProjectCard key={`b-${project.id}`} {...project} />
                        ))}
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#16181d]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#16181d]" />
            </div>
        </section>
    );
}
