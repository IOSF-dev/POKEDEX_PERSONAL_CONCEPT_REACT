import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { getAllUsers } from '../services/PokemonService'

const AdminPanel = () => {
  const [users, setUsers] = useState([])

  const loadPokemons = async () => {
    const aux = await getAllUsers()
    setUsers(aux.data || [])
  }
  const session = JSON.parse(localStorage.getItem("pdx_user"))
  const userInitial = session?.userName?.charAt(0).toUpperCase()




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
              {users.map((user) => (
                <div key={user.pokeID}>
                  <hr />
                  <p>{user.pokeID}</p>
                  <img src={user.pokeOverview.sprites.front_default} />
                  <span>{user.pokeName}</span>
                </div>
              ))}
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
