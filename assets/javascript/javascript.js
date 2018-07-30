var buttons = ["Spongebob Squarepants", "Family Guy", "Funny", "Random", "Weird"];

//initial button render
for (var i = 0; i < buttons.length; i++) {
    var newButton = document.createElement("BUTTON");
    newButton.setAttribute("class", "gifButtons btn btn-primary btn-sm");
    var buttonText = document.createTextNode(buttons[i]);
    newButton.setAttribute("data-name", buttons[i]);
    newButton.appendChild(buttonText);
    document.getElementById("gifButtonsDiv").appendChild(newButton);
}

//hides gif display div in the beginning since there's no contents
document.getElementById("gifHeading").style.display = "none";

//adds a new button
function addButtons() {
    var inputValue = document.getElementById("buttonValue").value.trim();
    if (buttons.indexOf(inputValue) === -1 && inputValue !== "") {
        document.getElementById("gifButtonsDiv").innerHTML = "";
        buttons.push(inputValue);
        for (var i = 0; i < buttons.length; i++) {
            var newButton = document.createElement("BUTTON");
            newButton.setAttribute("class", "gifButtons btn btn-primary btn-sm");
            var buttonText = document.createTextNode(buttons[i]);
            newButton.setAttribute("data-name", buttons[i]);
            newButton.appendChild(buttonText);
            document.getElementById("gifButtonsDiv").appendChild(newButton);
        }
        document.getElementById("buttonValue").value = "";
    }
}

//triggers API when the buttons mentioned above are clicked
$(document).on("click", ".gifButtons", showGifs);

//API
function showGifs() {
    var gif = $(this).attr("data-name");
    var json = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=20";

    $.ajax({
        url: json,
        method: "GET"
    }).then(function(response) {
        var numberGifs = response.data;
        //shows the gif box
        document.getElementById("gifHeading").style.display = "block";
        //gets the title, gif image, and url and puts them in a div which is then added to a table
        for (var i = 0; i < numberGifs.length / 2; i += 2) {
            var newDiv = document.createElement("DIV");
            var newRow = document.createElement("TR");
            var newTD1 = document.createElement("TD");
            var newTD2 = document.createElement("TD");
            var link = document.createElement("A");
            link.setAttribute("href", numberGifs[i].url);
            link.setAttribute("target", "_blank");
            var title = document.createElement("H3");
            var titleText = document.createTextNode(numberGifs[i].title.toUpperCase());
            //if gifs have no title or only spaces as the title display this
            if (numberGifs[i].title.trim() === "") {
                titleText = document.createTextNode("(NO TITLE FOUND)")
            }
            link.appendChild(titleText);
            title.appendChild(link);
            var image = document.createElement("IMG");
            image.setAttribute("src", numberGifs[i].images.fixed_height_still.url);
            image.setAttribute("gifStillURL", numberGifs[i].images.fixed_height_still.url);
            image.setAttribute("gifAnimatedURL", numberGifs[i].images.fixed_height.url)
            image.setAttribute("animationStatus", "still");
            image.setAttribute("class", "gifImage")
            image.setAttribute("height", "220px");
            
            //gets the title, gif image, and url and puts them in a separate div and adds them to the table
            var newDiv2 = document.createElement("DIV");
            var link2 = document.createElement("A");
            link2.setAttribute("href", numberGifs[i+1].url);
            link2.setAttribute("target", "_blank");
            var title2 = document.createElement("H3");
            var titleText2 = document.createTextNode(numberGifs[i+1].title.toUpperCase());
            //if gifs have no title or only spaces as the title display this
            if (numberGifs[i+1].title.trim() === "") {
                titleText2 = document.createTextNode("(NO TITLE FOUND)")
            }
            link2.appendChild(titleText2);
            title2.appendChild(link2);
            var image2 = document.createElement("IMG");
            image2.setAttribute("src", numberGifs[i+1].images.fixed_height_still.url);
            image2.setAttribute("gifStillURL", numberGifs[i+1].images.fixed_height_still.url);
            image2.setAttribute("gifAnimatedURL", numberGifs[i+1].images.fixed_height.url)
            image2.setAttribute("animationStatus", "still");
            image2.setAttribute("class", "gifImage")
            image2.setAttribute("height", "220px");

            //adds all the elements above together
            newDiv.appendChild(title);
            newDiv.appendChild(image);
            newTD1.appendChild(newDiv);
            newDiv2.appendChild(title2);
            newDiv2.appendChild(image2);
            newTD2.appendChild(newDiv2);
            newRow.appendChild(newTD1);
            newRow.appendChild(newTD2);
            document.getElementById("gifDisplayArea").insertBefore(newRow, document.getElementById("gifDisplayArea").childNodes[0]);
        }
    })
}

//if gif is stopped, play and if gif is playing, stop
$(document).on("click", ".gifImage", function() {
    if ($(this).attr("animationStatus") === "still") {
        $(this).attr("src", $(this).attr("gifAnimatedURL"));
        $(this).attr("animationStatus", "animate");
    } else {
        $(this).attr("src", $(this).attr("gifStillURL"));
        $(this).attr("animationStatus", "still");
    }
})

//add gif buttons when enter button is clicked
function enter() {
    if (event.keyCode === 13 || event.which === 13) {
        addButtons();
    }
}