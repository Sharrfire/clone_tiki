import userReducer from '../features/Auth/components/userSlice';
import cardReducer from '../features/Cart/cartSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  user: userReducer,
  cart: cardReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
