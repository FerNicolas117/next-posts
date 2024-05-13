import { useEffect } from "react"
import PostItem from "./postItem"

function Posts({ posts }) {

  useEffect(() => {
    console.log("Post: ", posts)
  })

  return (
    <div className="mt-12">
      <p className="text-[24px] font-bold text-center">Publicaciones</p>
      {posts.map((item) => (
        <PostItem post={ item } />
      ))}
    </div>
  )
}

export default Posts