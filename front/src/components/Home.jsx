import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='p-8'>
      <h1 className='text-4xl text-sky-900 text-center'>Bienvenue chez GSB</h1>
      <p className='text-white pl-6'>GSB est une entreprise pharmaceutique dédiée à l'innovation et à la santé.</p>
    </div>
  )
}

export default Home
