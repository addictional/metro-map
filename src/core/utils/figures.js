
export class Arc{
    static createSemicircle(radius,angle,x,y,reverse = false){
        let currentAngle = (reverse)?angle -90+360: angle+90+360;
        let lastAngle = (reverse)?angle +90+360: angle-90+360,
            step = 0.01,
            coordinates = [];
        currentAngle *=Math.PI/180;
        lastAngle *=Math.PI/180;
        if(currentAngle<lastAngle)
            lastAngle -= 6.28319
        while(currentAngle >= lastAngle)
        {
            let x1 = Math.cos(currentAngle)*(radius)+x,
                y1 = Math.sin(currentAngle)*(radius)+y;
            coordinates.push(x1);
            coordinates.push(y1);
            currentAngle-=step
        }    
        return coordinates;
    }
    /**
     * 
     * @param {number} angle1 
     * @param {number} angle2 
     * @param {number} radius 
     * @param {number} x 
     * @param {number} y 
     * 
     * @returns {Array.<number>}
     */
    static create(angle1,angle2,radius,x,y){
        let x1,y1,
            step = 0.01,coordinates = [];
        while(angle1>6.28319)
            angle1 -= 6.28319;
        while(angle2>6.28319)
            angle2-=6.28319; 
        if(angle1<angle2)
            angle1 += 6.28319; 
        while(angle1>angle2)
        {
            x1 = Math.cos(angle1)*(radius)+x,
            y1 = Math.sin(angle1)*(radius)+y;
            coordinates.push(x1);
            coordinates.push(y1);
            angle1 -= step;
        }

        return coordinates;
    }
}

export class Line{


    rotate(angle){
        let cos = Math.cos((angle)*Math.PI/180),
            sin = Math.sin((angle)*Math.PI/180)
            x,y,midpoint;

        midpoint = {x:(a.x + b.x)/2,y:(a.y+b.y)/2};    
        x = midpoint.x + (b.x - midpoint.x) * cos - (b.y - midpoint.y) * sin;
        y = midpoint.y + (b.y  - midpoint.y) * cos + (b.x  - midpoint.x) * sin;
    }

    get unitVector(){
        let a = this.__points[0],
            b = this.__points[1],
            x = a.x - b.x,
            y = a.y - b.y,x1,y1,
            lenAB = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)),
            c = [ 
                a.x + (a.x - b.x)/lenAB*a.radius,
                a.y + (a.y - b.y)/lenAB*a.radius
            ],
            d = [
                b.x + (b.x - a.x)/lenAB*b.radius,
                b.y + (b.y - a.y)/lenAB*b.radius
            ];
    }
}