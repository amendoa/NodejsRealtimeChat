'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.notEmpty = notEmpty;
function notEmpty(value) {
	if (value) {
		if (typeof value === 'string') {
			return value.trim().length > 0;
		}
		return true;
	}
	return false;
}