import _ from 'lodash';

const getSides = ([ l, w, h ]) => [ [l, w], [w, h], [h, l] ];

const getSideAreas = (edges) => getSides(edges).map(([w, h]) => w * h);

const getSidePerimeters = (edges) => getSides(edges).map(([w, h]) => 2 * (w + h));

function paperSize (edges) {
    const sideAreas = getSideAreas(edges);
    return _.sum(sideAreas.map((side) => side * 2)) + _.min(sideAreas);
}

const volume = ([ l, w, h]) => l * w * h;

function ribbonSize (edges) {
    const perimeters = getSidePerimeters(edges);
    return _.min(perimeters) + volume(edges);
}

export default function day2 (input) {
    const boxes = _.compact(input.split("\n")).map((box) => box.split("x").map((num) => parseInt(num, 10)));
    const total = _.sum(boxes.map(paperSize));
    const ribbon = _.sum(boxes.map(ribbonSize));

    return [total, ribbon];
}
