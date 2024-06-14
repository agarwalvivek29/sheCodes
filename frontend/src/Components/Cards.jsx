import React from 'react';

const Cards = ({ cards }) => {
  return (
    <div className="flex gap-4">
      {cards.map((card, index) => (
        <div key={index} className="relative w-52 h-36 overflow-hidden rounded-lg">
          <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-500">
            <span className="text-white text-center">{card.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
