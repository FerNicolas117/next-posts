'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import FormPost from '../components/create-post/form';
import { Button } from '@/components/ui/button'
import { HiArrowSmallLeft } from "react-icons/hi2";

import { Toaster, toast } from 'sonner'

function CreatePostPage() {

  const {data:session} = useSession();
  const router = useRouter();

  
  useEffect(() => {
    if (!session) {
      router.push('/')
      toast.error('Es necesario iniciar sesión para crear una publicación')
    }
  },[])
  

  return (
    <div>
      <div className='mt-3 ml-3'>
        <Button className='bg-gray-200 hover:bg-gray-300' onClick={() => router.push('/')}>
          <HiArrowSmallLeft  className='text-[20px] text-black' />
          <span className='text-black text-[16px] ml-2'>Inicio</span>
        </Button>
      </div>
      <div className='flex justify-center'>
        <div className='p-6 mt-2 lg:w-[35%]'>
          <h2 className='xl:text-[35px] lg:text-[30px] md:text-[26px] sm:text-[22px] text-[20px] font-extrabold text-[#0069FF] text-center'>Crea una publicación</h2>
          <p className='text-center mt-6 mb-8'>Rellena el siguiente formulario, estos datos son obligatorios</p>
          <FormPost />
        </div>
      </div>
    </div>
  )
}

export default CreatePostPage