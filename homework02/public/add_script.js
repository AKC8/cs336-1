
$(document).ready(function() {
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
	    })
	    .fail(function(xhr, status, error) {
		result.text("Error");
		console.log("Error: " + error);
		console.log("Status: " + status);
		console.dir(xhr);
	    });
    });
});
