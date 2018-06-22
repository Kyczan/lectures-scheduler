'use strict';

/* Filters */

angular.module('planer.filters', [])
	.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }
        return (tel.slice(0, 3) + " " + tel.slice(3, 6) + " " + tel.slice(6)).trim();
    };
});