'use client'

import Image from "next/image";

import Hero from "./components/home/hero";
import Search from "./components/home/search";
import Categories from "./components/home/categories";
import { getFirestore, collection, getDocs, DocumentData, query, where, QuerySnapshot, orderBy, startAt, endAt } from "firebase/firestore";
import app from "../config/FirebaseConfig"
import { useEffect, useState } from "react";
import Posts from "./components/home/posts";
import { Button } from "@/components/ui/button";
import { HiMiniArrowPath } from "react-icons/hi2";
import { toast } from 'sonner'

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

export default function Home() {

  const db = getFirestore(app);
  const  [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost();
  },[])

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsData: Post[] = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data() as unknown as Post; // Cast doc.data() to Post
      postsData.push(postData);
    });
    setPosts(postsData);
  }

  const searchPost = async (searchText: string) => {
    const upperCaseSearchText = searchText.toUpperCase();
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("title"), startAt(upperCaseSearchText), endAt(upperCaseSearchText + "\uf8ff")));
    const postsData: Post[] = [];
    querySnapshot.forEach((doc) => {
      const postData = doc.data() as unknown as Post;
      postsData.push(postData);
    });
    setPosts(postsData);
  }

  const reloadPost = async () => {
    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
    toast.promise(promise, {
      loading: 'Actualizando...',
      success: () => {
       return `Feed actualizado`;
      },
      error: 'Error',
    });
    getPost();
  }

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9 mb-9">
      <Hero />
      <Search onSearch={ searchPost } />
      <div className="flex items-center justify-center">
        <div className="w-1/2 flex justify-center">
        <Button onClick={() => reloadPost()} className="mt-4 bg-white hover:bg-white p-0">
          <HiMiniArrowPath className="text-[18px] text-black" />
          <span className="ml-1.5 text-black">Actualizar feed</span>
        </Button>
        </div>
      </div>
      {posts? <Posts posts={ posts } /> : null }
    </div>
  );
}
