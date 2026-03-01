let cart = [
  { id: 1, name: "Shirt", price: 500, quantity: 2 },
  { id: 2, name: "Cap", price: 300, quantity: 3 },
  { id: 3, name: "Shoes", price: 1500, quantity: 1 },
  { id: 2, name: "Cap", price: 300, quantity: 3 },
];

type CartType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function removeDuplicate(cart: CartType[]) {
  const uniqueCart = [];
  const seenIds = new Set();

  for (const item of cart) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueCart.push(item);
    }
  }

  console.log(uniqueCart);
}

removeDuplicate(cart);
