const DIRECTIONS = {
	'>': [1, 0],
	'<': [-1, 0],
	'v': [0, -1],
	'^': [0, 1]
}

class Santa {
	constructor (x, y, presentCallback) {
		this.x = x;
		this.y = y;
		this.presentCallback = presentCallback;
		this.present();
	}

	move = (direction) => {
		const [x, y] = DIRECTIONS[direction];
		this.x += x;
		this.y += y;
		this.present();
	}

	get key () {
		return `${this.x},${this.y}`;
	}

	present () {
		this.presentCallback(this.key);
	}
}


const handlerForPresent = (houses) => (key) => {
	if (!houses[key]) {
		houses[key] =  1;
	} else {
		houses[key] += 1;
	}
}

function part1 (moves) {
	let visited = {};
	const santa = new Santa(0, 0, handlerForPresent(visited));

	moves.forEach(santa.move);
	return Object.values(visited).length;
}

function part2 (moves) {
	let visited = {};
	const santa = new Santa(0, 0, handlerForPresent(visited));
 	const robo = new Santa(0, 0, handlerForPresent(visited));

 	moves.forEach((direction, index) => {
 		const actor = index % 2 ? robo : santa;
 		actor.move(direction);
 	});

 	return Object.values(visited).length;
}

export default function day3 (input) {
 	const moves = input.split("");

 	return [ part1(moves), part2(moves) ];
};