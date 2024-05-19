'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

import app from "../../config/FirebaseConfig"
import { collection, deleteDoc, getDocs, getFirestore, query, where, doc, DocumentData } from 'firebase/firestore';
import { set } from 'react-hook-form';
import PostItem from '../components/home/postItem';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import { get } from 'http';

type Post = {
  title: string;
  userimage: string;
  username: string;
  useremail: string;
  desc: string;
  image: string;
  price: string;
  date: string;
  tel: string;
  // ... any other properties that a Post should have
};


function ProfilePage() {

  const {data:session} = useSession();
  const username = session?.user?.name;
  const email = session?.user?.email;

  const [userPost, setUserPost] = useState<DocumentData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    if(session && session.user && session.user.email){
      getUserPost();
    }
  },[session]);

  const getUserPost = async() => {
    if (session?.user) {
      const q = query(collection(db, "posts"),
      where("useremail", "==", session.user.email))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data=doc.data();
        data.id=doc.id;
        setUserPost(userPost => [...userPost, data]);
      });
    }
  }

  const onDeletePost = async(id: string) => {
    //await deleteDoc(doc(db, "posts", id));
    setSelectedPostId(id);
  }

  const confirmDelete = async () => {
    if (selectedPostId) {
      await deleteDoc(doc(db, 'posts', selectedPostId));
      setOpenDialog(false);
      toast.success('Se ha eliminado la publicación correctamente.')
      /*setTimeout(() => {
        window.location.reload();
      }, 3000);*/
    }
    reaload();
  };

  const reaload = async() => {
    setUserPost([]);
    getUserPost();
  }

  return (
    <div>
      <div className='mt-3 ml-3'>
        <Button className='bg-gray-200 hover:bg-gray-300' onClick={() => router.push('/')}>
          <HiArrowSmallLeft  className='text-[20px] text-black' />
          <span className='text-black text-[16px] ml-2'>Inicio</span>
        </Button>
      </div>
      <div className='px-5 sm:px-7 md:px-10 mt-9 mb-9'>
        <h2 className='xl:text-[35px] lg:text-[30px] md:text-[26px] sm:text-[22px] text-[20px] font-extrabold text-[#0069FF]'>Perfil de usuario</h2>
        <p>Gestiona tus publicaciones</p>

        <div className='mt-4'>
          <p className='font-bold'>{ username }</p>
          <p className='text-gray-500'>{ email }</p>
        </div>

        <div className='justify-center'>
          {userPost.length > 0 ? (
            userPost.map((item) => (
              <div className='' key={item.id}>
                <PostItem post={item as Post} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className='flex justify-center'>
                      <Button className='bg-red-500 hover:bg-red-600 xl:w-1/2 lg:w-1/2 md:w-full sm:w-full w-full mt-2' onClick={() => onDeletePost(item.id)}>
                        Eliminar publicación
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de eliminar esta publicación?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Eliminará permanentemente la publicación.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={confirmDelete}>Eliminar publicación</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          ) : (
            <div className='flex justify-center mt-12'>
              <p className='text-[22px] text-gray-500'>Sin publicaciones</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage