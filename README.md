# Pretty Validator (Javascript form validation)

## Still under development, do not use in production
### This library is heavily inspired by Laravel's validation component and tries to bring its beauty to the frontend.

Pretty validator allows you to perform high quality form validation on the frontend in any javascript framework of your choice. The simple syntax makes form validation and error handling a breeze.

## Primary advantages:
* Validate all input as once
* Errors are available and relevant for users
* Error messages can be customized

## Main building blocks:
* Validation rules
    * Each rule is defined in a class and adhears to a contract. This allows for new rules to be added simply and quickly
    * Rules return a boolean
* Message bag
    * Holds any validation errors to that they are be display under relevant inputs
* Rule parser & validator
    * Parses each rules with parameters
    * Adds errors to message bag

## Usage:
### 1. Set up a basic validator instance:
```Javascript
import {Validator} from 'pretty-validator';

const validator = new Validator({
    name: ['required'],
    email: ['required', 'email']
})
```

### 2. Add you data to the validator when you are ready:
This data could come from anywhere, as long as it is in a javascript object.
```Javascript

const data = {
    name: 'Pretty Validator',
    email: 'email@example.com'
}

validator.setdata(data);
```

### 3. Validate
```Javascript
// If your data is invalid the response will be false, and you can grab the errors.

if(validator.validate()) {
    // You data is valid
    console.log('Success!!');
}
```

## Basic examples
### React Component
```Javascript
import React from 'react';
import {Validator} from 'pretty-validator';

export const Error = ({show, message}) => {
    return (
        <>
        {show && <p className="text-red-300">{message}</p>}
        </>
    )
}

export const Register: React.FC = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const validator = new Validator({
        name: 'required|min:3',
        email: 'required|email',
        password: 'required|min:3'
    });

    const handleChange = (param, e) {
        setForm({...form, {
            [e.target.name]: e.target.value
        }});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validator.setData(form).validate()) {
            console.log('My form is valid')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={(e) => handleChange(e)} />
                <Error show={validator.errors().has('name')} message={validator.errors().get('name')}>
                
                <input type="email" name="email" onChange={(e) => handleChange(e)} />
                <Error show={validator.errors().has('email')} message={validator.errors().get('email')}>

                <input type="password" name="password" onChange={(e) => handleChange(e)} />
                <Error show={validator.errors().has('password')} message={validator.errors().get('password')}>

                <button type="submit" value="Register" />
            </form>
        </div>
    );

}
```