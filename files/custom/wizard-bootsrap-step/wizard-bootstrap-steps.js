Template.steps_bootstrap3.helpers({
    stepClass: function(id) {
        var activeStep = this.wizard.activeStep();
        var step  = this.wizard.getStep(id);
        if (activeStep && activeStep.id === id) {
            return 'active';
        }
        if (step.data()) {
            return 'completed';
        }
        return 'disabled';
    }
});

Template.steps_bootstrap3.events({
    'click a': function (e, tpl) {
        if (!this.wizard.route) {
            e.preventDefault();
            this.wizard.show(this.id);
        }
    }
});

Template.wizardButtons2.helpers({
    showBackButton: function () {
        return this.backButton && !this.isFirstStep();
    }
});

Template.wizardButtons2.events({
    'click .wizard-back-button': function (e) {
        e.preventDefault();
        this.previous(AutoForm.getFormValues(this.activeStep(false).formId).insertDoc);
    }
});
