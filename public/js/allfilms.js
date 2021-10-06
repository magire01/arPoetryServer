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

    $.ajax({
        type: "GET",
        url: "/films/allfilms/",
        success: function(result) {
            console.log(result)

            for(let i = 0; i < result.length; i++) {
                
                $("#films").append(`
                        <div class="col-md-8">
                            <div data-id=${result[i]._id} class="poemEntry edit">
                                    <div class="row">
                                        <div class="col-md-1">
                                            <p> ${result[i].orderId} </p>
                                        </div>
                                        <div class="col-md-7">
                                            <h5> ${result[i].title} </h5>
                                        </div>
                                        <div class="col-md-4">
                                            <p> ${result[i].datePosted} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button data-id=${result[i]._id} class="delete">Delete</button>
                        </div>
                    `)
            }

            // $(".edit").on("click", function(e) {
            //     e.preventDefault();
            //     let id = $(this).data("id")
            //     console.log(id)
            //     window.location.replace(`/poems/${id}`)
            //     sessionStorage.setItem("id", id)
            // })
            $(".delete").on("click", function(e) {
                e.preventDefault();
                let id = $(this).data("id")
                console.log(id)
                $.ajax({
                    type: "DELETE",
                    url: `/films/delete/${id}`,
                    success: function(result) {
                        console.log(result)
                        
                    }
                })
                window.location.reload()
            })
            $("#poemOrderId").attr("value", result.length + 1)
        },
        error: function(error) {
            console.log(error)
        }
    })

});