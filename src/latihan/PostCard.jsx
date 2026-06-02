import React, { useState } from 'react'

function PostCard({ id, userId, title, body }) {
    const [isClicked, setIsClicked] = useState(false);

    return (
  <div className="
    flex flex-col gap-3 p-4 rounded-lg shadow bg-white
    transition-all duration-300 cursor-pointer
    hover:scale-105 hover:border hover:border-gray-03 hover:bg-pink-100
">
            {}
            <h2 className="text-center font-semibold text-gray-800 capitalize">
                {title}
            </h2>

            {}
            <p className="text-center text-sm text-gray-600 flex-1">
                {body}
            </p>

            {}
            <button
                onClick={() => setIsClicked(true)}
                className={`
                    ${isClicked ? "bg-special-red2" : "bg-gray-01"}
                    hover:brightness-125 text-white p-2 rounded-md
                    transition-all duration-200
                `}
            >
                {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
            </button>
        </div>
    );
}

export default PostCard;