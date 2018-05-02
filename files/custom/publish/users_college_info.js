Meteor.publish("college_list", function() {
	return UsersCollegeInfo.find({}, {});
});

Meteor.publish("colleges_null", function() {
	return UsersCollegeInfo.find({_id:null}, {});
});

Meteor.publish("college", function(collegeId) {
	return UsersCollegeInfo.find({_id:collegeId}, {});
});

Meteor.publish('userData', function() {
   
  return Meteor.users.find(this.userId, {fields: {
    schoolNames: 1, firstName: 1, lastName: 1, email: 1,phone: 1, whySchool: 1
  }});
})

Meteor.publish('allUsers', function() {
   return Meteor.users.find({}, {fields:{username:1,emails:1}})
 })

