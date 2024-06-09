import React from 'react';

function RadioButton(props) {
      console.log(props.selectedOption );
      return (
            <div>
                  <label className='delx items-center'>
                        <input
                              type="radio"
                              value={props?.value}
                              checked={ props.value == props.selectedOption }
                              onChange={props.handleChange}
                              name={props?.name}
                              className='text-[#a5008a] focus:ring-2 focus:ring-[#a5008a]'
                        />

                        <span className='ml-2 text-[0.9em]'>{props?.label}</span>
                  </label>

            </div>
      );
}

export default RadioButton;
