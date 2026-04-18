import { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { getAllPokemons } from '../services/PokemonService'
import { getSession } from "../services/sessions";
import PokemonCard from '../components/PokemonCard';


const AdminPanel = () => {
  const [pokemons, setPokemons] = useState([])
const session = getSession();
const userInitial = session?.userName?.charAt(0).toUpperCase();
  const loadPokemons = async () => {
    const aux = await getAllPokemons()
    setPokemons(aux.data || [])
  }
  
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
        ) : (
              pokemons.map((user) => (
                <PokemonCard key={user.pokeID} pokemon={user} />
              )))}
            </section>


            <section className='itemDOWN'>
              <div className='down_Box1'>
                <div className='SUB0'>X</div>
                <div className='SUB'>2</div>
                <div className='SUB'>1</div>
              </div>
              <div className='down_Box'>
                NUMBER
              </div>
            </section>
          </aside>



          <aside className='rigth'>
            <div className='item_R_UP'>descripcion:</div>
            <div className='item1_R_DOWN'>peso/altura/tipos</div>
          </aside>
        </main>
      </section>

    </>
  )
}

export default AdminPanel
