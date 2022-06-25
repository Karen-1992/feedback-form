import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/textAreaField";
import TextField from "../common/textField";
import { sendForm } from "../../services/http.service";
import TelField from "../common/telField";

const Form = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        message: ""
    });
    // const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        // console.log(target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "isRequired"
            },
            // isRequired: {
            //     message: "Имя и фамилия обязательны для заполнения"
            // },
            spaces: {
                message: "Cлишком много пробелов"
            },
            isEng: {
                message: "Используйте латинские буквы"
            },
            minWordLength: {
                message: "Слишком короткое имя или фамилия",
                value: 3
            },
            maxWordLength: {
                message: "Слишком длинное имя или фамилия",
                value: 30
            },
            quantity: {
                message: "Поле должно состоять из 2 слов",
                value: 2
            }
        },
        email: {
            // isRequired: {
            //     message: "Электронная почта обязательна для заполнения"
            // },
            isRequired: {
                message: "isRequired"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        phone: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Недостаточное количество цифр в номере",
                value: 18
            },
            max: {
                message: "Слишком длинный номер",
                value: 19
            }
            // isRequired: {
            //     message: "Телефон обязателен для заполнения"
            // }
        },
        date: {
            isRequired: {
                message: "isRequired"
            }
            // isRequired: {
            //     message: "Дата рождения обязательна для заполнения"
            // }
        },
        message: {
            isRequired: {
                message: "isRequired"
            },
            // isRequired: {
            //     message: "Сообщение обязательно для заполнения"
            // },
            min: {
                message: "Минимальная длина сообщения 10 символа",
                value: 10
            },
            max: {
                message: "Максимальная длина сообщения 300 символа",
                value: 300
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            sendForm(data)
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
            // console.log(data);
            // await signUp(newData);
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя Фамилия"
                placeholder="Введите имя и фамилию"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                placeholder="Введите электронную почту"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TelField
                label="Номер телефона"
                name="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
            />
            <TextField
                label="Дата рождения"
                name="date"
                type="date"
                value={data.date}
                onChange={handleChange}
                error={errors.date}
            />
            <TextAreaField
                label="Сообщение"
                name="message"
                placeholder="Введите сообщение"
                value={data.message}
                onChange={handleChange}
                error={errors.message}
            />
            <p>
                <span className="required">*</span>
                Поле обязательно для заполнения
            </p>
            <button className="" type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default Form;
