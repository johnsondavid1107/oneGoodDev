import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
    {
        title: 'Custom Web Apps',
        desc: 'Bespoke, full-stack web applications tailored exactly to your workflow and business requirements.'
    },
    {
        title: 'Mobile Apps (iOS / Android)',
        desc: 'Native-feeling mobile experiences that put your brand directly in your customers\' pockets.'
    },
    {
        title: 'MVPs & Prototypes',
        desc: 'Fast, focused builds designed to validate your idea with real users without wasting time or budget.'
    },
    {
        title: 'Automation & Integrations',
        desc: 'Connecting the tools you already use to save you hours of manual data entry every single week.'
    },
    {
        title: 'UI / UX Polish',
        desc: 'Taking existing interfaces from clunky to premium, focusing on usability and high-end aesthetics.'
    },
    {
        title: 'Resume Refactor',
        desc: 'Update your resume to help you land that roll, and continue your career'
    }
];

export default function Services() {
    return (
        <section id="services" className="py-32 px-6 bg-[#16181d]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-16">Services</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-default"
                        >
                            <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-muted leading-relaxed">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
