import _ from "lodash";
import EVENTS from "./events";
import { Web } from "./web";
import AntConfig from "./configs/ant_config";
import { EventEmitter } from 'events';

module.exports.Ant = (function () {

    /******************************** Private methods ********************************/
    let _attachEvents = function () {
    	let instFunctions = instFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    	instFunctions = instFunctions.filter(fn => { return fn != "constructor"; });

    	_.forEach(instFunctions, action => { 
    		this.on(action, params => { 
    			this[action](params); 
    		}); });
    }

    class Ant extends EventEmitter {
		constructor (web, params) {
			if (!(web instanceof Web)) throw new Error ("First parameter should be instance of Web object. Spider died");
        	super ();

        	// Assign the object properties
			this.id 	= this.constructor.name.toLowerCase();
			this.web 	= web;
			this.config = AntConfig;
			this.params = params || {};
			this.state 	= EVENTS.ANT.INITIALIZED;

			_attachEvents.call(this);

			web.registerAnt(this);
		}
	}
	
	return Ant;
})();