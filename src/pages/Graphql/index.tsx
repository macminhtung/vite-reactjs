import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'languages';
import { useTrans } from 'i18n';
import { QueryKeyEnum, useCustomQuery, MutationKeyEnum, useCustomMutation } from 'hooks/apollo-client';
import { CustomTable, CustomButton } from 'components/antd';
import { Space } from 'antd';
import { CloseOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { ICategory, ICategoryRes } from 'gql';
import { CategoryForm } from 'pages/Graphql/CategoryForm';

const initValues: ICategory = {
  id: 0,
  name: '',
  products: [],
};

export const GraphqlPage = () => {
  const { t } = useTrans();
  const [formValues, setFormValues] = useState<ICategory | null>(null);
  const { loading: isLoading, data: queryData, refetch } = useCustomQuery(QueryKeyEnum.GET_CATEGORIES);

  const [deleteCategoryMutation, { loading: isDeleting }] = useCustomMutation(MutationKeyEnum.DELETE_CATEGORY);

  const deleteCategory = (id: number) => {
    deleteCategoryMutation({ variables: { id } }).then(() => {
      refetch();
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      width: 600,
      render: (products: { name: string }[]) => products.map(({ name }) => name).join(', '),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, item: ICategoryRes) => (
        <Space size='middle'>
          <CustomButton
            type='primary'
            orange
            icon={<EditOutlined />}
            onClick={() => setFormValues({ ...item, products: item.products.map((i) => i.id) })}
          />
          <CustomButton type='primary' danger icon={<CloseOutlined />} onClick={() => deleteCategory(item.id)} />
        </Space>
      ),
    },
  ];

  const onCloseModal = () => setFormValues(null);

  return (
    <div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.MAIN}>
          {t(LanguageKeyEnum.DASHBOARD).toUpperCase()}
        </Link>
      </div>

      {formValues && <CategoryForm formValues={formValues} onCloseModal={onCloseModal} refetch={refetch} />}

      <div className='center-center'>
        <div className='flex items-center'>
          <h1 className='text-gray mr-5'>Category Management</h1>
          <CustomButton type='primary' green icon={<PlusOutlined />} onClick={() => setFormValues(initValues)} />
        </div>

        <CustomTable
          rowKey={'id'}
          loading={isLoading || isDeleting}
          columns={columns}
          dataSource={queryData?.categories || []}
          pagination={false}
        />
      </div>
    </div>
  );
};
