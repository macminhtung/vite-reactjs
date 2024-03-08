import { Table, TableProps } from 'antd';
import './styles.sass';

export const CustomTable = (props: TableProps<any>) => {
  const { className, ...rest } = props;
  return (
    <Table
      className={`custom-table ${className}`}
      rowClassName={(_, idx) => (idx % 2 === 0 ? 'even' : 'odd')}
      {...rest}
    />
  );
};
