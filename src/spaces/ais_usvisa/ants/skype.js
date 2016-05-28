import { Ant } from "../../../framework/ant";

export class UsVisaAnt extends Ant {
	constructor (web, params) {
		super (web, params);
	}

	run (params) {
		console.log("I am Ant: " + params)
	}
}