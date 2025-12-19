import axios from 'axios';

const API_URL = 'https://api.anurag30.com/api/v1';

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBio = async () => {
    const response = await client.get('/bio');
    return response.data;
};

export const getExperience = async () => {
    const response = await client.get('/experience');
    return response.data;
};

export const getProjects = async () => {
    const response = await client.get('/projects');
    return response.data;
};

export const getSkills = async () => {
    const response = await client.get('/skills');
    return response.data;
};

export const getCertifications = async () => {
    const response = await client.get('/certifications');
    return response.data;
};

export const sendContact = async (data) => {
    const response = await client.post('/contact', data);
    return response.data;
};
