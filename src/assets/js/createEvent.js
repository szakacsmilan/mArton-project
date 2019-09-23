function initCreateEvent(startTime,endTime){
    loadClient().then(function(){
        execute(startTime,endTime);
        console.log(startTime,endTime)
    })
}

  function loadClient() {
    gapi.client.setApiKey("AIzaSyArah0cQbp5xBAWS2zW0qX8UbI3wT6zHIE");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  function execute(startTime,endTime) {
    return gapi.client.calendar.events.insert({
      "calendarId": "primary",
      "resource": {
        "end": {
          "dateTime": endTime
        },
        "start": {
          "dateTime": startTime
        }
      }
    })
        .then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "225408418605-82utlofp4jqh7imov90ossbkm6jga5lp.apps.googleusercontent.com"});
  });
