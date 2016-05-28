import { SpookyEnv } from "./spooky_env"
import crawlerConfig from "../../configs/crawler_config"

let crawler = (function() {

	// Private functions
	const _obj_attachEvents = function () {
    	// Object Instance scope
    	var crawlerInstance = this,
    		{ id, config, params } = this,
    		instFunctions,
    		stringifiedInstFunctions = {};
		
		// Get all the functions in the crawler instance
		instFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(crawlerInstance));
		instFunctions = instFunctions.filter(fn => { return fn != "constructor"; }).concat([ "_login", "_check" ]);

		for (let fn of instFunctions) {
			stringifiedInstFunctions[fn] = crawlerInstance[fn].toString();
		}

		this.spooky.on("say_hi", function () {
			console.log("hi!!!");
		});
   	
    	this.spooky.on(this.id, function () { 
			
			// Spookyjs Scope - function tuple
			this.then ([
				{ 
					crawler 	: { id, config, params },
					privateFns	: { 
									captureStep: _cjs_captureStep.toString(), 
									clickLink: _cjs_clickLink.toString() 
								  },
					objectFns	: stringifiedInstFunctions,
				}, 
				_cjs_defineCapturejsScope 
			]);
		});
    }

	// Casperjs Scoped private functions

    const _cjs_defineCapturejsScope = function () {
    	this.stepCount = 0;
		
		for (let key in objectFns) {
			eval("this.__proto__." + key + " = " + objectFns[key]);
			//this.__proto__[key] = new Function("return (" + objectFns[key] + ").apply(this, arguments)")
	    }

		for (let key in privateFns) {
			eval("this.__proto__." + key + " = " + privateFns[key]);
	    }

		this._login.call(this);
		this.run.call(this);
    }

    const _cjs_captureStep = function (stepDescription) {
    	++this.stepCount;

		var imageName = stepDescription.replace(/ /g, "_"),
			imagePath = crawler.config.dirs.logs + '/' + crawler.id + '/' + this.stepCount + '_' + imageName + '.png';

        console.log('Saving screen capture to ' + imagePath);
        this.capture(imagePath);
    }

    const _cjs_clickLink = function (config) {
        var that = this,
        	delay = config.delay ? config.delay : 2000,
            stepDescription = config.stepDescription || this.stepCount,
            selector = config.selector;

        var _pass = function () {

            this.echo("Step Pass: " + that.stepCount + ': ' + stepDescription);

            this.echo('Clicking the link - ' + this.fetchText(selector));
            this.click(selector, 'a');

            this.wait(delay, function () {
                that.captureStep (stepDescription);
            });
        }

        var _fail = function () {
            this.echo('Step Failed: ' + stepDescription);
            return false;
        }

        this.waitForSelector(selector, _pass, _fail);
    }

    // Crawler class definition

	class Crawler {
		constructor (initialUrl, params) {
			this.initialUrl = initialUrl;
			this.id = this.constructor.name.toLowerCase();
			this.spookyEnv = new SpookyEnv (initialUrl, this.id);
			this.spooky = this.spookyEnv.spooky;
			this.config = crawlerConfig;
			this.params = params || {};

			_obj_attachEvents.call(this);
		}

		_check () {
			this.captureStep('Login page loaded');

			this.wait(1000, function(){
                this.echo("i waited");
            });

	        var stepDescription= 'Clicking login button',
	        	selector = '#close > center > div.hpmainwraper > div.hpmainwraper.pos-relative > div.innerwrapper.pos-relative.paddt10 > div.fright > form > div.fleft.paddl8 > input.hp-button.small';

	        this.waitForSelector(selector, function() {
	        	this.echo("got it");
	        }, function () {
	        	this.echo("oops it");
	        });
		}

		_login () {
			
			this.captureStep('Login page loaded');

			this.fillSelectors('form[name=Login]', {
	            'input#ID': 'e.kalyani.vellaichamy@gmail.com'
	        });
	        this.sendKeys('#TEMPPASSWD1', 'matri625020');

	        this.captureStep('Login form filled..');

	        this.clickLink({
	            stepDescription: 'Clicking login button',
	            selector: '#close > center > div.hpmainwraper > div.hpmainwraper.pos-relative > div.innerwrapper.pos-relative.paddt10 > div.fright > form > div.fleft.paddl8 > input.hp-button.small'
	        });
	        
			this.then(function () {
				var skipPromotionLink = "body > center > div.wrapper-max > div > div.paddt10 > div.fright > div > a";

	            if (this.exists(skipPromotionLink)) {
	                this.clickLink({
	                    stepDescription: 'Skipping the promotion page',
	                    selector: skipPromotionLink
	                });
	            } else {
	                this.echo('Going to home page!')
	                this.thenOpen('http://profile.tamilmatrimony.com/login/myhome.php?MS=1&gaact=addselfie&gasrc=INTRMDTMH');
	                this.captureStep('homepage');
	            }
	        });
		}

		run () {
			console.log ("crawler not implemented the run command :(");
		}
	}

	return Crawler;
})();

module.exports.Crawler = crawler;