Meteor.publish('expectancies', function() {
  return Expectancies.find();
});