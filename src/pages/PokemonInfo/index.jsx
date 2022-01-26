import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Link } from 'react-router-dom'

export const PokemonInfo = ({ teste, info }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const location = useLocation();

  const { pokemon, sprite } = location.state;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => {
        setPokemons(res.data);
        setPokemonType(res.data.types);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pokemon]);

  console.log(location);

  return (
    <>
      <Link to="/">
        <button style={{ marginLeft: "25%", marginTop: "2%"  }}>&larr; Retornar</button>
      </Link>
      <div style={{ textAlign: "center", marginTop: "5vh" }}>
        <h1>Detalhes do Pokémon:</h1>
        <h4>{pokemons.name}</h4>
      </div>
      <div className="pokemon-info">
        <p style={{ fontWeight: "bold" }}>Status:</p>
        <li>Altura: {pokemons.height}</li>
        <li>Base: {pokemons.base_experience}</li>
        <li>Peso: {pokemons.weight}</li>
        <p>
          <p style={{ fontWeight: "bold" }}>Types:</p>
          {!pokemons.types ? (
            <h1>deu não</h1>
          ) : (
            pokemons.types.map((type) => (
              <li className="pokemon-type">{type.type.name}</li>
            ))
          )}
        </p>
        <img src={sprite} alt="" />
      </div>
    </>
  );
};
