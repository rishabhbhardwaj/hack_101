var surveyView = {};
surveyView.init = function() {
	singleSurveyView = Backbone.View.extend({

		tagName:'div',
		className: 'row',
		template: _.template($("#surveyElement").html()),

		render: function () {
			var surveyTemplate = this.template(this.model.toJSON());
			this.$el.html(surveyTemplate);
			return this;
		}
	});

	allSurveyView = Backbone.View.extend({
		tagName: 'div',
		className:'large-12 columns survey-wrapper',
		initialize: function(){
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'remove', this.render);
			this.listenTo(this.collection, 'change', this.render);
		},
		clear: function(){
		},
		render: function(){
			this.clear();
			this.$el.empty();
			this.collection.each(this.addSurvey,this);
			console.log(this.el);
			$("#survey-listings").html(this.el);
			return this;
		},
		addSurvey: function(survey){
			var surveyView = new singleSurveyView({model : survey});
			this.$el.append(surveyView.render().el);
		}
	});
}

