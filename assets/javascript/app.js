$(document).ready(function() {

    //initial array of types of animes to fill starter buttons

    var animeTitles = ["Naruto", "Full Metal Alchemist", "Dragon Ball Z", "Sword Art Online", "Pokemon", "Yu-Gi-Oh",];

    //first need function to GET attributes and display content with API key
    function displayInfo() {
        var anime = $(this).attr("anime-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=0WQIgVLwDZvgxclg4Ru3xYNO3iwTQQCd&limit=10";

        //use AJAX to GET information on anime button clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //empty anime div so new selection appends to emtpy div

            $("#anime").empty();

            var results = response.data;

            //user for loop to grab the rating information and appropriate gif for button clicked into its own div

            for (var i = 0; i < results.length; i++) {
                var animeDiv = $("<div class='userAnime'>");

                //make variable for rating

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                //make variables for still url and animated url

                var stillUrl = results[i].images.fixed_height_still.url;
                var playUrl = results[i].images.fixed_height.url;

                //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

                var gif = $("<img>").addClass("gif").attr("src", stillUrl).attr("data-still", stillUrl).attr("data-animate", playUrl).attr("data-state", "still");

                //append the gif and rating to the new div created during for loop

                animeDiv.append(gif);
                animeDiv.append(pRate);

                //append all for loop created divs to the DOM

                $("#anime").append(animeDiv);
            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#animeButtons").empty();

        //loop through array 

        for (var i = 0, l = animeTitles.length ; i < l; i++) {

            var animeRender = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            animeRender.addClass("anime");
            animeRender.attr("anime-name", animeTitles[i]);
            animeRender.text(animeTitles[i]);
            $("#animeButtons").append(animeRender);
        }
    }

    //on click event to add an additional anime button when submitted - push input to array.

    $("#addAnime").on("click", function(event) {
        event.preventDefault();
        var animes = $("#anime-input").val().trim();

        //push input to original topics array and then rerun render of buttons to show newly added button.
        anime.push(animes);
            $("#anime-input").val(" ");
        renderButtons();
    });


    //on click entire document to cover all elements named "anime" and run display function
    $(document).on("click", ".anime", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});