export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired": {
            statusValidate = data.trim() === "";
            break;
        }
        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "isEng": {
            const symbols = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const arr = symbols.split("");
            let matches = 0;
            for (let i = 0; i < data.length; i++) {
                if (arr.includes(data[i].toUpperCase())) {
                    matches += 1;
                }
            }
            statusValidate = matches !== data.length;
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        case "max": {
            statusValidate = data.length >= config.value;
            break;
        }
        case "quantity": {
            if (data.trim().length > config.value) {
                const arr = data.trim().split(" ");
                const wordQuantity = arr.length;
                statusValidate = wordQuantity < config.value;
                if (arr.length > 2) {
                    statusValidate = false;
                }
            }
            break;
        }
        case "minWordLength": {
            const arr = data.trim().split(" ");
            statusValidate = arr.some(
                (i) => i.length < config.value && arr.length < 3
            );
            break;
        }
        case "maxWordLength": {
            const arr = data.trim().split(" ");
            statusValidate = arr.some(
                (i) => i.length >= config.value && arr.length < 3
            );
            break;
        }
        case "spaces": {
            let spaces = 0;
            let spaceIndex;
            for (let i = 0; i < data.length; i++) {
                if (data[i] === " ") {
                    spaces += 1;
                    spaceIndex = i;
                }
            }
            statusValidate = spaces >= 2 || spaceIndex === 0;
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
