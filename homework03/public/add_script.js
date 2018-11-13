function loadPeople() {
  let peopleList = $("#people-list");
  peopleList.empty();
  $.ajax({
      type: "GET",
      url: "/people",
  })
  .done(function(res) {
    for (person of res) {
      peopleList.append(`
          <div>
              <h1>${person.firstName} ${person.lastName}</h1>
              <div>Login ID: ${person.loginId}</div>
              <div>Start Date: ${person.startDate}</div>
          </div>`
      );
    }
  })
  .fail(function(xhr, status, error) {
    console.log("Error: " + error);
    console.log("Status: " + status);
    console.dir(xhr);
  });
}

$(document).ready(function() {
  loadPeople();
  let form = $("form");
  let result = $("#status");
  form.change(function() {
    result.text("");
  });
  form.submit(function(event) {
  	event.preventDefault();
  	$.ajax({
  	    type: form.attr('method'),
  	    url: form.attr('action'),
  	    data: form.serialize(),
  	})
    .done(function(res) {
  		result.text("Success");
  		form.trigger("reset");
      loadPeople();
    })
    .fail(function(xhr, status, error) {
  		result.text("Error");
  		console.log("Error: " + error);
  		console.log("Status: " + status);
  		console.dir(xhr);
    });
  });
});
