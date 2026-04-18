import React from 'react'

const PokemonCard = (props) => {
const { pokemon } = props;


  return (
<>
    <article className='CARD'>
      <div
        className='CARD_IMG'
        style={{ backgroundImage: `url(${pokemon.pokeOverview.sprites.front_default})` }}
      >
        
      </div>


      <div className='CARD_DIV'>
      <p className='CARD_Data1'>{pokemon.pokeID}</p> 
      <p className='CARD_Data2'>{pokemon.pokeName.toUpperCase()}</p>
      </div>
    </article>

    
    </>
  )
}

export default PokemonCard
