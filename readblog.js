Template.Readblog.onCreated(function() {
	
});

Template.Readblog.onDestroyed(function() {
	
});

Template.Readblog.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Readblog.events({
	
});

Template.Readblog.helpers({

	 theEnemy() {
    return Session.get('essayId');
  }
	
});

Template.ReadblogReadblogComponent.events({

});

Template.ReadblogReadblogComponent.helpers({

	theEnemy() {
    //return Session.get('essayId');
    localStorage.getItem('essayId');
  }

});
