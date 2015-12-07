import assert from 'assert';
import _ from 'lodash';

function isRepeatedPair (line, index) {
    const pair = line.substring(index, index + 2);
    const cleaned = line.replace(pair, '  ');
    return cleaned.indexOf(pair) > -1;
}

function isSplitRepeat (line, index) {
    return line[index] === line[index + 2];
}

function isNice (line) {
    let repeatedPair = false;
    let splitRepeat = false;

    for (let i = 0; i < (line.length - 1); i++) {
        if (isRepeatedPair(line, i)) {
            repeatedPair = true;
        }

        if (isSplitRepeat(line, i)) {
            splitRepeat = true;
        }

        //Exit as early as possible
        if (repeatedPair && splitRepeat) {
            return true;
        }
    }
    return false;
}

export default function part2 (lines) {
    return _.sum(lines.map(isNice));
}
