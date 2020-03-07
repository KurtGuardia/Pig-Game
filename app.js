var scores, roundScore, activePlayer, gamePlaying, goal;

initialize();

//ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'Dices/dado-' + dice + '.png';
        diceDOM2.src = 'Dices/dado-' + dice2 + '.png';

        //3. update the round score IF the rolled number is not a 1
        if(dice !== 1 && dice2 !== 1) {
            //Add score
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//HOLD BUTTON
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
       //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        //Check if the player won the game
        if(scores[activePlayer] >= goal) {
            //The player won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        } 
    }
})

//NEW GAME BUTTON
document.querySelector('.btn-new').addEventListener('click', initialize)

//Switch players
var nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

//Initialize 
function initialize() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');       //Se quita antes de volver a ser agregada la clase .active, porque si el player 0 fue ganador y le agregamos le duplicamos esa clase
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;

    //To set goal
    if(document.querySelector('.setGoal').value) {
        return goal = document.querySelector('.setGoal').value
    } else {
        return goal = 100;
    }

}

