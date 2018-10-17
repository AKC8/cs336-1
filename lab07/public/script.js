$( document ).ready(function() {
    $( "button" ).click(function( event ) {
        $("#result").text('no data yet...');
        // Using the core $.ajax() method
        $.ajax({
            url: "hello",
            data: {
              name: "Lab 07",
            },
            type: "GET",
        })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
        .done(function( result ) {
           $( "#result" ).text( result );
        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function( xhr, status, errorThrown ) {
          $( "#result" ).text( "Sorry, there was a problem!" );
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
        });
    });
});
