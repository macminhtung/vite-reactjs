import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'common/enum';
import { useTrans } from 'i18n';

const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () =>
  new Worker(workerScript, workerOptions);
const factory = workerFactory(new URL('worker/main.worker.ts', import.meta.url), {
  type: 'module',
});
const worker = factory();

export const WorkerPage = () => {
  const { t } = useTrans();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    worker.postMessage('HELLO WORKER');
    worker.onmessage = (event) => {
      console.log('\n ==> [WORKER - OUTPUT]:', event.data);
      setMessage(event.data);
    };
    worker.onerror = (err) => console.error('\n ==> [WORKER - ERROR]:', err.message);
  }, []);

  return (
    <div>
      <h1>Test Web Worker</h1>
      <div>SENT: HELLO WORKER</div>
      <br />
      {message && <div>RECEIVED: {message}</div>}
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.MAIN}>
          {t(LanguageKeyEnum.DASHBOARD).toUpperCase()}
        </Link>
      </div>
    </div>
  );
};
