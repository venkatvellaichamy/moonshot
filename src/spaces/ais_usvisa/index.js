import { Web } from "../../framework/web";
import { UsVisaSpider } from "./spiders/usvisa";
import { UsVisaAnt } from "./ants/skype";

import params from "./params/space_params"

var web = new Web("https://ais.usvisa-info.com/en-ca/niv/users/sign_in");
var spider = new UsVisaSpider (web, params);
var skypeAnt = new UsVisaAnt (web, params);

spider.run()
//skypeAnt.run()


// import { EventEmitter } from 'events';
 
// // Factory shared
// var makePerson = function() {
//   let person = {};
//   //EventEmitter.call(person);
//   person.wallet = 0;
//   Object.assign(person, personMethods)
//   return person;
// }
// let personMethods = {};
// Object.assign(personMethods, EventEmitter.prototype)
 
// // personMethods.talk = function() {
  
// // };

 
// let person = makePerson();
// person.on("hi", function () { console.log("hello")})
// // person.talk();
// person.emit("hi");