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
      var msg = randomMessage();
      var message = "Dear Sandwich Person, \n\nPlease send me a " + val[0].value + " sandwich right away!" + "\n\n" + msg + "\n\nLove," + "\nSherah";
      console.log(message);
      Meteor.call('sendEmail',
                  'sherah@sherahsmith.com',
                  'sherah@sherahsmith.com',
                  'This is a sandwich request!',
                  message,
                  function(error, result){
                    if(error){
                      $('#emailStatus .modal-body').text("Oops, your sandwich order failed. Please re-submit.");
                    } else {
                      $('#emailStatus .modal-body').text("Your sandwich order has been emailed to Fred. He thanks you.");
                    }
                  });
      }
  });

  var randomMessage = function(){
    var pileOfQuotes = ["I believe that if you don't want to do anything, then sit there and don't do it, but don't expect people to hand you a corn beef sandwich and wash your socks for you and unzip your fly for you. ~Shel Silverstein",
      "You don't need a pack of wild horses to learn how to make a sandwich. ~Dr. Phil",
      "another quote",
      "another quote",
      "another quote",
      "another quote",
      "another quote",
      "another quote",
      "another quote",
      "another quote"
      ];
    var msg = pileOfQuotes[Math.floor((Math.random()*10)+1)];
    return msg;

  };
};


if (Meteor.isServer) {

  Meteor.startup(function(){
    Meteor.methods({
      sendEmail: function(to, from, subject, text){
        this.unblock();

        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }
    });

  });
}
