Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('expectancies')];
  }
});

Router.route('/', {
  name: 'weeksIndex',
  onBeforeAction: function() {
    if(!Expectancies.findOne({userId: Meteor.userId()})) {
      this.render('signupPage');
    } else {
      this.next();
    }
  }
});

Router.route('/welcome', {
  name: 'landingPage'
});

Router.route('/weeks/:_id', {
  name: 'weekPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleWeek', this.params._id)];
  },
  data: function() { return Weeks.findOne({_id: this.params._id});}
});

Router.route('/signup', {
  name: 'signupPage'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
    this.render('signupPage');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin);