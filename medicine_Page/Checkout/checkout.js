const form = document.getElementById('checkout-form');

form.addEventListener('submit',async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  // Load bag items
  let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

  // Generate delivery date
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);
  const deliveryDateStr = deliveryDate.toISOString().split('T')[0]; // YYYY-MM-DD

   // Create order object
   const order = {
    ...userData,
    items: bagItems,
    deliveryDate: deliveryDateStr,
  };

  try {
    const response = await fetch('../../php/placeOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (response.ok) {
      // Save order locally for order-confirmation page (optional)
      localStorage.setItem('lastOrder', JSON.stringify(order));

      // Clear cart
      localStorage.removeItem('bagItems');

      // Redirect to order confirmation
      window.location.href = 'order-conf.html';
    } else {
      alert('Failed to place order. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});
