import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center items-center'>
      <p className='w-1/2 text-center mt-6 text-[#0069FF] 2xl:text-lg xl:text-xl lg:text-xl md:text-xl sm:text-xl text-base'>
        Cargando publicaciones
        <span className="dot font-bold">.</span>
        <span className="dot font-bold">.</span>
        <span className="dot font-bold">.</span>
      </p>
    </div>
  )
}

export default Loading