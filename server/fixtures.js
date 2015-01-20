if (Weeks.find().count() === 0) {
  var now = new Date().getTime();

  // create new user
  var yoshId = Meteor.users.insert({
    profile: { name: 'Yoshio Goto' }
  });
  var yosh = Meteor.users.findOne(yoshId);

  var expectancyId = Expectancies.insert({
    userId: yoshId,
    birthday: moment('19890708', 'YYYYMMDD'),
    deathday: moment('19890708', 'YYYYMMDD').add(80, 'years'),
    lifeExpectancy: 80,
    lifeWeeks: moment.duration(80, 'y').asWeeks(),
    beginWeek: moment('19890708', 'YYYYMMDD').week(),
    endWeek: moment('19890708', 'YYYYMMDD').add(80, 'years').week()
  });

  for (var i = 0; i < 10; i++) {
    Weeks.insert({
      modified: true,
      userId: "uPzc6B5ALtnzx9dkW",
      journal: "Went climbing, it was cool",
      feeling: $('good')
    });
  }
}