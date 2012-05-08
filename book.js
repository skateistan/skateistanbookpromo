$(function () {
  function hashpizza () {
    // Set up menu
    $("#menu a").click(function(event) {
      event.preventDefault();
      window.location.hash = this.hash;
      show($(this).attr("id").substring(2));
    });
    // Set up url hash functionality
    if (window.location.hash && $(window.location.hash).length) {
      show(window.location.hash.substring(1));
    } else {
      show("news");
    }
    // Set up slides
    $("#slides").slides({
      preload: false,
      generatePagination: false,
      bigTarget: true
    });
    // Set up subscribe form
    setupsubscribe();
  }
  function setupsubscribe () {
    $('#preorder-signup').submit(function (e) { return false; });
    $('button#subscribe').click(function (e) {
      var $subform = $("#preorder-signup");
      $(this).addClass("disabled");
      $.getJSON(
        "http://skateistan.createsend.com/t/j/s/fuhhh/?callback=?",
        $subform.serialize(),
        function (data) {
          if (data.Status === 400) {
            $("button#subscribe").removeClass("disabled");
            $("#message")
              .addClass("error")
              .html("Uh, please make sure you fill out the form properly.")
              .slideDown()
              .delay(5000)
              .fadeOut();
          } else { // 200
            $("input#name").val("");
            $("input#fuhhh-fuhhh").val("");
            $("button#subscribe").removeClass("disabled");
            $("#message")
              .removeClass("error")
              .html("Thanks - you're on the pre-order list and will hear from us soon!")
              .slideDown()
              .delay(8000)
              .fadeOut();
          }
        });
      });
  }
  function hideall() {
    $(".content").hide();
    $("#menu a").removeClass("current");
  }
  function show(id) {
    hideall();
    $("#a-" + id).attr("class", "current");
    if (id === "news") {
      patterns();
    } else {
      noorzai();
    }
    $("#" + id).show();
  }
  function patterns () {
    $("html").css({
      "background": "url(images/noorzai-and-patterns.jpg) no-repeat center center fixed",
      "-webkit-background-size": "cover",
      "-moz-background-size": "cover",
      "-o-background-size": "cover",
      "background-size": "cover"
    });
  };
  function noorzai () {
    $("html").css({
      "background": "url(images/noorzai.jpg) no-repeat center center fixed",
      "-webkit-background-size": "cover",
      "-moz-background-size": "cover",
      "-o-background-size": "cover",
      "background-size": "cover"
    });
  };
  hashpizza();
});