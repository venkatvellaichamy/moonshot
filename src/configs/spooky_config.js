module.exports = {
	casper: {
        verbose: true,
        logLevel: 'debug'
    },
    child: {
        port: 8081,
        spooky_lib: './',
        script: 'https://code.jquery.com/jquery-2.1.4.js'
    }
}