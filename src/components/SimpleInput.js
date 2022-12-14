import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== '');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid = enteredEmail.includes('@');
    const emailEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const emailInputChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const emailBlurHandler = () => {
        setEnteredEmailTouched(true);
    };

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!enteredNameIsValid && !enteredEmailIsValid) {
            return;
        }
        // nameInputRef.current.value = ''; => Not Ideal, D'ont manipulated the DOM
        resetNameInput();

        setEnteredEmail('');
        setEnteredEmailTouched(false);
    };

    const nameInputClasses = nameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailEmailIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && (
                    <p className='error-text'>Name must not be empty.</p>
                )}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your E-Mail</label>
                <input
                    type='email'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                />
                {emailEmailIsInvalid && (
                    <p className='error-text'>Please enter a valid email.</p>
                )}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
