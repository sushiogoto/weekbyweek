Template.weekPage.events({
  'submit form': function(event) {
    event.preventDefault();
    var weekDetails = {
      journal: $(event.target).find('[name=journal]').val(),
    };
    Meteor.call('weekUpdate', weekDetails, this.date, function (error, result) {});
  }
});