'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { FaRegCircleUser } from "react-icons/fa6";
import { PiUserCirclePlusLight } from "react-icons/pi";
import { Toaster, toast } from 'sonner'

const USER_IMAGE = 'https://res.cloudinary.com/demo/image/twitter/1330457336.jpg'

function Header() {

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const router = useRouter();
  const {data: session } = useSession();
  console.log("Session ", session)

  const userImage = session?.user?.image ?? USER_IMAGE;

  return (
    <div className='flex justify-between p-3 border-b-[2px] border-[#0069FF]'>
      <Image
        src="/estlmarket.svg"
        width={150}
        height={100}
        alt="Picture of logo"
        className='2xl:w-32 xl:w-32 lg:w-32 md:w-32 sm:w-28 w-24'/>
    <div className='flex gap-4 items-center mt-1'>
      <Button onClick={() => router.push('/create-post')}>
        <span className='hidden sm:block'>Crea un publicación</span>
        <HiOutlinePencilSquare className='sm:hidden text-[20px]' />
      </Button>
      
      {!session?.user ? (
        <Button onClick={handleGoogleSignIn} className='bg-gray-200 hover:bg-gray-100'>
          <Image src={'/googleCom.svg'} width={18} height={18} alt='Google' className='mr-3'/>
          <span className='hidden sm:block text-black'>Iniciar sesión con Google</span>
          <HiArrowLeftOnRectangle className='sm:hidden text-[20px] text-gray-600' />
        </Button>
      ) : (
        <Button className='bg-gray-200 hover:bg-gray-100' onClick={async () => {
          await signOut({
            callbackUrl: "/",
          }
          )
        }}>
          <span className='hidden sm:block text-black'>Cerrar sesión</span>
          <HiArrowLeftOnRectangle className='sm:hidden text-[20px] text-gray-600' />
        </Button>
        
      )}

      {!session?.user ? (
        <PiUserCirclePlusLight className='text-4xl mt-1 items-center mb-1' />
      ) : (
        <Image
          src={userImage}
          width={40}
          height={40}
          alt="Picture of the author"
          className='rounded-full text-3xl cursor-pointer'
          onClick={() => router.push('/profile')}
        />
      )}
    </div>
    </div>
  )
}

export default Header