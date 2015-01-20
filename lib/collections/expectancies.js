Expectancies = new Mongo.Collection('expectancies');

if (Meteor.isServer) {
  Meteor.methods({
    checkWorldBank: function() {
      this.unblock();
      var expectancy = Expectancies.findOne({userId: Meteor.userId()});
      return Meteor.http.call("GET", 'http://api.worldbank.org/countries/' + expectancy.country + '/indicators/SP.DYN.LE00.' + expectancy.gender +
                                     '.IN?per_page=1&date=' + expectancy.birthyear + '&format=json');
    }
  });
}

Meteor.methods({
  userSignup: function(gender, country, birthday) {
    var year = moment(birthday).format('YYYY').toString();
    // need to check it's a bday

    var expectancyId = Expectancies.insert({
      userId: Meteor.userId(),
      birthday: birthday,
      gender: gender,
      country: country,
      birthyear: year
    });

    // var expectancyId = Expectancies.insert({
    //   userId: Meteor.userId(),
    //   birthday: moment(birthday, 'DD-MM-YYYY'),
    //   deathday: moment(birthday, 'DD-MM-YYYY').add(lifeExpectancy, 'years'),
    //   lifeExpectancy: lifeExpectancy,
    //   lifeWeeks: moment.duration(lifeExpectancy, 'y').asWeeks(),
    //   beginWeek: moment(birthday, 'DD-MM-YYYY').week(),
    //   endWeek: moment(birthday, 'DD-MM-YYYY').add(lifeExpectancy, 'years').week()
    // });
  },
  userUpdate: function(lifeExpectancy) {
    // lifeExpectancy = parseFloat(lifeExpectancy).toFixed(2);

    // can't use to Fixed as it converts to string and moment needs an int...

    lifeExpectancy = parseFloat(lifeExpectancy);
    var expectancy = Expectancies.findOne({userId: Meteor.userId()});
    var expectancyUpdate = {
      birthday: moment(expectancy.birthday, 'DD-MM-YYYY'),
      deathday: moment(expectancy.birthday, 'DD-MM-YYYY').add(lifeExpectancy, 'years'),
      lifeExpectancy: lifeExpectancy,
      lifeWeeks: moment.duration(lifeExpectancy, 'y').asWeeks(),
      beginWeek: moment(expectancy.birthday, 'DD-MM-YYYY').week(),
      endWeek: moment(expectancy.birthday, 'DD-MM-YYYY').add(lifeExpectancy, 'years').week()
    };

    Expectancies.update(expectancy._id, {$set: expectancyUpdate});
  }
});
// $ ->
//   $("#sign_up").click (event) ->
//     event.preventDefault()
//     country = $("#user_country_code").val()
//     year = $("#user_birthday_1i").val()
//     $.ajax
//       dataType: 'jsonp'
//       url: "http://api.worldbank.org/countries/#{country}/indicators/SP.DYN.LE00.MA.IN?per_page=1&date=#{year}&format=jsonP"
//       jsonp: 'prefix'
//       jsonpCallback: 'cb_' + new Date().valueOf()
//     .done (data) ->
//       life = data[1][0].value
//       alert(life)
//       $('#user_life_expectancy').val(life)
//       # @life_expectancy = $('#user_life_expectancy').data(life)
//       # $.post('users/registrations#create', life)
//       $("form#new_user").trigger('submit.rails')