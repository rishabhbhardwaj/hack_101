var signupjs = function(signupHTML,app_router) {
    $('head').append(signupHTML);
        $("body").html($("#signup_base").html());

     $("#sign-up-manual").on("submit", function(e){
            e.stopPropagation();
            e.preventDefault();
            
            name = $("#sign-up-name").val();
            email = $("#sign-up-email").val();
            password = $("#sign-up-password").val();
            utils.ajax({url:"/signup",
                request_data:{name:name,email:email,password:password},
                type:"POST"
            });
             app_router.navigate( "/login",{trigger: true});
        });
}