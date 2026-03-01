let cart = [
  { name: "Shirt", price: 500, quantity: 2 },
  { name: "Shoes", price: 1500, quantity: 1 },
  { name: "Cap", price: 300, quantity: 3 },
];

type CartType = {
  name: string;
  price: number;
  quantity: number;
};
function calculationCart(cart: CartType[]) {
  let totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  console.log(totalPrice);
  const discount = totalPrice > 3000 ? totalPrice * 0.1 : 0;

  return {
    totalPrice,
    discount,
    finalAmount: totalPrice - discount,
  };
}

const result = calculationCart(cart);
console.log(result);
