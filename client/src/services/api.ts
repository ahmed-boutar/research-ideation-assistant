import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // when deployed, change this

export const generateIdeation = async (description: string) => {
  const response = await axios.post(`${BASE_URL}/generate-ideation`, { description });
  return response.data.ideation;
};
