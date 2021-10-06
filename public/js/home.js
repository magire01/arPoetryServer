$(document).ready(function(){
    $("#poemsPage").on("click", function(e) {
        e.preventDefault();
        window.location.replace("/poems/")
    })

    $("#filmsPage").on("click", function(e) {
        e.preventDefault();
        console.log("Films Page");
    }) 
});
