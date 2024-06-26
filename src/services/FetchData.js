export async function fetchRestaurants() {
    try {
        const response = await fetch("http://localhost:3001/restaurants");
        const data = await response.json();
        return data.restaurants;
    } catch (error) {
        console.error('Error fetching Restaurants:', error);
        throw error;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:3001/categories");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Categories:', error);
        throw error;
    }
}

export async function fetchRestaurantByCategories(category) {
    try {
        const response = await fetch(`http://localhost:3001/restaurants/category/${category}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Restaurants By Categories:', error);
        throw error;
    }
}

export async function fetchRestaurantById(id) {
    try {
        const response = await fetch(`http://localhost:3001/restaurant/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Restaurant By Id:', error);
        throw error;
    }
}