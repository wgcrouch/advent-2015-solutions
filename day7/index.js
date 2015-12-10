import _ from 'lodash';
import assert from 'assert';

function isNumber(value) {
    return !isNaN(value);
}

const operations = {
    'AND': (a, b) => a & b,
    'LSHIFT': (a, b) => a << b,
    'OR': (a, b) => a | b,
    'RSHIFT': (a, b) => a >> b
}

function buildWires (input) {
    const lines = input.split("\n");
    let wires = {};

    lines.forEach((text) => {
        const [left, right] = text.split(" -> ");
        wires[right] = isNumber(left) ? parseInt(left, 10) : left;
    });

    return wires;
}

export default function day7 (input) {

    var wires = buildWires(input);


    const solve = (value) => {
        if (isNumber(value)) {
            return parseInt(value, 10);
        } else if (isNumber(wires[value])) {
            return parseInt(wires[value], 10);
        }

        const tokens = wires[value].split(" ");
        let a, b, result, func;
        switch (tokens.length) {
            case 1:
                wires[value] = solve(tokens[0]);
                break;
            case 2:
                a = solve(tokens[1]);
                wires[value] = Math.pow(2, 16) - 1 - a;
                break;
            case 3:
                a = solve(tokens[0]);
                b = solve(tokens[2]);
                func = operations[tokens[1]];
                result = func(a, b);
                wires[value] = result;
                break;
        }
        return wires[value];
    };

    const part1 = solve('a');

    wires = buildWires(input);
    wires['b'] = part1;

    const part2 = solve('a');

    return [ part1, part2 ];
}
