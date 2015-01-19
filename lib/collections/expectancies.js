Expectancies = new Mongo.Collection('expectancies');

if (Meteor.isServer) {
  Meteor.methods({
    checkWorldBank: function(gender, country, year) {
      this.unblock();
      return Meteor.http.call("GET", 'http://api.worldbank.org/countries/' + country + '/indicators/SP.DYN.LE00.' + gender +
                                     '.IN?per_page=1&date=' + year + '&format=json');
    }
  });
}

Meteor.methods({
  userSignup: function(gender, country, birthday) {
    var year = moment(birthday).format('YYYY').toString();
    // check it's a bday
    var lifeExpectancy = Meteor.call('checkWorldBank', gender, country, year, function (error, result) {
      console.log(JSON.parse(result.content)[1]["0"].value);
    });

    var expectancyId = Expectancies.insert({
      userId: Meteor.userId(),
      birthday: moment(birthday, 'YYYYMMDD'),
      deathday: moment(birthday, 'YYYYMMDD').add(lifeExpectancy, 'years'),
      lifeExpectancy: lifeExpectancy,
      lifeWeeks: moment.duration(lifeExpectancy, 'y').asWeeks(),
      beginWeek: moment(birthday, 'YYYYMMDD').week(),
      endWeek: moment(birthday, 'YYYYMMDD').add(lifeExpectancy, 'years').week()
    });
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