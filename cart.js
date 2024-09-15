let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addItemToCart(itemId, itemName, itemPrice) {
  const existingItem = cartItems.find(item => item.id === itemId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCart();
}

// Function to remove item from cart
function removeItemFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId); // Filter out the removed item
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCart(); // Update cart after removal
}

// Function to update cart display
function updateCart() {
  const cartItemsHtml = cartItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td>$${item.price * item.quantity}</td>
      <td>
        <button class="btn btn-danger" onclick="removeItemFromCart('${item.id}')">Remove</button>
      </td>
    </tr>
  `).join('');
  document.getElementById('cart-items').innerHTML = cartItemsHtml;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

// Add event listener to checkout button, ensuring it exists
const checkoutButton = document.getElementById('checkout-btn');
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    console.log('Checkout button clicked!');
  });
}

// Update cart display on page load
updateCart();
