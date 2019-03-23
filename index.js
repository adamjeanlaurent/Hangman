/*
TODO
add animations 
limit amount of characters
*/
var j;
var word;
var wrong = 0;
var started = false;

document.addEventListener("keypress",function(event){
    if(started){
        checkInput(event.key);
    }
    else{
        gameStart();
    }
});

function checkInput(key){
    if(word.indexOf(key) === -1){   
        wrong++;
        document.querySelector(".counter").textContent = "Guesses Left: " + (6 - wrong);
        if(wrong === 6){
            lose();
        }
    }
    else{
        for(var i = 0; i < word.length; i++){
            if(key === word[i]){
                // document.querySelector(".spot" + i).classList.add("pressed");
                // j = i;
                // setTimeout(animate, 10); 
                document.querySelector(".spot" + i).textContent = word[i];
            }
        }
        if((checkForWin())){
            win();
        }
    }
}

function illegalCharacters(){
    if(word.length > 60){
        alert("Input string maximum length is 60 characters (including spaces)");
        return true;
    }
    if(word[0] === " "){
        alert("First character of input string cannot be a space");
        return true;
    }
    for(var i = 0; i < word.length; i++){
        var char = word.charCodeAt(i);
        if((65 > char || (char >  90 && char < 97) || (char > 122)) && char != 32){
            alert("Input String Contains Illegal Characters");
            return true;
        }
        if(word[i] === " " && word[i + 1] === " "){
            alert("Multiple Spaces in a row are illegal");
            return true;
        }
    }
    word = word.toLowerCase();
    return false;
}

function gameStart(){ 
    if(!started){
        word = prompt("Enter word/words");
        if(illegalCharacters()){
            gameStart();
        }
        else{
            document.querySelector(".counter").textContent = "Guesses Left: " + (6 - wrong);
            document.querySelector(".gameTitle").textContent = "Press The Key You Want To Guess!";
            wrong = 0;
            started = true;
            for(var i = 0; i < word.length; i++){
                var space = document.createElement("div");  
                var t = document.createTextNode("");
                space.appendChild(t);
                document.querySelector(".container").appendChild(space);
                if(word[i] != " "){
                    space.classList.add("gameSpace");
                    space.classList.add("spot" + i);
                }
                else{
                    space.classList.add("space");
                }
            }
        }
    }
}

function checkForWin(){
    for(var i = 0; i < word.length; i++){
        if(word[i] != " "){
            if(document.querySelector(".spot" + i).textContent != word[i]) return false;
        }
    }
    return true;
}

function win(){
    alert("You Win!");
    reset();
}

function lose(){
    alert("You Lose! The Correct Phrase Was: "+ word);
    reset();
}

function reset(){
    var parent = document.querySelector(".container");
    for(var i = 0; i < word.length; i++){
        if(word[i] != " "){
            var child = document.querySelector(".spot" + i);
            parent.removeChild(child); 
        }
    }
    var numOfSpaces = document.querySelectorAll(".space");
    for(var i = 0; i < numOfSpaces.length; i++){
        parent.removeChild(numOfSpaces[i]);
    }
    started = false;
    wrong = 0;
    word = "";
    document.querySelector(".gameTitle").textContent = "Press Any Key To Play!";
    document.querySelector(".counter").textContent = "Guesses Left:";
}


// function animate(){
//     document.querySelector(".spot" + j).classList.remove("pressed");
// }