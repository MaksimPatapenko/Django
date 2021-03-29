$ (document).ready(function () {
   let form = $('#form_buying_product');

   function basketUpdating(product_id, nmb, is_delete){
       let data = {};
       data.product_id = product_id;
       data.nmb = nmb;
       let csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
       data["csrfmiddlewaretoken"] = csrf_token;

       if (is_delete){
            data["is_delete"] = true;
        }

       let url = form.attr("action");

       console.log(data);
       $.ajax({
           url: url,
           type: 'POST',
           data: data,
           cache: true,
           success: function (data) {
               console.log("OK");
               if (data.products_total_nmb || data.products_total_nmb == 0) {
                   $('#basket_total_nmb').text('('+data.products_total_nmb+')')
                   console.log(data.products);
                   // удаляем все что есть
                   $('.basket-items ul').html('');
                   // отрисовываем обновленные значения в корзине
                   $.each(data.products, function (k, v) {
                       $('.basket-items ul').append('<li>'+v.name+', ' + v.nmb + 'шт. ' + 'по ' + v.price
                           + '$  ' +
                            '<a class="delete-item" href="" data-product_id="'+v.id+'">x</a>'+
                            '</li>');
                   })
               }
           },
           error: function () {
               console.log("Error");
           },
       });
   }

   form.on('submit', function (e) {
       e.preventDefault();
       let nmb = $('#number').val();
       let submit_btn = $('#submit_btn');
       let product_id = submit_btn.data("product_id");
       let name = submit_btn.data("name");
       let price = submit_btn.data("price");

       basketUpdating(product_id, nmb, false)

   });

   function showingBasket(){
       $('.basket-items').removeClass('hidden');
   }

   // $('.basket-container').on('click', function (e) {
   //     e.preventDefault();
   //     showingBasket();
   // });

   $('.basket-container').mouseover(function(){
       showingBasket();
   });

   //  $('.basket-container').mouseout(function(){
   //     showingBasket()
   // });

    $(document).on('click', '.delete-item', function (e) {
        e.preventDefault();
        product_id = $(this).data("product_id");
        nmb = 0;
        basketUpdating(product_id, nmb, true);
    });

    function calculatingBasketAmount() {
        let total_order_amount = 0;
        $('.total-product-in-basket-amount').each(function () {
            total_order_amount += parseFloat($(this).text());
        });
        $('#total_order_amount').text(total_order_amount.toFixed(2));
    };

    $(document).on('change', ".product-in-basket-number", function () {
        let current_nmb = $(this).val();
        let current_tr = $(this).closest('tr');
        let current_price = parseFloat(current_tr.find('.product-price').text()).toFixed(2);
        let total_amount = parseFloat(current_nmb*current_price).toFixed(2);
        current_tr.find('.total-product-in-basket-amount').text(total_amount);

        calculatingBasketAmount();

    });

    calculatingBasketAmount();

});