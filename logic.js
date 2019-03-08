  var database = firebase.database();

// train schedule calculations and using moment.js
// First Time (pushed back 1 year to make sure it comes before current time)
// var pushBack1year = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(pushBack1year);

// Current Time
var frequency = 0;

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
$("#timeNow").text(currentTime);

// Difference between the times
var diffTime = moment().diff(moment(), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var remainder = diffTime % frequency;
// console.log(remainder);

// // Minute Until Train
// var tMinTillTrain = frequency - remainder;
// console.log("MINUTES TILL TRAIN: " + tMinTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


//Add Trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();
  // var currentTime = $(moment()).val().trim();

  //Train data (temporary local storage)
  var newTrain = {
    Name: trainName,
    Destination: destination,
    First_Train: firstTrain,
    Frequency: frequency,
  };

  console.log(newTrain);


  // push new Train data to database
  database.ref().push(newTrain);
  console.log(newTrain.Name);
  console.log(newTrain.Destination);
  console.log(newTrain.First_Train);
  console.log(newTrain.Frequency);
  // console.log(newTrain.Next_Train);

  alert("New Train successfully added");

  // Clear text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

});

//Upon new submission, add to database (firebase) and display in HTML
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store into variable
  var trainName = childSnapshot.val().Name;
  var destination = childSnapshot.val().Destination;
  var firstTrain = childSnapshot.val().First_Train;
  var frequency = childSnapshot.val().Frequency;
  // var currentTime = childSnapshot.val().Current_Time;
  // var nextTrain = childSnapshot.val().Next_Train;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(currentTime);
  // console.log(nextTrain);

  //reformat the info for firstTrain
  var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");
  // var nextTrainPretty = moment.unix(nextTrain).format("HH:mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<th>").text(trainName),
    $("<th>").text(destination),
    $("<th>").text(firstTrainPretty),
    $("<th>").text(frequency),
    $("<td>").text(currentTime),
    // $("<td>").text(nextTrainPretty)
  );

  // Append the new row to the table
  $("#displayed-data").append(newRow);






});