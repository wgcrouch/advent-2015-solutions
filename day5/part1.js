import _ from 'lodash';

const badStrings = ['ab', 'cd', 'pq', 'xy'];

function isVowel (character) {
    return !!character.match(/[aeiou]/);
}

function hasNoBadString (text) {
    return !(badStrings.some((badString) => text.indexOf(badString) > -1));
}

function isNice (text) {
    let vowelCount = 0;
    let repeated = false;
    let last = null;

    const result = text.split("").some((character) => {
        vowelCount = isVowel(character) ? vowelCount + 1 : vowelCount;
        repeated = repeated || last === character;
        last = character;

        return vowelCount >= 3 && repeated;
    });
    return result;
}



export default function part1 (lines) {

    const filtered = lines.filter(hasNoBadString);

    return _.sum(filtered.map(isNice));
}
