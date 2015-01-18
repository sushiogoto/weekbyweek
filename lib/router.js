Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('expectancies');
  }
});

Router.route('/', {
  name: 'weeksIndex'
});