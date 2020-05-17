"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomSubarray = function (arr, size) {
    var shuffled = arr.slice(0);
    var i = arr.length;
    var temp;
    var index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
};
//# sourceMappingURL=Arrays.js.map