var selectedCity;
var selectedPurpose;
var onboardingjs = function(onboardingHTML,app_router) {
    $('head').append(onboardingHTML);
        //console.log($("#onboarding_base").html());
        $("body").html($("#onboarding_base").html());
        $("#location-select-wrapper").on("submit", function(e){
            e.stopPropagation();
            e.preventDefault();
            

            var cityval = $("#select-city").val();
            var purpose = $(this).parent().find("#select-pupose").val();
            console.log(cityval+" "+purpose)
            utils.ajax({url:"/onboarding",
                request_data:{cityname:cityval,pob:purpose},
                type:"POST",
                callback: function(msg){
                    selectedPurpose=purpose;
                    selectedCity=cityval;
                    app_router.navigate( "/searchresults",{trigger: true});
                }
            });
        });
 }