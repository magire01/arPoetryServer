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
            url: "/home/poem/",
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
            <div class="card">
                
                <h5> ${result[i].title} </h5>
                <p> ${result[i].datePosted} </p>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <button data-id=${result[i]._id} class="edit">Edit</button>
                        </div>
                        <div class="col">
                            <button data-id=${result[i]._id} class="delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`)
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
});
