var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;



document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

//ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function(){

    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'Dices/dado-' + dice + '.png';

    //3. update the round score IF the rolled number is not a 1
    if(dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer();
    }

});

//HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

    //Check if the player won the game
    if(scores[activePlayer] >= 10) {
        //The player won
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    } else {
        //Next player
        nextPlayer();
    }

})



//Switch players
var nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}