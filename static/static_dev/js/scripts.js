$ (document).ready(function () {
   let form = $('#form_buying_product');
   console.log(form);
   form.on('submit', function (e) {
       e.preventDefault();
       console.log('123');
       let nmb = $('#number').val();
       console.log(nmb);
       let submit_btn = $('#submit_btn');
       let product_id = submit_btn.data("product_id");
       let name = submit_btn.data("name");
       let price = submit_btn.data("price");
       console.log(submit_btn);
       console.log(product_id);
       console.log(name);
       console.log(price);

       $('.basket-items ul').append('<li>'+name+', ' + nmb + 'шт. ' + 'по ' + price + 'грн  ' +
            '<a class="delete-item" href="">x</a>'+
            '</li>');

   });

   function showingBasket(){
       $('.basket-items').removeClass('hidden');
   }

   $('.basket-container').on('click', function (e) {
       e.preventDefault();
       showingBasket()
   });

   $('.basket-container').mouseover(function(){
       showingBasket()
   });

   //  $('.basket-container').mouseout(function(){
   //     showingBasket()
   // });

    $(document).on('click', '.delete-item', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();
    })

});