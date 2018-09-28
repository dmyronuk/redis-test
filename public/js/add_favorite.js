$(document).ready(function(){

  $(".favorite-button").click(function(e){
    var $product = $(e.target).closest(".product");
    data = {
      sku: $product.attr("sku"),
    }

    $.ajax({
      type: "POST",
      url: "/favorites",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function(){
        $(e.target).removeClass("grayscale");
        console.log("success");
      }
    })
  })
})
