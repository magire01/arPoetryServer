$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: `/films/update/${sessionStorage.getItem("id")}`,
        success: function(result) {
            $("#updateFilm").append(`
            <div class="container">
              <div class="row">
                <h3>Films</h3>
              </div>
              <form>
                <div class="row">
                    <div class="col-md-2">
                      <p>Title</p>
                    </div>
                    <div class="col-md-4">
                      <input value="${result.title}" id="filmTitle" />
                    </div>
                    <div class="col-md-2">
                      <p>Directed By</p>
                    </div>
                    <div class="col-md-4">
                      <input value="${result.directedBy}" id="filmDirectedBy" />
                    </div>
                    <div class="col-md-2">
                      <p>Date Posted</p>
                    </div>
                    <div class="col-md-4">
                      <input value="${result.datePosted}" id="filmDate"/>
                    </div>
                    <div class="col-md-2">
                      <p>Order Id</p>
                    </div>
                    <div class="col-md-4">
                      <input value="${result.orderId}" id="filmOrderId" class="orderInput"/>
                    </div>
                    <div class="col-md-2">
                      <p>Summary</p>
                    </div>
                    <div class="col-md-10">
                      <textarea id="filmSummary">${result.summary}</textarea>
                    </div>
                </div>
                   
                <div class="row">
                  <div class="col-md-3">
                    <p>Relatability</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.relatabilityScore}" id="relatabilityScore" />
                  </div>
                  <textarea id="relatability" class="poemText">${result.relatability}</textarea>
                </div>
      
                <div class="row">
                  <div class="col-md-3">
                    <p>Execution</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.executionScore}" id="executionScore" />
                  </div>
                  <textarea id="execution" class="poemText">${result.execution}</textarea>
                </div>
      
                <div class="row">
                  <div class="col-md-3">
                    <p>Context</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.contextScore}" id="contextScore" />
                  </div>
                  <textarea id="context" class="poemText">${result.context}</textarea>
                </div>
      
                <div class="row">
                  <div class="col-md-3">
                    <p>Subtext</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.subtextScore}" id="subtextScore" />
                  </div>
                  <textarea id="subtext" class="poemText">${result.subtext}</textarea>
                </div>
      
                <div class="row">
                  <div class="col-md-3">
                    <p>Emotion</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.emotionScore}" id="emotionScore" />
                  </div>
                  <textarea id="emotion" class="poemText">${result.emotion}</textarea>
                </div>
      
                <div class="row">
                  <div class="col-md-3">
                    <p>Overall Score</p>
                  </div>
                  <div class="col-md-9">
                    <input value="${result.overallScore}" id="overallScore" />
                  </div>
                </div>
      
                <div class="row">
                  <div class="col-md-2">
                    <p>Song</p>
                  </div>
                  <div class="col-md-4">
                    <input value="${result.song}" id="filmSong" />
                  </div>
                </div>
      
                <div class="row">
                  <div class="col-md-2">
                    <p>Image URL</p>
                  </div>
                  <div class="col-md-4">
                    <input value="${result.image}" id="filmImage" />
                  </div>
                </div>
        
                <div class="row">
                  <button id="submitFilm" class="submitPoem">Submit</button>
                </div>
              </div>
            </form>
          </div>
            `)
            $("#submitFilm").on("click", function(e) {
                e.preventDefault();
                $.ajax({
                    type: "PUT",
                    url: `/films/submitupdate/${result._id}`,
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
                    }
                })
                window.location.reload()
            });
            $("#filmOrderId").attr("value", result.orderId)
        },
        error: function(error) {
            console.log(error)
        }
    })

    $("#home").on("click", function(e) {
        e.preventDefault();
        window.location.replace(`/films/`)
    })
})