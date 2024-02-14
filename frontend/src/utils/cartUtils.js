export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculate items price
  // reduce funciton: we set at 0 for the accumulator and then we start to add price and qty together, it will loop through
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  //Calculate shipping price ( if order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //Calculate tax price (15%)

  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
