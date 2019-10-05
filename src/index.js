import * as PIXI from 'pixi.js';
import Station from './core/station';
import Transition from './core/transition';


let canvas = document.body;

let app = new PIXI.Application({width:1000,height:1000,backgroundColor:0xffffff});

canvas.appendChild(app.view);
    
let container = new PIXI.Graphics();

app.stage.addChild(container);




const  CircleBranches = {
    drawFirstCircle(){
        container.lineStyle(15,0x8d533b,1);
        container.drawCircle(500,500,210);
        this.createFirstPoints();
    },
    createFirstPoints(){
        let angle = 180;
        for(let i = 1;i<13;i++)
        {
            let x = Math.cos(angle*Math.PI/180)*210+500,
                y = Math.sin(angle*Math.PI/180)*210+500;
            let station = new Station(x,y);
            station = station.setBorderColor(0x8d533b)
                .addPopup()
                .build();
            app.stage.addChild(station);
            angle+=30;
        }
    }


}
CircleBranches.drawFirstCircle();

let point1 = new Station(500,500,'Курская'),
    point2 = new Station(500,525,'Красные ворота'),
    point3 = new Station(500,550,'Театральная'),
    point4 = new Station(500,575,'Динамо');
    
let p = point1.setBorderColor(0x8d533b).build();
let p2 = point2.setBorderColor(0xff0000).build();
let p3 = point3.setBorderColor(0x029a55).build();
let p4 = point4.setBorderColor(0x029a55).build();
// console.log(p2);

let transiotion = new Transition([point4,point2,point1,point3]);

let test = transiotion.build();
// console.log(test);
app.stage.addChild(test);
let rect  = new PIXI.Graphics();
rect.lineStyle(1,0x000000,1);
rect.drawRoundedRect(100,100,100,50,10);

let textSample = new PIXI.Text('Pixi.js can has', {fill: "silver",fontSize: 10});
textSample.position = {x : 120,y:120};
app.stage.addChild(rect);
app.stage.addChild(textSample);
