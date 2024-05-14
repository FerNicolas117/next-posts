import { useEffect } from "react"
import PostItem from "./postItem"

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

  useEffect(() => {
    console.log("Post: ", posts)
  })

  return (
    <div className="mt-12">
      <p className="text-[24px] font-bold text-center">Publicaciones</p>
      {posts.map((item, index) => (
        <PostItem post={ item } key={ index } />
      ))}
    </div>
  )
}

export default Posts