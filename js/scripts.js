$(document).ready(function(){
		// console.log("Sanity Check");
		// -------------------------------
		// ------MAIN function vars-------
		// -------------------------------
	const freshDeck = createDeck();
	var theDeck = freshDeck;
	// console.log(freshDeck);
	var playersHand = []; //same as player1squares in tic tac toe
	var dealersHand = [];

	function createDeck(){
		// local var, newDeck. No one knows about this but me (created by me)
		var newDeck = [];
		// local var that WILL NOT be changed, no one can see it but me
		const suits = ['h', 's', 'd', 'c'];
		// loop for suits (outter loop)
		for(let s = 0; s < suits.length; s++){
			// loop for card values (inner loop)
			for(let c = 1; c <= 13; c++){
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}

	$('.deal-button').click(function(){
		console.log("user clicked deal");
		reset();
		theDeck = shuffleDeck();
		// the deck is now shuffled big time!
		// update the player and dealers hand	
		// The player always gets the first card in the deck
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		console.log(theDeck.length);
		placeCard('player',1, playersHand[0])
		placeCard('dealer',1, dealersHand[0])
		placeCard('player',2, playersHand[1])
		placeCard('dealer',2, dealersHand[1])

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');

	});


	$('.hit-button').click(function(){		
		console.log("user clicked hit");
		playersHand.push(theDeck.shift());
		placeCard('player',playersHand.length,playersHand[playersHand.length-1]);
		calculateTotal(playersHand,'player');

	});

	$('.stand-button').click(function(){
		// console.log("user clicked on stand");
		// what happens to the when they stand?
		// Nothing!
		// rules of blackjack for dealer:
		// -if i have less than 17, I MUST hit
		// -if i have 17 or more I CANNOT hit
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		console.log(dealerTotal);
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			placeCard('dealer',dealersHand.length,dealersHand[dealersHand.length-1]);
			calculateTotal(dealersHand,'player');
			dealerTotal = calculateTotal(dealersHand, 'dealer');
		}
		checkWin();
	})

	function checkWin(){
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		
		// if player > 21 ... player busts and loses
		// if dealer > 21....dealer bustsand loses
		// if playersHand.length = 2 AND playerTotal = 21...blackjack
		// if dealersHand.length = 2 AND dealerTotal = 21...Blackjack
		// if player > dealer ... player wins
		// if dealer >player...dealer wins
		// else....tie 

	}

	function calculateTotal(hand,who){
		// console.log(hand);
		// init total at 0
		var total = 0;
		// create a temp value for this cards value
		var thisCardValue = 0;
		// loop through the hand (array)
		// grab the number in the element and add it to the total 
		for(let i =0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			// console.log(thisCardValue);
			total += thisCardValue;
		}
		console.log(total);
		var classSelector = '.' + who + '-total';
		$(classSelector).html(total);
		return total;
	}

	function placeCard(who,where,cardToPlace){
		var classSelector = '.' + who + '-cards .card-' + where;
		console.log(classSelector);
		$(classSelector).html('<img src="cards/'+cardToPlace+'.png">');
	}

	function shuffleDeck(){
		// loop a big number of times.
		// ezch time through, switch two elements in the array.
		// when loop is done, array will be shuffled
		for(let i = 0; i < 50000; i++){
			var randomCard1 = Math.floor(Math.random() * theDeck.length);
			var randomCard2 = Math.floor(Math.random() * theDeck.length);
			// switch theDeck[randomCard1] with theDeck[randomCard2]
			// stash the value of theDeck[randomCard1] in temp so we can 
			// get it back
			var temp = theDeck[randomCard1];
			// now its safe to overwrite theDeck[randomCard1] because
			// we stashed its vale in temp
			theDeck[randomCard1] = theDeck[randomCard2];
			// now we are ready to overwrite theDeck[randomCard2]
			// we will use theDeck[randomCard1], which we stashed in temp
			theDeck[randomCard2] = temp;
		}
		return theDeck;
	}
	
	function reset(){
		theDeck = freshDeck;
		playersHand = [];
		dealersHand = [];
		$('.card').html('');
		playerTotal = calculateTotal(playersHand,'player');
		dealerTotal = calculateTotal(dealersHand,'dealer');
	}

});
// this error!!!
// console.log(createDeck);


