import { useState, useEffect } from 'react';
const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () =>
  new Worker(workerScript, workerOptions);
const factory = workerFactory(new URL('~/worker/main.worker.ts', import.meta.url), {
  type: 'module',
});
const worker = factory();

export const WorkerPage = () => {
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
      <div>{message}</div>
    </div>
  );
};
