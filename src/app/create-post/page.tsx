'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import FormPost from '../components/create-post/form';

function CreatePostPage() {

  const {data:session} = useSession();
  const router = useRouter();

  /*
  useEffect(() => {
    if (!session) {
      router.push('/')
      alert('You need to sign in to create a post')
    }
  },[])
  */

  return (
    <div>
      <div className='flex justify-center'>
        <div className='p-6 mt-8 lg:w-[35%]'>
          <h2 className='text-[30px] font-extrabold text-[#0069FF] text-center'>Crea una publicación</h2>
          <p className='text-center mt-6 mb-8'>Rellena el siguiente formulario, estos datos son obligatorios</p>
          <FormPost />
        </div>
      </div>
    </div>
  )
}

export default CreatePostPage