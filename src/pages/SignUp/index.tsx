import { ISignUpPayload } from 'api/auth';
import { CustomForm, CustomFormItem } from 'components/antd';
import { useCustomMutation } from 'hooks/react-query/useCustomMutation';
import { MutationKeyEnum, FormItemTypeEnum } from 'common/enum';
import { LanguageKeyEnum } from 'languages';
import { Rule } from 'antd/lib/form';
import { ROUTER_PATHS } from 'common/constant';
import { Link } from 'react-router-dom';
import { useTrans } from 'i18n';

// INIT_VALUES
const INIT_VALUES: ISignUpPayload = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };

// FORM ITEM RULES
const EMAIL_RULES: Rule[] = [
  { type: 'email', message: 'Email invalid!' },
  { required: true, message: 'Email is required!!' },
];
const PASSWORD_RULES: Rule[] = [
  { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password invalid!' },
  { required: true, message: 'Password is required!' },
];
const CONFIRM_PASSWORD_RULES: Rule[] = [
  { required: true, message: 'Confirm password is required!' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(`The confirm password doesn't match!`));
    },
  }),
];

export const SignUp = () => {
  const { t } = useTrans();
  const signUpMutation = useCustomMutation({ mutationKey: MutationKeyEnum.SIGNUP });

  const onFinish = (payload: ISignUpPayload) => {
    console.log('payload =', payload);
    signUpMutation.mutateAsync(payload);
  };

  return (
    <div className='center-center'>
      <h2 className='text-orange'>{t(LanguageKeyEnum.SIGNUP)}</h2>
      <CustomForm initialValues={INIT_VALUES} onFinish={onFinish}>
        <CustomFormItem
          itemType={FormItemTypeEnum.INPUT}
          name='email'
          label={t(LanguageKeyEnum.Email)}
          rules={EMAIL_RULES}
        />
        <CustomFormItem
          itemType={FormItemTypeEnum.PASSWORD}
          name='password'
          label={t(LanguageKeyEnum.Password)}
          rules={PASSWORD_RULES}
        />
        <CustomFormItem
          itemType={FormItemTypeEnum.PASSWORD}
          name='confirmPassword'
          label={t(LanguageKeyEnum.ConfirmPassword)}
          dependencies={['password']}
          rules={CONFIRM_PASSWORD_RULES}
        />
        <CustomFormItem itemType={FormItemTypeEnum.INPUT} name='firstName' label={t(LanguageKeyEnum.FirstName)} />
        <CustomFormItem itemType={FormItemTypeEnum.INPUT} name='lastName' label={t(LanguageKeyEnum.LastName)} />
        <CustomFormItem itemType={FormItemTypeEnum.INPUT} name='phoneNumber' label={t(LanguageKeyEnum.PhoneNumber)} />
      </CustomForm>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.SIGNIN}>
          {t(LanguageKeyEnum.SIGNIN)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.MAIN}>
          {t(LanguageKeyEnum.DASHBOARD).toUpperCase()}
        </Link>
      </div>
    </div>
  );
};
