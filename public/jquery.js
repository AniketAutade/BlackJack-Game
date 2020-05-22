// All the functions
function start_game() {
  setTimeout(function() {
    $(".start_button").hide();
    $(".dealer").removeClass("gamebegin");
    $(".player1").removeClass("gamebegin");
    initial_deal();
    setTimeout(function() {
      if (sum_play2 == 21 && player_cards.length == 2) {
        $(".result h1").text("Congratulations, Its BlackJack!!!");
        restart_game();
      }
    }, 500)
  })
};

function restart_game() {
  $(".result").removeClass("gameresult");
  $(".result").click(function() {
    restart_before();
  });
}

// Sound Animations:
function makesound(key) {
  switch (key) {
    case "start_button":
      var initial_deal = new Audio("/sounds/card_shuffle.wav");
      initial_deal.play();
      break;

    case "Draw":
      var initial_deal = new Audio("sounds/card_shuffle.wav");
      initial_deal.play();
      break;

    default:
  }
}

//Initial Deal (Every Player gets 1st card, then bank gets the 1st card and every player gets the second card)
let card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let card_types = ["D", "H", "S", "C"];

var player_cards = [];
var sum_play1 = 0;
var sum_play2 = 0;
var div_name = "";
var sum_deal = 0;
var sum_deal2 = 0;
var dealer_cards = [];
restart = false;


    // Player Card
function player_getCardinfo() {
  let randomnumber1 = Math.floor(((Math.random() * 13)));
  let randomnumber2 = Math.floor(((Math.random() * 4)));
  if (randomnumber1 >= 9) {
    sum_play1 = sum_play1 + 10;
    sum_play2 = sum_play2 + 10;
  } else if (randomnumber1 == 0) {
    sum_play1 = sum_play1 + 1;
    sum_play2 = sum_play2 + 11;
  } else {
    sum_play1 = sum_play1 + card[randomnumber1];
    sum_play2 = sum_play2 + card[randomnumber1];
  }
  let player1_nextcard = card[randomnumber1] + card_types[randomnumber2];
  player_cards.push(player1_nextcard);
  // Adding Images to the index.html page with just div available with no visibility to user
  console.log(player_cards[player_cards.length - 1]);
  div_name = ".div_positioning_card" + player_cards.length;
  let img_address = "Cards/" + player_cards[player_cards.length - 1] + ".png"

  if (sum_play1 <= 10 && sum_play2 > 11 && sum_play2 < 22) {
    return [img_address, div_name, sum_play2];
  }
  else {return [img_address, div_name, sum_play1];
}
}

function player_getcard() {
  let player_cardinfo = player_getCardinfo();
  console.log(player_cardinfo);
  var image = document.createElement("IMG");
  image.alt = "Alt information for image";
  image.setAttribute('class', 'photo');
  image.src = player_cardinfo[0];
  $(player_cardinfo[1]).html(image);
}


    // Dealer Card
function dealer_getCardinfo() {
  let randomnumber1 = Math.floor(((Math.random() * 13)));
  let randomnumber2 = Math.floor(((Math.random() * 4)));
  if (randomnumber1 >= 9) {
    sum_deal = sum_deal + 10;
    sum_deal2 = sum_deal2 + 10;
  } else if (randomnumber1 == 0) {
    sum_deal = sum_deal + 1;
    sum_deal2 = sum_deal2 + 11;
  } else {
    sum_deal = sum_deal + card[randomnumber1];
    sum_deal2 = sum_deal2 + card[randomnumber1];
  }
  console.log(randomnumber1)
  var dealer_nextcard = card[randomnumber1] + card_types[randomnumber2];
  dealer_cards.push(dealer_nextcard);
  // Adding Images to the index.html page with just div available with no visibility to user
  div_name = ".div_positioning_dealer_card" + dealer_cards.length;
  let img_address = "Cards/" + dealer_cards[dealer_cards.length - 1] + ".png"
  return [img_address, div_name, sum_deal];
}

function dealer_getcard() {
  let dealer_cardinfo = dealer_getCardinfo();
  console.log(dealer_cardinfo);
  var image = document.createElement("IMG");
  image.alt = "Alt information for image";
  image.setAttribute('class', 'photo');
  image.src = dealer_cardinfo[0];
  $(dealer_cardinfo[1]).html(image);
}

// Initial deal (This is step where every player get his first card and then bank gets another card and players gets another card. Then dealer
//  asks to every player if they would like to draw another card or stay at the sum)
function initial_deal() {
  player_getcard();
  dealer_getcard();
  player_getcard();
}

function restart_before() {
  for (i = 1; i <= player_cards.length; i++) {
    $("img").remove();
  }
  $(".result").addClass("gameresult");
  $(".dealer").addClass("gamebegin");
  $(".player1").addClass("gamebegin");
  $(".start_button").show();
  window.player_cards = [];
  window.sum_play1 = 0;
  window.sum_play2 = 0;
  window.div_name = "";
  window.sum_deal = 0;
  window.sum_deal2 = 0;
  window.dealer_cards = [];
}


$(".start_button").click(function() {
  makesound(this.name);
  start_game();
});

$(".draw_button").click(function() {
  player_getcard();
  setTimeout(function() {
    if (sum_play1 > 21) {
      $(".result").removeClass("gameresult");
      restart_game();
    }
  }, 500);
});

$(".stop_button").click(function() {

  if (dealer_cards.length == 2 && sum_deal == 21) {
    if (sum_play1 == 21 && player_cards.length == 2) {
      restart_game();
      $(".result h1").text("Push");
    } else {
      restart_game();
      $(".result h1").text("Its BlackJack");
    }
  }

  while (sum_deal < 17) {
    dealer_getcard();
    if (sum_deal2 < 22 & sum_deal2 > 16) {
      break;
    }
  }

  setTimeout(function() {
    if (sum_deal > 21) {
      restart_game();
      $(".result h1").text("Player Wins");
    } else {
      if (sum_deal2 > 21) {
        if (sum_play1 > sum_deal) {
          restart_game();
          $(".result h1").text("Player Wins");
        } else if (sum_play1 == sum_deal) {
          restart_game();
          $(".result h1").text("Push");
        } else {
          restart_game();
          $(".result h1").text("Dealer wins");
        }
      } else {
        if (sum_play1 > sum_deal2) {
          restart_game();
          $(".result h1").text("Player Wins");
        } else if (sum_play1 == sum_deal2) {
          restart_game();
          $(".result h1").text("Push");
        } else {
          restart_game();
          $(".result h1").text("Dealer wins");
        }
      }
    }
  }, 1000)

});
