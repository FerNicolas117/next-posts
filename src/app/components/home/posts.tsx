import { useEffect, useState } from "react"
import PostItem from "./postItem"

import { SkeletonPost } from "../skeletonPost";

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

function Posts({ posts } : { posts: Post[] }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga de 3 segundos
    setTimeout(() => {
      if (posts.length) {
        setIsLoading(false);
      }
    }, 500);
  }, [posts]);

  return (
    <div className="mt-12">
      <p className="text-[24px] font-bold text-center">Publicaciones</p>
      {isLoading ? posts.map((_, index) => <SkeletonPost key={index} />) : posts.map((item, index) => <PostItem post={item} key={index} />)}
    </div>
  )
}

export default Posts