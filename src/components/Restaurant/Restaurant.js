import React, { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import { fetchRestaurants, fetchRestaurantByCategories, fetchCategories } from "../../services/FetchData";
import CardRestaurant from "../Card/CardRestaurant";
import 'react-dropdown/style.css';
import "./Restaurant.css";

export default function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visibleRestaurants, setVisibleRestaurants] = useState(8);
    const [filterOpenNow, setFilterOpenNow] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories().then((data) => setCategories(data.map(category => ({ value: category, label: category }))));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchRestaurantByCategories(selectedCategory).then((data) => setRestaurants(data));
        }
        else {
            fetchRestaurants().then((data) => setRestaurants(data));
        }
    }, [selectedCategory]);
    
    const loadMoreRestaurants = () => {
        setVisibleRestaurants(prevVisibleRestaurants => prevVisibleRestaurants + 8);
    };

    const handleOpenNowFilter = () => {
        setFilterOpenNow(!filterOpenNow);
    };

    const handlePriceChange = (option) => {
        setSelectedPrice(option.value);
    };

    const handleCategoryChange = (option) => {
        setSelectedCategory(option.value);
    };

    const handleClearAll = () => {
        setFilterOpenNow(false);
        setSelectedPrice(null);
        setSelectedCategory(null);
    };
    
    const getPriceSortOrder = (priceRange) => {
        switch (priceRange) {
            case "lowToHigh":
                return 1;
            case "highToLow":
                return -1;
            default:
                return 0;
        }
    };

    const sortedRestaurants = restaurants.length > 0 ? restaurants
    .filter(restaurant => !filterOpenNow || restaurant.open_now)
    .sort((a, b) => {
        if (!selectedPrice) return 0;
        const priceSortOrder = getPriceSortOrder(selectedPrice);
        return priceSortOrder * (a.price_range - b.price_range);
    }) : [];

    return (
        <div>
            <div className="filter-section">
                <div className="left-section">
                    <p>Filter By:</p>
                    <div>
                        <input type="radio" id="openNow" name="openNow" value="openNow" onClick={handleOpenNowFilter} onChange={handleOpenNowFilter} checked={filterOpenNow}/>
                        <label htmlFor="openNow">Open Now</label>
                    </div>
                    <div>
                        <Dropdown
                            options={[
                                { value: "lowToHigh", label: "Lowest to Highest" },
                                { value: "highToLow", label: "Highest to Lowest" }
                            ]}
                            onChange={handlePriceChange}
                            placeholder="Select Price"
                        />
                    </div>
                    <div>
                        <Dropdown
                            options={categories}
                            onChange={handleCategoryChange}
                            placeholder="Select Category"
                        />
                    </div>
                </div>
                <div className="right-section">
                    <div className="clear-all-button-container">
                        <button className="clear-all-button" onClick={handleClearAll}>CLEAR ALL</button>
                    </div>
                </div>
            </div>
            
            <div className="restaurant-title-section">
                <h1>All Restaurants</h1>
            </div>

            <div className="card-section">
                {restaurants.length > 0 && sortedRestaurants
                    .slice(0, visibleRestaurants)
                    .map((restaurant) => (
                        <CardRestaurant
                            key={restaurant.id}
                            id={restaurant.id}
                            name={restaurant.name}
                            rating={restaurant.rating}
                            image={restaurant.photos}
                            category={restaurant.categories[0]}
                            price={restaurant.price_range}
                            open_now={restaurant.open_now}
                        />
                    ))}
            </div>

            {visibleRestaurants < sortedRestaurants.length && (
                <div className="load-more-button-container">
                    <button className="load-more-button" onClick={loadMoreRestaurants}>LOAD MORE</button>
                </div>
            )}
        </div>
    );
}