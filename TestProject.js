LoadedPictures = new Mongo.Collection("pictures");

if (Meteor.isClient) {
  Template.alreadyLoaded.onRendered(function() {
    $('.alreadySubmitted').draggable();
    console.log("shouldwork")
  });

  Template.hello.helpers({
    pictures: function() {
      return LoadedPictures.find({}, {
        sort: {date: -1}
      });

    },
  });
  Template.hello.events({
      'submit form': function(event) {
        event.preventDefault();
        var userInput = event.target.url.value;
        if (userInput === "") {
          window.alert("please submit a url")
        } else {
          LoadedPictures.insert({
            newPicture: userInput,
            date: new Date(),
          });
        }
      },

      'click #remove-all-pictures': function() {
        Meteor.call('removeAllPictures');
      },
      'dblclick .edit': function() {
        console.log('clicked')
        var currentHeight = parseInt(event.target.style.height);
        var actualHeight = event.target.naturalHeight;
        var actualWidth = event.target.naturalWidth;
        console.log('currentHeight', currentHeight)
        console.log('height', actualHeight)

        if (actualHeight >= currentHeight) {

          event.target.style.height = actualHeight + "px";
          event.target.style.width = actualWidth + "px";
          console.log("enlarged")
        }
        if (currentHeight > 25) {
          event.target.style.height = "25vw";
          event.target.style.width = "25vw";
        }
      },

      'click .alreadySubmitted': function() {

        console.log('clicked');
      },
      'click #undoButton': function(){
        var canvas=document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;
        var count = 0;
        var img = new Image();
        img.crossOrigin= 'anonymous';
        img.onload = start;
        img.src = "https://dl.dropboxusercontent.com/u/139992952/multple/Sportscar.png";

        function start() {
      context.drawImage(img, 0, 0);
        }
      },
      'click #button': function(){
        var canvas=document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;
        var count = 0;

          if (count == 0) {
          count++;
          var imageData = context.getImageData(0, 0, width, height);
          var data = imageData.data;

          for (var y = 0; y < height; y++) {
                  for (var x = 0; x < width; x++) {
                      var index = (x + width * y) * 4;
                      data[index+2] = 100;          }
                                            }

          context.putImageData(imageData, 0, 0);
            } else { return; }

        var img = new Image();
        img.crossOrigin= 'anonymous';
        img.onload = start;
        img.src = "https://dl.dropboxusercontent.com/u/139992952/multple/Sportscar.png";


      context.drawImage(img, 0, 0);

    }
  });

    Template.hello.onRendered(function(){
      var canvas=document.getElementById("canvas");
      var context = canvas.getContext("2d");
      var width = canvas.width;
      var height = canvas.height;
      var count = 0;
      var button = document.getElementById("button");
      button.addEventListener("click", changeColor, false);

      function changeColor() {
        if (count == 0) {
        count++;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;

        for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    var index = (x + width * y) * 4;
                    data[index+2] = 100;          }
                                          }

        context.putImageData(imageData, 0, 0);
          } else { return; }
      }
      var img = new Image();
      img.crossOrigin= 'anonymous';
      img.onload = start;
      img.src = "https://dl.dropboxusercontent.com/u/139992952/multple/Sportscar.png";

      function start() {
    context.drawImage(img, 0, 0);
      }

    })


};

if (Meteor.isServer) {

  Meteor.startup(function() {


  });
  Meteor.methods({
    'removeAllPictures': function() {
      LoadedPictures.remove({});
    }
  })

}
