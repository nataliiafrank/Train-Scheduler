    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyATQeON6QlNFnc8k1DKMgaBGPICLQ10dOY",
        authDomain: "train-scheduler-4a6c2.firebaseapp.com",
        databaseURL: "https://train-scheduler-4a6c2.firebaseio.com",
        projectId: "train-scheduler-4a6c2",
        storageBucket: "",
        messagingSenderId: "323854346381"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text input
        var nameInput = $("#train-name").val().trim();
        var destinationInput = $("#destination").val().trim();
        var firstTrainInput = $("#first-train").val().trim();
        var frequencyInput = $("#frequency").val().trim();

        // Creates local "temporary" object for holding new train data
        var newTrain = {
            tarainName: nameInput,
            destination: destinationInput,
            firstTrain: firstTrainInput,
            frequency: frequencyInput,
        }

        // Code for handling the push
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.tarainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        // Alert
        alert("Train successfully added");

        // Clears all of the input text-boxes
        $("input").val("");
    });

    //
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store data from database into variables
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFirst = childSnapshot.val().firstTrain;
        var tFrequency = childSnapshot.val().frequency;


        // Console.loging the last user's data
        console.log(tName);
        console.log(tDestination);
        console.log(tFirst);
        console.log(tFrequency);

        // Variable for current time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var tFirstConverted = moment(tFirst, "HH:mm").subtract(1, "years");
        console.log(tFirstConverted);

        // Difference between now amd first train
        var timeDiff = moment().diff(moment(tFirstConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDiff);

        // Time apart (remainder)
        var remainder = timeDiff % tFrequency;
        console.log(remainder);

        // Minute Until Train
        var MinutesTillTrain = tFrequency - remainder;
        console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(MinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var nextArrival = moment(nextTrain).format("hh:mm A")

        // Add each train's data into the table
        $("#table-body").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + nextArrival + "</td><td>" + MinutesTillTrain  + "</td></tr>");
    });