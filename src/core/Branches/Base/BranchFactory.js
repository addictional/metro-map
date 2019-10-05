import CircleBranch from './CircleBranch';
import CurveBranch from './CurveBranch';

export default class BranchFactory{
    static createBranch(type){
        if(type == 'line')
            return new CurveBranch();
        if(type == 'circle')
            return new CircleBranch();    
    }
}