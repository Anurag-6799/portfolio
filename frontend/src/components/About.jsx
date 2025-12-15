import React from 'react';
import { motion } from 'framer-motion';

const About = ({ bio }) => {
    if (!bio) return null;

    return (
        <section className="py-20 bg-background relative" id="about">
            {/* Background Decoration */}
            <div className="absolute left-[-100px] top-[20%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface/30 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-bold text-white">About <span className="text-primary">Me</span></h2>
                        <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-grow"></div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {bio.bio}
                        </p>

                        <div className="bg-surface/50 p-6 rounded-xl border border-white/5">
                            <h3 className="text-sm font-mono text-secondary mb-3 uppercase tracking-wider">Current Focus</h3>
                            <p className="text-gray-400">
                                {bio.learning_goals}
                            </p>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Open to Work
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
                                <span>📍</span>
                                {bio.location}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
