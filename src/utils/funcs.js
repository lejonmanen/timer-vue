function formatNumber(num, digits=2) {
	if( (typeof num) !== 'number' ) return '0'.repeat(2);
	if( num % 1 !== 0 ) num = Math.round(num);
	if( num < 0 ) return '-' + formatNumber(-num, digits);

	let s = '' + num;
	return '0'.repeat(Math.max(digits - s.length, 0)) + s;
}

function getClockComponents(timeMillis) {
	let x = Math.floor(timeMillis)
	let tenths = Math.round((timeMillis - x) * 10)
	if( tenths === 10 ) tenths = 0
	let sign = x >= 0 ? '' : '-'
	x = Math.abs(x)
	let s = x % 60;
	x = (x - s) / 60;
	let m = x % 60;
	let h = (x - m) / 60;

	return {
		sign,
		hours: h,
		minutes: m,
		seconds: s,
		tenths
	}
}

export {
	formatNumber,
	getClockComponents
}
