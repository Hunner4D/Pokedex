const axios = require('axios');

const getPokemon = (name) => {
  const API_URL = `https://pokeapi.co/api/v2/${name}/`;
  return axios.get(API_URL).then(res => res.data);
};

// const listPokemon = async ()

module.exports = {
  getPokemon
};