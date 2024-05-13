import CategoriesList from "@/app/Data";
import { useEffect, useState } from "react"
import Image from "next/image";

function Categories() {

  const [categories, setCategories] = useState<{
    id: number;
    name: string;
    image: string;
  }[]>([]);

  useEffect(() => {
    setCategories(CategoriesList)
  },[])

  return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 mt-4">
        {categories.map((item) => (
          <div key={item.id} className="flex flex-col items-center cursor-pointer">
          {item.image && <Image src={item.image} alt={item.name} width={45} height={45} className="hover:animate-bounce transition-all duration-150" />}
          {<h2 className="text-[14px] text-center">{item.name}</h2>}
        </div>
        ))}
      </div>
  )
}

export default Categories