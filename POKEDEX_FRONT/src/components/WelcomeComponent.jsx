import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const onboardingTexts = [
  'Bienvenido a PokeDex Trainer',
  'Explora la lista y toca cualquier Pokemon para ver su ficha completa con estadisticas y descripcion.',
  'En el modo detalle, pulsa EDIT para modificar nombre, peso, altura, tipo o descripcion.',
  'Usa el boton + para crear un nuevo Pokemon: introduce los datos y guarda para registrarlo en la Pokedex.',
  'Pulsa el icono de la papelera para borrar un Pokemon; confirma la accion en la ventana emergente.',
  'Desde la ficha, usa el boton ADD / RMV para agregar o quitar Pokemon de tu equipo (max. 6).',
]

const WelcomeComponent = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === onboardingTexts.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prevStep) => prevStep - 1)
    }
  }

  const handleSkip = () => {
    setCurrentStep(onboardingTexts.length - 1)
    navigate("/login")
  }

  return (
    <div className='Welcome'>
      <div className='welcome-card'>
        <span className='welcome-step'>
          {currentStep + 1} / {onboardingTexts.length}
        </span>

        <p className='welcome-text'>{onboardingTexts[currentStep]}</p>

        <div className='welcome-actions'>
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
            disabled={isLastStep}
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
        </div>
      </div>
    </div>
  )
}

export default WelcomeComponent
