import React from "react";
import PostCard from "./PostCard";       
import postsData from "./postsData";    

function Exercise() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-6 text-special-red2">
    Post Cards
  </h1>
  <div className="grid grid-cols-5 gap-4 px-4">
    {postsData.map(({ id, userId, title, body }) => (
      <PostCard key={id} id={id} userId={userId} title={title} body={body} />
    ))}
  </div>
</div>
  );
}

export default Exercise;