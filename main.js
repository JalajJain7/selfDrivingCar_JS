const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=1000;
const cars=generateCars(N);
let bestCar = cars[0];


//  DOWNLOAD BEST BRAIN TO USE LATER

function getBestBrain(){
    var data = JSON.parse(localStorage.getItem("bestBrain"));

    var fileName = 'myData.json';
    
    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(data)], {
        type: 'application/json'
    });
    
    // Save the file
    saveAs(fileToSave, fileName);
}


// USE BEST BRAIN FROM JSON

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
function setBestBrain()
{
    readTextFile("myData.json", function(text){
    // var data = JSON.parse(text);
    // console.log(data);
    localStorage.setItem("bestBrain",text);
    // alert("Refresh the page to see the results");
    location.reload();
    // localStorage.setItem("bestBrain", data);
    });
}


if(localStorage.getItem("bestBrain")){
    const n1 = Math.floor(N/3);
    // n1 = Math.floor(n1-1);
    for(let i=0;i<n1;i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));

        if(i!=0){
            // console.log(acc);
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
    for(let i=n1;i<2*n1;i++){

        if(i!=0){
            // console.log(acc);
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }

        
    }
    for(let i=2*n1;i<cars.length;i++){


        if(i!=0){
            // console.log(acc);
            NeuralNetwork.mutate(cars[i].brain,1);
        }

    }



    // for(let i=0;i<cars.length;i++){
    //     cars[i].brain = JSON.parse(
    //         localStorage.getItem("bestBrain"));

    //     if(i!=0){
    //         // console.log(acc);
    //         NeuralNetwork.mutate(cars[i].brain,acc);
    //     }
    // }
    
}
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",1,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",0,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",1,getRandomColor()),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-800,30,50,"DUMMY",1,getRandomColor()),
    new Car(road.getLaneCenter(1),-800,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1000,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(3),-1000,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1200,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(3),-1200,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(3),-1200,30,50,"DUMMY",1,getRandomColor()),
    new Car(road.getLaneCenter(3),-1200,30,50,"DUMMY",1,getRandomColor()),
    new Car(road.getLaneCenter(1),-1300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1400,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-1500,30,50,"DUMMY",2,getRandomColor()),

    new Car(road.getLaneCenter(2),-1600,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-1600,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1800,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(3),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(5),-2100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-2200,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(0),-2200,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(2),-2300,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(1),-2300,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(0),-2200,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(2),-2100,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(2),-2400,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(5),-2300,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(9),-2500,30,50,"DUMMY",2,getRandomColor()),
    // new Car(road.getLaneCenter(0),-2600,30,50,"DUMMY",2,getRandomColor()),
];

animate();


function save() {
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars = [];
    for(let i=1;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }

    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    // car.update(road.borders,traffic);

    bestCar = cars.find(
        c=> c.y == Math.min(
            ...cars.map(c=> c.y)
            
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }

    carCtx.globalAlpha = 0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx,"blue",true);
    // car.draw(carCtx,"blue");

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}