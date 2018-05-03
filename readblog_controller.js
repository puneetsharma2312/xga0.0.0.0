this.ReadblogController = RouteController.extend({
	template: "Readblog",
	

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
		//var essayId = " Reads value from URL (route param) ";

		var essayId =     localStorage.getItem('essayId');


		var subs = [
			Meteor.subscribe("essay", essayId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		//var essayId = " Reads value from URL (route param) ";

				var essayId =     localStorage.getItem('essayId');



		var data = {
			params: this.params || {},
			essay: Essays.findOne({_id:essayId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});