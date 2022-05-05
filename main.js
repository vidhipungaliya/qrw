Perfect_song = "";
Alone_song = "";
rightWrist_x = 0;
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_perfect = "";
song_alone = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Perfect_song = loadSound("perfect.mp3");
    Alone_song = loadSound("alone.mp3");
}

function draw(){
    image(video , 0 , 0 , 600 , 530);

    fill("#FF0000");
    stroke("#FF0000");

    song_perfect = Perfect_song.isPlaying();
    console.log(song_perfect);

    song_alone = Alone_song.isPlaying();
    console.log(song_alone);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x , leftWrist_y , 20);
        Alone_song.stop();
        if(song_perfect == false){
            Perfect_song.play();
        }
        else{
            console.log("Song Name: Perfect Song");
            document.getElementById("song_id").innerHTML = "Song Name : Perfect Song";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x , rightWrist_y , 20);
        Perfect_song.stop();
        if (song_alone == false){
            Alone_song.play();
        }
        else{
            console.log("Song Name : Alone Song");
            document.getElementById("song_id").innerHTML ="Song Name : Alone Song";
        }
    }

    
}

function modelLoaded(){
    console.log("Posenet is Intialized");

}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" lefttWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+ "rightWrist_y = "+rightWrist_y);
        
    }
}

