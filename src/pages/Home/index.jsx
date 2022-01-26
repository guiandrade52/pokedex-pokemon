import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//import { api } from "../../services/api";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filterPokemons, setFilterPokemons] = useState();
  const [nomePokemon, setNomePokemon] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/squirtle`)
      .then((res) => {
        setPokemons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handlePokemon() {
    if (nomePokemon === "") return;

    try {
      const getPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`
      );
      const results = getPokemon.data;
      setFilterPokemons(results);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        borderWidth: 1,
        marginTop: 50,
        borderStyle: "solid",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 20,
        boxShadow: "unset",
        borderColor: "#d9d9d9",
      }}
    >
      <header>
        <img
          src="https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
          alt="Logo Pokemon"
          className="pokemon-logo-image"
        ></img>
        <h1 className="header-pokedex">Seja muito bem-vindo à Pokédex!</h1>
        <h4 className="header-pokedex">
          Digite abaixo o nome do Pokémon desejado.
        </h4>
        <input
          className="input-filter"
          type="text"
          placeholder="Pokémon"
          onChange={(e) => setNomePokemon(e.target.value)}
        />
        <button onClick={handlePokemon} className="button-filter">
          Buscar
        </button>
      </header>
      {pokemons && filterPokemons === undefined ? (
        <div
          style={{
            marginLeft: "25%",
            marginTop: "6%",
            marginBottom: "10%",
            fontFamily: "Roboto Condensed",
          }}
        >
          O seu Pokémon desejado vai aparecer bem aqui! <br />
          Para ver os detalhes do Pokémon, basta clicar na foto dele!
        </div>
      ) : (
        <div className="pokemon-container">
          {!filterPokemons ? (
            <div className="pokemon-section">
              O pokemon desejado irá aparecer aqui :)
            </div>
          ) : (
            <Link
              to={{ pathname: "/pokemon-info" }}
              state={{
                pokemon: filterPokemons.name,
                sprite: filterPokemons.sprites.front_default,
              }}
            >
              <button className="pokemon-section">
                <label style={{ fontWeight: "bold" }}>
                  {filterPokemons.name}
                </label>
                <img
                  src={
                    !filterPokemons.sprites.front_default
                      ? "sem imagen"
                      : filterPokemons.sprites.front_default
                  }
                  alt={pokemons.name}
                />
                <p>
                  Type:
                  {filterPokemons.types.map((type) => (
                    <li className="pokemon-type">{type.type.name}</li>
                  ))}
                </p>
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
