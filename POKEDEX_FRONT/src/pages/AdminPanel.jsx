import { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { getAllPokemons } from '../services/PokemonService'
import { getSession } from "../services/sessions";
import PokemonCard from '../components/PokemonCard';


const AdminPanel = () => {

  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const session = getSession();
  const userInitial = session?.userName?.charAt(0).toUpperCase();
  const loadPokemons = async () => {
    const aux = await getAllPokemons()
    setPokemons(aux.data || [])
  }
  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };
  useEffect(() => {
    loadPokemons()
  }, [])
  return (
    <>
      <section className='main'>
        <HeaderComponent />
        <main className='main_PANEL'>
          <aside className='left' >
            <article className='item_top_L'>{userInitial}</article>


            <section className='itemMAIN'>
              {!pokemons || pokemons.length === 0 ? (
                <div>
                  <h3>Cargando pokemons...</h3>
                </div>
              ) : selectedPokemon ? (
                <article className="POKEMON_DETAIL" onClick={handleBackToList}>
                  <img
                    className="POKEMON_DETAIL_IMG"
                    src={selectedPokemon.pokeOverview.sprites.front_default}
                    alt={selectedPokemon.pokeName}
                  />
                  <p className="POKEMON_DETAIL_NAME">
                    {selectedPokemon.pokeName.toUpperCase()}
                  </p>
                </article>
              ) : (
                pokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.pokeID}
                    pokemon={pokemon}
                    onSelect={handleSelectPokemon}
                  />
                ))
              )}
            </section>


            <section className='itemDOWN'>
              <div className='down_Box1'>
                <div className='SUB0'>X</div>
                <div className='SUB'>2</div>
                <div className='SUB'>1</div>
              </div>
              <div className='down_Box'>
                {selectedPokemon ? selectedPokemon.pokeID : "NUMBER"}
              </div>
            </section>
          </aside>



          <aside className='rigth'>
            <div className='item_R_UP'>
              {selectedPokemon
                ? <p className='TEXT_POKE'>DESCRIPTION: <br/> {selectedPokemon.pokeOverview.description}</p> : <p className='TEXT_POKE'> DESCRIPTION: </p> }
            </div>
            <div className='item1_R_DOWN'>
              {selectedPokemon ? (
                <>
                  <p>H: {selectedPokemon.pokeOverview.height} <span>W: {selectedPokemon.pokeOverview.weight}</span> </p>
                 
                  <p>TIPO 1:{selectedPokemon.pokeOverview.types[0]} - <span>TIPO 2:{selectedPokemon.pokeOverview.types[1]}</span></p>
                  
                </>
              ) : (
                "peso/altura"
              )}
            </div>
          </aside>
        </main>
      </section>

    </>
  )
}

export default AdminPanel
