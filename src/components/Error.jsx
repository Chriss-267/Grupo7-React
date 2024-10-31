import React from 'react'

function Error({children}) {
  return (
    <div className='bg-red-500 p-1 mt-2 text-white rounded-lg'>{children}</div>
  )
}

export default Error