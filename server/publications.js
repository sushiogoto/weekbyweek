Meteor.publish('expectancies', function() {
  return Expectancies.find();
});

Meteor.publish('singleWeek', function(id) {
  check(id, String);
  return Weeks.find(id);
});