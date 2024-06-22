import React from 'react'

const Footer = () => {
  const today = new Date()
  const time = today.toLocaleTimeString()
  return (
    <footer className='Footer'>
      <p>{`Copyright ${today.getFullYear()} ${
        time.slice(0, 4) + time.slice(7)
      }`}</p>
    </footer>
  )
}

export default Footer
