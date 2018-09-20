$(document).ready(function(){

  $(".favorite-button").click(function(e){
    var $product = $(e.target).closest(".product");
    var imgURL = $product.find(".product-img").attr("src");

    data = {
      name: $product.attr("name"),
      price: $product.attr("price"),
      sku: $product.attr("sku"),
      imgURL,
    }

    $.ajax({
      type: "POST",
      url: "/favorites",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function(){
        console.log("success");
      }
    })
  })
})
