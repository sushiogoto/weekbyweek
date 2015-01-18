Template.weeksIndex.helpers({
  weeks: function() {
    var expectancy = Expectancies.find().fetch()[0];
    // var expectancy = Expectancies.findOne({userId: Meteor.userId()});
    var weeks = expectancy.lifeExpectancy;
    // for(i = 0; i <= weeks; i++) {
    //   $('#weeks').appendTo('<div class="week"></div>');
    // }
    return weeks;
  }
});

Template.weeksIndex.rendered = function() {
  var expectancy = Expectancies.find().fetch()[0];
  var weeks = Math.floor(expectancy.lifeWeeks);
  var startFillerWeeks = expectancy.beginWeek;
  var endFillerWeeks = moment(expectancy.deathday).weeksInYear() - expectancy.endWeek;
  var totalWeeksDisplayed = weeks + startFillerWeeks + endFillerWeeks;
  // calculate using moment weeks in year

  // for(i = 0; i <= totalWeeksDisplayed; i++) {
  //   if(i === 0) {
  //     $('<div class="year">').appendTo('#weeks');
  //   } else if(i % 52 === 0 && i !== totalWeeksDisplayed) {
  //     $('</div>').appendTo('#weeks');
  //     $('<div class="year">').appendTo('#weeks');
  //   } else if(i === totalWeeksDisplayed) {
  //     $('</div>').appendTo('#weeks');
  //   }
  //   if(i <= startFillerWeeks) {
  //     $('<div class="nothing-week"></div>').appendTo('#weeks');
  //   } else if(i <= startFillerWeeks + weeks) {
  //     $('<div class="week"></div>').appendTo('#weeks');
  //   } else {
  //     $('<div class="nothing-week"></div>').appendTo('#weeks');
  //   }
  // }

  var startDate = moment(moment(expectancy.birthday).year(), 'YYYY');
  var endDate = moment(moment(expectancy.deathday).year(), 'YYYY');

  for (var m = startDate, y = startDate.year(), newYear = false; m.isBefore(endDate); m.add(1, 'weeks')) {
    // use isoWeek here because epoch calendar logs week with Jan 1 as first week
    if(m.isoWeek() === 1 && m.year() === moment(expectancy.birthday).year()) {
      $('<div class="year">').appendTo('#weeks');
    } else if(m.year() != y && m.year() !== moment(expectancy.deathday).year()) {
      y = m.year();
      $('</div>').appendTo('#weeks');
      $('<div class="year">').appendTo('#weeks');
    } else if(m.year() != y) {
      $('</div>').appendTo('#weeks');
    }
  }

  // for (var m = a; m.isBefore(b); m.add('days', 1)) {
  //   console.log(m.format('YYYY-MM-DD'));
  // }

  // moment('November 1977').fromNow(); for date from now

};