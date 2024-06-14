import React from "react";

export const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h4>{title}</h4>
      <p>{description}</p>

      <style jsx>{`
        .card {
          width: 200px;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: center;
          background-color: #fff;
        }

        .card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .card h4 {
          margin: 0.5rem 0;
        }

        .card p {
          color: #555;
        }
      `}</style>
    </div>
  );
};
