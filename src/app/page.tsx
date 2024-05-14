'use client'

import Image from "next/image";

import Hero from "./components/home/hero";
import Search from "./components/home/search";
import Categories from "./components/home/categories";
import { getFirestore, collection, getDocs, DocumentData } from "firebase/firestore";
import app from "../config/FirebaseConfig"
import { useEffect, useState } from "react";
import Posts from "./components/home/posts";

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

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9 mb-9">
      <Hero />
      <Search />
      {posts? <Posts posts={ posts } /> : null }
    </div>
  );
}
