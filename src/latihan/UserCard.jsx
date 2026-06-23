import React from 'react'

function UserCard(props) {
const { name, email, street, city, ...rest } = props;
const [isClicked, setIsClicked] = React.useState(false);

console.log(rest);

   return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {name}
        </h2>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> 
        {email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Address:</span> 
        {street}, {city}
      </p>

      {Object.entries(rest).map(([key, value]) => (
        <p key={key} className="text-gray-600">
          <span className="font-medium">{key}:</span> {value}
        </p>
      ))}

      <button className={isClicked ? 'bg-special-green text-white px-4 py-2 rounded md' : 'bg-gray-01 text-white px-4 py-2 rounded md'}
      onClick={() => setIsClicked(true)}>
      {isClicked ? 'Clicked!' : 'Click Me'}
      </button>
    </div>
  );
}

export default UserCard;