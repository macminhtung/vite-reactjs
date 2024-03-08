import { LanguageKeyEnum } from 'languages/enum';

export const EN: { [key in LanguageKeyEnum]: string } = {
  [LanguageKeyEnum.DASHBOARD]: 'DashBoard',
  [LanguageKeyEnum.SIGNIN]: 'SIGNIN',
  [LanguageKeyEnum.SIGNUP]: 'SIGNUP',
  [LanguageKeyEnum.TEST_WORKER]: 'TEST WORKER',
  [LanguageKeyEnum.TEST_GRAPHQL]: 'TEST GRAPHQL',
  [LanguageKeyEnum.PROFILE]: 'PROFILE',
  [LanguageKeyEnum.Email]: 'Email',
  [LanguageKeyEnum.Password]: 'Password',
  [LanguageKeyEnum.Submit]: 'Submit',
  [LanguageKeyEnum.ConfirmPassword]: 'Confirm Password',
  [LanguageKeyEnum.FirstName]: 'First Name',
  [LanguageKeyEnum.LastName]: 'Last Name',
  [LanguageKeyEnum.PhoneNumber]: 'Phone Number',
};
