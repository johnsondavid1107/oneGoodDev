import React, { } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const projects = [
    { id: 1, name: 'Workflow Automator', tags: ['React', 'API', 'Node.js'], desc: 'A custom dashboard connecting 5 disparate tools to save a logistics team 20 hours a week.' },
    { id: 2, name: 'Boutique E-commerce', tags: ['Next.js', 'Stripe'], desc: 'High-end shopping experience with fluid transitions and custom checkout.' },
    { id: 3, name: 'Local Services App', tags: ['Mobile', 'React Native'], desc: 'iOS & Android app allowing customers to book and track home services in real-time.' },
    { id: 4, name: 'SaaS MVP', tags: ['React', 'Tailwind', 'Supabase'], desc: 'Rapid prototype built in 4 weeks to help founders secure seed funding.' },
    { id: 5, name: 'Inventory Tracker', tags: ['PWA', 'Offline First'], desc: 'Tablet-optimized progressive web app for warehouse staff to scan barcodes offline.' },
    { id: 6, name: 'Clinic Scheduling', tags: ['Full Stack', 'Calendar Sync'], desc: 'HIPAA-compliant patient portal and admin calendar synchronization system.' },
];

export default function Work() {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="work" className="py-32 px-6 bg-[#16181d]">
            <div className="max-w-6xl mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            layoutId={`project-container-${project.id}`}
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            className="group cursor-pointer rounded-2xl overflow-hidden bg-background border border-white/5 hover:border-white/10 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <motion.div
                                layoutId={`project-image-${project.id}`}
                                className="aspect-video w-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center p-6 relative overflow-hidden"
                            >
                                {/* Placeholder graphic */}
                                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAweDh2OGgtOHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] mix-blend-overlay" />
                                <span className="text-4xl font-mono text-white/20 group-hover:scale-110 transition-transform duration-500">_UI</span>
                            </motion.div>

                            <div className="p-6">
                                <motion.h3 layoutId={`project-title-${project.id}`} className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.name}
                                </motion.h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="text-xs text-muted bg-white/5 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-muted text-sm line-clamp-2">{project.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[120]"
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-[130] p-4 pointer-events-none">
                            <motion.div
                                layoutId={`project-container-${selectedProject.id}`}
                                className="w-full max-w-4xl bg-background border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col"
                            >
                                <motion.div
                                    layoutId={`project-image-${selectedProject.id}`}
                                    className="w-full h-64 md:h-96 bg-gradient-to-br from-white/10 to-white/5 relative flex items-center justify-center shrink-0"
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur rounded-full hover:bg-background/80 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                    <span className="text-6xl font-mono text-white/30">_UI_PREVIEW</span>
                                </motion.div>

                                <div className="p-8 md:p-12 overflow-y-auto">
                                    <motion.h3 layoutId={`project-title-${selectedProject.id}`} className="text-3xl font-bold mb-4">
                                        {selectedProject.name}
                                    </motion.h3>

                                    <div className="flex gap-4 mb-8 border-b border-white/10 pb-8">
                                        {selectedProject.tags.map((tag, j) => (
                                            <span key={j} className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-xl text-muted leading-relaxed mb-6">
                                            {selectedProject.desc}
                                        </p>
                                        <p className="text-muted/80 leading-relaxed mb-8">
                                            This is a placeholder for a detailed case study. It would explain the initial problem the client faced, why off-the-shelf solutions weren't adequate, and the specific technical approach taken to solve it. It highlights not just the code, but the business value generated.
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                            View App
                                        </button>
                                        <button className="px-6 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                                            Read Case Study
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
