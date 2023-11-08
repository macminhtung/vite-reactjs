import { useMemo } from 'react';
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
  FormItemProps,
} from 'antd';
import { TextAreaProps, PasswordProps } from 'antd/lib/input';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import './styles.sass';

const { TextArea, Password } = Input;

interface IBaseProps<T extends FormItemTypeEnum> extends FormItemProps {
  itemType: T;
}

type ConditionalProps<T extends FormItemTypeEnum> = T extends FormItemTypeEnum.INPUT
  ? IBaseProps<T> & { childProps?: InputProps }
  : T extends FormItemTypeEnum.INPUT_NUMBER
  ? IBaseProps<T> & { childProps?: InputNumberProps }
  : T extends FormItemTypeEnum.TEXTAREA
  ? IBaseProps<T> & { childProps?: TextAreaProps }
  : T extends FormItemTypeEnum.PASSWORD
  ? IBaseProps<T> & { childProps?: PasswordProps }
  : T extends FormItemTypeEnum.SELECT
  ? IBaseProps<T> & { childProps?: SelectProps }
  : T extends FormItemTypeEnum.RADIO
  ? IBaseProps<T> & { childProps?: RadioProps }
  : T extends FormItemTypeEnum.RADIO_GROUP
  ? IBaseProps<T> & { childProps?: RadioGroupProps }
  : T extends FormItemTypeEnum.CHECKBOX
  ? IBaseProps<T> & { childProps?: CheckboxProps }
  : T extends FormItemTypeEnum.CHECKBOX_GROUP
  ? IBaseProps<T> & { childProps?: CheckboxGroupProps }
  : T extends FormItemTypeEnum.TIME_PICKER
  ? IBaseProps<T> & { childProps?: TimePickerProps }
  : T extends FormItemTypeEnum.DATE_PICKER
  ? IBaseProps<T> & { childProps?: DatePickerProps }
  : IBaseProps<T>;

export const CustomFormItem = <T extends FormItemTypeEnum>(props: ConditionalProps<T>) => {
  const { itemType, childProps, ...formItemProps } = props;

  const renderItem = useMemo(() => {
    switch (itemType) {
      case FormItemTypeEnum.INPUT: {
        return <Input {...childProps} />;
      }
      case FormItemTypeEnum.INPUT_NUMBER: {
        return <InputNumber {...childProps} />;
      }
      case FormItemTypeEnum.TEXTAREA: {
        return <TextArea {...childProps} />;
      }
      case FormItemTypeEnum.PASSWORD: {
        return <Password {...childProps} />;
      }
      case FormItemTypeEnum.SELECT: {
        return <Select {...childProps} />;
      }
      case FormItemTypeEnum.RADIO: {
        return <Radio {...childProps} />;
      }
      case FormItemTypeEnum.RADIO_GROUP: {
        return <Radio.Group {...childProps} />;
      }
      case FormItemTypeEnum.CHECKBOX: {
        return <Checkbox {...childProps} />;
      }
      case FormItemTypeEnum.CHECKBOX_GROUP: {
        return <Checkbox.Group {...childProps} />;
      }
      case FormItemTypeEnum.TIME_PICKER: {
        return <TimePicker {...childProps} />;
      }
      case FormItemTypeEnum.DATE_PICKER: {
        return <DatePicker {...childProps} />;
      }
    }
  }, [itemType, childProps]);

  return <Form.Item {...formItemProps}>{renderItem}</Form.Item>;
};
