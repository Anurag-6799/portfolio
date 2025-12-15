import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experience }) => {
    if (!experience) return null;

    return (
        <section className="py-20 bg-background relative" id="experience">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-20 text-center tracking-tight"
                >
                    Professional <span className="text-primary">Journey</span>
                </motion.h2>

                <div className="relative border-l-2 border-gray-800 ml-4 md:ml-10 pl-8 md:pl-12 space-y-16">
                    {experience.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative group"
                        >
                            {/* Glowing Dot */}
                            <div className="absolute -left-[43px] md:-left-[59px] top-1">
                                <div className="w-5 h-5 bg-background border-2 border-primary rounded-full group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300"></div>
                            </div>

                            <div className="bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {job.role}
                                    </h3>
                                    <span className="font-mono text-sm text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 mt-2 md:mt-0 w-fit">
                                        {job.duration}
                                    </span>
                                </div>

                                <h4 className="text-xl text-gray-400 mb-6 font-medium">{job.company}</h4>

                                <ul className="space-y-3">
                                    {job.description.map((point, i) => (
                                        <li key={i} className="text-gray-300 flex items-start gap-3 text-base leading-relaxed">
                                            <span className="text-primary mt-1.5 text-xs">▹</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
