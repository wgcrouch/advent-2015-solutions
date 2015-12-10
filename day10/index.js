function sayNumber (number) {
    const digits = number.split("");
    let last = digits[0];
    let count = 1;
    let result = "";

    for (let i = 1; i < digits.length; i++) {
        if (last != digits[i]) {
            result += `${count}${last}`;
            count = 1;
            last = digits[i];
        } else {
            count++;
        }
    }
    result += `${count}${last}`;
    return result;
}

function sayTimes(input, times) {
    let result = input;
    for (let i = 1; i <= times; i++) {
        result = sayNumber(result);
    }
    return result
}

export default function day10 (input) {

    return [ sayTimes(input, 40).length, sayTimes(input, 50).length ];
}
