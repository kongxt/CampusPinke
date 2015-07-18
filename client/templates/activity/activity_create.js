/**
 * Created by Kira on 7/16/15.
 */

Template.activityCreate.events({
    'submit form': function(e) {
        e.preventDefault();

        var activity = {
            title: $(e.target).find('[name=title]').val(),
            type: $(e.target).find('[name=type]:checked').val(),
            time: $(e.target).find('[name=time]').val(),
            location: $(e.target).find('[name=location]').val(),
            max_number: parseInt($(e.target).find('[name=max_number]').val()),
            contact_way: $(e.target).find('[name=contact_way]').val(),
            detail: $(e.target).find('[name=detail]').val()
        }

        var errors = validateActivity(activity);

        if (errors.title | errors.type | errors.time | errors.location | errors.max_number | errors.contact_way | errors.detail) {
            return Session.set("activityErrors", errors);
        }

        Meteor.call('activityInsert', activity, function(err, result) {
            if (err) {
                return throwError(err.message);
            }
            Router.go('/');
        });

    }
});

Template.activityCreate.onCreated(function() {
    Session.set('activityErrors', {});
});

Template.activityCreate.helpers({
    errorMessage: function(field) {
        return Session.get('activityErrors')[field];
    },

    errorClass: function(field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : "";
    }
});