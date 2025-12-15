import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Code2, Terminal } from 'lucide-react';

const Hero = ({ bio }) => {
    if (!bio) return null;

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Animated Abstract Background with more Tech feel */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-blob mix-blend-screen"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            {/* The "Name Card" */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="z-10 relative max-w-3xl w-full mx-4"
            >
                <div className="backdrop-blur-xl bg-surface/40 border border-white/10 p-8 md:p-14 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-primary/30 transition-all duration-500">

                    {/* Card Shine Effect */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar / Icon Area */}
                        <div className="flex-shrink-0 relative group">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary/50 relative z-10 overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                            >
                                <img
                                    src="/avatar.png"
                                    alt="Avatar"
                                    className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-700"
                                />
                            </motion.div>

                            {/* Ring Animations */}
                            <div className="absolute inset-0 rounded-full border border-secondary/30 scale-110 animate-pulse"></div>
                            <div className="absolute inset-0 rounded-full border border-primary/20 scale-125 animate-spin-slow"></div>
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest uppercase mb-4"
                            >
                                <Code2 size={12} />
                                Software Developer
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                                {bio.name}
                            </h1>

                            <p className="text-xl text-gray-400 font-light mb-6 flex items-center justify-center md:justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {bio.title}
                            </p>

                            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
                                Backing engineering at <strong className="text-white">Vetic</strong>. Architecting fault-tolerant systems with Python & FastAPI.
                            </p>

                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <SocialLink href={bio.social_links.github} icon={<Github size={20} />} label="GitHub" />
                                <SocialLink href={bio.social_links.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
                                <SocialLink href={`mailto:singhanurag6799@gmail.com`} icon={<Mail size={20} />} label="Email" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10"
            >
                <ChevronDown className="text-gray-600 w-8 h-8" />
            </motion.div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
        aria-label={label}
    >
        <span className="relative z-10">{icon}</span>
        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
    </a>
);

export default Hero;
