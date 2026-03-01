import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ContactMethod = 'email' | 'phone';

export default function Contact() {
    const [ideaText, setIdeaText] = useState('');
    const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
    const [contactValue, setContactValue] = useState('');
    const [bestTime, setBestTime] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Replace YOUR_FORM_ID with your actual Formspree form ID
    const FORMSPREE_ID = 'YOUR_FORM_ID';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    idea: ideaText,
                    preferredContact: contactMethod,
                    contactValue,
                    bestTime,
                }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                setError('Something went wrong. Please try again or email me directly.');
            }
        } catch {
            setError('Unable to send. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 px-6 bg-surface">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-primary font-sans text-xs tracking-[0.2em] uppercase mb-6 block font-medium">Let's talk</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-500 mb-6 tracking-tight">Tell me what you need</h2>
                    <p className="text-muted text-lg md:text-xl leading-relaxed font-light">
                        No sales pitch, no obligations. Just tell me what you're dealing with and I'll let you know how I can help.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-2xl bg-primary/5 border border-primary/10 text-center"
                        >
                            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-6">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-2xl font-500 mb-4">Received.</h3>
                            <p className="text-muted text-[0.95rem] leading-relaxed font-light">
                                I'll personally read this and get back to you soon.
                                No bots, no auto-responses — just me, getting back to you.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Step 1 */}
                            <div className="p-8 md:p-10 rounded-2xl bg-background border border-foreground/[0.06]">
                                <p className="text-xs text-primary font-medium tracking-[0.15em] uppercase mb-5">Step 1 of 2</p>
                                <label className="block text-lg md:text-xl font-serif font-500 mb-5" htmlFor="idea">
                                    What are you dealing with? Describe the problem, the idea, or the thing you wish existed.
                                </label>
                                <textarea
                                    id="idea"
                                    value={ideaText}
                                    onChange={e => setIdeaText(e.target.value)}
                                    required
                                    rows={6}
                                    placeholder="I run a small landscaping company and we're still doing everything on paper..."
                                    className="w-full bg-surface border border-foreground/[0.06] rounded-xl p-4 text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:border-primary/30 transition-colors duration-300 text-base font-light"
                                />
                            </div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0.4 }}
                                animate={{ opacity: ideaText.trim().length > 10 ? 1 : 0.4 }}
                                className="p-8 md:p-10 rounded-2xl bg-background border border-foreground/[0.06]"
                            >
                                <p className="text-xs text-primary font-medium tracking-[0.15em] uppercase mb-5">Step 2 of 2</p>
                                <p className="text-lg md:text-xl font-serif font-500 mb-6">How would you prefer I reach out?</p>

                                <div className="flex gap-3 mb-6">
                                    {(['email', 'phone'] as ContactMethod[]).map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => { setContactMethod(method); setContactValue(''); }}
                                            className={`px-6 py-3 rounded-lg border font-medium transition-all duration-200 capitalize text-sm tracking-wide cursor-pointer ${contactMethod === method
                                                ? 'bg-primary border-primary text-background shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)]'
                                                : 'border-foreground/[0.08] text-muted hover:border-primary/20 hover:text-foreground hover:shadow-[3px_3px_0px_0px_rgba(232,226,214,0.04)]'
                                            }`}
                                        >
                                            {method}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={contactMethod}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <input
                                            type={contactMethod === 'email' ? 'email' : 'tel'}
                                            value={contactValue}
                                            onChange={e => setContactValue(e.target.value)}
                                            required
                                            placeholder={contactMethod === 'email' ? 'you@example.com' : '(555) 000-0000'}
                                            className="w-full bg-surface border border-foreground/[0.06] rounded-xl p-4 text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary/30 transition-colors duration-300 mb-4 text-base font-light"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <input
                                    type="text"
                                    value={bestTime}
                                    onChange={e => setBestTime(e.target.value)}
                                    placeholder="Best time to reach you (optional) — e.g. Weekday mornings"
                                    className="w-full bg-surface border border-foreground/[0.06] rounded-xl p-4 text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary/30 transition-colors duration-300 text-base font-light"
                                />
                            </motion.div>

                            {error && (
                                <p className="text-red-400 text-sm font-light">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting || ideaText.trim().length < 10}
                                className="w-full py-4 px-8 bg-primary text-background rounded-lg font-medium text-sm tracking-wide transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(200,149,108,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(200,149,108,0.25)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0 cursor-pointer"
                            >
                                {submitting ? 'Sending...' : 'Send my idea'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
