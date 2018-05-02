//Meteor.users = new Meteor.Collection('users_college_info');
import '/both/collections/essays.js';

var collegeId = "gjNFiFtJemKtjnsuC";


import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Schema = {};

Template.registerHelper('Schema', function() {
  return Schema;
});


/*Schema.UserProfile = new SimpleSchema({
    firstName1: {
        type: String,
         //label: 'First Name',
        optional: true
    },
    lastName1: {
        type: String,
               //  label: 'Last Name',

        optional: true
    },
    birthday: {
        type: Date,
               //  label: 'BirthDay',

        optional: true
    }/*,
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    }*/
//});*/


Schema.cotactInformation = new SimpleSchema({
  
 /* profile: {
        type: Schema.UserProfile,
        optional: true
    },*/ firstName: {
        type: String,
         //label: 'First Name',
     },
    lastName: {
        type: String,
               //  label: 'Last Name',

     },
   /* birthday: {
        type: Date,
               //  label: 'BirthDay',

        optional: true
    },*/
     email: {
        type: String,
               //  label: 'BirthDay',

     },  
     phone: {
        type: String,
               //  label: 'BirthDay',

     },
    hearAboutUs:{
    type: String,
    label: 'How did you head about us?'
  },

confirm: {
      type: String,
      label: 'Agree terms?',
        optional: true,

      autoform: {
         type: 'radio'
      }
   },

 /* confirm: {
   

    type: String,
    label: 'Agree terms ',
    autoform: {
        type: "select-radio",
        options: function() {
            return [{
                label: "Yes",
                value: Yes
            }, {
                label: "No",
                value: No
            }];
        }
    }
},
*/
});

Schema.collegeInformation = new SimpleSchema({
  schoolNames:{
    type: String,
    label: ' What school are you applying to with this application?'
  },
  whySchool: {
    type: String,
    label: 'Why do you want to go this school in particular?'
  }/*,
  message:{
    type: String,
    label: 'confirm'
  }*/
});

Schema.essayInformation = new SimpleSchema({
  title:{
    type: String,
    label: 'Title'
  },
  Content: {
    type: String,

    label: 'Content',
    autoform: {
         type: 'textarea',
          id: 'Content'
      }

  
  }
/*approval: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
    autoValue: "false"
  }*//*,
  message:{
    type: String,
    label: 'confirm'
  }*/
});

Schema.essayInformation1 = new SimpleSchema({
  title:{
    type: String,
    label: 'Title'
  },
  Content: {
    type: String,

    label: 'Content',
    autoform: {
         type: 'textarea',
          id: 'Content'
      }

  
  },
  approval:{
    type: String,
    label: 'Title',

  }
/*approval: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden",
      label: false
    },
    autoValue: "false"
  }*//*,
  message:{
    type: String,
    label: 'confirm'
  }*/
});

 
//var data = {};
Essays.attachSchema(Schema.essayInformation1);


UsersCollegeInfo.attachSchema(Schema.collegeInformation);
/*Meteor.users.attachSchema(Schema.confirm);
*/
Meteor.users.attachSchema(Schema.cotactInformation);

Meteor.subscribe("userData");

      Meteor.subscribe("essay", "aa");


/*Template.DashboardPage.events({
  
  'click .open-update-modal': function (e) {
      

      //alert( );
      Session.set("collegeId",this._id);

collegeId = Session.get("collegeId");

        //alert(collegeId );

      data = Meteor.users.findOne(collegeId);

          //  alert(data );

                //$('#insertModal').modal('show');



  }
});*/

