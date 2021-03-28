$ (document).ready(function () {
   let form = $('#form_buying_product');
   form.on('submit', function (e) {
       e.preventDefault();
       let nmb = $('#number').val();
       let submit_btn = $('#submit_btn');
       let product_id = submit_btn.data("product_id");
       let name = submit_btn.data("name");
       let price = submit_btn.data("price");

       $('.basket-items ul').append('<li>'+name+', ' + nmb + 'шт. ' + 'по ' + price + 'грн  ' +
            // '<a class="delete-item" href="">x</a>'+
            '</li>');

       let data = {};
       data.product_id = product_id;
       data.nmb = nmb;
       let csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
       data["csrfmiddlewaretoken"] = csrf_token;
       let url = form.attr("action");
       console.log(data);
       $.ajax({
           url: url,
           type: 'POST',
           data: data,
           cache: true,
           success: function (data) {
               console.log("OK");
               console.log(data.products_total_nmb);
               if (data.products_total_nmb) {
                   $('#basket_total_nmb').text('('+data.products_total_nmb+')')
                   console.log(data.products);
                   // удаляем все что есть
                   $('.basket-items ul').html('');
                   // отрисовываем обновленные значения в корзине
                   $.each(data.products, function (k, v) {
                       $('.basket-items ul').append('<li>'+v.name+', ' + v.nmb + 'шт. ' + 'по ' + v.price
                           + '$  ' +
                            // '<a class="delete-item" href="">x</a>'+
                            '</li>');
                   })
               }
           },
           error: function () {
               console.log("Error");
           },
       });

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