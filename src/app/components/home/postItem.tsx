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
  price: string;
  date: string;
  tel: string;
}

function PostItem({ post } : { post: Post }) {

  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString(); // Formatea la fecha
  const formattedTime = dateObj.toLocaleTimeString(); // Formatea la hora
  const priceNumberFloat = parseFloat(post.price);
  const preformattedMessage = encodeURIComponent(`Hola, vi tu anuncio en la app web (estlMarket) de la comunidad y me interesa. Me podrías dar más información?%0AEl producto por el que te contacto es: *${post.title}*%0A%0AQuedo atento a tu respuesta. Gracias!%0A%0A*Este mensaje fue generado automáticamente por la app web estlMarket*`);

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
            <div>
              <CardDescription className="mt-2 cursor-pointer flex items-center">
              <a href={`https://wa.me/${post.tel}?text=${preformattedMessage}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gray-200 hover:bg-gray-300">
                  <Image src={'/whatsapp.svg'} width={22} height={22} alt='Google' className='mr-2'/>
                  <span className="text-black">{ post.tel }</span>
                </Button>
              </a>
              </CardDescription>
            </div>
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
            <p className="text-[22px] font-bold">{`${priceNumberFloat.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}</p>
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