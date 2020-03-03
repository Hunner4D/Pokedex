const axios = require('axios');

const getPokemon = async (name) => {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  try {
    const response = await axios.get(API_URL).then(res => res.data);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  getPokemon
};