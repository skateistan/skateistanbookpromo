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
    $("#slides").slides({
      preload: false,
      generatePagination: false,
      bigTarget: true
    });
  }
  function hideAll() {
    $(".content").hide();
    $("#menu a").removeClass("current");
  }
  function show(id) {
    hideAll();
    $("#a-" + id).attr("class", "current");
    if (id === "news") {
      patterns();
      blackonwhite();
    } else {
      noorzai();
      whiteonblack();
    }
    $("#" + id).show();
  }
  function blackonwhite () {
    $("#title, #menu, #menu a").css({ "color": "#000000" });
    $(".content").css({ "color": "#ffffff"});
  };
  function whiteonblack () {
    $("#title, #menu, #menu a").css({ "color": "#ffffff" });
    $(".content").css({ "color": "#ffffff"});
  };
  function patterns () {
    $("html").css({
      "background": "url(images/patterns.png) no-repeat top center fixed",
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