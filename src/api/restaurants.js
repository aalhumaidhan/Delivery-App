import instance from ".";

const getAllCategories = async () => {
  const { data } = await instance.get("/category");
  return data;
};

const getAllRestaurants = async () => {
  const { data } = await instance.get("/resturant");
  return data;
};

const getRestaurantMenuItems = async (restaurantId) => {
  const { data } = await instance.get(
    `https://react-native-food-delivery-be.eapi.joincoded.com/api/resturant/${restaurantId}/items`
  );
  return data;
};

const getMenuItemById = async (foodId) => {
  const { data } = await instance.get(
    `https://react-native-food-delivery-be.eapi.joincoded.com/api/item/${foodId}`
  );
  return data;
};

export {
  getAllCategories,
  getAllRestaurants,
  getRestaurantMenuItems,
  getMenuItemById,
};
