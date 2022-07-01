const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCarts: false,
    cartItems: [],
  },
  reducer: {
    showMiniCarts(state) {
      state.showMiniCarts = true;
    },
    hideMiniCarts(state) {
      state.showMiniCarts = false;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      //Check if product is available in cart
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.cartItems[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter((c) => c.id !== idNeedToRemove);
    },
  },
});
const { actions, reducer } = cartSlice;
export const { showMiniCarts, hideMiniCarts } = actions;
export default reducer;
