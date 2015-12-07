import assert from 'assert';


const answers = [
    [ 138, 1771 ],
    [ 1598415, 3812909 ],
    [ 2592, 2360 ],
    [ 254575, 1038736 ],
    [ 238, 69 ]
];

export default function checkAnswers (dayNumber, result) {
    const dayAnswers = answers[dayNumber - 1];
    assert.equal(result[0], dayAnswers[0], 'Part 1 failed');
    assert.equal(result[1], dayAnswers[1], 'Part 2 failed');
};
