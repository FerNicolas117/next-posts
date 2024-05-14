import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { HiOutlineCalendar } from "react-icons/hi2"
import { MdOutlineAttachMoney } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
  title: string;
  userimage: string;
  username: string;
  useremail: string;
  desc: string;
  image: string;
  price: number;
  date: string;
}

function PostItem({ post } : { post: Post }) {

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString(); // Formatea la fecha
  const formattedTime = dateObj.toLocaleTimeString(); // Formatea la hora

  return (
    <div className="flex justify-center mt-8">
      <Card className="xl:w-1/2 lg:w-1/2 md:w-full sm:w-full w-full">
        <CardHeader>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={ post.userimage}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="ml-4 font-bold">{ post.username }</p>
            <p className="ml-4 text-gray-600">{ post.useremail }</p>
          </div>
        </div>
          <div className="mb-8">
            <CardTitle  className="mt-3">{ post.title }</CardTitle>
          </div>
            <div className="flex items-center text-[#0069FF] gap-2 mb-2">
              <HiOutlineCalendar className="text-[20px] mt-2" />
              <div className="mt-2">
                { formattedDate } a las { formattedTime }
              </div>
            </div>
            <CardDescription>{ post.useremail }</CardDescription>
        </CardHeader>
        <div className="p-2 justify-items-center">
          <CardContent className="">
            <p>{ post.desc }</p>
          </CardContent>
          <div className="items-center justify-center flex rounded-md ">
            <Image
              src={ post.image }
              alt={ post.title }
              width={400}
              height={400}
              className="rounded-md object-contain h-48 -w-96"/>
          </div>
        </div>
        <CardFooter>
          <div className="mt-8 flex items-center text-[#0069FF]">
            <p className="text-lg font-bold">Precio: </p>
            <MdOutlineAttachMoney className="text-[26px]" />
            <p className="text-[22px] font-bold">{`${post.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}</p>
            {/* <Button className="ml-8 hover:bg-[#21AC38]">
              <Image src={'/whatsapp.svg'} width={22} height={22} alt='Google' className='mr-3'/>
              <span className='hidden sm:block text-white'>Contactar por WhatsApp</span>
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostItem