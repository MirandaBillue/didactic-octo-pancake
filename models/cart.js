const cart = {
    addToCart(menu = null, qty = 1, cart) {
       if(!this.inCart(menu.menu_id, cart)) {
           const men = {
             id: menu.menu_id,
             title: menu.title,
             price: menu.price,
             qty: qty,
             image: menu.image,
             formattedPrice: format.format(menu.price)
           };
           cart.items.push(men);
           this.calculateTotals(cart)
       }
   },

  
  updateCart(ids = [], qtys = [], cart) {
       const map = [];
       const updated = false;

       ids.forEach(id => {
          qtys.forEach(qty => {
             map.push({
                 id: parseInt(id, 10),
                 qty: parseInt(qty, 10)
             });
          });
       });
       map.forEach(obj => {
           cart.items.forEach(item => {
              if(item.id === obj.id) {
                  if(obj.qty > 0 && obj.qty !== item.qty) {
                      item.qty = obj.qty;
                      updated = true;
                  }
              }
           });
       });
       if(updated) {
           this.calculateTotals(cart);
       }
   },

   

module.exports = cart;
