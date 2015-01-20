Weeks = new Mongo.Collection('weeks');

Meteor.methods({
  loadWeek: function(date) {
    check(date, String);

    var week = Weeks.findOne({userId: Meteor.userId(), date: date});

    // should modify this to also check that the date provided is within the realm of 'alive'
    if(week) {
      return week._id;
    } else {
      var weekId = Weeks.insert({
        userId: Meteor.userId(),
        date: date,
        created: moment(),
        modified: false,
      });
      return weekId;
    }
  },
  weekUpdate: function(weekAttributes, date) {
    // do some validation checks here, or try via frontend just using allow/deny

    var week = Weeks.findOne({userId: Meteor.userId(), date: date});
    weekAttributes = _.extend(weekAttributes, {
      modified: true
    });
    Weeks.update(week._id, {$set: weekAttributes});

  }
});