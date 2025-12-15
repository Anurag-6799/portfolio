import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { sendContact } from '../api/client';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await sendContact(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000); // Reset after success
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden" id="contact">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Let's Connect</h2>
                        <p className="text-gray-400">Have a project in mind or want to discuss system design?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="peer w-full bg-background border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="Name"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:bg-transparent -top-2.5 text-xs text-gray-400 bg-background px-2"
                            >
                                Name
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="peer w-full bg-background border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="Email"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:bg-transparent -top-2.5 text-xs text-gray-400 bg-background px-2"
                            >
                                Email
                            </label>
                        </div>

                        <div className="relative group">
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="peer w-full bg-background border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                placeholder="Message"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-4 transition-all duration-200 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:bg-transparent -top-2.5 text-xs text-gray-400 bg-background px-2"
                            >
                                Message
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${status === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/25'
                                }`}
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        Send Message <Send size={20} />
                                    </motion.span>
                                )}
                                {status === 'loading' && (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    >
                                        <Loader2 className="animate-spin" size={24} />
                                    </motion.span>
                                )}
                                {status === 'success' && (
                                    <motion.span
                                        key="success"
                                        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        Message Sent <CheckCircle size={24} />
                                    </motion.span>
                                )}
                                {status === 'error' && (
                                    <motion.span
                                        key="error"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    >
                                        Try Again
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
