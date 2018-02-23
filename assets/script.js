function fill_length(){
    let select = document.getElementById("pass_length");
    for(let i = 6; i < 33; i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }
}

function postData(e){
    e.preventDefault();  
    var s = document.getElementById("pass_length");
    var pass_length = s.options[s.selectedIndex].text;
    var pass_symbol = document.getElementById("pass_symbol").checked;
    var pass_number = document.getElementById("pass_number").checked;
    var pass_low = document.getElementById("pass_low").checked;
    var pass_high = document.getElementById("pass_high").checked;
    var ex_pass_char = document.getElementById("ex_pass_char").checked;
    var ex_pass_amb = document.getElementById("ex_pass_amb").checked;
    
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var numbers = "1234567890";
    var symbols = "!@#$%^&*()_+~`|{}[]\\/?:;<>,.-=";
    var not_amb = "!@#$%^&*_+|?-=";
    var random_pass = "", character = "", previous = "";

    if((!pass_symbol && !pass_number && !pass_low && !pass_high)){
        alert("Please select the requirements of your password!");
    }else{

        while(random_pass.length < pass_length){
            
            //prepare random characters
            var letter_choice = Math.ceil(letters.length * Math.random()*Math.random());
            var number_choice = Math.ceil(numbers.length * Math.random()*Math.random());
            var symbols_choice = Math.ceil(symbols.length * Math.random()*Math.random());
            var not_amb_choice = Math.ceil(not_amb.length * Math.random()*Math.random());

            //symbols condition
            if(pass_symbol && ex_pass_amb){
                if(character.length < pass_length){
                    character += not_amb.charAt(not_amb_choice);
                }
                
            } else if(pass_symbol){
                if(character.length < pass_length){
                    character += symbols.charAt(symbols_choice);
                }
            }

            //number condition
            if(pass_number){
                if(character.length < pass_length){
                    character += numbers.charAt(number_choice);
                }
            }
            //uppercase and lowercase conditions
            
            if(pass_low && pass_high){
                var holder = letters.charAt(letter_choice);
                holder = (letter_choice%2==0)?(holder.toUpperCase()):(holder);
                
                if(previous != ""){
                    if(previous.match(/[ABCDEFGHIJKLMNOPQESTUVWXYZ]/g)){
                        holder = holder.toLowerCase();
                    }
                    else if(previous.match(/[abcdefghijklmnopqrstuvwxyz]/g)){
                        holder = holder.toUpperCase();
                    }
                }
                previous = holder;
                if(character.length < pass_length){
                    character += holder;
                }
            }
            else if(pass_high){
                if(character.length < pass_length){
                    character += letters.charAt(letter_choice).toUpperCase();
                }
            } else if(pass_low){
                if(character.length < pass_length){
                    character += letters.charAt(letter_choice);
                }
            }
            
            random_pass = character;
            
            if(ex_pass_char){
                var splitChar = random_pass.split("");
                for(var i =0; i < splitChar.length; i++){
                    
                    if(splitChar[i] ==  splitChar[i+1]){
                        var checker = checkCharacter(splitChar[i]);
                        //changing characters if similar
                        if(checker == "letter"){
                            if(pass_low && pass_high){
                                var holder = letters.charAt(letter_choice);
                                holder = (letter_choice%2==0)?(holder.toUpperCase()):(holder);

                                if(holder == splitChar[i]){
                                    var myNewChoice = Math.ceil(numbers.length * Math.random()*Math.random());
                                    holder = letters.charAt(myNewChoice);
                                }
                                splitChar[i] = holder;
                            }
                            else if(pass_high){
                                var highChoice = Math.ceil(letters.length * Math.random()*Math.random());
                                if(numbers.charAt(highChoice) == splitChar[i]){
                                    highChoice = Math.ceil(letters.length * Math.random()*Math.random());
                                }
                                splitChar[i] = letters.charAt(highChoice).toUpperCase;
                            } else if(pass_low){
                                var lowChoice = Math.ceil(letters.length * Math.random()*Math.random());
                                if(numbers.charAt(lowChoice) == splitChar[i]){
                                    lowChoice = Math.ceil(letters.length * Math.random()*Math.random());
                                }
                                alert(splitChar[i]);
                                splitChar[i] = letters.charAt(lowChoice);
                            }
                        }
                        
                        else if(checker == "number"){
                            var me = Math.ceil(numbers.length * Math.random()*Math.random());
                            if(numbers.charAt(me) == splitChar[i]){
                                me = Math.ceil(numbers.length * Math.random()*Math.random());
                            }
                            splitChar[i] = numbers.charAt(me);
                        }
                        
                        else if(checker == "character"){
                            if(pass_symbol && ex_pass_amb){
                                var notAmbNew = Math.ceil(not_amb.length * Math.random()*Math.random());
                                if(not_amb.charAt(notAmbNew) == splitChar[i]){
                                    notAmbNew = Math.ceil(not_amb.length * Math.random()*Math.random());
                                }
                                splitChar[i] = not_amb.charAt(notAmbNew);
                            } else if(pass_symbol){
                                var symbolNew = Math.ceil(symbols.length * Math.random()*Math.random());
                                if(symbols.charAt(symbolNew) == splitChar[i]){
                                    symbolNew = Math.ceil(symbols.length * Math.random()*Math.random());
                                }
                                splitChar[i] = symbols.charAt(symbolNew);
                            }
                        }
                    }
                }

                character = splitChar.join("");
            }
            
                    
        }
        var shuffled = random_pass.split('').sort(function(){return 0.5-Math.random()}).join('');
        document.getElementById("p2").style.visibility = "visible";
        document.getElementById("myPass").value = shuffled;
        var equiv = shuffled.split("");
        var temp ="";
        var letterDesc = "";
        loadJSON(function(response) {
        for(var i = 0; i < equiv.length; i++){
            var lett = equiv[i].toLowerCase();
            var me2 = equiv[i];
            
                // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
                    for(var j = 0; j < actual_JSON.length; j++){
                        
                        if(lett == actual_JSON[j].letter){
                            if(me2.match(/[ABCDEFGHIJKLMNOPQESTUVWXYZ]/g)){
                                equiv[i] = actual_JSON[j].description.toUpperCase();
                            }
                            else if(me2.match(/[abcdefghijklmnopqrstuvwxyz]/g)){
                                equiv[i] = actual_JSON[j].description.toLowerCase();
                            }

                            
                        }
                        equiv[i] += " ";
                    }
            }
            letterDesc = equiv.join("");
            document.getElementById("p1").style.visibility = "visible";
            document.getElementById("rem").innerHTML = letterDesc;
        });
    }
}

function checkCharacter(character){
    var result = "";
    
    if(character.match(/[abcdefghijklmnopqrstuvwxyz]/g)){
        result = "letter";
    }else if(character.match(/[1234567890]/g)){
        result = "number";
    }else if(character.match(/[!@#$%^&*()_+~`|?.,-=<>:{}[\]\\/;]/g)){
        result = "character";
    }
    return result;
}


function loadJSON(callback) {   

    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType("application/json");
    xhttp.open('GET', 'assets/equivalent.json', true);
    xhttp.onreadystatechange = function () {
          if (xhttp.readyState == 4 && xhttp.status == "200") {
            callback(xhttp.responseText);
          }
    };
    xhttp.send(null);  
 }