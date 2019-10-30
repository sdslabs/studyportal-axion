import React from 'react'
import error from 'assets/error.png'

function Error(props) {
  return (
    <div className='error'>
      <div className='error--image'><img src={error} alt='error' /></div>
      <div className='error--page'>Page Not Found!</div>
      <div className='error--sorry'>Sorry we couldn&apos;t find the page you were looking for.</div>
    </div>
  )
}

export default Error
