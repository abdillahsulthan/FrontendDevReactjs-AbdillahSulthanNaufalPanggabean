import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardRestaurant.css";

export default function CardRestaurant({ image, name, rating, category, price, open_now, id }) {

  const navigate = useNavigate();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    if (halfStar) {
      stars.push(<span key="half">&#9733;&#189;</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="empty-star">&#9734;</span>);
    }

    return stars;
  };

  const renderOpenStatus = (open_now) => {
    return open_now ? (
      <p className="open">OPEN NOW</p>
    ) : (
      <p className="closed">CLOSED</p>
    );
  };

  const handleLearnMore = (id) => {
    navigate(`/detail/${id}`);
  };
  
  return (
    <div className="card">
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="content">
        <h2>{name}</h2>
        <div className="star">{renderStars(rating)}</div>
        <div className="additional-info">
          <div className="info-left">
            <p>{category} - $${price}</p>
          </div>
          <div className="info-right">
            {renderOpenStatus(open_now)}
          </div>
        </div>
        <button className="learn-more" onClick={() => handleLearnMore(id)}>LEARN MORE</button>
      </div>
    </div>
  );
}
