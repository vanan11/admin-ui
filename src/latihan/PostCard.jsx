import React from 'react'

function PostCard(props) {
const { id, userId, title, body, ...rest } = props;
const [isClicked, setIsClicked] = React.useState(false);

console.log(rest);

    return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-transparent flex flex-col h-full transition-all duration-300 hover:scale-[1.03] hover:border-gray-500 hover:bg-[#fff0f5]">      
    <h3 className="text-lg font-bold text-gray-800 mb-4 capitalize text-center">
        {title}
      </h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow text-center">
        {body}
      </p>

        {Object.entries(rest).map(([key, value]) => (
        <p key={key} className="text-gray-400 text-xs text-center mb-2">
          <span className="font-medium">{key}:</span> {value}
        </p>
      ))} 
      
      <button 
        className={`w-full px-4 py-3 rounded text-white font-bold transition-colors duration-300 ${
          isClicked 
            ? 'bg-special-red2 hover:bg-special-red' 
            : 'bg-gray-500 hover:bg-gray-400'  
        }`}
        onClick={() => setIsClicked(true)}
      >
        {isClicked ? 'Tombol sudah diklik' : 'Silakan Klik'}
      </button>

    </div>
  );
}

export default PostCard;