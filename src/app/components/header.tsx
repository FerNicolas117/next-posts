'use client'

import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { HiOutlinePencilSquare, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

import { FaRegCircleUser } from "react-icons/fa6";


const USER_IMAGE = 'https://res.cloudinary.com/demo/image/twitter/1330457336.jpg'

function Header() {

  const router = useRouter();
  const {data: session } = useSession();
  console.log("Session ", session)

  return (
    <div className='flex justify-between p-3 border-b-[2px] border-[#0069FF]'>
      <Image
        src="/next.svg"
        width={150}
        height={100}
        alt="Picture of logo"/>
    <div className='flex gap-4'>
      <Button>
        <span onClick={() => router.push('/create-post')} className='hidden sm:block'>Crea un publicación</span>
        <HiOutlinePencilSquare className='sm:hidden text-[20px]' />
      </Button>
      
      {!session?.user ? (
        <Button onClick={() => signIn()}>
          <span className='hidden sm:block'>Iniciar sesión</span>
          <HiArrowLeftOnRectangle className='sm:hidden text-[20px]' />
        </Button>
      ) : (
        <Button onClick={async () => {
          await signOut({
            callbackUrl: "/",
          }
          )
        }}>
          <span className='hidden sm:block'>Cerrar sesión</span>
          <HiArrowLeftOnRectangle className='sm:hidden text-[20px]' />
        </Button>
        
      )}
      
      <Image
        src={session?.user?.image || USER_IMAGE}
        width={40}
        height={40}
        alt="Picture of user"
        className='rounded-full'/>
        {/* <p>{session?.user?.email}</p> */}
    </div>
    </div>
  )
}

export default Header