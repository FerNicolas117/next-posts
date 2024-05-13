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

function PostItem({ post }) {

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString(); // Formatea la fecha
  const formattedTime = dateObj.toLocaleTimeString(); // Formatea la hora

  return (
    <div className="flex justify-center mt-8">
      <Card className="w-1/2">
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
          <br></br>
          <CardTitle>{ post.title }</CardTitle>
          <br></br>
          <div className="mt-8 flex items-center text-[#0069FF] gap-2 mb-2">
            <HiOutlineCalendar className="text-[20px]" />
            { formattedDate } a las { formattedTime }
          </div>
          <CardDescription>{ post.useremail }</CardDescription>
        </CardHeader>
        <div className="flex items-center">
          <CardContent className="w-2/3">
            <p>{ post.desc }</p>
          </CardContent>
          <div className="w-1/3 items-center justify-center flex bg-gray-200 rounded-md mr-6 min-h-32 max-h-64 max-w-2xl">
            <Image
              src={ post.image }
              alt={ post.title }
              width={200}
              height={200}
              className="rounded-md object-cover h-full w-full"/>
          </div>
        </div>
        <CardFooter>
          <div className="mt-8 flex items-center text-[#0069FF] mb-2">
            <MdOutlineAttachMoney className="text-[26px]" />
            <p className="text-[22px] font-bold">{`${post.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}</p>
          </div>
        </CardFooter>
        <Button className="ml-8 mb-6">Contactar por WhatsApp</Button>
      </Card>
    </div>
  )
}

export default PostItem