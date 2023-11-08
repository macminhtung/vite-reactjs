import _get from 'lodash/get';

self.onmessage = async (e: MessageEvent<unknown>) => {
  console.log('\n ==> [WORKER - INPUT] =', e.data);
  const obj = { output: 'HI REACT' };
  setTimeout(() => {
    postMessage(_get(obj, 'output'));
  }, 1000);
};
