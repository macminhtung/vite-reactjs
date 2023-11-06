import { useMemo, ReactNode } from 'react';
import { FormItemTypeEnum } from 'common/enum';
import {
  Form,
  Input,
  InputProps,
  InputNumber,
  InputNumberProps,
  Select,
  SelectProps,
  Radio,
  RadioProps,
  RadioGroupProps,
  Checkbox,
  CheckboxProps,
  TimePicker,
  TimePickerProps,
  DatePicker,
  DatePickerProps,
} from 'antd';
import { TextAreaProps, PasswordProps } from 'antd/lib/input';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { Rule } from 'antd/lib/form';
import './styles.sass';

const { TextArea, Password } = Input;

interface IBaseProps<T> {
  itemType: T;
  name: string;
  label: ReactNode;
  rules?: Rule[];
}

type ConditionalProps<T extends FormItemTypeEnum> = T extends FormItemTypeEnum.INPUT
  ? IBaseProps<T> & InputProps
  : T extends FormItemTypeEnum.INPUT_NUMBER
  ? IBaseProps<T> & InputNumberProps
  : T extends FormItemTypeEnum.TEXTAREA
  ? IBaseProps<T> & TextAreaProps
  : T extends FormItemTypeEnum.PASSWORD
  ? IBaseProps<T> & PasswordProps
  : T extends FormItemTypeEnum.SELECT
  ? IBaseProps<T> & SelectProps
  : T extends FormItemTypeEnum.RADIO
  ? IBaseProps<T> & RadioProps
  : T extends FormItemTypeEnum.RADIO_GROUP
  ? IBaseProps<T> & RadioGroupProps
  : T extends FormItemTypeEnum.CHECKBOX
  ? IBaseProps<T> & CheckboxProps
  : T extends FormItemTypeEnum.CHECKBOX_GROUP
  ? IBaseProps<T> & CheckboxGroupProps
  : T extends FormItemTypeEnum.TIME_PICKER
  ? IBaseProps<T> & TimePickerProps
  : T extends FormItemTypeEnum.DATE_PICKER
  ? IBaseProps<T> & DatePickerProps
  : IBaseProps<T>;

export const FormItem = <T extends FormItemTypeEnum>(props: ConditionalProps<T>) => {
  const { itemType, name, label, rules, ...restProps } = props;

  const renderItem = useMemo(
    () => {
      switch (itemType) {
        case FormItemTypeEnum.INPUT: {
          return <Input {...restProps} />;
        }
        case FormItemTypeEnum.INPUT_NUMBER: {
          return <InputNumber {...restProps} />;
        }
        case FormItemTypeEnum.TEXTAREA: {
          return <TextArea {...restProps} />;
        }
        case FormItemTypeEnum.PASSWORD: {
          return <Password {...restProps} />;
        }
        case FormItemTypeEnum.SELECT: {
          return <Select {...restProps} />;
        }
        case FormItemTypeEnum.RADIO: {
          return <Radio {...restProps} />;
        }
        case FormItemTypeEnum.RADIO_GROUP: {
          return <Radio.Group {...restProps} />;
        }
        case FormItemTypeEnum.CHECKBOX: {
          return <Checkbox {...restProps} />;
        }
        case FormItemTypeEnum.CHECKBOX_GROUP: {
          return <Checkbox.Group {...restProps} />;
        }
        case FormItemTypeEnum.TIME_PICKER: {
          return <TimePicker {...restProps} />;
        }
        case FormItemTypeEnum.DATE_PICKER: {
          return <DatePicker {...restProps} />;
        }
      }
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [itemType, restProps],
  );

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {renderItem}
    </Form.Item>
  );
};
