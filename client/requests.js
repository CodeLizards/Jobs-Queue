$( document ).ready(function() {
    console.log( "ready!" );
   
$( "#new-website-form" ).submit(function(e) {
  e.preventDefault();
  var website = $("input:first").val();
  // clear input field
  $("input:first").val('');
  // check for type of input
  var regex = 'http://*';
  var regex1 = 'https://*';
  if (website.match(regex1)) {
    website = website.slice(8);
  } else if (website.match(regex)) {
    website = website.slice(7);
  }
  var regex2 = 'www.*'
  if (!website.match(regex2)) {
    website = 'www.'+website;
  }
  // make http request
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/newWebsite',
    data: {url: website},
    success: function (jobId) {
      $("#job-id").html("The Job ID for " + website + " is " + jobId + ".");
    },
    error: function (error) {
      console.log('error in clientside post request to newWebsite endpoint', error);
    }
  });
});

$( "#website-status" ).submit(function (e) {
  e.preventDefault();
  var jobId = $("#status-input").val();
  // clear input field
  $("#status-input").val('');

  // check for type of input
  if (!isNaN(jobId) && jobId !== '') {
    // make http request
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/checkWebsite/'+jobId,
      success: function (results) {
        var message = '';
        console.log('results',results)
        if (results.position === null) {
          message = "No such job has been entered."
        } else if (results.position >= 0) {
          console.log('position')
          message = "The website has not yet been archived! It is " + results.position + " away from being processed. Hang tight.";
        } else {
          message = "The results for job #"+ results.id +" and website " + results.url + " is: " + results.content; 
        }
        $('#website-status-results')
          .html(message);
      },
      error: function (error) {
        console.log('error in clientside get request to checkWebsite endpoint', error);
      }
    });
  } else {
    alert('Input must be a number!')
  }

});

});