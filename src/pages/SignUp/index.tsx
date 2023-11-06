import { FormItem } from 'components/FormItem';
import { FormItemTypeEnum } from 'common/enum';
import { Form } from 'antd';

export const SignUp = () => {
  return (
    <Form style={{ maxWidth: 600 }} layout='vertical' initialValues={{ remember: true }} autoComplete='off'>
      <FormItem itemType={FormItemTypeEnum.INPUT} name='email' label='Email' />
      <FormItem itemType={FormItemTypeEnum.PASSWORD} name='password' label='Password' />
      <FormItem itemType={FormItemTypeEnum.PASSWORD} name='confirmPassword' label='Confirm Password' />
    </Form>
  );
};
