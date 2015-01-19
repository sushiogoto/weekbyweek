Template.signupPage.events({
  'submit form': function(event) {
    event.preventDefault();
    var avatarUrl = Session.get('currentCharacterAvatar');
    var characterClass = Session.get('currentCharacterClass');
    var characterProperties = {
      name: $(event.target).find('[name=characterName]').val(),
      avatarUrl: avatarUrl,
      characterClass: characterClass,
    };
    var habitProperties = {
      targets: {git_commit_target: $(event.target).find('[name=commitTarget]').val()}
    };

    Meteor.call('characterCreate', characterProperties, habitProperties, function (error, result) {});

  }
});

Template.signupPage.rendered=function() {
  $('#birthday').datepicker({
      format: "dd/mm/yyyy",
      startView: 2,
      beforeShowDate: true,
  });
};