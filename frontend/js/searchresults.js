var searchresultsjs = function(searchresultsHTML,app_router) {
  
    $('head').append(searchresultsHTML);
    $("body").html($("#searchresults_base").html());
    surveyView.init();
    propView.init();
    surveyGroup = new surveyCollection(allSurvey);
    surveyGroupView = new allSurveyView({collection : surveyGroup});
    var allProp = [];
    var firstListings = function(id,option) {
                if(!id) {
                    id=1;
                 
                    option=selectedPurpose ?selectedPurpose:'commercial';
                }
                utils.ajax({url:"/fetchlistings",
                        request_data:{quesid:id,option:option},
                        type:"POST",
                        callback: function(msg){
                            console.log(msg);
                            count =0;
                            allProp = [];
                            for(prop in msg.result){
                                allProp[prop-1] = new singleProp({
                                id:prop,
                                agent_id: msg.result[prop].agent_id,
                                area: msg.result[prop].area,
                                builder_rating: msg.result[prop].builder_rating,
                                commercial: msg.result[prop].commercial,
                                ethinicity: msg.result[prop].ethinicity,
                                latitude: msg.result[prop].latitude,
                                location: msg.result[prop].location,
                                longitude: msg.result[prop].longitude,
                                name: msg.result[prop].name,
                                negotiable: msg.result[prop].negotiable,
                                price: msg.result[prop].price,
                                roi: msg.result[prop].roi,

                             });
                            }
                                propGroup = new propCollection(allProp);
                                propGroupView = new allPropView({collection : propGroup})
                                propGroupView.render();
                                propGroup.reset(allProp)

                                $(".prop-wrapper").on("click",".single-prop",function(e){
                                    e.stopPropagation();
                                    e.preventDefault();
                                    var prop_id = $(this).attr("prop-id");
                                    allExProp=allProp[prop_id]
                                    expropGroup = new propCollection(allExProp);
                                    expropGroupView = new allExPropView({collection : expropGroup})
                                    expropGroupView.render();
                                    expropGroup.reset(allExProp)
                                    console.log("Hello listing click "+prop_id)
                                    utils.ajax({url:"/clickupdatescore",
                                        request_data:{propid:prop_id},
                                        type:"POST",
                                        callback: function(msg){
                                            console.log(msg.result)
                                        }
                                    });
                                }); 

                                $(".prop-wrapper").on("click",".shortlist",function(e){
                                    e.stopPropagation();
                                    e.preventDefault();
                                    var prop_id = $(this).attr("prop-id");
                                    allExProp=allProp[prop_id]
                                    if($(this).css("color") != 'rgb(212, 20, 100)'){
                                        $(this).css({"color":"#D41464"});
                                    }
                                    else{
                                        $(this).css({"color":"black"});
                                    }
                                    
                                    console.log("Hello listing click "+prop_id)
                                    // utils.ajax({url:"/clickupdatescore",
                                    //     request_data:{propid:prop_id},
                                    //     type:"POST",
                                    //     callback: function(msg){
                                    //         console.log(msg.result)
                                    //     }
                                    // });
                                }); 
                        }
                });
            }
   

    var fetchSurvey = function(id) {

         if(!id) {
                    id=1;
                }
        console.log("In fetchsurvey :: "+id)
        utils.ajax({url:"/fetchsurvey",
                        request_data:{id:id},
                        type:"POST",
                        callback: function(msg){
                            count =0;
                            allSurvey = [];
                                allSurvey[count++] = new singleSurvey({
                                id: msg.id,
                                question:msg.question,
                                option_one:msg.option1,
                                option_two:msg.option2,
                                option_three:msg.option3,
                                option_four:msg.option4
                             });
                                console.log(allSurvey);
                                surveyGroupView.render();
                                surveyGroup.reset(allSurvey)
                                firstListings();

                                 $("#survey-question-form").on("submit",function(e){
                                    e.stopPropagation();
                                    e.preventDefault();
                                    var surveyid = $(this).parent().attr("survey-id");
                                    var optVal = $("input[name=option]:checked").val()

                                   
                                    var newsurveyid= parseInt(surveyid)+1;
                             
                                    console.log("INFO : "+ surveyid,optVal)
                                    firstListings(surveyid,optVal);
                                   
                                    fetchSurvey(newsurveyid);
                                    console.log("question changed")
                                });     
                                
                               
                        }
                });
    }
    fetchSurvey();        
}   