import { useState } from "react";

export interface IOnChangeInputHookBind<T> {
  value: T;
  onChange: any;
}

export interface IOnChangeCheckboxHookBind<T> {
  checked: T;
  onChange: any;
}

export interface IOnClickInputHookBind {
  onClick: any;
}

export interface IUseInputHook<T> {
	value: T;
	setValue: any;
	reset: any;
	bind: IOnChangeCheckboxHookBind<T> | IOnChangeInputHookBind<T> | IOnClickInputHookBind;
}

export enum EInputType {
  checkbox,
  text,
  button,
}

export interface IUseInputHookOptions<T> {
  initialValue?: T;
  onChange?: (val: any) => void;
  onClick?: (val: any) => void;
}

export function useInput<T>(type: EInputType, options?: IUseInputHookOptions<T>): IUseInputHook<T> {
  const initVal = !!options?.initialValue ? options?.initialValue : getDefaultInputInitialState(type);
  const [value, setValue] = useState(initVal) as [value: any, setValue: any];
  const bind = getBindByType<T>(type, value, setValue, options);
  return {
    value,
    setValue,
    reset: () => setValue(initVal),
    bind
  };
};

const getInputValue = (type: EInputType, event: any) => {
  switch(type) {
    case EInputType.button:
      return null;
    case EInputType.text:
      return event.target.value;
    case EInputType.checkbox:
      return event.target.checked;
  }
}

const getDefaultInputInitialState = (type: EInputType) => {
  switch(type) {
    case EInputType.button:
      return null;
    case EInputType.text:
      return '';
    case EInputType.checkbox:
      return false;
  }
}

function getBindByType<T>(type: EInputType, value: T, setValue: any, options?: IUseInputHookOptions<T>) {
  switch(type) {
    case EInputType.button:
      return {
        'onClick': (event: any) => {
          options?.onClick?.call(null, event);
        }
      };
    case EInputType.text:
      return {
        value,
        'onChange': (event: any) => {
          const currValue: T = getInputValue(type, event);
          options?.onChange?.call(null, currValue);
          setValue(currValue);
        }
      };
    case EInputType.checkbox:
      return {
        checked: value,
        'onChange': (event: any) => {
          const currValue: T = getInputValue(type, event);
          options?.onChange?.call(null, currValue);
          setValue(currValue);
        }
      };
  }
}
