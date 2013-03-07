if (Meteor.isClient) {

  var photos = {
    'Roast Beef' : "roastbeef.jpg",
    'BLT' : "blt.jpg",
    'Grilled Cheese' : "grilledcheese.jpg",
    'Egg Salad' : "eggsalad.jpg",
    'Portobello' : "portobello.jpg",
    'Eggplant' : "eggplant.jpg"
  };

  Meteor.Router.add({
    '/' : 'main',
    '/tests' : 'mochaTests'
  });

  Template.sandwichClock.timeToSandwich = function(){
    var start = moment();
    var end = moment().startOf('day') + 12;
    var difference = start.from(end);
    return difference;
  };

  Template.sandwichDenomination.events({
    'click .sandoType' :  function(event){
      var sandoType = event.target.parentElement.id;
      $('.middleCol').hide();
      $('.' + sandoType + 'Option').toggle('show');
    }
  });

  Template.sandwichNames.events({
    'click input[type="radio"]' : function(){
      var sandwichPhoto = '<img src="' + photos[event.srcElement.defaultValue] + '">';
      $('#upcomingOrder').css('display', 'inline');
      $('#mainSandwich').html(sandwichPhoto);
      $('#submit').css('display', 'inline');
    }
  });

  Template.submit.events({
    'click .submit' : function(event){
      event.preventDefault();

      var specialOptions = "";

      _.each($('input[type="checkbox"]:checked'), function(val){
        specialOptions += ($(val).val()) + "\n";
      });

      var specialInstructions = $('.specialInstructionText').val();

      var val = $("input:radio[name=sandoChoice]:checked");
      var msg = randomMessage();
      var message = "Dear Sandwich Person, \n\nPlease send me a " + val[0].value + " sandwich right away!" + "\n\n" + "Also...\n\n" + specialOptions + "\n\n" + "AND...(jeeze sorry)..." + "\n\n" +  specialInstructions + "\n\nThank you! \n\nLove, \nSherah" + "\n\n" + "PS: " + msg;

      console.log(message);

      Meteor.call('sendEmail',
                  'make_sandwich@generalthings.com',
                  'sherah@sherahsmith.com',
                  'This is a sandwich request!',
                  message,
                  function(error, result){
                    if(error){
                      $('#emailStatus .modal-body').text("Oops, your sandwich order failed. Please re-submit.");
                    } else {
                      $('#emailStatus .modal-body').text("Your sandwich order has been emailed to Fred. He thanks you.");
                    }
                  }
      );
    }
  });

  var randomMessage = function(){
    var pileOfQuotes = ['',"I believe that if you don't want to do anything, then sit there and don't do it, but don't expect people to hand you a corn beef sandwich and wash your socks for you and unzip your fly for you. ~Shel Silverstein",
      "You don't need a pack of wild horses to learn how to make a sandwich. ~Dr. Phil",
      "But, you know, it's still a drag to get your picture taken when you're eating a sandwich. It's a downer. ~Keanu Reeves",
      "I say 20 words in English. I say money, money, money, and I say hot dog! I say yes, no and I say money, money, money and I say turkey sandwich and I say grape juice. ~Carmen Miranda",
      "Maybe there is no actual place called hell. Maybe hell is just having to listen to our grandparents breathe through their noses when they're eating sandwiches. ~Jim Carrey"
      ];
    var msg = pileOfQuotes[Math.floor((Math.random()*5)+1)];
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
