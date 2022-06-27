import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import { TextField, TelField, TextAreaField } from "../../common/form";
import { postData } from "../../../services/http.service";
import { getUserDataToStorage } from "../../../services/localStorage.service";
import "./feedbackForm.sass";
// import { setUserDataToStorage } from "../../../services/localStorage.service";

const FeedbackPage = () => {
    const userData = getUserDataToStorage();
    const initialState = userData || {
        name: "",
        email: "",
        phone: "",
        date: "",
        message: ""
    };
    const [data, setData] = useState(initialState);
    const [response, setResponse] = useState("");
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const clearForm = () => {
        setData(initialState);
        setErrors({});
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "isRequired"
            },
            spaces: {
                message: "Cлишком много пробелов",
                value: 1
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
        },
        date: {
            isRequired: {
                message: "isRequired"
            },
            isDate: {
                message: "Неккоректная дата либо вы слишком молоды"
            }
        },
        message: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Минимальная длина сообщения 10 символа",
                value: 10
            },
            max: {
                message: "Максимальная длина сообщения 300 символа",
                value: 300
            },
            spaces: {
                message: "Cлишком много пробелов"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid =
        Object.keys(errors).length === 0 && response !== "in process";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        setResponse("in process");
        try {
            const result = await postData(data);
            setResponse(result);
            clearForm();
            setResponse({
                ...result,
                message: "Successful submission"
            });
            // закомментированный ниже код для возможности хранения данных пользователя в localStorage (кроме сообщения), при успешной отправке формы данные берутся из предыдущей успешной отправки формы
            // const storageData = {
            //     ...data,
            //     message: ""
            // };
            // setUserDataToStorage(storageData);
            // setData(storageData);
        } catch (error) {
            setResponse({
                message: `${error.message}: something was wrong`
            });
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleFocus = (e) => {
        setResponse("");
    };
    return (
        <form onSubmit={handleSubmit} onFocus={handleFocus}>
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
            <button
                className={isValid ? "button-valid" : ""}
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
            <p
                className={
                    "response-status" +
                    (response.status === "error" ? "-error" : "")
                }
            >
                {response.message}
            </p>
        </form>
    );
};

export default FeedbackPage;
