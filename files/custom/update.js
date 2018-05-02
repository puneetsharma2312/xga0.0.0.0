var pageSession = new ReactiveDict();

Template.EssaysUpdate.onCreated(function() {
	
});

Template.EssaysUpdate.onDestroyed(function() {
	
});

Template.EssaysUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EssaysUpdate.events({
	
});

Template.EssaysUpdate.helpers({
	
});

Template.EssaysUpdateForm.onCreated(function() {
	
});

Template.EssaysUpdateForm.onDestroyed(function() {
	
});

Template.EssaysUpdateForm.onRendered(function() {
	

	pageSession.set("essaysUpdateFormInfoMessage", "");
	pageSession.set("essaysUpdateFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	tinymce.EditorManager.editors = [];
  tinymce.init({
  selector: '#Content',
  skin_url: '/packages/teamon_tinymce/skins/lightgray',
      height : "480",
});

  

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.EssaysUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("essaysUpdateFormInfoMessage", "");
		pageSession.set("essaysUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var essaysUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(essaysUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("essaysUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("essays", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("essaysUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("essaysUpdate", t.data.essay._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("essays", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EssaysUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("essaysUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("essaysUpdateFormErrorMessage");
	}
	
});
