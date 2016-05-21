import { SpookyEnv } from "./common/spooky_env"

var s = new SpookyEnv ('http://www.tamilmatrimony.com/', 'start_tamil_matrimony');

try {
s.spooky.on("'start_tamil_matrimony'", () => { 
	this.then(() => {
		console.log("hai");
	})
});

}
catch (e) {
	console.log(e)
}