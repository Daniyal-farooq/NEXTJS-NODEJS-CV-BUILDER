import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://localhost:8000/test2'); // Replace with your Node.js server URL
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching home page' });
  }
}