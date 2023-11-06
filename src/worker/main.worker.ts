import _get from 'lodash/get';

self.onmessage = async (e: MessageEvent<unknown>) => {
  console.log('\n ==> [WORKER - INPUT] =', e.data);
  const obj = { output: 'HI REACT' };
  postMessage(_get(obj, 'output'));
};
