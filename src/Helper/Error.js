import React from 'react'

const Error = ({ error }) => {
  if(!error) return null;
  return (
    <div className='error'>
      Ops! Algo de errado não está certo! {error}
    </div>
  )
}

export default Error