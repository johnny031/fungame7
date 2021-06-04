let names = [];
let current_player = 0;
let current_topic = 0;
let interval;
let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "W",
];
let mandarin = [
  "ㄅ",
  "ㄆ",
  "ㄇ",
  "ㄈ",
  "ㄉ",
  "ㄊ",
  "ㄋㄌ",
  "ㄖ",
  "ㄍ",
  "ㄎ",
  "ㄏ",
  "ㄐ",
  "ㄑ",
  "ㄒ",
  "ㄓㄗ",
  "ㄔㄘ",
  "ㄙㄕ",
  "一",
  "ㄨ",
  "ㄩ",
];
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function input_show() {
  let numbers = $("#number").val();
  if (numbers < 2 || numbers > 8) {
    alert("遊戲人數需介於2至8人之間");
    return false;
  } else {
    $("#number_button").prop("disabled", true);
  }
  $("#names_title").show();
  $("#start_button").show();
  for (let i = 0; i < numbers; i++) {
    var input = document.createElement("input");
    input.type = "text";
    input.name = "n";
    input.className = i;
    input.style.display = "block";
    input.style.margin = "10px";
    input.style.padding = "5px";
    $("#input_div").append(input);
  }
  shuffle(topics);
  $("#topic").html(topics[current_topic]);
}
function start() {
  let empty = false;
  $('#input_div input[type="text"]').each(function () {
    if ($(this).val() === "") {
      alert("玩家名稱請勿空白");
      empty = true;
      return false;
    }
  });
  if (empty) {
    return false;
  }
  $('input[name^="n"]').each(function () {
    names.push($(this).val());
  });
  for (let i = 0; i < 5; i++) {
    let div_row = document.createElement("div");
    div_row.className = "row";
    for (let j = 0; j < 4; j++) {
      let div_col = document.createElement("div");
      let btn = document.createElement("button");
      btn.setAttribute("disabled", "disabled");
      btn.className = "letter_button";
      let span_man = document.createElement("span");
      span_man.className = "mandarin";
      span_man.innerHTML = mandarin[i * 4 + j];
      let span_eng = document.createElement("span");
      span_eng.className = "letter";
      span_eng.innerHTML = letters[i * 4 + j];
      let br = document.createElement("br");
      btn.append(span_man);
      btn.append(br);
      btn.append(span_eng);
      div_col.append(btn);
      div_row.append(div_col);
    }
    $(".button_div").append(div_row);
  }
  let div_row = document.createElement("div");
  div_row.className = "row";
  let start = document.createElement("button");
  start.setAttribute("id", "round_start");
  start.innerHTML = "開始";
  div_row.append(start);
  $(".main_div").append(div_row);
  for (let i = 0; i < $("#number").val(); i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.innerHTML = names[i];
    td2.style.position = "relative";

    let btn_minus = document.createElement("button");
    let icon_minus = document.createElement("i");
    let div_score = document.createElement("div");
    let btn_plus = document.createElement("button");
    let icon_plus = document.createElement("i");
    btn_minus.className = "minus";
    icon_minus.className = "icon_minus fas fa-minus " + i;
    div_score.innerHTML = 0;
    div_score.setAttribute("id", "score" + i);
    btn_plus.className = "plus";
    icon_plus.className = "icon_plus fas fa-plus " + i;
    btn_minus.append(icon_minus);
    btn_plus.append(icon_plus);

    td2.append(btn_minus);
    td2.append(div_score);
    td2.append(btn_plus);
    tr.append(td1);
    tr.append(td2);
    $("#board").append(tr);
  }
  $("#current_player").html(names[current_player]);
  build_players_div();
  $(".setting_div").hide();
  $(".main_div").show();
}
$(document).on("click", "#change_topic", function () {
  current_topic++;
  $("#topic").html(topics[current_topic]);
});
$(document).on("click", "#board_button", function () {
  $("#board_div").slideToggle();
});
$(document).on("click", "#round_start", function () {
  $(".letter_button").prop("disabled", false);
  $(this).prop("disabled", true);
  $(".players_div > ol").children().eq(current_player).addClass("current");
  startTimer(9);
  $("#left_time").slideDown();
});
$(document).on("click", ".letter_button", function () {
  $(this).prop("disabled", true);
  current_player++;
  if (current_player == $("#number").val()) {
    current_player = 0;
  }
  $("#current_player").html(names[current_player]);
  update_players_div();
  clearInterval(interval);
  $("#time").text("10");
  startTimer(9);
});
$(document).on("click", ".icon_minus", function () {
  let minus = $("#score" + $(this).attr("class").slice(-1)).text();
  minus--;
  $("#score" + $(this).attr("class").slice(-1)).text(minus);
});
$(document).on("click", ".icon_plus", function () {
  let plus = $("#score" + $(this).attr("class").slice(-1)).text();
  plus++;
  $("#score" + $(this).attr("class").slice(-1)).text(plus);
});
function startTimer(duration) {
  $("#time").text("10");
  let timer = duration,
    seconds;
  interval = setInterval(function () {
    seconds = parseInt(timer % 60, 10);

    seconds = seconds < 10 && seconds >= 0 ? "0" + seconds : seconds;

    $("#time").text(seconds);

    if (--timer < -1) {
      // clearInterval(interval);
      // lose_point();
      // $("#time").text("10");
    }
  }, 1000);
}
function lose_point() {
  alert("時間到！" + names[current_player] + "扣一分");
  let minus = $("#score" + current_player).html();
  minus--;
  $("#score" + current_player).html(minus);
  current_topic++;
  $("#topic").html(topics[current_topic]);
  $("#left_time").slideUp();
  $(".letter_button").prop("disabled", true);
  $("#round_start").prop("disabled", false);
  $(".current").removeClass();
}
function adjust() {
  $(".minus, .plus").toggle();
}

// temp
function over() {
  clearInterval(interval);
  lose_point();
  $("#time").text("10");
}

function build_players_div() {
  for (let i = 0; i < names.length; i++) {
    $(".players_div > ol").append("<li><h3>" + names[i] + "</h3></li>");
  }
}

function update_players_div() {
  $(".current").attr("class", "temp")
  if ($(".temp").next().length === 0) {
    $(".temp").siblings().first().addClass("current");
  } else {
    $(".temp").next().addClass("current");
  }
  $(".temp").removeClass();
}