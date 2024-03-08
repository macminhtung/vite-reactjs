import { QueryKeyEnum } from 'common/enum';
import { useCustomQuery } from 'hooks/react-query/useCustomQuery';

export const Profile = () => {
  const { isLoading, data } = useCustomQuery({ queryKey: QueryKeyEnum.GET_AUTH_PROFILE });

  return (
    <div>
      <h1>PROFILE PAGE</h1>
      {isLoading && 'LOADING ...'}
      {!!data && (
        <div>
          <strong>DATA:</strong>
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
};
