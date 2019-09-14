var eventStarts = [];
var eventEnds = [];

function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
    'apiKey': 'AIzaSyArah0cQbp5xBAWS2zW0qX8UbI3wT6zHIE',
    // clientId and scope are optional if auth is not required.
    'clientId': '225408418605-82utlofp4jqh7imov90ossbkm6jga5lp.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      "path": "https://www.googleapis.com/calendar/v3/calendars/primary/events"
      })
    }).then(function(response) {
      for (let i = 0; i < response.result.items.length; i++){
    eventStarts.push(response.result.items[i].start)
    eventEnds.push(response.result.items[i].end)}
    console.log(eventStarts);
    console.log(eventEnds);
    }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
    });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);

