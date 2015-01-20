Template.signupPage.helpers({
  countryName: function() {

    return Countries.find();
  }
});

Template.signupPage.events({
  'submit form': function(event) {
    event.preventDefault();

    // var signupProperties = {
    //   birthday: $(event.target).find('[name=birthday]').val(),
    //   country: $(event.target).find('[id=country]').children().data("iso"),
    //   gender: $(event.target).find('[id=gender]').val(),
    // };
    var birthday = $(event.target).find('[name=birthday]').val();
    var country = $(event.target).find('[id=country]').children().data("iso");
    var gender = $(event.target).find('[id=gender]').val();

    Meteor.call('userSignup', gender, country, birthday, function (error, result) {
      Meteor.call('checkWorldBank', function (error, result) {
        Meteor.call('userUpdate', JSON.parse(result.content)[1]["0"].value, function (error, result) {});
      });
    });

  }
});

Template.signupPage.rendered = function() {
  $('.date').datepicker({

      format: "dd/mm/yyyy",
      startView: 2,
      maxDate: 0,

  });


};