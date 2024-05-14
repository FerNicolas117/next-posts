'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

import app from "../../config/FirebaseConfig"
import { collection, deleteDoc, getDocs, getFirestore, query, where, doc } from 'firebase/firestore';
import { set } from 'react-hook-form';
import PostItem from '../components/home/postItem';
import { Button } from '@/components/ui/button';

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


function ProfilePage() {

  const {data:session} = useSession();
  const [userPost, setUserPost] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    if(session && session.user && session.user.email){
      getUserPost();
    }
  },[session]);

  const getUserPost = async() => {
    const q = query(collection(db, "posts"),
    where("useremail", "==", session?.user.email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data=doc.data();
      data.id=doc.id;
      setUserPost(userPost => [...userPost, data]);
    });
  }

  const onDeletePost = async(id) => {
    //await deleteDoc(doc(db, "posts", id));
    setSelectedPostId(id);
  }

  const confirmDelete = async () => {
    await deleteDoc(doc(db, 'posts', selectedPostId));
    setOpenDialog(false);
    toast.success('Se ha eliminado la publicación correctamente.')
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

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
        <div className='justify-center'>
          {userPost && userPost?.map((item) => (
            <div className='' key={item.id}>
              <PostItem post={item} />
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage