import assert from 'assert';


const answers = [
    [ 138, 1771 ],
    [ 1598415, 3812909 ],
    [ 2592, 2360 ],
    [ 254575, 1038736 ],
    [ 238, 69 ],
    [ 543903, 14687245 ],
    [ 46065, 14134 ],
    [ 1371, 2117],
    [ 207, 804],
    [ 252594, 3579328],
    [ 'hxbxxyzz', 'hxcaabcc' ],
    [ 119433, 68466 ],
    [ 733, 725 ],
    [ 2655, 1059 ],
    [ null, null ],
    [ 213, 323 ],

];

export default function checkAnswers (dayNumber, result) {
    const dayAnswers = answers[dayNumber - 1];
    assert.equal(result[0], dayAnswers[0], 'Part 1 failed');
    assert.equal(result[1], dayAnswers[1], 'Part 2 failed');
};
