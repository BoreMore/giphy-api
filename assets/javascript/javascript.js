var buttons = ["Spongebob Squarepants", "Family Guy"];

for (var i = 0; i < buttons.length; i++) {
    var newButton = document.createElement("BUTTON");
    newButton.setAttribute("class", "gifButtons btn btn-primary btn-sm");
    var buttonText = document.createTextNode(buttons[i]);
    newButton.setAttribute("data-name", buttons[i]);
    newButton.appendChild(buttonText);
    document.getElementById("gifButtonsDiv").appendChild(newButton);
}

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

$(document).on("click", ".gifButtons", showGifs);

function showGifs() {
    var gif = $(this).attr("data-name");
    var json = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: json,
        method: "GET"
    }).then(function(response) {
        //$("#gifDisplayArea").text(JSON.stringify(response));
        var numberGifs = response.data;
        for (var i = 0; i < numberGifs.length; i++) {
            var newDiv = document.createElement("DIV");
            var title = document.createElement("H3");
            var titleText = document.createTextNode(numberGifs[i].title.toUpperCase());
            title.appendChild(titleText);
            var image = document.createElement("IMG");
            image.setAttribute("src", numberGifs[i].images.fixed_height.url);
            newDiv.appendChild(title);
            newDiv.appendChild(image);
            document.getElementById("gifDisplayArea").insertBefore(newDiv, document.getElementById("gifDisplayArea").childNodes[0]);
        }
    })
}