import Spooky from "spooky";
import util from "utils";
import spookyConfig from "../../configs/spooky_config";

// let instance = null;

export class SpookyEnv {
	constructor (url, actionid) {
		this.url = url;
        this.actionid = actionid;

		try {
			this.spooky = new Spooky (spookyConfig, this._onCreated.bind(this));
			this.spooky.errors = [];
			this.spooky.console = [];

			console.log ("spooky environment initialized");

			this.spooky.on('error', this._logErrors.bind(this));
		    this.spooky.on('console', this._logConsoleMessages.bind(this));
		    this.spooky.on('log', this._logLogs.bind(this));
		} catch (e) {
			console.dir (e);
			console.trace ("spooky failed to initialize")
		}

        // if (!instance) {
        //     instance = this;
        // }

        // return instance;
	}

	_logErrors (error) {
        error = error.data ? error.data : error;
        this.spooky.errors.push(error);
        if (spookyConfig.debug) {
            console.error('spooky error', util.inspect(error));
        }
    }

    _logConsoleMessages (line) {
        this.spooky.console.push(line);
        if (spookyConfig.console) {
            console.log(line);
        }
    }

    _logLogs (entry) {
        if (!spookyConfig.logs) { return; }
        var message = entry.message;
        var event = (message.event || '').toLowerCase();

        if (event === 'request') {
            console.log('%s: %s %s', this.spooky.options.port, message.method, message.request.url);
            console.log(' Headers: %s', util.inspect(message.request.headers));
            console.log(' Payload: %s', util.inspect(JSON.parse(message.request.post)));
        } else if (event === 'response') {
            console.log('%s: %s %s', this.spooky.options.port, message.code, util.inspect(JSON.parse(message.body)));
        } else {
            console.log(this.spooky.options.port + ':');
            console.dir(entry);
        }
    }

    _onCreated(error, response) {
        if (error) {
            console.dir(error);
            throw new Error('Failed to initialize context.spooky: ' + error.code + ' - '  + error.message);
        }

        this.spooky.start(this.url);
        this.spooky.emit(this.actionid)
        this.spooky.run();
    }
}