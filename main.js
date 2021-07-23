noseX = 0;
noseY = 0;
difference = 0;
leftwristX = 0;
rightwristX = 0;

function preload(){}

function setup() 
{
    video = createCapture(VIDEO);
    video.size(560, 500);

    canvas = createCanvas(560, 400);
    canvas.position(600, 140);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotFixed);
}

function draw() 
{
    background("#ff0000");

    fill("#000000");
    stroke("yellow-green");
    square(noseX, noseY, difference);
    document.getElementById("square_size").innerHTML = difference;
}
 
function modelLoaded()
{
    console.log("Model Loaded");
}

function gotFixed(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        console.log("Left wrist X = " + leftwristX + "Right wrist X = " + rightwristX);
        difference = ceil(leftwristX - rightwristX);
        console.log(difference);
    }
}