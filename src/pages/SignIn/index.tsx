import { Rule } from 'antd/lib/form';
import { ISignInPayload } from 'api/auth';
import { ROUTER_PATHS } from 'common/constant';
import { FormItemTypeEnum, LanguageKeyEnum, MutationKeyEnum } from 'common/enum';
import { CustomForm } from 'components/CustomForm';
import { CustomFormItem } from 'components/CustomFormItem';
import { useCustomMutation } from 'hooks/react-query/useCustomMutation';
import { useTrans } from 'i18n';
import { Link } from 'react-router-dom';

// INIT_VALUES
const INIT_VALUES: ISignInPayload = { email: 'hkt@gmail.com', password: '123456xX' };

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
  const { t } = useTrans();
  const signInMutation = useCustomMutation({ mutationKey: MutationKeyEnum.SIGNIN });

  const onFinish = (payload: ISignInPayload) => {
    console.log('payload =', payload);
    signInMutation.mutateAsync(payload);
  };

  return (
    <div className='center-center'>
      <h2 className='text-orange'>{t(LanguageKeyEnum.SIGNIN)}</h2>
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
      </CustomForm>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.SIGNUP}>
          {t(LanguageKeyEnum.SIGNUP)}
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
