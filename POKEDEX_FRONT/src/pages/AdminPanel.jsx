import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'

const AdminPanel = () => {
   const [users, setUsers] = useState([])
    useEffect(() => {
    const getAllUser = async () => {
      const response = await fetch('http://localhost:3000/pokemon/')
      const data = await response.json()
      setUsers(data.data || [])
    }

    getAllUser()
  }, [])
  return (
    <>
    <main className='main'>
<HeaderComponent/>
<div className='main_PANEL'>

  <div className='left' >
    
<div className='item_top_L'>
  
</div>
            <div className='itemMAIN'>
              {users.map((user) => (
                <div key={user.pokeID}>
                  <hr />
                  <p>{user.pokeID}</p>
                  <img src={user.pokeOverview.sprites.front_default}/>
                  
                  <span>{user.pokeName}</span>
                  
                </div>
              ))}
            </div>



<div className='itemDOWN'>
  <div className='down_Box1'>
    <div className='SUB0'></div>
        <div className='SUB'></div>
      <div className='SUB'></div>
  
    
  </div>
  <div className='down_Box'>
   
  </div>
</div>
  </div>

<div className='rigth'>
<div className='item_R_UP'></div>
<div className='item1_R_DOWN'></div>

</div>
</div>

    </main>
    

    </>
    
  )
}

export default AdminPanel
