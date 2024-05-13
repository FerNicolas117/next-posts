'use client'

import Image from "next/image";

import Hero from "./components/home/hero";
import Search from "./components/home/search";
import Categories from "./components/home/categories";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../config/FirebaseConfig"
import { useEffect, useState } from "react";
import Posts from "./components/home/posts";

export default function Home() {

  const db = getFirestore(app);
  const  [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  },[])

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      setPosts(posts => [...posts, doc.data()]);
    });
  }

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9">
      <Hero />
      <Search />
      {posts? <Posts posts={ posts } /> : null }
    </div>
  );
}
