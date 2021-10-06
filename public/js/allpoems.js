$(document).ready(function(){
    $("#submitPoem").on("click", function(e) {
        e.preventDefault();
        const submit = {
            title: $("#poemTitle").val(),
            orderId: $("#poemOrderId").val(),
            datePosted: $("#poemDate").val(),
            text: $("#poemText").val(),
            additionalInfo: $("#poemAdditionalInfo").val()
            }

        $.ajax({
            type: "POST",
            url: "/poems/create/",
            data: {
                title: submit.title,
                orderId: submit.orderId,
                datePosted: submit.datePosted,
                text: submit.text,
                additionalInfo: submit.additionalInfo
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
        url: "/poems/allpoems/",
        success: function(result) {
            console.log(result)

            for(let i = 0; i < result.length; i++) {
                
                $("#poems").append(`
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

            $(".edit").on("click", function(e) {
                e.preventDefault();
                let id = $(this).data("id")
                console.log(id)
                window.location.replace(`/poems/${id}`)
                sessionStorage.setItem("id", id)
            })
            $(".delete").on("click", function(e) {
                e.preventDefault();
                let id = $(this).data("id")
                console.log(id)
                $.ajax({
                    type: "DELETE",
                    url: `/poems/delete/${id}`,
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

    $("#homeBtn").on("click", function(e) {
        e.preventDefault();
        window.location.replace("/home/");
    })
});
