import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurantById } from "../../services/FetchData";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("openHours");

  useEffect(() => {
    fetchRestaurantById(id).then((data) => setRestaurant(data));
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
      stars.push(<span key={`empty-${i}`} className="empty-star-detail">&#9734;</span>);
    }
  
    return stars;
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="image-detail" style={{ backgroundImage: `url(${restaurant.photos})` }}></div>
      <div className="content-container">
        <div className="left-content">
          <h2>{restaurant.name}</h2>
          <p className="address">{restaurant.address}</p>
          <p className="category">{restaurant.categories[0]} - $${restaurant.price_range}</p>
        </div>
        <div className="right-content">
          <div className="star-detail">{renderStars(restaurant.rating)}</div>
          <p className="count-reviews">{restaurant.reviews.length} Votes</p>
        </div>
      </div>
      <div className="tabs">
            <button
              className={`tab ${activeTab === "openHours" ? "active" : ""}`}
              onClick={() => handleTabChange("openHours")}
            >
              Open Hours
              {activeTab === "openHours"}
            </button>
            <button
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
              {activeTab === "reviews"}
            </button>
          </div>
          {activeTab === "openHours" && (
            <div className="tab-content">
              {Object.entries(restaurant.open_hours).map(([day, hours]) => (
                <p key={day}><strong>{day}:</strong> {hours}</p>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="tab-content">
              {restaurant.reviews.map((review) => (
                <div key={review.id} className="review">
                  <p><strong>{review.user}</strong> - {review.rating}</p>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
          )}
    </div>
  );
}