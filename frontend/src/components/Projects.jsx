import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Github, ArrowUpRight } from 'lucide-react';

const Projects = ({ projects }) => {
    if (!projects) return null;

    return (
        <section className="py-20 bg-background relative" id="projects">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-16 text-center"
                >
                    Featured <span className="text-secondary">Projects</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative bg-surface/30 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col h-full hover:border-secondary/50 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-secondary/10 rounded-lg text-secondary group-hover:text-white group-hover:bg-secondary transition-colors">
                                    <Folder size={24} />
                                </div>
                                {project.github_link && (
                                    <a
                                        href={project.github_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-500 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full"
                                        aria-label="View on GitHub"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                                {project.title}
                            </h3>

                            <span className="text-xs font-mono text-gray-500 mb-4 block">{project.date}</span>

                            <p className="text-gray-400 text-sm mb-6 flex-grow">
                                {project.description}
                            </p>

                            <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="text-gray-500 text-xs flex items-center gap-2">
                                        <div className="w-1 h-1 bg-secondary rounded-full"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-auto mb-4">
                                {project.tech_stack.map(tech => (
                                    <span key={tech} className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {project.github_link && (
                                <a
                                    href={project.github_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors"
                                >
                                    View Project <ArrowUpRight size={16} />
                                </a>
                            )}

                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
