import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';


function App() {
    let [value, setValue] = useState<number>(0);
    let [maxValue, setMaxValue] = useState<number>(5)
    let [startValue, setStartValue] = useState<number>(0)
    // дополнительный стейт error для хранения сообщения об ошибке.
    let [error, setError] = useState<string | null>(null);
    // дополнительное состояние, которое будет отслеживать, находятся ли инпуты в процессе редактирования.
    let [isEditing, setIsEditing] = useState<boolean>(false);


    const onClickIncHandler = () => {
        if (startValue >= maxValue) {
            setError('Incorrect value!');
        } else {
            if (value < maxValue) {
                setValue(++value);
            }
        }
    }

    const onClickResetHandler = () => {
        setValue(startValue)
    }

    const onClickSetHandler = () => {
        if (startValue >= maxValue || startValue < 0) {
            setError('Incorrect value!');
        } else {
            setValue(startValue);
            setError(null);
            setIsEditing(false);
        }
    }

    const onMaxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = parseInt(e.currentTarget.value);
        setMaxValue(newMaxValue);
        setIsEditing(true);
        if (newMaxValue <= startValue || newMaxValue < 0) {
            setError('Incorrect value!');
        } else {
            setError('Enter values and press `set`');
        }
    }
    const onStartValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartValue = parseInt(e.currentTarget.value);
        setStartValue(newStartValue);
        setIsEditing(true);
        if (newStartValue >= maxValue || newStartValue < 0) {
            setError('Incorrect value!');
        } else {
            setError('Enter values and press `set`');
        }
    }


    // Добавила состояние isButtonsDisabled, которое определяет, должны ли кнопки быть задизейбленными.
    const isButtonsDisabled = startValue >= maxValue || startValue < 0 || maxValue < 0 ;


    // Добавила LocalStorage:
    // Загрузка startValue из localStorage при монтировании компонента
    useEffect(() => {
        let startValueSave = localStorage.getItem('counterStartValue');
        if (startValueSave !== null) { /*Эта проверка гарантирует, что JSON.parse будет вызван только тогда, когда
        startValueSave действительно содержит данные, которые нужно распарсить. Если данных нет, состояние не будет
        изменено, и код избежит ненужных ошибок.*/
            setStartValue(JSON.parse(startValueSave));
        }
    }, []);

    // Загрузка maxValue из localStorage при монтировании компонента
    useEffect(() => {
        let maxValueSave = localStorage.getItem('counterMaxValue');
        if (maxValueSave !== null) {
            setMaxValue(JSON.parse(maxValueSave));
        }
    }, []);

    // Загрузка value из localStorage при монтировании компонента
    useEffect(() => {
        let valueSave = localStorage.getItem('counterValue');
        if (valueSave !== null) {
            setValue(JSON.parse(valueSave));
        }
    }, []);

    // Сохранение startValue в localStorage при его изменении
    useEffect(() => {
        localStorage.setItem('counterStartValue', JSON.stringify(startValue));
    }, [startValue]);

    // Сохранение maxValue в localStorage при его изменении
    useEffect(() => {
        localStorage.setItem('counterMaxValue', JSON.stringify(maxValue));
    }, [maxValue]);

    // Сохранение value в localStorage при его изменении
    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [value]);



    return (
        <div className="App">
            <div className={'set-block'}>
                <div className={'section-inputs'}>
                    max value: <input style={{minHeight: 20, textAlign: "center"}}
                                      type="number"
                                      className={maxValue < 0 || maxValue <= startValue ? 'error-input' : 'input'}
                                      value={maxValue}
                                      onChange={onMaxValueChangeHandler}/>
                    <br/>
                    start value: <input style={{minHeight: 20, textAlign: "center"}}
                                        type="number"
                                        className={startValue < 0 || startValue >= maxValue ? 'error-input' : 'input'}
                                        value={startValue} onChange={onStartValueChangeHandler}/>
                </div>
                <div className={'buttons'}>
                    <button
                        className={isButtonsDisabled || !error ? 'disable-set' : 'set'}
                        onClick={onClickSetHandler}
                        disabled={isButtonsDisabled}>
                        set
                    </button>
                </div>
            </div>

            <div className={"scoreboard-block"}>
                <div className={error ? (error === 'Incorrect value!' ? 'info-message-error' : 'info-message') : (value === maxValue ? 'error-scoreboard' : 'scoreboard')}>
                    {error ? error : value}
                </div>
                <div className={'buttons'}>
                    <button className={(isButtonsDisabled || value >= maxValue || isEditing) ? 'disable-inc' : 'inc'}
                            onClick={onClickIncHandler}
                            disabled={isButtonsDisabled || value >= maxValue || isEditing}
                    >
                        inc
                    </button>
                    <button className={isButtonsDisabled || isEditing ? 'disable-reset' : 'reset'}
                            onClick={onClickResetHandler}
                            disabled={isButtonsDisabled || isEditing}
                    >
                        reset
                    </button>

                </div>
            </div>
        </div>
    )
}

export default App;







