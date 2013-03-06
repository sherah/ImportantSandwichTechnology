if (Meteor.isClient) {
  Template.main.events({
    //where main template events will go.
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup.
  });
}
