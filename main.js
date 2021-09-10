
status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("number_of_objects").innerHTML="Number of objects detected: "+objects.length;            
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}

function modelLoaded(){
    console.log("COCOSSD is initialized");
    status=true;

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}