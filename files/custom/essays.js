this.Essays = new Mongo.Collection("essays");

this.Essays.userCanInsert = function(userId, doc) {
	return true;
};

this.Essays.userCanUpdate = function(userId, doc) {
	return true;
};

this.Essays.userCanRemove = function(userId, doc) {
	return true;
};

Essays.allow({
  update: function(userId, doc){
    return true;
  }
});

Essays.allow({
  insert: function(userId, doc){
    return true;
  }
});
