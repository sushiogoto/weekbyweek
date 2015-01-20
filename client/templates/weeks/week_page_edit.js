Template.weekPage.events({
  'submit form': function(event) {
    event.preventDefault();
    var weekDetails = {
      journal: $(event.target).find('[name=journal]').val(),
      feeling: $('#feeling input:radio:checked').val(),
      summary: $(event.target).find('[name=summary]').val(),
    };
    Meteor.call('weekUpdate', weekDetails, this.date, function (error, result) {});
  },
  'blur .dropdown': function(event) {
    Meteor.call('checkWorldBank', "MA", "HK", 1989, function (error, result) {
      console.log(JSON.parse(result.content)[1]["0"].value);
    });
  }
});