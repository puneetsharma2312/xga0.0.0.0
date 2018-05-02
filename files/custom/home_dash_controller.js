this.HomeDashController = RouteController.extend({
	template: "HomeDash",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("essay_list"),
					Meteor.subscribe("allUsers")

			
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			essay_list: Essays.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});