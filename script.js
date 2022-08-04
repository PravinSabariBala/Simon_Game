const buttoncolors=["red","blue","green","yellow"];

let gamepattern=[];
let userclickedpattern=[];

let started=false;
let level=0;

document.addEventListener("keypress",()=>{
    if(!started){
        document.getElementById("leveltitle").innerText=`Level ${level}`;
        started=true;//startgame
        nextSequence();
    }
});

document.querySelectorAll(".btn").forEach((item)=>{
    item.addEventListener("click",(event)=>{
        let userchosencolor=event.target.id;
        userclickedpattern.push(userchosencolor);
        animatepress(userchosencolor);
        playsound(userchosencolor);
        checkanswer(userclickedpattern.length-1);
    })
})


function checkanswer(currentlevel){
    if(gamepattern[currentlevel]==userclickedpattern[currentlevel]){
        if(userclickedpattern.length === gamepattern.length){
            setTimeout(()=>{
                nextSequence()
            },1000)
        }

    }
    else{
        playsound("wrong");
        document.querySelector("body").classList.add("gameover");
        document.getElementById("leveltitle").innerText=
        "Game Over, Press any key to restart";
        setTimeout(()=>{
            document.querySelector("body").classList.remove("gameover");
        },200)
        startover();
    }
}

function fadein(time,id){
    let fade=document.getElementById(id);
    setTimeout(() => {
        fade.style.opacity=0.1
    }, time);
}

function fadeout(time,id){
    let fade=document.getElementById(id);
    setTimeout(() => {
        fade.style.opacity=1
    }, time);
}

function nextSequence(){
    userclickedpattern=[];
    level++;
    document.getElementById("leveltitle").innerText=`Level ${(level)}`;
    let randomnumber=Math.floor(Math.random()*4);//random generates a number btwn 0&1
    let randomchosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);
    fadein(100,randomchosencolor);
    fadeout(200,randomchosencolor);

    playsound(randomchosencolor); 
}
function playsound(name){
    let audio=new Audio(name+".mp3");
    audio.play();
}
function animatepress(color){
    document.getElementById(color).classList.add("pressed");
    setTimeout(()=>{
        document.getElementById(color).classList.remove("pressed");
    },100)
}

function startover(){
    level=0
    started=false
    gamepattern=[]
    
}