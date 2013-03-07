if (Meteor.isClient) {
  var sandwichOrder = {};

  

  Template.main.events({
    //where main template events will go.
  });

  Template.sandwichDenomination.events({
    'click .sandoType' :  function(event){
      var sandoType = event.target.parentElement.id;
      $('.' + sandoType + 'Option').toggle('show');
    },

    'click input[type="radio"]' : function(){
      $('#submit').css('display', 'inline');
    }
  });

  Template.submit.events({
    'click .submit' : function(event){
      event.preventDefault();
      var val = $("input:radio[name=sandoChoice]:checked");
      console.log(val);
      randomMessage();
      var message = "Please send me a " + val[0].value + " right away!" + "/nLove," + "/nSherah";
      Meteor.call('sendEmail', 
                  'she093w48', 
                  'sherah@sherahsmith.com', 
                  'This is a sandwich request!', message);
      }
  }); 

  var randomMessage = function(){
    console.log("this is a random message");
  };
    
};


if (Meteor.isServer) {

  Meteor.startup(function(){
    
    Meteor.methods({
    sendEmail: function(to, from, subject, text){
      this.unblock();

      try{
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      } catch(error){
        
      }
    }
  });


  });
}
