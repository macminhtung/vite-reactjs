import { ReactNode } from 'react';
import { Form, FormProps, Button } from 'antd';
import { useTrans } from 'i18n';
import { LanguageKeyEnum } from 'common/enum';
import './styles.sass';

interface ICustomForm extends FormProps {
  noSubmitButton?: boolean;
  submitButtonContent?: string;
}

export const CustomForm = (props: ICustomForm) => {
  const { noSubmitButton, submitButtonContent, children, ...restProps } = props;
  const { t } = useTrans();

  return (
    <Form layout='vertical' style={{ minWidth: 400 }} autoComplete='off' {...restProps}>
      {children as ReactNode}
      {!noSubmitButton && (
        <Button type='primary' htmlType='submit' className='w-full mt-4'>
          {submitButtonContent ? submitButtonContent : t(LanguageKeyEnum.Submit)}
        </Button>
      )}
    </Form>
  );
};
