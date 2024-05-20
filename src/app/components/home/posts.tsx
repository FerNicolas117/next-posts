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
  price: string;
  date: string;
  tel: string;
}

function Posts({ posts } : { posts: Post[] }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulacion de tiempo de carga
    setTimeout(() => {
      if (posts.length) {
        setIsLoading(false);
      }
    }, 0);
  }, [posts]);

  return (
    <div className="mt-6">
      <p className="text-[24px] font-bold text-center">Publicaciones</p>
      {isLoading ? posts.map((_, index) => <SkeletonPost key={index} />) : posts.map((item, index) => <PostItem post={item} key={index} />)}
    </div>
  )
}

export default Posts