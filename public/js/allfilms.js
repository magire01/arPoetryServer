$(document).ready(function(){
    $("#submitFilm").on("click", function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/films/create/",
            data: {
                title: $("#filmTitle").val(),
                orderId: $("#filmOrderId").val(),
                datePosted: $("#filmDate").val(),
                directedBy: $("#filmDirectedBy").val(),
                summary: $("#filmSummary").val(),
                relatability: $("#relatability").val(),
                relatabilityScore: $("#relatabilityScore").val(),
                execution: $("#execution").val(),
                executionScore: $("#executionScore").val(),
                context: $("#context").val(),
                contextScore: $("#contextScore").val(),
                subtext: $("#subtext").val(),
                subtextScore: $("#subtextScore").val(),
                emotion: $("#emotion").val(),
                emotionScore: $("#emotionScore").val(),
                song: $("#filmSong").val(),
                image: $("#filmImage").val()
            },
            success: function(result) {
                console.log(result)
            },
            error: function(err) {
                console.log(err)
            }
            
        })
        window.location.reload()
    })

});