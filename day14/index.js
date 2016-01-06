import _ from 'lodash';

const FLY = 'fly';
const REST = 'rest';

class Reindeer {

    state = FLY;
    distance = 0;
    counter = 0;
    points = 0;

    constructor (name, flySpeed, flyTime, restTime) {
        this.name = name;
        this.flySpeed = flySpeed;
        this.flyTime = flyTime;
        this.restTime = restTime;
    }

    isFlying () {
        return this.state === FLY;
    }

    isResting () {
        return this.state === REST;
    }

    startFlying () {
        this.counter = 0;
        this.state = FLY;
    }

    startResting () {
        this.counter = 0;
        this.state = REST;
    }

    next() {
        this.counter ++;
        if (this.isFlying()) {
            this.distance += this.flySpeed;
            if (this.counter === this.flyTime) {
                this.startResting();
            }
        } else {
            if (this.counter === this.restTime) {
                this.startFlying();
            }
        }
    }
}

function parseInput(input) {
    const regex = /(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/
    const [match, name, ...rest] = input.match(regex);

    const [flySpeed, flyTime, restTime] = rest.map((value) => parseInt(value, 10));
    return new Reindeer(name, flySpeed, flyTime, restTime);
}

function leader (reindeer) {
    return _.max(reindeer, (deer) => deer.distance);
}

function winner (reindeer) {
    return _.max(reindeer, (deer) => deer.points);
}

function simulate(reindeer, time) {
    for (let i = 0; i < time; i++) {
        reindeer.forEach((deer) => deer.next());
        const currentLeader = leader(reindeer);
        currentLeader.points ++;
    }
    return reindeer;
}



export default function day14 (input) {
    const reindeer = input.split("\n").map(parseInput);
    simulate(reindeer, 2503);
    return [ leader(reindeer).distance, winner(reindeer).points ];
}
