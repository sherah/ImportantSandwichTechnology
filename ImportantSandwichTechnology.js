if (Meteor.isClient) {
  var sandwichOrder = {};

  Template.main.events({
    //where main template events will go.
  });

  Template.sandwichDenomination.events({
    'click .choice' :  function(event){
      console.log(event);
    }
  });

  Template.submit.events({
    'click .submit' : function(event){
      event.preventDefault();
      _.each($("input:radio[name=sandoChoice]"), function(val){
        if($(val).is(':checked')){
        console.log(val.value);
      }

      });
      
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup.
  });
}
