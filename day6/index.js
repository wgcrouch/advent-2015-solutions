import _ from 'lodash';



function buildLightsArray(maxX, maxY, initial = false) {
    let lights = [];

    for (let y = 0; y < maxY; y++) {
        lights[y] = [];
        for (let x = 0; x < maxX; x++) {
            lights[y][x] = initial;
        }
    }

    return lights;
}

const runRange = (operation) => (lights, startX, startY, endX, endY) => {
    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            lights[y][x] = operation(lights[y][x]);
        }
    }
};

const toggle = runRange((light) => !light);
const turnOff = runRange((light) => false);
const turnOn = runRange((light) => true);

const commandsPart1 = {
    'turn on': turnOn,
    'turn off': turnOff,
    'toggle': toggle
}

const increase1 = runRange((light) => light + 1);
const increase2 = runRange((light) => light + 2);
const decrease1 = runRange((light) => (light) ? light - 1 : 0);

const commandsPart2 = {
    'turn on': increase1,
    'turn off': decrease1,
    'toggle': increase2
}

const commandRunner = (lights, commands) => (text) => {
    const parse = /(.*)\s(\d+),(\d+) through (\d+),(\d+)/;
    const matches = text.match(parse);
    const args = [lights].concat(matches.slice(2).map((num) => parseInt(num, 10)));
    commands[matches[1]].apply(null, args);
}

function printLights(lights) {
    for (let x = 0; x < lights.length; x++) {
        const row = lights[x].map((light) => light ? "x" : ".").join("");
    }
}

function countLights(lights) {
    let onCount = 0;
    const counter = runRange((light) => onCount += light);
    counter(lights, 0, 0, lights.length - 1, lights[0].length - 1);
    return onCount;
}


function part1 (lines) {
    let lights = buildLightsArray(1000, 1000, 0);

    lines.map(commandRunner(lights, commandsPart1));

    return countLights(lights);
}


function part2 (lines) {
    let lights = buildLightsArray(1000, 1000);

    lines.map(commandRunner(lights, commandsPart2));

    return countLights(lights);
}


export default function day6 (input) {
    const lines = input.split("\n");
    return [ part1(lines), part2(lines) ];
}
