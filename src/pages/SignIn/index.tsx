import { FormItem } from 'components/FormItem';
import { FormItemTypeEnum } from 'common/enum';
import { CustomForm } from 'components/CustomForm';
import { ISignInPayload } from 'api/auth';
import { Rule } from 'antd/lib/form';
import { useCustomMutation } from 'hooks/useCustomMutation';
import { MutationKeyEnum } from 'common/enum';

// INIT_VALUES
const INIT_VALUES: ISignInPayload = { email: '', password: '' };

// FORM ITEM RULES
const EMAIL_RULES: Rule[] = [
  { type: 'email', message: 'Email invalid!' },
  { required: true, message: 'Email is required!!' },
];
const PASSWORD_RULES: Rule[] = [
  { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password invalid!' },
  { required: true, message: 'Password is required!' },
];

export const SignIn = () => {
  const sigInMutation = useCustomMutation({ mutationKey: MutationKeyEnum.SIGNIN });

  const onFinish = (payload: ISignInPayload) => {
    console.log('payload =', payload);
    sigInMutation.mutateAsync(payload);
  };

  return (
    <div className='main-container center-center'>
      <h2 className='text-orange'>SIGNIN</h2>
      <CustomForm initialValues={INIT_VALUES} onFinish={onFinish}>
        <FormItem itemType={FormItemTypeEnum.INPUT} name='email' label='Email' rules={EMAIL_RULES} />
        <FormItem itemType={FormItemTypeEnum.PASSWORD} name='password' label='Password' rules={PASSWORD_RULES} />
      </CustomForm>
    </div>
  );
};
