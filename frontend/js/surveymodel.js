singleSurvey = Backbone.Model.extend({
	defaults: {
		id: 1,
	question:undefined,
	option_one:undefined,
	option_two:undefined,
	option_three:undefined,
	option_four:undefined
	}
});
 
 allSurvey = [];
 allSurvey[0] = new singleSurvey({
	id: 1,
	question:"Do you have pets",
	option_one:"yes",
	option_two:"no",
	option_three:undefined,
	option_four:undefined
 });

 surveyCollection = Backbone.Collection.extend({
 	model:singleSurvey
 });

