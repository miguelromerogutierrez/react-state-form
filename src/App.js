import React from 'react';
import './App.css';

import useStateForm from './use-state-form/use-state-form';
import InputField from './input-field/input-field';
import RadiobuttonField from './radiobutton-field/radiobutton-field';

import { toBeGreaterThan, formatMoney } from './validators';

const schema = {
  amount: {
    defaultValue: 350,
    validators: [toBeGreaterThan(300, `Your minimum payment is ${formatMoney(300)}`)],
    formatters: formatMoney,
    takeRealValue:
      (value) => parseFloat(value.replace(/(,|\$)/ig, ''))
  },
  paymentDate: {
    defaultValue: new Date(),
    formatters: (date) => {
      if (typeof date === 'string') return date;
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    takeRealValue: (value) => {
      const splitVal = value.split('/');
      if (
        splitVal.length < 3 ||
        splitVal[0].length < 4 ||
        splitVal[1].length < 2 ||
        splitVal[2].length < 2
      ) return value;
      return new Date(Number(splitVal[0]), Number(splitVal[1], Number(splitVal[2])));
    }
  },
  paymentMethod: {
    defaultValue: 'bank-account'
  }
};

function App() {

  const formState = useStateForm(schema);
  
  return (
    <div className="App">
      <form>
        <InputField
          {...formState.getFieldProps('amount')}
          type="text"
        />
        <InputField
          {...formState.getFieldProps('paymentDate')}
          type="text"
        />
        <RadiobuttonField
          {...formState.getFieldProps('paymentMethod')}
          id="payment-method-bank-account"
          value="bank-account"
          checked={formState.values.paymentMethod === 'bank-account'}
        >
          Bank account
        </RadiobuttonField>

        <RadiobuttonField
          {...formState.getFieldProps('paymentMethod')}
          id="payment-method-check-account"
          checked={formState.values.paymentMethod === 'check-account'}
          value="check-account"
          type="radio"
        >
          Pay by check instead
        </RadiobuttonField>
      </form>

      <pre>
        {JSON.stringify(formState.values)}
      </pre>
    </div>
  );
}

export default App;
