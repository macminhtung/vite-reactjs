import { ReactNode } from 'react';
import { Form, FormProps, Button } from 'antd';
import './styles.sass';

interface ICustomForm extends FormProps {
  noSubmitButton?: boolean;
}

export const CustomForm = (props: ICustomForm) => {
  const { noSubmitButton = false, children, ...restProps } = props;
  return (
    <Form layout='vertical' style={{ minWidth: 400 }} autoComplete='off' {...restProps}>
      {children as ReactNode}
      {!noSubmitButton && (
        <Button type='primary' htmlType='submit' className='w-full mt-4'>
          Submit
        </Button>
      )}
    </Form>
  );
};
