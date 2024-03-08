import { ReactNode } from 'react';
import { Form, FormProps } from 'antd';
import { useTrans } from 'i18n';
import { LanguageKeyEnum } from 'languages';
import { CustomButton } from 'components/antd';

interface ICustomForm extends FormProps {
  noSubmitButton?: boolean;
  btnChildren?: ReactNode;
  isSubmitButtonLoading?: boolean;
}

export const CustomForm = (props: ICustomForm) => {
  const { isSubmitButtonLoading, noSubmitButton, btnChildren, children, ...restProps } = props;
  const { t } = useTrans();

  return (
    <Form layout='vertical' style={{ minWidth: 400 }} autoComplete='off' {...restProps}>
      {children as ReactNode}
      {!noSubmitButton && (
        <CustomButton type='primary' orange htmlType='submit' className='w-full mt-4' loading={isSubmitButtonLoading}>
          {btnChildren ? btnChildren : t(LanguageKeyEnum.Submit)}
        </CustomButton>
      )}
    </Form>
  );
};
