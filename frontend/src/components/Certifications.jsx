import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = ({ certifications }) => {
    if (!certifications) return null;

    return (
        <section className="py-20 bg-background" id="certifications">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-gradient-to-r from-transparent to-gray-800 flex-grow"></div>
                        <h2 className="text-3xl font-bold text-white">Certifications & Awards</h2>
                        <div className="h-px bg-gradient-to-l from-transparent to-gray-800 flex-grow"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-surface/20 border border-white/5 p-6 rounded-xl flex flex-col gap-4 hover:border-primary/40 hover:bg-surface/40 transition-all duration-300 relative group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 text-accent p-2 bg-accent/10 rounded-lg">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1 leading-snug">{cert.name}</h3>
                                        <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                                        <span className="text-gray-600 text-xs font-mono">{cert.date}</span>
                                    </div>
                                </div>

                                {cert.credential_link && (
                                    <a
                                        href={cert.credential_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-auto text-xs font-mono text-primary flex items-center gap-1 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        View Credential <ExternalLink size={12} />
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
