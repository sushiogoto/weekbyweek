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