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
        <section id="contact" className="py-32 px-6 bg-[#16181d]">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Start a conversation</h2>
                    <p className="text-muted text-xl leading-relaxed">
                        No sales pitch, no obligations. Just an honest conversation about what you're trying to build.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-2xl bg-primary/10 border border-primary/20 text-center"
                        >
                            <div className="text-5xl mb-6">✉️</div>
                            <h3 className="text-2xl font-bold mb-4">Got it.</h3>
                            <p className="text-muted text-lg leading-relaxed">
                                I'll personally review this and get back to you shortly.
                                No bots, no auto-responses — just a real conversation.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Step 1 */}
                            <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-xs text-primary font-medium tracking-widest uppercase mb-4">Step 1 of 2</p>
                                <label className="block text-xl font-medium mb-4" htmlFor="idea">
                                    Tell me what you're trying to build, or what problem you're trying to solve.
                                </label>
                                <textarea
                                    id="idea"
                                    value={ideaText}
                                    onChange={e => setIdeaText(e.target.value)}
                                    required
                                    rows={6}
                                    placeholder="I run a small landscaping company and we're still doing everything on paper…"
                                    className="w-full bg-background/60 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0.4 }}
                                animate={{ opacity: ideaText.trim().length > 10 ? 1 : 0.4 }}
                                className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <p className="text-xs text-primary font-medium tracking-widest uppercase mb-4">Step 2 of 2</p>
                                <p className="text-xl font-medium mb-6">How would you prefer I reach out?</p>

                                <div className="flex gap-4 mb-6">
                                    {(['email', 'phone'] as ContactMethod[]).map(method => (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => { setContactMethod(method); setContactValue(''); }}
                                            className={`px-6 py-3 rounded-full border font-medium transition-all capitalize ${contactMethod === method ? 'bg-primary border-primary text-white' : 'border-white/10 text-muted hover:border-white/20'}`}
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
                                            className="w-full bg-background/60 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all mb-4"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <input
                                    type="text"
                                    value={bestTime}
                                    onChange={e => setBestTime(e.target.value)}
                                    placeholder="Best time to reach you (optional) — e.g. Weekday mornings"
                                    className="w-full bg-background/60 border border-white/10 rounded-xl p-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                                />
                            </motion.div>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting || ideaText.trim().length < 10}
                                className="w-full py-4 px-8 bg-primary text-white rounded-xl font-medium text-lg transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Sending…' : 'Send my idea →'}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
