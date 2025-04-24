const order = JSON.parse(localStorage.getItem('lastOrder'));

if (!order) {
  document.body.innerHTML = '<p>No recent order found.</p>';
} else {
  document.getElementById('delivery-info').textContent = 
    `Your order will be delivered by: ${order.deliveryDate}`;

  document.getElementById('ordered-items').textContent = 
    `Ordered Item IDs: ${order.items.join(', ')}`;
}
