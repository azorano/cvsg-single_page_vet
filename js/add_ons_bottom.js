/*!
 * CASE FIRST CLICK BOTTOM BUTTON "CONTINUE"
 */
var continueClick;
function advanceItOnce() {
  if (!continueClick) {
    continueClick = true;
    document.getElementById("continue").click();
  }
}
/*!
 * CASE FIRST CLICK IS IN NAVBAR
 */
var navbarContinueClick;
function navbarAdvanceItOnce() {
  if (!navbarContinueClick) {
    navbarContinueClick = true;
    continueClick = true;
  }
}
/*!
 * SCROLL BUTOON SHOWING / NOT SHOWING
 */
$("#scroll_btn").fadeOut();
$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 800) {
    $("#scroll_btn").fadeIn();
  }
  if (y < 800) {
    $("#scroll_btn").fadeOut();
  } else {
    $("#scroll_btn").fadeIn();
  }
});
/*!
 * SmoothScroll
 */
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    event.preventDefault();
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - $(".navbar").height() - 25,
          },
          1000,
          function () {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr("tabindex", "-1");
              $target.focus();
            }
          }
        );
      }
    }
  });
/*!
 * Close Navbar on Click outside
 */
$(document).ready(function () {
  $(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse show");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
      $("button.navbar-toggler").click();
    }
  });
});
/*!
 * DATEPICKER OPTIONS
 */
$(".datepicker").pickadate({
  // Strings and translations
  monthsFull: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthsShort: ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."],
  weekdaysFull: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"],
  weekdaysShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  showMonthsShort: undefined,
  showWeekdaysFull: undefined,
  // Buttons
  today: "Hoje",
  tomorrow: "Amanhã",
  clear: "Apagar",
  close: "Escolher",
  // Accessibility labels
  labelMonthNext: "Mês seguinte",
  labelMonthPrev: "Mês anterior",
  labelMonthSelect: "Selecione o mês",
  labelYearSelect: "Selecione o ano",
  // Formats
  format: "d mmmm, yyyy",
  formatSubmit: "d/mm/yyyy",
  hiddenPrefix: undefined,
  hiddenSuffix: "_submit",
  hiddenName: undefined,
  // Editable input
  editable: false,
  // Dropdown selectors
  selectYears: false,
  selectMonths: false,
  // First day of the week
  firstDay: 1,
  // Date limits
  min: 0,
  max: 30,
  setDate: +1,
  // Disable dates
  disable: [0],
  // Root picker container
  container: undefined,
  // Hidden input container
  containerHidden: undefined,
  // Close on a user action
  closeOnSelect: false,
  closeOnClear: true,
  // Events
  onStart: undefined,
  onRender: undefined,
  onOpen: undefined,
  onClose: undefined,
  onSet: undefined,
  onStop: undefined,
  // Classes
  klass: {
    // The element states
    input: "picker__input",
    active: "picker__input--active",
    // The root picker and states *
    picker: "picker",
    opened: "picker--opened",
    focused: "picker--focused",
    // The picker holder
    holder: "picker__holder",
    // The picker frame, wrapper, and box
    frame: "picker__frame",
    wrap: "picker__wrap",
    box: "picker__box",
    // The picker header
    header: "picker__header",
    // Month navigation
    navPrev: "picker__nav--prev",
    navNext: "picker__nav--next",
    navDisabled: "picker__nav--disabled",
    // Month & year labels
    month: "picker__month",
    year: "picker__year",
    // Month & year dropdowns
    selectMonth: "picker__select--month",
    selectYear: "picker__select--year",
    // Table of dates
    table: "picker__table",
    // Weekday labels
    weekdays: "picker__weekday",
    // Day states
    day: "picker__day",
    disabled: "picker__day--disabled",
    selected: "picker__day--selected",
    highlighted: "picker__day--highlighted",
    now: "picker__day--today",
    infocus: "picker__day--infocus",
    outfocus: "picker__day--outfocus",
    // The picker footer
    footer: "picker__footer",
    // Today, clear, & close buttons
    buttonClear: "picker__button--clear",
    buttonClose: "picker__button--close",
    buttonToday: "picker__button--today",
  },
});
/*!
 * MARCAÇÃO DA CONSULTA - VALIDATE FORM
 */
