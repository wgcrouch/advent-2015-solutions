import assert from 'assert';
import _ from 'lodash';

function nextChar (char) {
    return String.fromCharCode(char.charCodeAt(0) + 1)
}

function incrementString (input) {
    const last = _.last(input);
    let result = input;
    let beginning = input.slice(0, -1);
    if (last === 'z') {
        result = incrementString(beginning) + 'a';
    } else {
        result = beginning + nextChar(last);
    }

    return result;
}

function has2Pairs (input) {
    const matches = input.match(/(.)\1*/g);
    let count = 0;
    return _.filter(matches, (match) => match.length > 1).length > 1;
}

function hasIncreasingString (input) {
    for (let i = 0; i < (input.length - 2); i++) {
        if (nextChar(input[i]) === input[i + 1] && nextChar(input[i + 1]) === input[i + 2]) {
            return true;
        }
    }
    return false;
}

function hasAmbiguousChar(input) {
    return (['i', 'o', 'l'].some((badString) => input.indexOf(badString) > -1));
}


assert(hasIncreasingString('abc'));
assert(hasIncreasingString('zxyz'));
assert(!hasIncreasingString('abd'));
assert(!hasIncreasingString('zxyw'));

assert(has2Pairs('aadfsdfrewtgewrgzz'));

assert(hasAmbiguousChar('i'));
assert(hasAmbiguousChar('o'));
assert(hasAmbiguousChar('l'));
assert(!hasAmbiguousChar('aaaaaa'));
assert(hasAmbiguousChar('sdfagegergi'));


function isValid (input) {
    return !hasAmbiguousChar(input) && hasIncreasingString(input) && has2Pairs(input);
}

function findNextValid (input) {
    let next = input;
    do {
        next = incrementString(next);
    } while (!isValid(next));
    return next;
}

export default function day11 (input) {
    const part1 = findNextValid(input);
    const part2 = findNextValid(part1);

    return [ part1, part2 ];
}
