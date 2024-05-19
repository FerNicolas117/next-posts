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

type Post = {
  title: string;
  userimage: string;
  username: string;
  useremail: string;
  desc: string;
  image: string;
  price: number;
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

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9 mb-9">
      <Hero />
      <Search onSearch={ searchPost } />
      <div className="flex items-center justify-center">
        <div className="w-1/2">
        <Button onClick={() => getPost()} className="mt-4 bg-white hover:bg-white">
          <HiMiniArrowPath className="text-[18px] text-black" />
          <span className="ml-1.5 text-black">Actualizar feed</span>
        </Button>
        </div>
      </div>
      {posts? <Posts posts={ posts } /> : null }
    </div>
  );
}