function validateFormConsulta() {
  formData = {
    name: $("input[name=name]").val(),
    email: $("input[name=email]").val(),
    tele: $("input[name=tele]").val(),
    date: $("input[name=date]").val(),
    message: $("textarea[name=message]").val(),
  };
  $.ajax({
    url: "consulta.php",
    beforeSend: function () {
      $("#loading").fadeIn(500);
    },
    complete: function () {
      $("#loading").fadeOut(500);
    },
    type: "POST",
    data: formData,
    success: function (data, textStatus, jqXHR) {
      if (data.code) {
        $("#status_consulta").removeClass("alert-danger").addClass("alert-success").text(data.message);
        $("#status_consulta").slideDown(400).removeClass("d-none").delay(5000).slideUp(400);
        $("#consulta-form").closest("form").find("input[type=text], textarea").val("");
      } else {
        $("#status_consulta").removeClass("alert-success").addClass("alert-danger").text(data.message);
        $("#status_consulta").slideDown(400).removeClass("d-none").delay(5000).slideUp(400);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#status_consulta").addClass("alert-success");
      $("#status_consulta").text(jqXHR);
    },
  });
}
/*!
 * CONTACTO - VALIDATE FORM
 */
function validateFormContacto() {
  formData = {
    nameC: $("input[name=nameC]").val(),
    emailC: $("input[name=emailC]").val(),
    teleC: $("input[name=teleC]").val(),
    subjectC: $("input[name=subjectC]").val(),
    messageC: $("textarea[name=messageC]").val(),
  };
  $.ajax({
    url: "contacto.php",
    beforeSend: function () {
      $("#loading").fadeIn(500);
    },
    complete: function () {
      $("#loading").fadeOut(500);
    },
    type: "POST",
    data: formData,
    success: function (data, textStatus, jqXHR) {
      if (data.code) {
        $("#status_contacto").removeClass("alert-danger").addClass("alert-success").text(data.message);
        $("#status_contacto").slideDown(400).removeClass("d-none").delay(5000).slideUp(400);
        $("#contacto-form").closest("form").find("input[type=text], textarea").val("");
      } else {
        $("#status_contacto").removeClass("alert-success").addClass("alert-danger").text(data.message);
        $("#status_contacto").slideDown(400).removeClass("d-none").delay(5000).slideUp(400);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#status_contacto").addClass("alert-success");
      $("#status_contacto").text(jqXHR);
    },
  });
}
/*!
 * PARALLAX INIT
 */
$(".jarallax").jarallax({
  speed: 0,
});
/*!
 * TEAM CAROUSSEL
 */
$(".carousel.carousel-multi-item.v-2 .carousel-item").each(function () {
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));
  for (var i = 0; i < 7; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));
  }
});
/*!
 *  CAROUSSEL TIMER
 */
$(".carousel").carousel({
  interval: 7000,
});
/*!
 * LIGHBOX INIT
 */
$(function () {
  $("#lightbox_mascotes").load("addons/lightbox.html");
});
$(function () {
  $("#lightbox_gal").load("addons/lightbox.html");
});
/*!
 * SHARE TO ANY SOCIAL NETWORK INIT
 */
var a2a_config = a2a_config || {};
a2a_config.locale = "pt-PT";
/*!
 * HEART LIKES BUTTON INIT
 */
(function (d, e, s) {
  if (d.getElementById("likebtn_wjs")) return;
  a = d.createElement(e);
  m = d.getElementsByTagName(e)[0];
  a.async = 1;
  a.id = "likebtn_wjs";
  a.src = s;
  m.parentNode.insertBefore(a, m);
})(document, "script", "//w.likebtn.com/js/w/widget.js");
/*!
 * MAKE NAVBAR SHINE ATIVE ELEMENTS
 */
var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("nav-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
