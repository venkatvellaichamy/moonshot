// import { Crawler } from "./common/crawler"

// export class Test extends Crawler {

// 	constructor (initialUrl) {
// 		super (initialUrl);
// 	}

// 	run () {
	
// 		this.clickLink({
//             stepDescription: 'Navigate to Shortlisted profiles page',
//             selector: '#fixed-div_search > div.fleft.paddl20 > a:nth-child(3)'
//         });

//         this.then(function () {
//             var shortlistedHref = this.getElementAttribute('#leftpanellinkscontainer > div:nth-child(1) > div.paddt10.paddb5.fright.shortlist_download > a', "href");
//             this.echo(shortlistedHref);
//             this.download(shortlistedHref, crawler.config.dirs.downloads + '/shortlistedProfiles.xls');
//         });
// 	}
// }

// var a  = new Test('http://www.tamilmatrimony.com/');
// 
import Spooky from "spooky"

var s;
var spooky = new Spooky ({
        child: {
            transport: 'http'
        },

        // configs for casperjs
        
        casper: {
            logLevel: 'debug',
            verbose: true,
            options: {
                clientScripts: ['https://code.jquery.com/jquery-2.1.4.js']
            },
            pageSettings: {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36'
            },
            waitTimeout: 5000
        }
    }, function (error, response) {
        spooky.start("http://www.google.com");

        spooky.__instantiated = true;
        //spooky.run();
    });

spooky.on('console', function(message) {
    console.log(message);
});

spooky.on("say_hi", function () {
    console.log("spooky hi")
    spooky.then( [{params: "hi"}, function () {
        this.echo("casperjs hi")
    } ])
});

spooky.on("say_bye", function () {
    console.log("spooky bye")
    spooky.then( [{params: "hi"}, function () {
        this.echo("casperjs bye")
    } ])
});

function run () {
    if (spooky.__instantiated) {
        spooky.emit("say_hi");
        spooky.emit("say_bye");

        spooky.run();
    } else {
        console.log("waiting...");
        setTimeout(run, 500);
    }
}

run();
run();