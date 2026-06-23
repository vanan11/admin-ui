import React, { useEffect,useState } from "react";
import PostCard from "./PostCard";
import { getPosts } from "./Services";

function Exercise() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("[Component] Gagal menampilkan data:", error.message);
    }
  };
  fetchData();
}, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-8 md:px-16">
        <h1 className="text-3xl font-bold text-center mb-6 text-special-red2">  
          Posts Cards.  
        </h1> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
                  {posts.map((post) => (  
                <PostCard key={post.id} {...post} />  
            ))}
        </div>
      </div>
    </>
  );
}

export default Exercise;    