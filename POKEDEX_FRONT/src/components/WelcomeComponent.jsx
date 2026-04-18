import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const TextoSlides = [
  'Bienvenido a PokeDex Trainer',
  'Explora la lista y toca cualquier Pokemon para ver su ficha completa con estadisticas y descripcion.',
  'En el modo detalle, pulsa EDIT para modificar nombre, peso, altura, tipo o descripcion.',
  'Usa el boton + para crear un nuevo Pokemon: introduce los datos y guarda para registrarlo en la Pokedex.',
  'Pulsa el icono de la papelera para borrar un Pokemon; confirma la accion en la ventana emergente.',
  'Desde la ficha, usa el boton ADD / RMV para agregar o quitar Pokemon de tu equipo (max. 6).',
]

const WelcomeComponent = () => {
  const [textoArray, setTextoArray] = useState(0)
  const navigate = useNavigate()
  const isFirstStep = textoArray === 0
  const isLastStep = textoArray === TextoSlides.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setTextoArray((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setTextoArray((prevStep) => prevStep - 1)
    }
  }

  const handleSkip = () => {
    setTextoArray(TextoSlides.length - 1)
    navigate("/login")
  }

  return (
    <main className='Welcome'>
      <section className='welcome-card'>
        <span className='welcome-step'>
          {textoArray + 1} / {TextoSlides.length}
        </span>

        <p className='welcome-text'>{TextoSlides[textoArray]}</p>

        <nav className='welcome-actions'>
          <button
            type='button'
            className='welcome-button'
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Back
          </button>

          <button
            type='button'
            className='welcome-button welcome-button-secondary'
            onClick={handleSkip}
            
          >
            Skip
          </button>

          <button
            type='button'
            className='welcome-button'
            onClick={handleNext}
            disabled={isLastStep}
          >
            Next
          </button>
        </nav>
      </section>
    </main>
  )
}

export default WelcomeComponent
