import { Select } from 'antd';
import { LanguageEnum } from 'common/enum';
import { useTrans } from 'i18n';
import { LANGUAGE_KEY, DEFAULT_LANGUAGE, LANGUAGE_VALUES } from 'i18n';
import './styles.sass';

export const Header = () => {
  const { i18n } = useTrans();

  const onChangeLanguage = (value: LanguageEnum) => {
    i18n.changeLanguage(value);
    localStorage.setItem(LANGUAGE_KEY, value);
  };

  return (
    <div className='header'>
      <Select
        className='lang-select'
        defaultValue={DEFAULT_LANGUAGE}
        onChange={onChangeLanguage}
        options={LANGUAGE_VALUES.map((v) => ({ value: v, label: v.toUpperCase() }))}
      />
    </div>
  );
};
