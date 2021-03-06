(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.FakeNumbers = {}));
}(this, (function (exports) { 'use strict';

    var checkDigits = function (input) {
        var weight = [3, 5, 7, 9, 11, 13, 15, 17, 19];
        var sum = input.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        return (Math.floor(sum / 89) + 1) * 89 + 10 - sum;
    };

    var check = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^\d{11}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.substr(2).split('').map(function (c) { return parseInt(c, 10); });
        var remainder = checkDigits(digits);
        return { valid: "" + remainder === value.substr(0, 2) };
    };

    var randomFromRange = function (min, max) { return min + Math.round(Math.random() * (max - min)); };

    var randomNumbers = function (numberOfDigits) {
        return Array(numberOfDigits).fill(0).map(function (_, __) { return randomFromRange(0, 9); });
    };

    var fake = function () {
        var partial = randomNumbers(9);
        var remainder = checkDigits(partial);
        var output = "" + remainder + partial.join('');
        return output.substr(0, 2) + " " + output.substr(2, 3) + " " + output.substr(5, 3) + " " + output.substr(8);
    };

    var index = { fake: fake, check: check };

    var checkDigits$1 = function (input) {
        var weight = [8, 7, 6, 5, 4, 3, 2, 1];
        var sum = input.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 10 - sum % 10;
        return (remainder === 10) ? 0 : remainder;
    };

    var check$1 = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^\d{9}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return { valid: lastDigit === checkDigits$1(digits) };
    };

    var fake$1 = function () {
        var partial = randomNumbers(8);
        var remainder = checkDigits$1(partial);
        var output = "" + partial.join('') + remainder;
        return output.substr(0, 3) + " " + output.substr(3, 3) + " " + output.substr(6);
    };

    var index$1 = { fake: fake$1, check: check$1 };

    var check$2 = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'FI') {
            value = value.substr(2);
        }
        if (!/^\d{8}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var weight = [7, 9, 10, 5, 8, 4, 2, 1];
        var sum = digits.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        return { valid: sum % 11 === 0 };
    };

    var fake$2 = function () {
        var firstSixth = randomNumbers(6);
        var seventh = randomFromRange(1, 9);
        var partial = firstSixth.concat(seventh);
        var weight = [7, 9, 10, 5, 8, 4, 2];
        var sum = partial.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 11 - sum % 11;
        switch (true) {
            case (remainder === 11):
                return partial.join('') + "0";
            case (remainder === 10):
                return "" + firstSixth.join('') + (seventh - 1) + "1";
            case (remainder < 10):
                return "" + partial.join('') + remainder;
        }
    };

    var index$2 = { fake: fake$2, check: check$2 };

    var check$3 = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'HU') {
            value = value.substr(2);
        }
        if (!/^\d{8}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var weight = [9, 7, 3, 1, 9, 7, 3, 1];
        var sum = digits.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        return { valid: sum % 10 === 0 };
    };

    var fake$3 = function () {
        var partial = randomNumbers(7);
        var weight = [9, 7, 3, 1, 9, 7, 3];
        var sum = partial.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = sum % 10;
        var lastDigit = remainder === 0 ? 0 : 10 - remainder;
        return partial.concat([lastDigit]).join('');
    };

    var index$3 = { fake: fake$3, check: check$3 };

    var check$4 = function (input) {
        return {
            valid: /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/.test(input),
        };
    };

    var Digits = '0123456789';
    var LowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    var UpperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var Hex = Digits + "ABCDEF";
    var Letters = "" + LowerCaseLetters + UpperCaseLetters;
    var UpperCaseDigits = "" + UpperCaseLetters + Digits;
    var Words = "" + LowerCaseLetters + UpperCaseLetters + Digits;

    function randomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    var randomString = function (length, charSet) {
        if (length === 0) {
            return '';
        }
        var chars = charSet.split('');
        return Array(length).fill('').map(function (_) { return randomFromArray(chars); }).join('');
    };

    var fake$4 = function () {
        var branchCode = randomString(randomFromArray([0, 3]), Words);
        return "" + randomString(6, Letters) + randomString(2, Words) + branchCode;
    };

    var index$4 = { fake: fake$4, check: check$4 };

    var DoublePosition;
    (function (DoublePosition) {
        DoublePosition[DoublePosition["Even"] = 0] = "Even";
        DoublePosition[DoublePosition["Old"] = 1] = "Old";
    })(DoublePosition || (DoublePosition = {}));
    var luhn = function (input, doublePosition) {
        var total = input.length;
        var transformed = Array(total).fill(0).map(function (_, index) {
            if (doublePosition === DoublePosition.Even && index % 2 === 0 ||
                doublePosition === DoublePosition.Old && index % 2 === 1) {
                var double = input[index] * 2;
                return (double > 9) ? double - 9 : double;
            }
            else {
                return input[index];
            }
        });
        var sum = transformed.reduce(function (a, b) { return a + b; }, 0);
        return (10 - (sum % 10)) % 10;
    };

    var check$5 = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^\d{9}(R[C|M|P|T]\d{4})?$/.test(value)) {
            return { valid: false };
        }
        var digits = value.substr(0, 9).split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return {
            valid: lastDigit === luhn(digits, DoublePosition.Old),
        };
    };

    var fake$5 = function () {
        var firstEightDigits = randomNumbers(8);
        var ninthDigit = luhn(firstEightDigits, DoublePosition.Old);
        var firstPart = firstEightDigits.concat([ninthDigit]).join('');
        var length = randomFromArray([9, 15]);
        switch (length) {
            case 15:
                var identifier = randomFromArray(['RC', 'RM', 'RP', 'RT']);
                var lastFourDigits = randomNumbers(4).join('');
                return "" + firstPart + identifier + lastFourDigits;
            case 9:
            default:
                return firstPart;
        }
    };

    var index$5 = { fake: fake$5, check: check$5 };

    var check$6 = function (input) {
        var v = input.substr(0, 2) === 'BE' ? input.substr(2) : input;
        if (!/^\d{9,11}$/.test(v)) {
            return { valid: false };
        }
        var prefix = (v.length === 9) ? "0" + v : v;
        var sum = parseInt(prefix.substr(0, 8), 10) + parseInt(prefix.substr(8, 2), 10);
        return { valid: sum % 97 === 0 };
    };

    var fake$6 = function () {
        var arr = [0].concat(randomNumbers(7)).join('');
        var partial = parseInt(arr, 10);
        var divider = (partial - partial % 97) / 97;
        var checkDigits = (divider + 1) * 97 - partial;
        var prefixZero = checkDigits < 10 ? "0" + checkDigits : "" + checkDigits;
        return "" + arr + prefixZero;
    };

    var index$6 = { fake: fake$6, check: check$6 };

    var check$7 = function (input) {
        var formatted = input.replace(/[\.\/-]/g, '');
        if (!/^\d{14}$/i.test(formatted)) {
            return { valid: false };
        }
        var calculateCheckDigit = function (arr, weight) {
            var sum = arr.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
            var remainder = sum % 11;
            return (remainder < 2) ? 0 : 11 - remainder;
        };
        var digits = formatted.split('').map(function (c) { return parseInt(c, 10); });
        var w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        var firstCheckDigit = calculateCheckDigit(digits.slice(0, 12), w1);
        if (firstCheckDigit !== digits[12]) {
            return { valid: false };
        }
        var w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        var secondCheckDigit = calculateCheckDigit(digits.slice(0, 13), w2);
        return { valid: secondCheckDigit === digits[13] };
    };

    var fake$7 = function () {
        var calculateCheckDigit = function (arr, weight) {
            var sum = arr.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
            var remainder = sum % 11;
            return (remainder < 2) ? 0 : 11 - remainder;
        };
        var partial = randomNumbers(12);
        var w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        var firstCheckDigit = calculateCheckDigit(partial, w1);
        var w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        var secondCheckDigit = calculateCheckDigit(partial.concat(firstCheckDigit), w2);
        var part1 = partial.slice(0, 2).join('');
        var part2 = partial.slice(2, 5).join('');
        var part3 = partial.slice(5, 8).join('');
        var part4 = partial.slice(8).join('');
        return part1 + "." + part2 + "." + part3 + "/" + part4 + "-" + (firstCheckDigit) + secondCheckDigit;
    };

    var index$7 = { fake: fake$7, check: check$7 };

    var check$8 = function (input) {
        var formatted = input.replace(/[\.\/-]/g, '');
        if (!/^\d{11}$/i.test(formatted)) {
            return { valid: false };
        }
        var digits = formatted.split('').map(function (c) { return parseInt(c, 10); });
        var calculateCheckDigit = function (sum) {
            var remainder = sum % 11;
            return (remainder < 2) ? 0 : 11 - remainder;
        };
        var firstCheckDigit = calculateCheckDigit(digits.slice(0, 9).map(function (v, i) { return v * (10 - i); }).reduce(function (a, b) { return a + b; }, 0));
        if (firstCheckDigit !== digits[9]) {
            return { valid: false };
        }
        var secondCheckDigit = calculateCheckDigit(digits.slice(0, 10).map(function (v, i) { return v * (11 - i); }).reduce(function (a, b) { return a + b; }, 0));
        return { valid: secondCheckDigit === digits[10] };
    };

    var fake$8 = function () {
        var calculateCheckDigit = function (sum) {
            var remainder = sum % 11;
            return (remainder < 2) ? 0 : 11 - remainder;
        };
        var partial = randomNumbers(9);
        var firstCheckDigit = calculateCheckDigit(partial.map(function (v, i) { return v * (10 - i); }).reduce(function (a, b) { return a + b; }, 0));
        var secondCheckDigit = calculateCheckDigit(partial.concat(firstCheckDigit).map(function (v, i) { return v * (11 - i); }).reduce(function (a, b) { return a + b; }, 0));
        var part1 = partial.slice(0, 3).join('');
        var part2 = partial.slice(3, 6).join('');
        var part3 = partial.slice(6).join('');
        return part1 + "." + part2 + "." + part3 + "-" + (firstCheckDigit) + secondCheckDigit;
    };

    var index$8 = { fake: fake$8, check: check$8 };

    (function (CreditCardType) {
        CreditCardType["AmericanExpress"] = "AmericanExpress";
        CreditCardType["Discover"] = "Discover";
        CreditCardType["Jcb"] = "Jcb";
        CreditCardType["Maestro"] = "Maestro";
        CreditCardType["Master"] = "Master";
        CreditCardType["Visa"] = "Visa";
        CreditCardType["Dankort"] = "Dankort";
        CreditCardType["DinnerClub"] = "DinnerClub";
        CreditCardType["DinnerClubUs"] = "DinnerClubUs";
        CreditCardType["Forbrugsforeningen"] = "Forbrugsforeningen";
        CreditCardType["Laser"] = "Laser";
        CreditCardType["Solo"] = "Solo";
        CreditCardType["UnionPay"] = "UnionPay";
        CreditCardType["VisaElectron"] = "VisaElectron";
    })(exports.CreditCardType || (exports.CreditCardType = {}));
    var CreditCardMap = new Map([
        [
            exports.CreditCardType.AmericanExpress,
            {
                length: [15],
                prefix: ['34', '37'],
            }
        ],
        [
            exports.CreditCardType.Discover,
            {
                length: [16],
                prefix: [
                    '6011', '622126', '622127', '622128', '622129', '62213', '62214', '62215', '62216', '62217',
                    '62218', '62219', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '62290',
                    '62291', '622920', '622921', '622922', '622923', '622924', '622925', '644', '645', '646',
                    '647', '648', '649', '65',
                ],
            }
        ],
        [
            exports.CreditCardType.Jcb,
            {
                length: [16],
                prefix: ['3528', '3529', '353', '354', '355', '356', '357', '358'],
            }
        ],
        [
            exports.CreditCardType.Maestro,
            {
                length: [12, 13, 14, 15, 16, 17, 18, 19],
                prefix: [
                    '5018', '5020', '5038', '5868', '6304', '6759', '6761', '6762', '6763', '6764', '6765', '6766',
                ],
            }
        ],
        [
            exports.CreditCardType.Master,
            {
                length: [16],
                prefix: ['51', '52', '53', '54', '55'],
            }
        ],
        [
            exports.CreditCardType.Visa,
            {
                length: [16],
                prefix: ['4'],
            }
        ],
        [
            exports.CreditCardType.Dankort,
            {
                length: [16],
                prefix: ['5019'],
            }
        ],
        [
            exports.CreditCardType.DinnerClub,
            {
                length: [14],
                prefix: ['300', '301', '302', '303', '304', '305', '36'],
            }
        ],
        [
            exports.CreditCardType.DinnerClubUs,
            {
                length: [16],
                prefix: [
                    '4011', '4312', '4389', '4514', '4573', '4576', '5041', '5066', '5067', '509',
                    '6277', '6362', '6363', '650', '6516', '6550',
                ],
            }
        ],
        [
            exports.CreditCardType.Forbrugsforeningen,
            {
                length: [16],
                prefix: ['600722'],
            }
        ],
        [
            exports.CreditCardType.Laser,
            {
                length: [16, 17, 18, 19],
                prefix: ['6304', '6706', '6771', '6709'],
            }
        ],
        [
            exports.CreditCardType.Solo,
            {
                length: [16, 18, 19],
                prefix: ['6334', '6767'],
            }
        ],
        [
            exports.CreditCardType.UnionPay,
            {
                length: [16, 17, 18, 19],
                prefix: [
                    '622126', '622127', '622128', '622129', '62213', '62214', '62215', '62216', '62217', '62218',
                    '62219', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '62290', '62291',
                    '622920', '622921', '622922', '622923', '622924', '622925',
                ],
            }
        ],
        [
            exports.CreditCardType.VisaElectron,
            {
                length: [16],
                prefix: ['4026', '417500', '4405', '4508', '4844', '4913', '4917'],
            }
        ]
    ]);

    var check$9 = function (input) {
        if (!/^\d+$/.test(input)) {
            return { valid: false, meta: [] };
        }
        var converted = input.split('').map(function (c) { return parseInt(c, 10); });
        var checkDigit = converted.pop();
        var isValid = luhn(converted.reverse(), DoublePosition.Even) === checkDigit;
        if (!isValid) {
            return { valid: false, meta: [] };
        }
        var match = [];
        for (var _i = 0, _a = Object.keys(exports.CreditCardType); _i < _a.length; _i++) {
            var tpe = _a[_i];
            var cardType = exports.CreditCardType[tpe];
            if (!CreditCardMap.has(cardType)) {
                continue;
            }
            var cardFormat = CreditCardMap.get(cardType);
            var prefix = cardFormat.prefix, length_1 = cardFormat.length;
            for (var i in cardFormat.prefix) {
                if (input.substr(0, prefix[i].length) === prefix[i] && length_1.indexOf(input.length) !== -1) {
                    match.push(cardType);
                }
            }
        }
        return { valid: true, meta: match };
    };

    var fake$9 = function (type) {
        var tpe = type || randomFromArray(Object.values(exports.CreditCardType));
        if (!CreditCardMap.has(tpe)) {
            return '';
        }
        var format = CreditCardMap.get(tpe);
        var length = randomFromArray(format.length);
        var prefix = randomFromArray(format.prefix);
        var prefixLength = prefix.length;
        if (length <= prefixLength) {
            return '';
        }
        var cardNumber = "" + prefix + Array(length - prefixLength - 1).fill(0).map(function (_, __) { return randomFromRange(0, 9); }).join('');
        var reversed = cardNumber.split('').map(function (c) { return parseInt(c, 10); }).reverse();
        var finalDigit = luhn(reversed, DoublePosition.Even);
        return "" + cardNumber + finalDigit;
    };

    var index$9 = { fake: fake$9, check: check$9 };

    var check$a = function (input) {
        var value = input.toUpperCase();
        if (!/^[0123456789ABCDEFGHJKLMNPQRSTUVWXYZ*@#]{9}$/.test(value)) {
            return { valid: false };
        }
        var chars = value.split('');
        var lastChar = chars.pop();
        var converted = chars.map(function (c) {
            var code = c.charCodeAt(0);
            switch (true) {
                case (c === '*'): return 36;
                case (c === '@'): return 37;
                case (c === '#'): return 38;
                case (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)): return (code - 'A'.charCodeAt(0) + 10);
                default: return parseInt(c, 10);
            }
        });
        var sum = converted
            .map(function (v, i) {
            var double = (i % 2 === 0) ? v : 2 * v;
            return Math.floor(double / 10) + double % 10;
        })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - (sum % 10)) % 10;
        return { valid: lastChar === "" + checkDigit };
    };

    var fake$a = function () {
        var partial = randomString(8, '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ*@#');
        var converted = partial.split('')
            .map(function (c) {
            var code = c.charCodeAt(0);
            switch (true) {
                case (c === '*'): return 36;
                case (c === '@'): return 37;
                case (c === '#'): return 38;
                case (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)): return (code - 'A'.charCodeAt(0) + 10);
                default: return parseInt(c, 10);
            }
        });
        var sum = converted
            .map(function (v, i) {
            var double = (i % 2 === 0) ? v : 2 * v;
            return Math.floor(double / 10) + double % 10;
        })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - (sum % 10)) % 10;
        return "" + partial + checkDigit;
    };

    var index$a = { fake: fake$a, check: check$a };

    var check$b = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'DK') {
            value = value.substr(2);
        }
        if (!/^\d{8}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var weight = [2, 7, 6, 5, 4, 3, 2, 1];
        var sum = digits.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        return { valid: sum % 11 === 0 };
    };

    var fake$b = function () {
        var firstSixth = randomNumbers(6);
        var seventh = randomFromRange(1, 9);
        var partial = firstSixth.concat(seventh);
        var weight = [2, 7, 6, 5, 4, 3, 2];
        var sum = partial.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 11 - sum % 11;
        switch (true) {
            case (remainder === 11):
                return partial.join('') + "0";
            case (remainder === 10):
                return "" + firstSixth.join('') + (seventh - 1) + "1";
            case (remainder < 10):
                return "" + partial.join('') + remainder;
        }
    };

    var index$b = { fake: fake$b, check: check$b };

    var check$c = function (input) {
        return { valid: /^\d{3,4}$/.test(input) };
    };

    var fake$c = function () {
        var numDigits = randomFromArray([3, 4]);
        return randomNumbers(numDigits).join('');
    };

    var index$c = { fake: fake$c, check: check$c };

    var check$d = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'SI') {
            value = value.substr(2);
        }
        if (!/^[1-9]\d{7}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        var weight = [8, 7, 6, 5, 4, 3, 2];
        var sum = digits.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 11 - sum % 11;
        if (remainder === 10) {
            remainder = 0;
        }
        return { valid: remainder === lastDigit };
    };

    var fake$d = function () {
        var partial = [randomFromRange(1, 9)].concat(randomNumbers(5));
        var weight = [8, 7, 6, 5, 4, 3];
        var sum = partial.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = sum % 11;
        var s = 11 * randomFromRange(1, 2) - remainder;
        var minOfSeventh = Math.max(0, Math.floor((s - 10) / 2) + 1);
        var maxOfSeventh = Math.min(9, Math.floor((s - 1) / 2));
        var seventh = randomFromRange(minOfSeventh, maxOfSeventh);
        var last = s - 2 * seventh;
        return "" + partial.join('') + seventh + last;
    };

    var index$d = { fake: fake$d, check: check$d };

    var check$e = function (input) {
        if (!/^(\d{8}|\d{12}|\d{13}|\d{14})$/.test(input)) {
            return { valid: false };
        }
        var length = input.length;
        var weight = (length === 8) ? [3, 1] : [1, 3];
        var sum = Array(length - 1)
            .fill(0)
            .map(function (_, i) { return parseInt(input.charAt(i), 10) * weight[i % 2]; })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        return {
            valid: "" + checkDigit === input.charAt(length - 1),
        };
    };

    var fake$e = function () {
        var numDigits = randomFromArray([8, 12, 13]) - 1;
        var partial = randomNumbers(numDigits);
        var weight = (numDigits === 7) ? [3, 1] : [1, 3];
        var sum = Array(numDigits)
            .fill(0)
            .map(function (_, index) { return partial[index] * weight[index % 2]; })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        return "" + partial.join('') + checkDigit;
    };

    var index$e = { fake: fake$e, check: check$e };

    var checkDigit = function (input) {
        var weight = [256, 128, 64, 32, 16, 8, 4, 2];
        var sum = input.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        return (sum % 11) % 10;
    };

    var check$f = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'GR' || value.substr(0, 2) === 'EL') {
            value = value.substr(2);
        }
        if (!/^\d{8,9}$/.test(value)) {
            return { valid: false };
        }
        value = value.length === 8 ? "0" + value : "" + value;
        var digits = value.substr(0, 8).split('').map(function (c) { return parseInt(c, 10); });
        var cd = checkDigit(digits);
        return { valid: "" + cd === value.substr(8, 1) };
    };

    var fake$f = function () {
        var length = randomFromArray([8, 9]);
        var partial = length === 8 ? [0].concat(randomNumbers(7)) : randomNumbers(8);
        var cd = checkDigit(partial);
        return partial.concat([cd]).join('');
    };

    var index$f = { fake: fake$f, check: check$f };

    var transform = function (input) {
        return input
            .split('')
            .map(function (c) {
            var code = c.charCodeAt(0);
            return (code >= 65 && code <= 90)
                ? (code - 55)
                : c;
        })
            .join('')
            .split('')
            .map(function (c) { return parseInt(c, 10); });
    };
    var getCheckDigits = function (input) {
        var digits = transform(input);
        var checksum = 0;
        var length = digits.length;
        for (var i = 0; i < length; i++) {
            checksum = (checksum + digits[i]) * 10 % 97;
        }
        return (98 - ((checksum * 10) % 97)) % 97;
    };
    var isValid = function (input) {
        var digits = transform(input);
        var temp = 0;
        var length = digits.length;
        for (var i = 0; i < length - 1; ++i) {
            temp = (temp + digits[i]) * 10 % 97;
        }
        temp += digits[length - 1];
        return (temp % 97 === 1);
    };

    var check$g = function (input) {
        var ibanPatterns = {
            AD: 'AD[0-9]{10}[A-Z0-9]{12}',
            AE: 'AE[0-9]{21}',
            AL: 'AL[0-9]{10}[A-Z0-9]{16}',
            AO: 'AO[0-9]{23}',
            AT: 'AT[0-9]{18}',
            AZ: 'AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}',
            BA: 'BA[0-9]{18}',
            BE: 'BE[0-9]{14}',
            BF: 'BF[0-9]{25}',
            BG: 'BG[0-9]{2}[A-Z]{4}[0-9]{6}[A-Z0-9]{8}',
            BH: 'BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}',
            BI: 'BI[0-9]{14}',
            BJ: 'BJ[0-9]{2}[A-Z]{1}[0-9]{23}',
            BR: 'BR[0-9]{25}[A-Z][A-Z0-9]',
            CH: 'CH[0-9]{7}[A-Z0-9]{12}',
            CI: 'CI[0-9]{2}[A-Z]{1}[0-9]{23}',
            CM: 'CM[0-9]{25}',
            CR: 'CR[0-9]{20}',
            CV: 'CV[0-9]{23}',
            CY: 'CY[0-9]{10}[A-Z0-9]{16}',
            CZ: 'CZ[0-9]{22}',
            DE: 'DE[0-9]{20}',
            DK: 'DK[0-9]{16}',
            DO: 'DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}',
            DZ: 'DZ[0-9]{22}',
            EE: 'EE[0-9]{18}',
            ES: 'ES[0-9]{22}',
            FI: 'FI[0-9]{16}',
            FO: 'FO[0-9]{16}',
            FR: 'FR[0-9]{12}[A-Z0-9]{11}[0-9]{2}',
            GB: 'GB[0-9]{2}[A-Z]{4}[0-9]{14}',
            GE: 'GE[0-9]{2}[A-Z]{2}[0-9]{16}',
            GI: 'GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}',
            GL: 'GL[0-9]{16}',
            GR: 'GR[0-9]{9}[A-Z0-9]{16}',
            GT: 'GT[0-9]{2}[A-Z0-9]{24}',
            HR: 'HR[0-9]{19}',
            HU: 'HU[0-9]{26}',
            IE: 'IE[0-9]{2}[A-Z]{4}[0-9]{14}',
            IL: 'IL[0-9]{21}',
            IR: 'IR[0-9]{23}',
            IS: 'IS[0-9]{24}',
            IT: 'IT[0-9]{2}[A-Z]{1}[0-9]{10}[A-Z0-9]{12}',
            JO: 'JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}',
            KW: 'KW[0-9]{2}[A-Z]{4}[0-9]{22}',
            KZ: 'KZ[0-9]{5}[A-Z0-9]{13}',
            LB: 'LB[0-9]{6}[A-Z0-9]{20}',
            LI: 'LI[0-9]{7}[A-Z0-9]{12}',
            LT: 'LT[0-9]{18}',
            LU: 'LU[0-9]{5}[A-Z0-9]{13}',
            LV: 'LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}',
            MC: 'MC[0-9]{12}[A-Z0-9]{11}[0-9]{2}',
            MD: 'MD[0-9]{2}[A-Z0-9]{20}',
            ME: 'ME[0-9]{20}',
            MG: 'MG[0-9]{25}',
            MK: 'MK[0-9]{5}[A-Z0-9]{10}[0-9]{2}',
            ML: 'ML[0-9]{2}[A-Z]{1}[0-9]{23}',
            MR: 'MR[0-9]{25}',
            MT: 'MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}',
            MU: 'MU[0-9]{2}[A-Z]{4}[0-9]{19}[A-Z]{3}',
            MZ: 'MZ[0-9]{23}',
            NL: 'NL[0-9]{2}[A-Z]{4}[0-9]{10}',
            NO: 'NO[0-9]{13}',
            PK: 'PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',
            PL: 'PL[0-9]{26}',
            PS: 'PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',
            PT: 'PT[0-9]{23}',
            QA: 'QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}',
            RO: 'RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}',
            RS: 'RS[0-9]{20}',
            SA: 'SA[0-9]{4}[A-Z0-9]{18}',
            SE: 'SE[0-9]{22}',
            SI: 'SI[0-9]{17}',
            SK: 'SK[0-9]{22}',
            SM: 'SM[0-9]{2}[A-Z]{1}[0-9]{10}[A-Z0-9]{12}',
            SN: 'SN[0-9]{2}[A-Z]{1}[0-9]{23}',
            TL: 'TL[0-9]{21}',
            TN: 'TN[0-9]{22}',
            TR: 'TR[0-9]{7}[A-Z0-9]{17}',
            VG: 'VG[0-9]{2}[A-Z]{4}[0-9]{16}',
            XK: 'XK[0-9]{18}',
        };
        var value = input.replace(/\s/g, '');
        var country = value.substr(0, 2);
        if (!ibanPatterns[country]) {
            return { valid: false };
        }
        return {
            valid: isValid("" + value.substr(4) + value.substr(0, 4)),
        };
    };

    var fake$g = function (countryCode) {
        var supportedCountries = [
            'AD', 'AE', 'AL', 'AO', 'AT', 'AZ',
            'BA', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BR',
            'CH', 'CI', 'CM', 'CR', 'CV', 'CY', 'CZ',
            'DE', 'DK', 'DO', 'DZ',
            'EE', 'ES',
            'FI', 'FO', 'FR',
            'GB', 'GE', 'GI', 'GL', 'GR', 'GT',
            'HR', 'HU',
            'IE', 'IL', 'IR', 'IS', 'IT',
            'JO',
            'KW', 'KZ',
            'LB', 'LI', 'LT', 'LU', 'LV',
            'MC', 'MD', 'ME', 'MG', 'MK', 'ML', 'MR', 'MT', 'MU', 'MZ',
            'NL', 'NO',
            'PK', 'PL', 'PS', 'PT',
            'QA',
            'RO', 'RS',
            'SA', 'SE', 'SI', 'SK', 'SM', 'SN',
            'TL', 'TN', 'TR',
            'VG',
            'XK',
        ];
        var country = countryCode || randomFromArray(supportedCountries);
        if (supportedCountries.indexOf(country) === -1) {
            throw new Error("The " + country + " isn't supported");
        }
        var partial;
        switch (country) {
            case 'AD':
                partial = "AD" + randomNumbers(10).join('') + randomString(12, UpperCaseDigits);
                break;
            case 'AE':
                partial = "AE" + randomNumbers(21).join('');
                break;
            case 'AL':
                partial = "AL" + randomNumbers(10).join('') + randomString(16, UpperCaseDigits);
                break;
            case 'AO':
                partial = "AO" + randomNumbers(23).join('');
                break;
            case 'AT':
                partial = "AT" + randomNumbers(18).join('');
                break;
            case 'AZ':
                partial = "AZ" + randomNumbers(6).join('') + randomString(20, UpperCaseDigits);
                break;
            case 'BA':
                partial = "BA" + randomNumbers(18).join('');
                break;
            case 'BE':
                partial = "BE" + randomNumbers(14).join('');
                break;
            case 'BF':
                partial = "BF" + randomNumbers(25).join('');
                break;
            case 'BG':
                partial = "BG" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(6).join('') + randomString(8, UpperCaseDigits);
                break;
            case 'BH':
                partial = "BH" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(14, UpperCaseDigits);
                break;
            case 'BI':
                partial = "BI" + randomNumbers(14).join('');
                break;
            case 'BJ':
                partial = "BJ" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(23).join('');
                break;
            case 'BR':
                partial = "BR" + randomNumbers(25).join('') + randomString(1, UpperCaseLetters) + randomString(1, UpperCaseDigits);
                break;
            case 'CH':
                partial = "CH" + randomNumbers(7).join('') + randomString(12, UpperCaseDigits);
                break;
            case 'CI':
                partial = "CI" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(23).join('');
                break;
            case 'CM':
                partial = "CM" + randomNumbers(25).join('');
                break;
            case 'CR':
                partial = "CR" + randomNumbers(29).join('');
                break;
            case 'CV':
                partial = "CV" + randomNumbers(23).join('');
                break;
            case 'CY':
                partial = "CY" + randomNumbers(10).join('') + randomString(16, UpperCaseDigits);
                break;
            case 'CZ':
                partial = "CZ" + randomNumbers(22).join('');
                break;
            case 'DE':
                partial = "DE" + randomNumbers(20).join('');
                break;
            case 'DK':
                partial = "DK" + randomNumbers(16).join('');
                break;
            case 'DO':
                partial = "DO" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(20).join('');
                break;
            case 'DZ':
                partial = "DZ" + randomNumbers(22).join('');
                break;
            case 'EE':
                partial = "EE" + randomNumbers(18).join('');
                break;
            case 'ES':
                partial = "ES" + randomNumbers(22).join('');
                break;
            case 'FI':
                partial = "FI" + randomNumbers(16).join('');
                break;
            case 'FO':
                partial = "FO" + randomNumbers(16).join('');
                break;
            case 'FR':
                partial = "FR" + randomNumbers(12).join('') + randomString(11, UpperCaseDigits) + randomNumbers(2).join('');
                break;
            case 'GB':
                partial = "GB" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(14).join('');
                break;
            case 'GE':
                partial = "GE" + randomNumbers(2).join('') + randomString(2, UpperCaseLetters) + randomNumbers(16).join('');
                break;
            case 'GI':
                partial = "GI" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(15, UpperCaseDigits);
                break;
            case 'GL':
                partial = "GL" + randomNumbers(16).join('');
                break;
            case 'GR':
                partial = "GR" + randomNumbers(9).join('') + randomString(16, UpperCaseDigits);
                break;
            case 'GT':
                partial = "GT" + randomNumbers(2).join('') + randomString(24, UpperCaseDigits);
                break;
            case 'HR':
                partial = "HR" + randomNumbers(19).join('');
                break;
            case 'HU':
                partial = "HU" + randomNumbers(26).join('');
                break;
            case 'IE':
                partial = "IE" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(14).join('');
                break;
            case 'IL':
                partial = "IL" + randomNumbers(21).join('');
                break;
            case 'IR':
                partial = "IR" + randomNumbers(24).join('');
                break;
            case 'IS':
                partial = "IS" + randomNumbers(24).join('');
                break;
            case 'IT':
                partial = "IT" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(10).join('') + randomString(12, UpperCaseDigits);
                break;
            case 'JO':
                partial = "JO" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(4).join('') + randomString(8, '0') + randomString(10, UpperCaseDigits);
                break;
            case 'KW':
                partial = "KW" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(22).join('');
                break;
            case 'KZ':
                partial = "KZ" + randomNumbers(5).join('') + randomString(13, UpperCaseDigits);
                break;
            case 'LB':
                partial = "LB" + randomNumbers(6).join('') + randomString(20, UpperCaseDigits);
                break;
            case 'LI':
                partial = "LI" + randomNumbers(7).join('') + randomString(12, UpperCaseDigits);
                break;
            case 'LT':
                partial = "LT" + randomNumbers(18).join('');
                break;
            case 'LU':
                partial = "LU" + randomNumbers(5).join('') + randomString(13, UpperCaseDigits);
                break;
            case 'LV':
                partial = "LV" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(13, UpperCaseDigits);
                break;
            case 'MC':
                partial = "MC" + randomNumbers(12).join('') + randomString(11, UpperCaseDigits) + randomNumbers(2).join('');
                break;
            case 'MD':
                partial = "MD" + randomNumbers(2).join('') + randomString(20, UpperCaseDigits);
                break;
            case 'ME':
                partial = "ME" + randomNumbers(20).join('');
                break;
            case 'MG':
                partial = "MG" + randomNumbers(25).join('');
                break;
            case 'MK':
                partial = "MK" + randomNumbers(5).join('') + randomString(10, UpperCaseDigits) + randomNumbers(2).join('');
                break;
            case 'ML':
                partial = "ML" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(23).join('');
                break;
            case 'MR':
                partial = "MR" + randomNumbers(25).join('');
                break;
            case 'MT':
                partial = "MT" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(5).join('') + randomString(18, UpperCaseDigits);
                break;
            case 'MU':
                partial = "MU" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(19).join('') + randomString(3, UpperCaseLetters);
                break;
            case 'MZ':
                partial = "MZ" + randomNumbers(23).join('');
                break;
            case 'NL':
                partial = "NL" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(10).join('');
                break;
            case 'NO':
                partial = "NO" + randomNumbers(13).join('');
                break;
            case 'PK':
                partial = "PK" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(16, UpperCaseDigits);
                break;
            case 'PL':
                partial = "PL" + randomNumbers(26).join('');
                break;
            case 'PS':
                partial = "PS" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(21, UpperCaseDigits);
                break;
            case 'PT':
                partial = "PT" + randomNumbers(23).join('');
                break;
            case 'QA':
                partial = "QA" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(21, UpperCaseDigits);
                break;
            case 'RO':
                partial = "RO" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomString(16, UpperCaseDigits);
                break;
            case 'RS':
                partial = "RS" + randomNumbers(20).join('');
                break;
            case 'SA':
                partial = "SA" + randomNumbers(4).join('') + randomString(18, UpperCaseDigits);
                break;
            case 'SE':
                partial = "SE" + randomNumbers(22).join('');
                break;
            case 'SI':
                partial = "SI" + randomNumbers(17).join('');
                break;
            case 'SK':
                partial = "SK" + randomNumbers(22).join('');
                break;
            case 'SM':
                partial = "SM" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(10).join('') + randomString(12, UpperCaseDigits);
                break;
            case 'SN':
                partial = "SN" + randomNumbers(2).join('') + randomString(1, UpperCaseLetters) + randomNumbers(23).join('');
                break;
            case 'TL':
                partial = "TL" + randomNumbers(21).join('');
                break;
            case 'TN':
                partial = "TN" + randomNumbers(22).join('');
                break;
            case 'TR':
                partial = "TR" + randomNumbers(7).join('') + randomString(17, UpperCaseDigits);
                break;
            case 'VG':
                partial = "VG" + randomNumbers(2).join('') + randomString(4, UpperCaseLetters) + randomNumbers(16).join('');
                break;
            case 'XK':
                partial = "XK" + randomNumbers(18).join('');
                break;
        }
        var value = "" + partial.substr(4) + partial.substr(0, 2);
        var cd = getCheckDigits(value);
        var checkDigits = cd < 10 ? "0" + cd : "" + cd;
        return "" + partial.substr(0, 2) + checkDigits + partial.substr(4);
    };

    var index$g = { fake: fake$g, check: check$g };

    var check$h = function (input) {
        switch (true) {
            case /^\d{15}$/.test(input):
            case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(input):
            case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(input):
                var converted = input.replace(/[^0-9]/g, '').split('').map(function (c) { return parseInt(c, 10); });
                var checkDigit = converted.pop();
                return { valid: luhn(converted, DoublePosition.Old) === checkDigit };
            case /^\d{14}$/.test(input):
            case /^\d{16}$/.test(input):
            case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(input):
            case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(input):
                return { valid: true };
            default:
                return { valid: false };
        }
    };

    var fake$h = function () {
        var rbi = [
            '01',
            '10',
            '30', '33', '35',
            '44', '45', '49',
            '50', '51', '52', '53', '54',
            '86',
            '91', '98', '99',
        ];
        var firstTwo = randomFromArray(rbi);
        var first = parseInt(firstTwo.charAt(0), 10);
        var second = parseInt(firstTwo.charAt(1), 10);
        var partial = randomNumbers(12);
        var arr = [first, second].concat(partial);
        var checkDigit = luhn(arr, DoublePosition.Old);
        return arr.concat(checkDigit).join('');
    };

    var index$h = { fake: fake$h, check: check$h };

    var check$i = function (input) {
        if (!/^IMO \d{7}$/i.test(input)) {
            return { valid: false };
        }
        var digits = input.replace(/^.*(\d{7})$/, '$1');
        var sum = Array(digits.length - 1)
            .fill(0)
            .map(function (_, index) { return parseInt(digits[index], 10) * (7 - index); })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = sum % 10;
        return { valid: (checkDigit === parseInt(digits.charAt(6), 10)) };
    };

    var fake$i = function () {
        var partial = randomNumbers(6);
        var sum = Array(partial.length)
            .fill(0)
            .map(function (_, index) { return partial[index] * (7 - index); })
            .reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = sum % 10;
        return "IMO " + partial.join('') + checkDigit;
    };

    var index$i = { fake: fake$i, check: check$i };

    var IsbnType;
    (function (IsbnType) {
        IsbnType["Isbn10"] = "Isbn10";
        IsbnType["Isbn13"] = "Isbn13";
    })(IsbnType || (IsbnType = {}));
    var IsbnType$1 = IsbnType;

    var check$j = function (input) {
        switch (true) {
            case /^\d{9}[\dX]$/.test(input):
            case (input.length === 13 && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(input)):
            case (input.length === 13 && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(input)):
                return checkIsbn10(input);
            case /^(978|979)\d{9}[\dX]$/.test(input):
            case (input.length === 17 && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(input)):
            case (input.length === 17 && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(input)):
                return checkIsbn13(input);
            default:
                return { valid: false };
        }
    };
    var checkIsbn10 = function (input) {
        var chars = input.replace(/[^0-9X]/gi, '').split('');
        var checkDigit = chars.pop();
        var sum = chars.map(function (c, i) { return parseInt(c, 10) * (10 - i); }).reduce(function (a, b) { return a + b; }, 0);
        var checksum = "" + (11 - (sum % 11));
        if (checksum === '11') {
            checksum = '0';
        }
        else if (checksum === '10') {
            checksum = 'X';
        }
        return {
            meta: { type: IsbnType$1.Isbn10 },
            valid: "" + checksum === checkDigit,
        };
    };
    var checkIsbn13 = function (input) {
        var chars = input.replace(/[^0-9X]/gi, '').split('');
        var checkDigit = chars.pop();
        var sum = chars.map(function (c, i) { return ((i % 2 === 0) ? parseInt(c, 10) : (parseInt(c, 10) * 3)); }).reduce(function (a, b) { return a + b; }, 0);
        var checksum = "" + (10 - (sum % 10));
        if (checksum === '10') {
            checksum = '0';
        }
        return {
            meta: { type: IsbnType$1.Isbn13 },
            valid: "" + checksum === checkDigit,
        };
    };

    var fake$j = function (type) {
        var tpe = type || randomFromArray(Object.values(IsbnType$1));
        switch (tpe) {
            case IsbnType$1.Isbn10:
                return fakeIsbn10();
            case IsbnType$1.Isbn13:
            default:
                return fakeIsbn13();
        }
    };
    var fakeIsbn10 = function () {
        var partial = randomNumbers(9);
        var sum = partial.map(function (v, index) { return v * (index + 1); }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = sum % 11;
        var check = remainder === 10 ? 'X' : "" + remainder;
        return "" + partial.join('') + check;
    };
    var fakeIsbn13 = function () {
        var prefix = [9, 7].concat(randomFromArray([8, 9]));
        var partial = prefix.concat(randomNumbers(9));
        var sum = partial.map(function (v, index) { return v * (index % 2 === 0 ? 1 : 3); }).reduce(function (a, b) { return a + b; }, 0);
        var check = (10 - sum % 10) % 10;
        return "" + partial.join('') + check;
    };

    var index$j = { fake: fake$j, check: check$j };

    var CoutryCodes = 'AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|' +
        'BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|' +
        'SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|' +
        'IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|' +
        'MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|' +
        'PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|' +
        'SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|' +
        'YE|ZM|ZW';

    var check$k = function (input) {
        var regex = new RegExp("^(" + CoutryCodes + ")[0-9A-Z]{10}$");
        if (!regex.test(input)) {
            return { valid: false };
        }
        var chars = input.split('');
        var lastChar = chars.pop();
        var charCode = chars.map(function (_, i) {
            var c = input.charCodeAt(i);
            return (c > 57) ? "" + (c - 55) : input.charAt(i);
        });
        var split = charCode.join('').split('').map(function (c) { return parseInt(c, 10); });
        var group = (split.length % 2 === 0) ? DoublePosition.Old : DoublePosition.Even;
        var checkDigit = luhn(split, group);
        return { valid: "" + checkDigit === lastChar };
    };

    var fake$k = function (countryCode) {
        var country = countryCode || randomFromArray(CoutryCodes.split('|'));
        var partial = "" + country + randomString(9, Hex);
        var charCode = partial.split('').map(function (_, i) {
            var c = partial.charCodeAt(i);
            return (c > 57) ? "" + (c - 55) : partial.charAt(i);
        });
        var split = charCode.join('').split('').map(function (c) { return parseInt(c, 10); });
        var group = (split.length % 2 === 0) ? DoublePosition.Old : DoublePosition.Even;
        var checkDigit = luhn(split, group);
        return "" + partial + checkDigit;
    };

    var index$k = { fake: fake$k, check: check$k };

    var IsmnType;
    (function (IsmnType) {
        IsmnType["Ismn10"] = "Ismn10";
        IsmnType["Ismn13"] = "Ismn13";
    })(IsmnType || (IsmnType = {}));
    var IsmnType$1 = IsmnType;

    var check$l = function (input) {
        switch (true) {
            case /^M\d{9}$/.test(input):
            case /^M-\d{4}-\d{4}-\d{1}$/.test(input):
            case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(input):
                return checkIsmn("9790" + input.substr(1), IsmnType$1.Ismn10);
            case /^9790\d{9}$/.test(input):
            case /^979-0-\d{4}-\d{4}-\d{1}$/.test(input):
            case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(input):
                return checkIsmn(input, IsmnType$1.Ismn13);
            default:
                return { valid: false };
        }
    };
    var checkIsmn = function (input, type) {
        var v = input.replace(/[^0-9]/gi, '');
        var chars = v.split('');
        var lastChar = chars.pop();
        var weight = [1, 3];
        var sum = chars.map(function (c, i) { return parseInt(c, 10) * weight[i % 2]; }).reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        return {
            meta: { type: type },
            valid: "" + checkDigit === lastChar,
        };
    };

    var fake$l = function (type) {
        var tpe = type || randomFromArray(Object.values(IsmnType$1));
        var digits = randomNumbers(8);
        var withPrefix = [9, 7, 9, 0].concat(digits);
        var sum = withPrefix.map(function (v, i) { return i % 2 === 0 ? v : v * 3; }).reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        var ismn = tpe === IsmnType$1.Ismn10
            ? digits.concat([checkDigit]).join('')
            : withPrefix.concat([checkDigit]).join('');
        return tpe === IsmnType$1.Ismn10 ? "M" + ismn : ismn;
    };

    var index$l = { fake: fake$l, check: check$l };

    var check$m = function (input) {
        if (!/^\d{4}\-\d{3}[\dX]$/.test(input)) {
            return { valid: false };
        }
        var chars = input.replace(/[^0-9X]/gi, '').split('');
        if (chars[7] === 'X') {
            chars[7] = '10';
        }
        var sum = chars.map(function (c, i) { return parseInt(c, 10) * (8 - i); }).reduce(function (a, b) { return a + b; }, 0);
        return { valid: (sum % 11 === 0) };
    };

    var fake$m = function () {
        var first = randomNumbers(4);
        var second = randomNumbers(3);
        var partial = first.concat(second);
        var sum = partial.map(function (v, i) { return v * (8 - i); }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = (11 - sum % 11) % 11;
        var check = remainder === 10 ? 'X' : "" + remainder;
        return first.join('') + "-" + second.join('') + check;
    };

    var index$m = { fake: fake$m, check: check$m };

    var check$n = function (input) {
        return { valid: /^[0123]\d{12}$/.test(input) };
    };

    var fake$n = function () {
        var first = randomFromArray([0, 1, 2, 3]);
        var partial = randomNumbers(12);
        return [first].concat(partial).join('');
    };

    var index$n = { fake: fake$n, check: check$n };

    var check$o = function (input) {
        if (!/^\d{10}$/.test(input)) {
            return { valid: false };
        }
        var first = [8, 0, 8, 4, 0];
        var digits = input.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        var checkDigit = luhn(first.concat(digits).reverse(), DoublePosition.Even);
        return { valid: checkDigit === lastDigit };
    };

    var fake$o = function () {
        var first = [8, 0, 8, 4, 0];
        var partial = randomNumbers(9);
        var body = first.concat(partial).reverse();
        var checkDigit = luhn(body, DoublePosition.Even);
        return "" + partial.join('') + checkDigit;
    };

    var index$o = { fake: fake$o, check: check$o };

    var check$p = function (input) {
        var citizenCheck = 'JZIHGFEDCBA'.split('');
        var foreignerCheck = 'XWUTRQPNMLK'.split('');
        if (!/^[STFG]\d{7}[A-Z]$/.test(input)) {
            return { valid: false };
        }
        var first = input.substr(0, 1);
        var digits = input.substr(1, 7);
        var lastChar = input.substr(-1);
        var weight = [2, 7, 6, 5, 4, 3, 2];
        var sum = digits.split('').map(function (c, i) { return parseInt(c, 10) * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var finalSum = (first === 'T' || first === 'G') ? sum + 4 : sum;
        var remainder = finalSum % 11;
        var checkChar = (first === 'S' || first === 'T') ? citizenCheck[remainder] : foreignerCheck[remainder];
        return { valid: checkChar === lastChar };
    };

    var fake$p = function () {
        var citizenCheck = 'JZIHGFEDCBA'.split('');
        var foreignerCheck = 'XWUTRQPNMLK'.split('');
        var first = randomFromArray(['S', 'T', 'F', 'G']);
        var partial = randomNumbers(7);
        var weight = [2, 7, 6, 5, 4, 3, 2];
        var sum = partial.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var finalSum = (first === 'T' || first === 'G') ? sum + 4 : sum;
        var remainder = finalSum % 11;
        var checkChar = (first === 'S' || first === 'T') ? citizenCheck[remainder] : foreignerCheck[remainder];
        return "" + first + partial.join('') + checkChar;
    };

    var index$p = { fake: fake$p, check: check$p };

    var checkDigits$2 = function (input) {
        var sum = input.map(function (v, i) { return v * (1 + i % 9); }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = sum % 11;
        if (remainder === 10) {
            remainder = input.map(function (v, i) { return v * (1 + (i + 2) % 9); }).reduce(function (a, b) { return a + b; }, 0);
        }
        return remainder % 11 % 10;
    };

    var check$q = function (input) {
        var value = input.replace(/\s/g, '');
        if (value.substr(0, 2) === 'LT') {
            value = value.substr(2);
        }
        if (!/^([0-9]{7}1[0-9]|[0-9]{10}1[0-9])$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return { valid: lastDigit === checkDigits$2(digits) };
    };

    var fake$q = function () {
        var length = randomFromArray([8, 11]);
        var partial = randomNumbers(length - 1).concat([1]);
        var cd = checkDigits$2(partial);
        return "" + partial.join('') + cd;
    };

    var index$q = { fake: fake$q, check: check$q };

    (function (CompanyType) {
        CompanyType["CitizenPerson"] = "V";
        CompanyType["ForeignPerson"] = "E";
        CompanyType["Company"] = "J";
        CompanyType["Passport"] = "P";
        CompanyType["Government"] = "G";
    })(exports.RifCompanyType || (exports.RifCompanyType = {}));

    var CompanyWeight = new Map([
        [exports.RifCompanyType.CitizenPerson, 4],
        [exports.RifCompanyType.ForeignPerson, 8],
        [exports.RifCompanyType.Company, 12],
        [exports.RifCompanyType.Passport, 16],
        [exports.RifCompanyType.Government, 20],
    ]);
    var checkDigits$3 = function (companyType, input) {
        var weight = [3, 2, 7, 6, 5, 4, 3, 2];
        var sum = CompanyWeight.get(companyType) + input.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 11 - sum % 11;
        return (remainder === 10 || remainder === 11) ? 0 : remainder;
    };

    var check$r = function (input) {
        var value = input.replace(/\s/g, '');
        if (/^VE[VEJPG][0-9]{9}$/.test(value)) {
            value = value.substr(2);
        }
        if (!/^[VEJPG][0-9]{9}$/.test(value)) {
            return { valid: false };
        }
        var type = value.substr(0, 1);
        var digits = value.substr(1).split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return {
            meta: { type: type },
            valid: lastDigit === checkDigits$3(type, digits),
        };
    };

    var fake$r = function (companyType) {
        var type = companyType || randomFromArray(Object.values(exports.RifCompanyType));
        var partial = randomNumbers(8);
        var cd = checkDigits$3(type, partial);
        return "" + type + partial.join('') + cd;
    };

    var index$r = { fake: fake$r, check: check$r };

    var check$s = function (input) {
        if (!/^\d{9}$/.test(input)) {
            return { valid: false };
        }
        var sum = 0;
        for (var i = 0; i < input.length; i += 3) {
            sum += parseInt(input.charAt(i), 10) * 3
                + parseInt(input.charAt(i + 1), 10) * 7
                + parseInt(input.charAt(i + 2), 10);
        }
        return { valid: (sum !== 0 && sum % 10 === 0) };
    };

    var fake$s = function () {
        var numDigits = 8;
        var partial = randomNumbers(numDigits);
        var sum = 0;
        for (var i = 0; i < numDigits; i += 3) {
            sum += partial[i] * 3
                + partial[i + 1] * 7
                + ((i + 2 < numDigits) ? partial[i + 2] : 0);
        }
        var checkDigit = (10 - sum % 10) % 10;
        return "" + partial.join('') + checkDigit;
    };

    var index$s = { fake: fake$s, check: check$s };

    var check$t = function (input) {
        var v = input.toUpperCase();
        if (!/^[0-9A-Z]{7}$/.test(v)) {
            return { valid: false };
        }
        var chars = v.split('');
        var lastChar = chars.pop();
        var weight = [1, 3, 1, 7, 3, 9, 1];
        var sum = chars.map(function (c, i) { return weight[i] * parseInt(c, 36); }).reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        return { valid: "" + checkDigit === lastChar };
    };

    var fake$t = function () {
        var sedol = randomString(6, "" + Digits + UpperCaseLetters);
        var weight = [1, 3, 1, 7, 3, 9];
        var chars = sedol.split('');
        var sum = chars.map(function (c, i) { return parseInt(c, 36) * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var checkDigit = (10 - sum % 10) % 10;
        return "" + sedol + checkDigit;
    };

    var index$t = { fake: fake$t, check: check$t };

    var check$u = function (input) {
        if (!/^\d{9}$/.test(input)) {
            return { valid: false };
        }
        var digits = input.split('').map(function (c) { return parseInt(c, 10); });
        var first = digits[0];
        if (first === 0 || first === 8) {
            return { valid: false };
        }
        var lastDigit = digits.pop();
        var checkDigit = luhn([first].concat(digits.slice(1)).concat([0]), DoublePosition.Old);
        return { valid: checkDigit === lastDigit };
    };

    var fake$u = function () {
        var first = randomFromArray([1, 2, 3, 4, 5, 6, 7, 9]);
        var partial = randomNumbers(7);
        var checkDigit = luhn([first].concat(partial).concat([0]), DoublePosition.Old);
        return "" + first + partial.join('') + checkDigit;
    };

    var index$u = { fake: fake$u, check: check$u };

    var check$v = function (input) {
        if (!/^[12]\d{8}$/.test(input)) {
            return { valid: false };
        }
        var digits = input.split('').map(function (c) { return parseInt(c, 10); });
        var last = digits.pop();
        var checkDigit = luhn(digits, DoublePosition.Old);
        return { valid: checkDigit === last };
    };

    var fake$v = function () {
        var first = randomFromArray([1, 2]);
        var partial = randomNumbers(7);
        var checkDigit = luhn([first].concat(partial), DoublePosition.Old);
        return "" + first + partial.join('') + checkDigit;
    };

    var index$v = { fake: fake$v, check: check$v };

    var check$w = function (input) {
        if (!/^\d{14}$/.test(input)) {
            return { valid: false };
        }
        var digits = input.split('').map(function (c) { return parseInt(c, 10); });
        var last = digits.pop();
        var checkDigit = luhn(digits, DoublePosition.Even);
        return { valid: checkDigit === last };
    };

    var fake$w = function () {
        var partial = randomNumbers(13);
        var checkDigit = luhn(partial, DoublePosition.Even);
        return "" + partial.join('') + checkDigit;
    };

    var index$w = { fake: fake$w, check: check$w };

    var check$x = function (input) {
        return {
            valid: /^(00[1-9]|0[1-9]\d|[1-57-8]\d{2}|66[0-57-9]|6[0-57-9]\d)-(0[1-9]|[1-9]\d)-([1-9]\d{3}|0[1-9]\d{2}|00[1-9]\d|000[1-9])$/.test(input),
        };
    };

    var fake$x = function () {
        var first = "" + randomString(1, '1234578') + randomNumbers(2).join('');
        var middle = "" + randomString(1, '123456789') + randomNumbers(1).join('');
        var last = "" + randomString(1, '123456789') + randomNumbers(3).join('');
        return first + "-" + middle + "-" + last;
    };

    var index$x = { fake: fake$x, check: check$x };

    var checkDigit$1 = function (sequence, suffix) {
        var s = sequence;
        var weight = [3, 7, 9, 5, 8, 4, 2, 1, 6];
        var calculateCheckDigit = function (withSequence) {
            return withSequence.split('').map(function (c, i) { return parseInt(c, 10) * weight[i]; }).reduce(function (a, b) { return a + b; }, 0) % 11;
        };
        var cd = calculateCheckDigit("" + s + suffix);
        while (cd === 10) {
            s += 1;
            cd = calculateCheckDigit("" + s + suffix);
        }
        return {
            checkDigit: cd,
            sequence: s,
        };
    };

    var check$y = function (input) {
        var v = input.replace(/\s/g, '');
        if (!/^\d{10}$/.test(v) || v.substr(0, 1) === '0') {
            return { valid: false };
        }
        var serial = parseInt(v.substr(0, 3), 10);
        var dob = v.substr(4);
        var cd = checkDigit$1(serial, dob);
        return { valid: "" + cd.checkDigit === v.substr(3, 1) };
    };

    var fake$y = function () {
        var serial = parseInt("" + randomFromRange(1, 9) + randomNumbers(2).join(''), 10);
        var month = randomFromRange(1, 12);
        var monthWithPrefix = month >= 10 ? "" + month : "0" + month;
        var date = randomFromRange(0, 28);
        var dateWithPrefix = date >= 10 ? "" + date : "0" + date;
        var year = randomNumbers(2).join('');
        var dob = "" + monthWithPrefix + dateWithPrefix + year;
        var cd = checkDigit$1(serial, dob);
        return "" + cd.sequence + cd.checkDigit + " " + dob;
    };

    var index$y = { fake: fake$y, check: check$y };

    var checkDigits$4 = function (input) {
        var weight = [4, 3, 7, 5, 8, 6, 9, 10];
        var sum = input.map(function (v, i) { return v * weight[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = 11 - sum % 11;
        return (remainder < 10) ? remainder : 0;
    };

    var check$z = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^\d{8,9}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var first = digits.shift();
        return { valid: first === checkDigits$4(digits) };
    };

    var fake$z = function () {
        var length = randomFromArray([7, 8]);
        var partial = randomNumbers(length);
        var first = checkDigits$4(partial);
        var output = "" + first + partial.join('');
        return output.substr(0, 3) + " " + output.substr(3, 3) + " " + output.substr(6);
    };

    var index$z = { fake: fake$z, check: check$z };

    var check$A = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^[0-39]\d{9}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return { valid: lastDigit === luhn(digits, DoublePosition.Even) };
    };

    var fake$A = function () {
        var first = randomFromArray([0, 1, 2, 3, 9]);
        var partial = [first].concat(randomNumbers(8));
        var cd = luhn(partial, DoublePosition.Even);
        return "" + partial.join('') + cd;
    };

    var index$A = { fake: fake$A, check: check$A };

    var check$B = function (input) {
        var v = input.substr(0, 2) === 'AT' ? input.substr(2) : input;
        if (!/^U\d{8}$/.test(v)) {
            return { valid: false };
        }
        var digits = v.substr(1).split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        var checkDigit = (luhn(digits, DoublePosition.Old) + 6) % 10;
        return { valid: checkDigit === lastDigit };
    };

    var fake$B = function () {
        var partial = randomNumbers(7);
        var checkDigit = luhn(partial, DoublePosition.Old);
        var remainder = (checkDigit + 6) % 10;
        return "U" + partial.join('') + remainder;
    };

    var index$B = { fake: fake$B, check: check$B };

    var Chars = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
        'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    };
    var Weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    var check$C = function (input) {
        if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(input)) {
            return { valid: false };
        }
        var v = input.toUpperCase();
        var sum = v.split('').map(function (c, i) { return Chars[c] * Weights[i]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = "" + sum % 11;
        if (remainder === '10') {
            remainder = 'X';
        }
        return { valid: remainder === v.charAt(8) };
    };

    var fake$C = function () {
        var charsSet = "ABCDEFGHJKLMNPRSTUVWXYZ" + Digits;
        var generated = "" + randomString(8, charsSet) + randomString(1, Digits + "X") + randomString(8, charsSet);
        var sum = generated.split('').map(function (c, index) { return Chars[c] * Weights[index]; }).reduce(function (a, b) { return a + b; }, 0);
        var remainder = sum % 11;
        var checkCharacter = remainder === 10 ? 'X' : "" + remainder;
        return "" + generated.substr(0, 8) + checkCharacter + generated.substr(9);
    };

    var index$C = { fake: fake$C, check: check$C };

    var checkDigits$5 = function (input) {
        var sum = input
            .map(function (v, i) {
            var p = (v + 9 - i) % 10;
            return (p === 9) ? p : p * Math.pow(2, 9 - i) % 9;
        })
            .reduce(function (a, b) { return a + b; }, 10);
        return (10 - sum % 10) % 10;
    };

    var check$D = function (input) {
        var value = input.replace(/\s/g, '');
        if (!/^\d{10}$/.test(value)) {
            return { valid: false };
        }
        var digits = value.split('').map(function (c) { return parseInt(c, 10); });
        var lastDigit = digits.pop();
        return { valid: lastDigit === checkDigits$5(digits) };
    };

    var fake$D = function () {
        var partial = randomNumbers(9);
        var cd = checkDigits$5(partial);
        return "" + partial.join('') + cd;
    };

    var index$D = { fake: fake$D, check: check$D };

    exports.IsbnType = IsbnType$1;
    exports.IsmnType = IsmnType$1;
    exports.abn = index;
    exports.acn = index$1;
    exports.alv = index$2;
    exports.anum = index$3;
    exports.bic = index$4;
    exports.bn = index$5;
    exports.btw = index$6;
    exports.cnpj = index$7;
    exports.cpf = index$8;
    exports.creditCard = index$9;
    exports.cusip = index$a;
    exports.cvr = index$b;
    exports.cvv = index$c;
    exports.ddv = index$d;
    exports.ean = index$e;
    exports.fpa = index$f;
    exports.iban = index$g;
    exports.imei = index$h;
    exports.imo = index$i;
    exports.isbn = index$j;
    exports.isin = index$k;
    exports.ismn = index$l;
    exports.issn = index$m;
    exports.nif = index$n;
    exports.npi = index$o;
    exports.nric = index$p;
    exports.pvm = index$q;
    exports.rif = index$r;
    exports.rtn = index$s;
    exports.sedol = index$t;
    exports.sin = index$u;
    exports.siren = index$v;
    exports.siret = index$w;
    exports.ssn = index$x;
    exports.svnr = index$y;
    exports.tfn = index$z;
    exports.trn = index$A;
    exports.uid = index$B;
    exports.vin = index$C;
    exports.vkn = index$D;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
