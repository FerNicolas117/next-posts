import React from 'react'
import PostItem from './postItem'

interface Post {
  title: string;
  userimage: string;
  username: string;
  useremail: string;
  desc: string;
  image: string;
  price: number;
  date: string;
  tel: string;
}

function PostModal({ post } : { post: Post }) {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <PostItem post={ post } />
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default PostModal