function formatNumber(num, digits=2) {
	if( (typeof num) !== 'number' ) return '0'.repeat(2);
	if( num % 1 !== 0 ) num = Math.round(num);
	if( num < 0 ) return '-' + formatNumber(-num, digits);

	let s = '' + num;
	return '0'.repeat(Math.max(digits - s.length, 0)) + s;
}

export {
	formatNumber
}
