$(document).ready(function(){ 

    $("#loginBtn").on("click", function(e) {
        e.preventDefault();
        const userLogin = $("#userLogin").val()
        const passLogin = $("#passLogin").val()
        console.log(userLogin + " " + passLogin)
        $.ajax({
            type: "POST",
            url: `/login/`,
            data: {
                user: userLogin,
                password: passLogin
            },
            success: function(result) {
                console.log(result)
                sessionStorage.setItem("username", userLogin)
                window.location.replace("/home/")
            },
            error: function(err) {
                console.log(err)
            }

        })
    })

    $("#regUser").on("click", function(e){
        e.preventDefault();
        username = $("#newUser").val();
        password = $("#newPass").val();
        $.ajax({
            type: "POST",
            url: "/create/profile/",
            data: {
                user: username,
                password: password
            }
        }) 
        console.log("Registered user " + username)
    });

    $("#enter").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/home/"
        })
    })

});
