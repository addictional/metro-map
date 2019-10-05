import * as PIXI from 'pixi.js';
import StationBuilder from './station';
import {Arc} from './utils/figures';
import { runInThisContext } from 'vm';

export default class Transition{
    /**
     * 
     * @param {Array.<StationBuilder>} stations 
     * 
     */
    constructor(stations = []){
        this.__points = stations;
        this.graphic = new PIXI.Graphics();
        this.radiusIncrease = 3;
        this.currentRadius = this.radiusIncrease;
        this.radiusActive = 4;
        '1.5708'; '6.28319'
    }

    /**
     * @returns {void}
     */
    fillPoints(){
        this.__points.forEach((point)=>{
            point.setBackroundColor(point.__borderColor)
                .setBorderColor(0x000000)
                .build();
        });
    }
    /**
     * @returns{void}
     */
    __createDoubleTransition(radius){
        let a = this.__points[0],
            b = this.__points[1],
            angle,z,h,            
            coordinates = [];
        angle = Math.atan2(b.y - a.y,b.x - a.x)*180/Math.PI;
        //Получаем точки первого полукруга в обратном направление
        z = Arc.createSemicircle(a.radius+this.currentRadius,angle,a.x,a.y,true);
        //Получаем точки второго полукруга 
        h = Arc.createSemicircle(b.radius+this.currentRadius,angle,b.x,b.y,false);
        while(h.length>0)
            z.push(h.shift());      
        return z;
    }


    setPopup(){
        this.graphic.interactive = true;
        this.graphic.buttonMode = true;
        0xd1d3d8
        this.graphic.on('mouseover', ()=>{
            this.currentRadius = this.radiusActive;
            this.rerender();
        })
            .on('mouseout', ()=>{
                this.currentRadius = this.radiusIncrease;
                this.rerender();
            });
        return this;
    }

    /**
     * @returns {void}
     */
    __createTransition(){

        let lastIndex = this.__points.length-1,
            coordinates = [],
            centroid = {x:0,y:0};
        //находим центральную точку многугольника    
        this.__points.forEach((point)=>{
            centroid.x += point.x;
            centroid.y +=point.y;
        });         
        centroid = {x: centroid.x/(lastIndex+1),y: centroid.y/(lastIndex+1)};
        //сортируем по полярной системе координат
        this.__points.sort((a,b)=>{
            let angle1,angle2;
            //находим углы м
            angle1 = Math.atan2(centroid.y - a.y,centroid.x-a.x);
            angle2 = Math.atan2(centroid.y - b.y,centroid.x-b.x);
            //приводим точки в подходящий для сравнения вид 
            if(angle1 < 0)
                angle1 +=6.28319;
            if(angle2 < 0)
                angle2 +=6.28319;
            return angle1<angle2 ? 1: -1;
        })  
        this.__points.forEach((point,index)=>{
            let angle1,angle2,arr = [],
                a,b,prevIndex,nextIndex;
            //Находим точки с которыми соединяется текущая точка    
            prevIndex = (index !== 0)?index-1: lastIndex;
            nextIndex = (index !== lastIndex)?index+1 : 0; 
            a = this.__points[prevIndex];
            b = this.__points[nextIndex];

            //находим углы текущей точки относительльно пред и след точки
            angle1 = Math.atan2(point.y-a.y,point.x-a.x)+6.28319+1.5708;
            angle2 = Math.atan2(point.y-b.y,point.x-b.x)+6.28319-1.5708;
            
            //создаём арку
            arr =Arc.create(angle1,angle2,point.radius+this.currentRadius,point.x,point.y);
            while(arr.length > 0)
                coordinates.push(arr.shift());    
        });
        return coordinates;
    }

    /**
     * @returns {PIXI.Graphics}
     */
    build(){
        let coordinates = [];
        this.graphic.lineStyle(2,0x000000,1);
        //в зависимости от количества точек вызываем разные функции
        if(this.__points.length === 2)
            coordinates = this.__createDoubleTransition();
        else
            coordinates = this.__createTransition();
        console.log('set popup')
        this.setPopup();
        this.graphic.beginFill(0xffffff)         
        this.graphic.drawPolygon(coordinates);
        this.graphic.endFill();
        this.__points.forEach(point=>{
            this.graphic.addChild(point.graphic);
        });
        this.fillPoints();
        return this.graphic;

    }
    rerender(){
        let coordinates = [];
        this.graphic.clear();
        this.graphic.lineStyle(2,0x000000,1);
        //в зависимости от количества точек вызываем разные функции
        if(this.__points.length === 2)
            coordinates = this.__createDoubleTransition();
        else
            coordinates = this.__createTransition();
        this.graphic.beginFill(0xffffff)         
        this.graphic.drawPolygon(coordinates);
        this.graphic.endFill();
        // this.fillPoints();
    }

}