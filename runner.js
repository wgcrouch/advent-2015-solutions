#!/usr/bin/env node
require("babel-core/register");

var readFileSync = require('fs').readFileSync;
var path = require('path');

var argv = require('minimist')(process.argv.slice(2));

var checkAnswers = require('./checkAnswers').default;

const days = 10;

function run(dayNumber) {
    const dayPath = './day' + dayNumber;
    const input = readFileSync(path.join(dayPath, 'input.txt'), 'utf8').trim();
    var day = require(dayPath).default;

    console.log('Day ' + dayNumber);
    console.log("==============");

    const result = day(input);

    console.log('Part 1: ' + result[0]);
    console.log('Part 2: ' + result[1]);
    console.log("");

    checkAnswers(dayNumber, result);
}

function runAll () {
    for (var i =1; i <= days; i++) {
        run(i);
    }
}

if (argv.day) {
    run(argv.day);
} else {
    runAll();
}