Template.DashboardPage.helpers({
            // current_user_data: Users.findOne({_id:Meteor.userId()}, {}),
wizardId : "basic",
   steps: function() {

tinymce.EditorManager.editors = [];
  tinymce.init({
  selector: '#Content',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
      height : "480",
});

   var  dataContact = Meteor.users.findOne({"_id":Meteor.userId()},{ fields: { hearAboutUs: 1, firstName: 1, lastName: 1, email: 1, phone: 1,confirm: 1 }});

       var  dataCollege = UsersCollegeInfo.findOne({"createdBy":Meteor.userId()},{ fields: { schoolNames: 1, whySchool: 1 }});
       var  dataEssay = Essays.findOne({"createdBy":Meteor.userId()},{ fields: { title: 1, Content: 1 }});

    //alert(data);
  //alert(data.profile.name);
       // alert(data.schoolNames);


    return [{
      id: 'information',
      title: 'Contact Information',
      schema: Schema.cotactInformation,
                  data: dataContact,
                   onSubmit: function(data, wizard) {
//alert("222");


Meteor.users.update({"_id":Meteor.userId()},{$set:data},function(error, result){
            if(error){
              console.log(error);
            }else{
              //wizard.clearData();
              wizard.show('co');
             // wizard.next();
              //$('#insertModal').modal('hide');
            }
          });




                   }
    },{
      id: 'co',
      title: 'College Information',
      schema: Schema.collegeInformation,
                  data: dataCollege,

     onSubmit: function(data, wizard) {
//alert(Session   );
               // var a = Meteor.user();
//alert(current_user_data.profile.name);
               // alert(a);
      //  var self = this;
        //var extend =  _.extend(wizard.mergedData(), data);
      /*  if(collegeId == undefined){
        
          Meteor.users.insert(extend, function (error, result) {
            if(error){
              console.log(error);
            }else{
              
              wizard.clearData();
              wizard.show('information');
            }
          });
        }else{*/

          //alert("data"+data);
                    //alert("data.schoolNames"+data.schoolNames);
 //alert("a");

 var  userInCollege = UsersCollegeInfo.findOne({"createdBy":Meteor.userId()});
 alert(userInCollege);
      if(userInCollege){    
       // alert("update------"+userInCollege._id);

   // UsersCollegeInfo.update({"createdBy":Meteor.userId()},{$set:data});

UsersCollegeInfo.update({"_id":userInCollege._id},{$set:data},function(error, result){
            if(error){
             // alert(error);
            }else{
                           // alert("updateddd");

              //wizard.clearData();
              //wizard.show('co');
             wizard.next();
              //$('#insertModal').modal('hide');
            }
          });

          
        }
      
      else{
alert("new");


 UsersCollegeInfo.insert(_.extend({"userId":Meteor.userId()}, data), function(err, id) {
          if (err) {
           
          } else {
           
          }
  });
alert("done");

      }
    }
  }
    ,{
      id: 'essay',
      title: 'Submit Essay ',
      schema: Schema.essayInformation,
                  data: dataEssay,

     onSubmit: function(data, wizard) {
//alert(Session   );
               // var a = Meteor.user();
//alert(current_user_data.profile.name);
               // alert(a);
       // var self = this;
        //var extend =  _.extend(wizard.mergedData(), data);
      /*  if(collegeId == undefined){
        
          Meteor.users.insert(extend, function (error, result) {
            if(error){
              console.log(error);
            }else{
              
              wizard.clearData();
              wizard.show('information');
            }
          });
        }else{*/

          //alert("data"+data);
            //        alert("data.schoolNames"+data.schoolNames);


var  userInEssay = Essays.findOne({"createdBy":Meteor.userId()});
 alert(userInEssay);
      if(userInEssay){    
       // alert("update------"+userInCollege._id);

   // UsersCollegeInfo.update({"createdBy":Meteor.userId()},{$set:data});

Essays.update({"_id":userInEssay._id},{$set:data},function(error, result){
            if(error){
             // alert(error);
            }else{
                           // alert("updateddd");

              //wizard.clearData();
              //wizard.show('co');
             wizard.next();
              //$('#insertModal').modal('hide');
            }
          });

          
        }
      
      else{
alert("new");
data.approval = "Pending";
alert("data.approval------"+data.approval);

 //Essays.insert(_.extend({"userId":Meteor.userId()}, data), function(err, id) {
 Essays.insert(data, function(err, id) {
          if (err) {
           
          } else {
           
          }
        });
      }
      alert("done");
    Router.go("home_dash", {});

  }

     
          
    



      /*}*/
    }]
  },
  books: function(){
    return Meteor.users.find();
  }

  
});


Template.DashboardPage.onRendered(function() {
  

 

  tinymce.EditorManager.editors = [];
  tinymce.init({
  selector: '#Content',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
      height : "480",
});

  
});
    
