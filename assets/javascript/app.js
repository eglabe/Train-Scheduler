// Initialize Firebase
var config = {
apiKey: "AIzaSyAsCGHC0nOCZiyvLc3Bnc46zMgEMeK0_MA",
authDomain: "train-scheduler-147a8.firebaseapp.com",
databaseURL: "https://train-scheduler-147a8.firebaseio.com",
storageBucket: "train-scheduler-147a8.appspot.com",
messagingSenderId: "749265162273"
};
firebase.initializeApp(config);

// Initial variables
var db = firebase.database();

var train = "";
var destination = "";
var firstTime = "";
var frequency = 0;

// Capture button click
$("#add-train").on("click", function(event) {

	event.preventDefault();

	train = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTime = $("#first-train").val().trim();
	frequency = $("#frequency").val().trim();

	console.log("-----user input--------------------")
	console.log(train);
	console.log(destination);
	console.log(firstTime);
	console.log(frequency);

  // Code for the database push
  db.ref().push({

  	train: train,
  	destination: destination,
  	firstTime: firstTime,
  	frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });	
});

// Firebase watcher + initial loader
db.ref().on("child_added", function(childSnapshot) {

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + 
  	childSnapshot.val().train + "</td><td>" + 
  	childSnapshot.val().destination + "</td><td>" +
  	childSnapshot.val().frequency + "</td><td>" + 
  	"nxt arr" + "</td><td>" + 
  	"mins away" + "</td></tr>");

  console.log("-------from database----------------")
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dateAdded);

});

// verify input data 


