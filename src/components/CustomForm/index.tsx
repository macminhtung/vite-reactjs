import { ReactNode } from 'react';
import { Form, FormProps, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LanguageKeyEnum } from 'common/enum';
import './styles.sass';

interface ICustomForm extends FormProps {
  noSubmitButton?: boolean;
}

export const CustomForm = (props: ICustomForm) => {
  const { t } = useTranslation();
  const { noSubmitButton = false, children, ...restProps } = props;
  return (
    <Form layout='vertical' style={{ minWidth: 400 }} autoComplete='off' {...restProps}>
      {children as ReactNode}
      {!noSubmitButton && (
        <Button type='primary' htmlType='submit' className='w-full mt-4'>
          {t(LanguageKeyEnum.Submit)}
        </Button>
      )}
    </Form>
  );
};
