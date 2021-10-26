//import "core-js/stable";
//import "regenerator-runtime/runtime";
import "regenerator-runtime";

import ControlContainer from './Dep/ControlContainer';
import Kernel from './Core/Control/Kernel';

let control = new ControlContainer();
let kernel = <Kernel> control.getMain();


kernel.sayHello();
