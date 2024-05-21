import React from 'react'

import Image from 'next/image'
import { MdOutlineAttachMoney } from 'react-icons/md'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Post {
  title: string;
  userimage: string;
  username: string;
  useremail: string;
  desc: string;
  image: string;
  price: string;
  date: string;
  tel: string;
}

function PostProfile({ post } : { post: Post }) {

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString(); // Formatea la fecha
  const formattedTime = dateObj.toLocaleTimeString(); // Formatea la hora
  const priceNumberFloat = parseFloat(post.price);

  return (
    <div className='flex justify-center'>
      <Card className='xl:w-1/2 lg:w-1/2 md:w-full sm:w-full w-full'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base'>{ post.title }</CardTitle>
          <div className='flex items-center'>
            <div className="text-sm text-gray-500 w-4/5">
              { formattedDate } a las { formattedTime }
              <CardDescription className='text-sm'>Teléfono de contacto: { post.tel }</CardDescription>
            </div>
            <div className='w-1/5 flex justify-end'>
              <Image src={ post.image } alt={ post.title } width={60} height={60}
                className='rounded'/>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pb-2'>
          <div className=''>
            <p style={{ wordBreak: 'break-word'}}>{ post.desc }</p>
          </div>
        </CardContent>
        <CardFooter>
          <p>Precio establecido: ${`${priceNumberFloat.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostProfile