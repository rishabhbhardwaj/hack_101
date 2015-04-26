var propView = {};
propView.init = function() {
	singlePropView = Backbone.View.extend({

		tagName:'div',
		className: 'row',
		template: _.template($("#propElement").html()),

		render: function () {
			var propTemplate = this.template(this.model.toJSON());
			this.$el.html(propTemplate);
			return this;
		}
	});

	allPropView = Backbone.View.extend({
		tagName: 'div',
		className:'large-12 columns prop-wrapper',
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
			this.collection.each(this.addProp,this);
			console.log(this.el);
			$("#property-listings").html(this.el);
			return this;
		},
		addProp: function(prop){
			var propView = new singlePropView({model : prop});
			this.$el.append(propView.render().el);
		}
	});

	singleExPropView = Backbone.View.extend({

		tagName:'div',
		className: 'row',
		template: _.template($("#expropElement").html()),

		render: function () {
			var expropTemplate = this.template(this.model.toJSON());
			this.$el.html(expropTemplate);
			return this;
		}
	});

	allExPropView = Backbone.View.extend({
		tagName: 'div',
		className:'large-12 columns prop-wrapper',
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
			this.collection.each(this.addExProp,this);
			console.log(this.el);
			$("#property-listing-expanded").html(this.el);
			return this;
		},
		addExProp: function(prop){
			var expropView = new singleExPropView({model : prop});
			this.$el.append(expropView.render().el);
		}
	});
}

