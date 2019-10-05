import * as PIXI from 'pixi.js';

export default class StationBuilder {

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} name
     */
    constructor(x,y,name){
        this.x = x;
        this.y = y;
        this.__borderColor = 0xFFFFFF;
        this.__radius = 10;
        this.__background = 0xFFFFFF
        this.graphic = new PIXI.Graphics();
        this._name = name || 'empty';
    }

    setInfo(){
        let height,width,x,y,
            rect = new PIXI.Graphics(),
            text = new PIXI.Text(this._name,{fill: "silver",fontSize: 10});
        x =  this.x+this.radius+10;
        y =  this.y-this.radius+2;
        // console.log(x,y)
        width = text.width+4;
        height = this.radius*2*0.6;  
        rect.beginFill(0xEBF1F5,0.5)
        rect.drawRoundedRect(x,y,width,height,4);
        rect.endFill();
        text.position  = {x: x+2,y : y-1}
          
        rect.addChild(text);        
        this.graphic.addChild(rect);
    }

    addPopup(){
        this.graphic.interactive = true;
        this.graphic.buttonMode = true;
        this.graphic.on('pointerdown', ()=>{console.log('click')})
            .on('pointerup', ()=>{console.log('stop click')})
        return this;
    }
    
    /**
     * @param {number} val 
     */
    setBackroundColor(val){
        this.__background = val;
        return this; 
    }

    /**
     * 
     * @param {number} val 
     */
    setBorderColor(val){
        this.__borderColor = val;
        return this;
    }
    /**
     * 
     * @param {number} val 
     */
    setRadius(val){
        this.__size = val;
        return this;
    }
    /**
     * @returns {PIXI.Graphics}
     */
    build(){
        let graphic = this.graphic;
        graphic.lineStyle(1,this.__borderColor,1);
        graphic.beginFill(this.__background);
        graphic.drawCircle(this.x,this.y,this.__radius);
        graphic.endFill();
        this.setInfo();
        return graphic;
    }

    get radius(){
        return this.__radius;
    }
}