import React from 'react';
import { motion } from 'framer-motion';

const TechStack = ({ skills }) => {
    if (!skills) return null;

    const categories = [...new Set(skills.map(skill => skill.category))];

    return (
        <section className="py-20 bg-background" id="skills">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-16 justify-center">
                        <h2 className="text-4xl font-bold text-white">Technical <span className="text-secondary">Arsenal</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-surface/20 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-primary/30 hover:bg-surface/30 transition-all duration-300 group"
                            >
                                <h3 className="text-lg font-mono text-primary mb-4 border-b border-white/5 pb-2 inline-block px-2 group-hover:text-white transition-colors">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.filter(s => s.category === category).map(skill => (
                                        <span
                                            key={skill.name}
                                            className="px-3 py-1.5 bg-background text-gray-400 rounded-lg text-sm border border-gray-800 hover:text-white hover:border-secondary/50 transition-colors shadow-sm"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
