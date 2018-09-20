
$(document).ready(function(){
  $("#login-form").submit(function(e){
    e.preventDefault();
    var $form = $(e.target);
    var $usernameInput = $form.find('input[name="username"]');
    var username = $usernameInput.val();
    console.log(username);
    $.ajax({
      type: "POST",
      url: "/login",
      data: JSON.stringify({username}),
      contentType: "application/json",
      success: function(){
        $usernameInput.val("");
        window.localStorage.setItem("username", username);
      }
    })
  })
})