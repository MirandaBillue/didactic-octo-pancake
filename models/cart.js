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

   removeFromCart(id = 0, cart) {
       for(const i = 0; i < cart.items.length; i++) {
           const item = cart.items[i];
           if(item.id === id) {
               cart.items.splice(i, 1);
               this.calculateTotals(cart);
           }
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

    inCart(menuID = 0, cart) {
       const found = false;
       cart.items.forEach(item => {
          if(item.id === menuID) {
              found = true;
          }
       });
       return found;
   },

    calculateTotals(cart) {
       cart.totals = 0.00;
       cart.items.forEach(item => {
           const price = item.price;
           const qty = item.qty;
           const amount = price * qty;

           cart.totals += amount;
       });
       this.setFormattedTotals(cart);
   },

   emptyCart(request) {
       
       if(request.session) {
           request.session.cart.items = [];
           request.session.cart.totals = 0.00;
           request.session.cart.formattedTotals = '';
       }


   },

   setFormattedTotals(cart) {
       const totals = cart.totals;
       cart.formattedTotals = format.format(totals);
   }

}


module.exports = cart;