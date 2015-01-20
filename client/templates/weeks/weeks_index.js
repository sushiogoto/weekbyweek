Template.weeksIndex.helpers({
  years: function() {
    var expectancy = Expectancies.find().fetch()[0];
    // var expectancy = Expectancies.findOne({userId: Meteor.userId()});
    var years = _.range(expectancy.lifeExpectancy + 1).map(function(num) {return num;});
    // for(i = 0; i <= weeks; i++) {
    //   $('#weeks').appendTo('<div class="week"></div>');
    // }
    return years;
  }
});

Template.weeksIndex.events({
  'click .alive': function(event, template) {
    var weekDate = $(event.target).data('date');
    var weekId = Meteor.call('loadWeek', weekDate, function (error, result) {
      if(error) {
        console.log('Error!');
      } else if(result) {
        Router.go('weekPage', {_id: result});
      }
    });
  }
});

// Template.yearItem.helpers({
//   week: function() {
//     return _.range(52).map(function(num) {return num;});
//   }
// });

// Template.weekItem.rendered = function() {
//   // Template.parentData(1);
//   var expectancy = Expectancies.find().fetch()[0];
//   var startDate = moment(moment(expectancy.birthday).toDate());
//   var m = startDate;
//   m.add(this.data, 'weeks');
//   m.add(Template.parentData(1), 'years');
//   if(m.isBefore(moment(expectancy.deathday)) && this.data === 0) {
//     $('<div id="' + Template.parentData(1) + '-years" class="year"></div>').appendTo('#lifeContainer');
//     $('<div data-date="' + m.format('YYYY-MM-DD') + '" class="alive week" data-toggle="tooltip"></div>').appendTo('#' + Template.parentData(1) + '-years');
//   } else if(m.isBefore(moment(expectancy.deathday))) {
//     $('<div data-date="' + m.format('YYYY-MM-DD') + '" class="alive week"></div>').appendTo('#' + Template.parentData(1) + '-years');
//   } else {
//     $('<div class="dead week"></div>').appendTo('#' + Template.parentData(1) + '-years');
//   }
// };

Template.weeksIndex.rendered = function() {
  $('body').css('background', '#eae8e8');
  var expectancy = Expectancies.find().fetch()[0];
  var weeks = Math.floor(expectancy.lifeWeeks);
  var startFillerWeeks = expectancy.beginWeek;
  var endFillerWeeks = moment(expectancy.deathday).weeksInYear() - expectancy.endWeek;
  var totalWeeksDisplayed = weeks + startFillerWeeks + endFillerWeeks;

  var userWeeks = Weeks.find({userId: Meteor.userId()}).fetch();

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

  // var startDate = moment(moment(expectancy.birthday).year(), 'YYYY');
  // var endDate = moment(moment(expectancy.deathday).year(), 'YYYY').endOf('year');


  // for (var m = startDate, y = startDate.year(), newYear = false; m.isBefore(endDate); m.add(1, 'weeks')) {
  //   // use isoWeek here because epoch calendar logs week with Jan 1 as first week
  //   if(m.isoWeek() === 1 && m.year() === moment(expectancy.birthday).year()) {
  //     $('<div id="' + y + '" class="year">').appendTo('#weeks');
  //   } else if(m.year() != y) {
  //     y = m.year();
  //     $('</div>').appendTo('#weeks');
  //     $('<div id="' + y + '" class="year">').appendTo('#weeks');
  //   } else if(m.year() === endDate.year() && m.week() === endDate.week()) {
  //     y = m.year();
  //     $('</div>').appendTo('#weeks');
  //   }

  //   if(m.year() === moment(expectancy.birthday).year() && (m.isoWeek() <= startFillerWeeks || m.week() <= startFillerWeeks)) {
  //     $('<div class="nothing-week"></div>').appendTo('#' + y);
  //   } else if(m.isBefore(moment(expectancy.deathday))) {
  //     $('<div class="week"></div>').appendTo('#' + y);
  //   } else {
  //     $('<div class="nothing-week"></div>').appendTo('#' + y);
  //   }
  // }

  // for (var m = a; m.isBefore(b); m.add('days', 1)) {
  //   console.log(m.format('YYYY-MM-DD'));
  // }

  // moment('November 1977').fromNow(); for date from now

  // Below is the correct version

  var startDate = moment(moment(expectancy.birthday).toDate());
  var endDate = moment(moment(expectancy.deathday).year(), 'YYYY').endOf('year');


  for (var m = startDate, y = 0, w = 1, newYear = false; w <= (expectancy.lifeExpectancy + 1) * 52; m.add(1, 'weeks'), y = y, w++) {
    // use isoWeek here because epoch calendar logs week with Jan 1 as first week
    if(w === 1) {
      $('<div id="' + y + '-years" class="years">').appendTo('#weeks');
    } else if(w % 52 === 0) {
      $('</div>').appendTo('#weeks');
      newYear = true;
    } else if(newYear) {
      y++;
      newYear = false;
      $('<div id="' + y + '-years" class="years">').appendTo('#weeks');
    }

    if(m.isBefore(moment(expectancy.deathday)) && m.isBefore(moment()) && newYear) {
      $('<div data-date="' + m.format('YYYY-MM-DD') + '" class="week alive" data-toggle="tooltip"></div>').appendTo('#' + y + '-years');
    } else if(m.isBefore(moment(expectancy.deathday)) && m.isBefore(moment().add(1, 'weeks'))) {
      $('<div data-date="' + m.format('YYYY-MM-DD') + '" class="week alive"></div>').appendTo('#' + y + '-years');
    } else if(m.isBefore(moment(expectancy.deathday))) {
      $('<div data-date="' + m.format('YYYY-MM-DD') + '" class="week"></div>').appendTo('#' + y + '-years');
    } else {
      $('<div class="dead week"></div>').appendTo('#' + y + '-years');
    }
  }

  userWeeks.forEach(function(week) {
    currentWeek = $('div').find("[data-date='" + week.date + "']");
    currentWeek.attr('data-content', week.summary);
    currentWeek.attr('data-toggle', "popover");
    if(week.feeling === "good") {
      currentWeek.addClass("good");
    } else {
      currentWeek.addClass("bad");
    }
    console.log(currentWeek);
  });

  $('[data-toggle="popover"]').popover({
      trigger: 'hover',
      'placement': 'top'
  });
};