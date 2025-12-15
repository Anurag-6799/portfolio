import { useState, useEffect } from 'react';
import { getBio, getExperience, getProjects, getSkills, getCertifications } from '../api/client';

export const usePortfolioData = () => {
    const [data, setData] = useState({
        bio: null,
        experience: [],
        projects: [],
        skills: [],
        certifications: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bio, experience, projects, skills, certifications] = await Promise.all([
                    getBio(),
                    getExperience(),
                    getProjects(),
                    getSkills(),
                    getCertifications()
                ]);
                setData({ bio, experience, projects, skills, certifications });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
