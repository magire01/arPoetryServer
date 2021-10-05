$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: `/poems/update/${sessionStorage.getItem("id")}`,
        success: function(result) {
            $("#updatePoem").append(`
            <p> Title: </p>
            <input value=${result.title} id="titleValue"/>
            <p> Order Id </p>
            <input value=${result.orderId} id="orderIdValue"/>
            <p> Date Posted </p>
            <input value=${result.datePosted} id="datePostedValue"/>
            <p> Text: </p> 
            <textarea id="textValue">${result.text}</textarea>
            <p> Additional Info </p>
            <input value=${result.additionalInfo} id="additionalInfoValue"/>
            <button id="submitChange">Submit Changes</button>
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
        window.location.replace(`/home/`)
    })
})