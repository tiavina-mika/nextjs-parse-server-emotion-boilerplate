import axios from 'axios';

const parseClasse = async (req, res) => {
  const body = JSON.parse(req.body || '{}');
  const response = await axios.post(
    'http://localhost:3000' + req.url.substring(4),
    body,
  );
  res.json(response.data);
};

export default parseClasse;
