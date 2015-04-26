singleProp = Backbone.Model.extend({
	defaults: {
		agent_id: undefined,
		area: undefined,
		builder_rating: undefined,
		commercial: undefined,
		ethinicity: undefined,
		latitude: undefined,
		location: undefined,
		longitude: undefined,
		name: undefined,
		negotiable: undefined,
		price: undefined,
		roi: undefined,
		score: undefined,
	}
});
 
 allProp = [];
 allProp[0] = new singleProp({
	agent_id: 1,
	area: 2000,
	builder_rating: 3,
	commercial: true,
	ethinicity: "SouthIndian",
	latitude: 77.6428,
	location: "Domlur",
	longitude: 12.9516,
	name: "Alpine",
	negotiable: false,
	price: 3500,
	roi: 3.1,
	score: 0.7365459931328117,

 });

 propCollection = Backbone.Collection.extend({
 	model:singleProp
 });

