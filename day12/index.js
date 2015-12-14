import _ from 'lodash';

function countNumbers (initial, filterFunc) {
    function counter (input) {
        if (!_.isObject(input) && !_.isArray(input)) {
            if (_.isNumber(input)) {
                return input;
            }
            return 0;
        }

        if (!filterFunc(input)) {
            return 0;
        }

        return _.sum(input, counter);
    }

    return counter(initial)
}

function redFilter (input) {
    if (!_.isArray(input) && _.find(input, (val) => val === 'red')) {
        return false;
    }

    return true;
}

export default function day12 (input) {
    const obj = JSON.parse(input);

    const part1 = countNumbers(obj, () => true);
    const part2 = countNumbers(obj, redFilter);
    return [ part1, part2 ];
}

