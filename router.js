Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"essays",
	"essays.details",
	"essays.insert",
	"essays.update",
	"customers",
	"customers.insert",
	"customers.details",
	"customers.edit",
	"invoices",
	"invoices.insert",
	"invoices.details",
	"invoices.details.items",
	"invoices.details.insert",
	"invoices.details.edit",
	"invoices.edit",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

Router.freeRoutes = [
	"home_public",
	"readblog"
];

Router.roleMap = [
	{ route: "invoices",	roles: ["admin"] },
	{ route: "invoices.insert",	roles: ["admin"] },
	{ route: "invoices.details",	roles: ["admin"] },
	{ route: "invoices.details.items",	roles: ["admin"] },
	{ route: "invoices.details.insert",	roles: ["admin"] },
	{ route: "invoices.details.edit",	roles: ["admin"] },
	{ route: "invoices.edit",	roles: ["admin"] },
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "login";
Router.defaultPrivateRoute = "";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/readblog", {name: "readblog",

                                   onBeforeAction: function (pause) {
                if (!Meteor.user()) { 
                // render the login template but keep the url in the browser the same
                this.render('Login');
            }
else {
//     // otherwise don't hold up the rest of hooks or our route/action function
//     // from running
    this.next();}
       },





	 title: "", controller: "ReadblogController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/essays", {name: "essays", title: "", controller: "EssaysController"});
	this.route("/essays/details/:essayId", {name: "essays.details", title: "", controller: "EssaysDetailsController"});
	this.route("/essays/insert", {name: "essays.insert", title: "", controller: "EssaysInsertController"});
	this.route("/essays/update/:essayId", {name: "essays.update", title: "", controller: "EssaysUpdateController"});
	this.route("/customers", {name: "customers", title: "", controller: "CustomersController"});
	this.route("/customers/insert", {name: "customers.insert", title: "", controller: "CustomersInsertController"});
	this.route("/customers/details/:customerId", {name: "customers.details", title: "", controller: "CustomersDetailsController"});
	this.route("/customers/edit/:customerId", {name: "customers.edit", title: "", controller: "CustomersEditController"});
	this.route("/invoices", {name: "invoices", title: "", controller: "InvoicesController"});
	this.route("/invoices/insert", {name: "invoices.insert", title: "", controller: "InvoicesInsertController"});
	this.route("/invoices/details/:invoiceId", {name: "invoices.details", title: "", controller: "InvoicesDetailsController"});
	this.route("/invoices/details/:invoiceId/items", {name: "invoices.details.items", title: "", controller: "InvoicesDetailsItemsController"});
	this.route("/invoices/details/:invoiceId/insert", {name: "invoices.details.insert", title: "", controller: "InvoicesDetailsInsertController"});
	this.route("/invoices/details/:invoiceId/edit/:itemId", {name: "invoices.details.edit", title: "", controller: "InvoicesDetailsEditController"});
	this.route("/invoices/edit/:invoiceId", {name: "invoices.edit", title: "", controller: "InvoicesEditController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
});
