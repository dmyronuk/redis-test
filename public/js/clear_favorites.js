$(document).ready(function(){
  $(".clear-favorites").click(function(e){
    $.ajax({
      type: "POST",
      url: "favorites/delete",
      success: function(){
        console.log("removed");
        $(".product").remove();
      }
    })
  })
})
