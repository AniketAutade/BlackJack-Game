// D is for diamonds, S is spades, C is for clubs and H is for hearts

    var card= [1,2,3,4,5,6,7,8,9,10,"J","Q","K"];
    var sum_player1=[];
    var cards_player1=[];
    var sum_dealer=[];
    var cards_dealer=[];
    var sum_play1=0;
    var sum_deal=0;

    exports.player1_nextcard= function player1_nextcard() {
      var randomnumber1 = Math.floor(((Math.random() * 13)));
      var randomnumber2 = Math.floor(((Math.random() * 4)));
      let deck=["D","H","S","C"];
      sum_player1.push(card[randomnumber1]);
    if (randomnumber1>10) {
      sum_play1= sum_play1 + 10;
    }
    else{
      sum_play1= sum_play1 + sum_player1[sum_player1.length-1];
        }
      var answer=card[randomnumber1] + deck[randomnumber2];
      cards_player1.push(answer);
      console.log(cards_player1[cards_player1.length-1]);
      return cards_player1[cards_player1.length-1];
    }


    exports.dealer_nextcard= function dealer_nextcard() {
      var randomnumber1 = Math.floor(((Math.random() * 13)));
      var randomnumber2 = Math.floor(((Math.random() * 4)));
      let deck=["D","H","S","C"];
      cards_dealer.push(card[randomnumber1])
    if (randomnumber1>10) {
      sum_deal= sum_deal + 10;
    }
    else{
      sum_deal= sum_deal + sum_dealer[sum_player1.length-1];
        }
      var answer=card[randomnumber1] + deck[randomnumber2];
      cards_dealer.push(answer);
      console.log(cards_dealer[cards_dealer.length-1]);
      return cards_dealer[cards_dealer.length-1];
    }
