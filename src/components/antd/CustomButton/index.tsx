import { Button, ButtonProps } from 'antd';
import './styles.sass';

type IProps = {
  orange?: boolean;
  green?: boolean;
} & ButtonProps;

export const CustomButton = (props: IProps) => {
  const { orange, green, className = '', ...rest } = props;

  return <Button className={`custom-button ${className} ${orange ? 'orange' : green ? 'green' : ''}`} {...rest} />;
};
