module.exports = {
	// Custom properties that will be used for debugging
	debug: false,
	console: true,
	logs: false,

	// configs for spookjs

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
}