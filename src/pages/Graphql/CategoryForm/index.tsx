import { Modal } from 'antd';
import { Rule } from 'antd/lib/form';
import { ICategory } from 'gql';
import { CustomForm, CustomFormItem } from 'components/antd';
import { FormItemTypeEnum } from 'common/enum';
import { MutationKeyEnum, useCustomMutation, QueryKeyEnum, useCustomQuery } from 'hooks/apollo-client';

interface IProps {
  formValues: ICategory;
  onCloseModal: () => void;
  refetch: () => void;
}

const REQUIRED_RULES: Rule[] = [{ required: true, message: 'Required!' }];

export const CategoryForm = (props: IProps) => {
  const { formValues, onCloseModal, refetch } = props;
  const { loading: isLoading, data: queryData } = useCustomQuery(QueryKeyEnum.GET_PRODUCTS);

  const productOptions = (queryData?.products || []).map(({ id, name }) => ({ value: id, label: name }));

  const isCreate = !formValues.id;
  const [mutateFunc, { loading: mutationLoading }] = useCustomMutation(
    isCreate ? MutationKeyEnum.ADD_CATEGORY : MutationKeyEnum.UPDATE_CATEGORY,
  );

  const title = `${isCreate ? 'CREATE' : 'UPDATE'} CATEGORY`;

  const onFinish = (payload: ICategory) => {
    mutateFunc({ variables: payload }).then(({ errors }) => {
      if (!errors) {
        onCloseModal();
        refetch();
      }
    });
  };

  return (
    <Modal title={title} open={!!formValues} onCancel={onCloseModal} footer={null} centered>
      <CustomForm
        className='mt-10 mb-5'
        initialValues={formValues}
        onFinish={onFinish}
        isSubmitButtonLoading={mutationLoading}
      >
        <CustomFormItem
          itemType={FormItemTypeEnum.INPUT_NUMBER}
          label='ID'
          name='id'
          rules={REQUIRED_RULES}
          childProps={{ min: 0 }}
        />
        <CustomFormItem itemType={FormItemTypeEnum.INPUT} label='Name' name='name' rules={REQUIRED_RULES} />
        <CustomFormItem
          itemType={FormItemTypeEnum.SELECT}
          label='Products'
          name='products'
          rules={REQUIRED_RULES}
          childProps={{ mode: 'multiple', options: productOptions, loading: isLoading }}
        />
      </CustomForm>
    </Modal>
  );
};
