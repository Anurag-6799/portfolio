import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp, Award, ExternalLink, RefreshCw } from 'lucide-react';

const SimpleDonutChart = ({ easy, medium, hard, total }) => {
    if (!total) return null;

    // Calculate segments
    const easyPct = (easy / total) * 100;
    const medPct = (medium / total) * 100;
    const hardPct = (hard / total) * 100;

    // SVG parameters
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    const easyOffset = 0;
    const medOffset = -((easyPct / 100) * circumference);
    const hardOffset = -(((easyPct + medPct) / 100) * circumference);

    return (
        <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background */}
                <circle cx={center} cy={center} r={radius} fill="none" stroke="#333" strokeWidth={strokeWidth} />

                {/* Segments */}
                <circle
                    cx={center} cy={center} r={radius}
                    fill="none" stroke="#00b8a3" strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - ((easyPct / 100) * circumference)}
                    className="transition-all duration-1000 ease-out"
                />
                <circle
                    cx={center} cy={center} r={radius}
                    fill="none" stroke="#ffc01e" strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - ((medPct / 100) * circumference)}
                    style={{ strokeDashoffset: circumference - ((medPct / 100) * circumference), transform: `rotate(${(easyPct * 3.6)}deg)`, transformOrigin: 'center' }}
                    className="transition-all duration-1000 ease-out"
                />
                <circle
                    cx={center} cy={center} r={radius}
                    fill="none" stroke="#ff375f" strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - ((hardPct / 100) * circumference)}
                    style={{ strokeDashoffset: circumference - ((hardPct / 100) * circumference), transform: `rotate(${((easyPct + medPct) * 3.6)}deg)`, transformOrigin: 'center' }}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-2xl font-bold text-white block leading-none">{total}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Solved</span>
            </div>
        </div>
    );
};

const PlatformLogo = ({ platform }) => {
    const logos = {
        leetcode: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
        codeforces: "https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png", // Fallback or use text if fails
        cses: "https://cses.fi/logo.png?1"
    };

    if (platform === 'codeforces') {
        return (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logos.codeforces} alt="Codeforces" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-black font-bold">CF</span>' }} />
            </div>
        )
    }

    return (
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
            <img src={logos[platform]} alt={platform} className="w-full h-full object-contain" />
        </div>
    );
};

const CompetitiveProgramming = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/assets/competitive-stats.json')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load stats', err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or skeleton

    const { leetcode, codeforces, cses } = stats || {};

    return (
        <section className="py-20 bg-[#0a0a0a] relative overflow-hidden" id="competitive-programming">
            <div className="absolute top-20 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-16 text-center"
                >
                    Competitive <span className="text-secondary">Programming</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* LeetCode Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#FFA116]/50 transition-all duration-300 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={100} />
                        </div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <PlatformLogo platform="leetcode" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">LeetCode</h3>
                                    <p className="text-sm text-gray-400">rTEYtXc8k2</p>
                                </div>
                            </div>
                            <a href="https://leetcode.com/u/rTEYtXc8k2/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white"><ExternalLink size={20} /></a>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            {/* Graph */}
                            <div className="flex-shrink-0">
                                <SimpleDonutChart
                                    easy={leetcode?.easySolved || 0}
                                    medium={leetcode?.mediumSolved || 0}
                                    hard={leetcode?.hardSolved || 0}
                                    total={leetcode?.totalSolved || 0}
                                />
                            </div>

                            {/* Stats */}
                            <div className="flex-grow w-full space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-xs text-gray-400">Global Rank</p>
                                        <p className="text-lg font-mono font-bold text-white">{leetcode?.ranking?.toLocaleString() || 'N/A'}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <p className="text-xs text-gray-400">Acceptance</p>
                                        <p className="text-lg font-mono font-bold text-white">{leetcode?.acceptanceRate || 0}%</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Easy</span>
                                        <span className="text-[#00b8a3] font-bold">{leetcode?.easySolved}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Medium</span>
                                        <span className="text-[#ffc01e] font-bold">{leetcode?.mediumSolved}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Hard</span>
                                        <span className="text-[#ff375f] font-bold">{leetcode?.hardSolved}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Codeforces Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#3182CE]/50 transition-all duration-300 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target size={100} />
                        </div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <PlatformLogo platform="codeforces" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Codeforces</h3>
                                    <p className="text-sm text-gray-400">singhanurag6799</p>
                                </div>
                            </div>
                            <a href="https://codeforces.com/profile/singhanurag6799" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white"><ExternalLink size={20} /></a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-xs text-gray-400 mb-1">Contest Rating</p>
                                <p className="text-2xl font-mono font-bold text-white">{codeforces?.rating || 'Unrated'}</p>
                                <p className="text-xs text-gray-500 mt-1 capitalize">{codeforces?.rank || 'Newbie'}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-xs text-gray-400 mb-1">Highest Rating</p>
                                <p className="text-2xl font-mono font-bold text-white">{codeforces?.maxRating || 'N/A'}</p>
                                <p className="text-xs text-gray-500 mt-1 capitalize">{codeforces?.maxRank || '-'}</p>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center relative z-10">
                            <div>
                                <p className="text-sm text-gray-400">Practice Problems Solved</p>
                                <p className="text-3xl font-bold text-white mt-1">{codeforces?.solved || 0}</p>
                            </div>
                            <div className="h-10 w-10 bg-[#3182CE]/20 rounded-full flex items-center justify-center text-[#3182CE]">
                                <Trophy size={20} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CSES Compact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-secondary/30 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <PlatformLogo platform="cses" />
                        <div>
                            <h3 className="text-xl font-bold text-white">CSES Problem Set</h3>
                            <p className="text-gray-400 text-sm">The algorithmic battleground</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-center md:text-right">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Problems Solved</p>
                            <p className="text-3xl font-mono font-bold text-white text-secondary">{cses?.solved || 0}</p>
                        </div>

                        <a
                            href="https://cses.fi/user/392743"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full transition-colors"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </motion.div>

                <div className="text-center mt-8 text-xs text-gray-600 font-mono">
                    Last synced: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Just now'}
                </div>
            </div>
        </section>
    );
};

export default CompetitiveProgramming;
