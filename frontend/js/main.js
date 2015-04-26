require(
    [
        "../bower_components/jquery/dst/jquery.min.js",
        "../bower_components/foundation/js/foundation.js",
        "../node_modules/backbone/node_modules/underscore/underscore.js",
        "../node_modules/backbone/backbone.js",
        "utils",
        "../node_modules/requirejs-text/text!../app/templates/signup.html",
        "signup",
        "../node_modules/requirejs-text/text!../app/templates/login.html",
        "login",
        "../node_modules/requirejs-text/text!../app/templates/partials/header.html",
        "../node_modules/requirejs-text/text!../app/templates/onboarding.html",
        "onboarding",
        "../node_modules/requirejs-text/text!../app/templates/searchresults.html",
        "searchresults",
        "propmodel",
        "propview",,
        "surveymodel",
        "surveyview",

    ],
    function( _jquery_, _foundation_,_underscore_,_backbone_,_utils_,signupHTML,_signup_,loginHTML,_login_,headerHTML,
        onboardingHTML,_onboarding_,searchresultsHTML,_searchresults_,_propmodel_,_propview_,_surveymodel_,_surveyview_){
    var AppRouter = Backbone.Router.extend({
        routes: {
            "signup(/)": "signupRoute", 
            "login(/)": "loginRoute", 
            "onboarding(/)": "onboardingRoute",
            "searchresults(/)": "searchresultsRoute",
        }
    });
    
    // Initiate the router
    var app_router = new AppRouter;

    app_router.on('route:signupRoute', function(actions) {
        console.log("in signup route");
        signupjs(signupHTML,app_router);
    });

    app_router.on('route:loginRoute', function(actions) {
        console.log("in login route");
        loginjs(loginHTML,app_router);
    });

    app_router.on('route:onboardingRoute', function(actions) {
        console.log("in onboarding route");
        onboardingjs(onboardingHTML,app_router);
    });

    app_router.on('route:searchresultsRoute', function(actions) {
        console.log("in searchresults route");
        searchresultsjs(searchresultsHTML,app_router);
    });

    Backbone.history.start();

    $(document).on('click', 'a[data-backbone]', function(e){
        e.preventDefault();
        app_router.navigate( $(this).attr('href'),{trigger: true});
    });
    
    }
 

);