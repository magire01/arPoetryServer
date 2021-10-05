$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: `/poems/update/${sessionStorage.getItem("id")}`,
        success: function(result) {
            $("#updatePoem").append(`
                <div class="col-md-2">
                    <p> Title: </p>
                </div>
                <div class="col-md-10">
                    <input value="${result.title}" id="titleValue"/>
                </div>
                <div class="col-md-2">
                    <p> Order Id </p>
                </div>
                <div class="col-md-10">
                    <input value=${result.orderId} id="orderIdValue"/>
                </div>
                <div class="col-md-2">
                    <p> Date Posted </p>
                </div>
                <div class="col-md-10">
                    <input value="${result.datePosted}" id="datePostedValue"/>
                </div>
                <div class="col-md-2">
                    <p> Additional Info </p>
                </div>
                <div class="col-md-10">
                    <input value="${result.additionalInfo}" id="additionalInfoValue"/>
                </div>
            
            <p> Text: </p> 
            <textarea id="textValue" class="poemText">${result.text}</textarea>
            
            
            
            <button id="submitChange" class="submitPoem">Submit Changes</button>
            `)
            $("#submitChange").on("click", function(e) {
                e.preventDefault();
                $.ajax({
                    type: "PUT",
                    url: `/poems/submitupdate/${result._id}`,
                    data: {
                        title: $("#titleValue").val(),
                        orderId: $("#orderIdValue").val(),
                        datePosted: $("#datePostedValue").val(),
                        text: $("#textValue").val(),
                        additionalInfo: $("#additionalInfo").val()
                    }
                })
            });
            $("#poemOrderId").attr("value", result.orderId)
        },
        error: function(error) {
            console.log(error)
        }
    })

    $("#home").on("click", function(e) {
        e.preventDefault();
        window.location.replace(`/poems/`)
    })
})