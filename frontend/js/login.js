var loginjs = function(loginHTML,app_router) {
    $('head').append(loginHTML);
    $("body").html($("#login_base").html());


     $("#sign-up-manual").on("submit", function(e){
            e.stopPropagation();
            e.preventDefault();
      
            email = $("#sign-up-email").val();
            password = $("#sign-up-password").val();
            utils.ajax({url:"/login",
                request_data:{email:email,password:password},
                type:"POST",
                callback: function(msg) {
                	console.log(msg);
                	if(msg.result=="success") {
                		 app_router.navigate( "/onboarding",{trigger: true});
                	}
                	else {

                	}
                }
            });
            
        });

        
}