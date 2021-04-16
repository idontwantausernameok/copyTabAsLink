
const temporary = browser.runtime.id.endsWith('@temporary-addon'); 
const manifest = browser.runtime.getManifest();
const extname = manifest.name;

function log() {
	if(arguments.length < 2){
		throw 'invalid number of arguments';
	}
	const level = arguments[0].trim().toLowerCase();
	let msg = '';
	for (let i=1; i < arguments.length; i++) {
		msg = msg + arguments[i];
	}
	if (['error','warn'].includes(level) || ( temporary && ['debug','info','log'].includes(level))) {
		console[level]('[' + extname + '] [' + level.toUpperCase() + '] ' + msg);
	}
}

browser.browserAction.onClicked.addListener((tab) => {
	const text = `<a href="${tab.url}">${tab.title}</a>`;
	navigator.clipboard.writeText(text);
});
