import { Select } from 'antd';
import { LanguageEnum, LanguageKeyEnum } from 'languages';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { useTrans } from 'i18n';
import { LANGUAGE_KEY, DEFAULT_LANGUAGE, LANGUAGE_VALUES } from 'i18n';
import { CustomButton } from 'components/antd';
import './styles.sass';

export const Header = () => {
  const { i18n, t } = useTrans();
  const navigate = useNavigate();

  const onChangeLanguage = (value: LanguageEnum) => {
    i18n.changeLanguage(value);
    localStorage.setItem(LANGUAGE_KEY, value);
  };

  return (
    <div className='header center-center mb-10'>
      <CustomButton
        orange
        children={t(LanguageKeyEnum.DASHBOARD)}
        onClick={() => navigate(ROUTER_PATHS.DASHBOARD.MAIN)}
      />

      <Select
        className='lang-select'
        defaultValue={DEFAULT_LANGUAGE}
        onChange={onChangeLanguage}
        options={LANGUAGE_VALUES.map((v) => ({ value: v, label: v.toUpperCase() }))}
      />
    </div>
  );
};
