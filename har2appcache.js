#!/usr/bin/env node

// parse command line option
var isCooked	= process.argv.indexOf('-cooked') !== -1 ? true : false;
var filename	= process.argv[2]
var needHelp	= process.argv.indexOf('-h') !== -1 ? true : false

// display help if needed
if( needHelp || filename === undefined ){
	console.log('har2appcache yourfile.har')
	console.log('\tGenerate a appcache file from a http archive one')
	console.log('\nOPTIONS:')
	console.log('\t-h\tdisplay inline help')
	console.log('\t-cooked\tfilter output with reasonable rules')
	console.log('\nHOW TO GET A HAR FILE:')
	console.log('\tStep 1: go in chrome > devtools > network')
	console.log('\tStep 2: do "Copy ALL as HAR" or "Save as HAR with Content"')
	process.exit();
}

// read HAR file
var harContent	= require('fs').readFileSync(filename)
var har		= JSON.parse(harContent)
// extract the urls from the requests
var urls	= har.log.entries.map(function(entry){
	return entry.request.url
})

//////////////////////////////////////////////////////////////////////////////////
//		apply some rules i like						//
//////////////////////////////////////////////////////////////////////////////////


if( !isCooked ){
	// remove some weird things loaded automatically by chrome
	urls	= urls.filter(function(url){ return url.match(/^chrome-extension/) ? false : true;})
	// remove baseURL from the url - thus easier to change project location
	var parsedURL	= require('url').parse(har.log.pages[0].title);
	var baseURL	= parsedURL.protocol + '//' + parsedURL.host;
	baseURL	+= parsedURL.pathname.match(/\/$/) ? parsedURL.pathname : require('path').dirname(parsedURL.pathname)+'/';
	urls	= urls.map(function(url){
		if( url.substr(0, baseURL.length) !== baseURL )	return url;
		return url.substr(baseURL.length)
	})
}

//////////////////////////////////////////////////////////////////////////////////
//		output the result						//
//////////////////////////////////////////////////////////////////////////////////

console.log('CACHE MANIFEST')
console.log('')
console.log('CACHE:')
urls.forEach(function(url){
	console.log(url)
})
console.log('')
console.log('NETWORK:')
console.log('*')