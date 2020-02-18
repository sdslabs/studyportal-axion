import React from 'react'
import 'styles/main.scss'

function CourseCover(props) {
  return (
  <div className='coursecover' onClick={props.close}>
    <div className='coursecover-hold'>Select course to view its files</div>
  </div>)
}

export default CourseCover
