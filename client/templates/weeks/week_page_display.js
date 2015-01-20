Template.weekPageDisplay.helpers({
  feelingGood: function() {
    if(this.feeling === "good") {
      $('body').css("background-color","#c9dbe9");
      return true;
    } else {
      return false;
    }
  }
});