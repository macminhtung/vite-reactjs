import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { FormItem } from 'components/FormItem'
import { FormItemTypeEnum } from 'common/enum'
import { Form } from 'antd'

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`

const workerFactory = (workerScript: URL, workerOptions: WorkerOptions) => () => new Worker(workerScript, workerOptions)
const factory = workerFactory(new URL('~/worker/main.worker.ts', import.meta.url), {
  type: 'module'
})
const worker = factory()

function App() {
  const [count, setCount] = useState(0)
  const { loading, data } = useQuery(GET_LOCATIONS)

  useEffect(() => {
    data && console.log('data =', data)
  }, [data])

  useEffect(() => {
    worker.postMessage('HELLO WORKER')
    worker.onmessage = (event) => console.log('\n ==> [WORKER - OUTPUT]:', event.data)
    worker.onerror = (err) => console.error('\n ==> [WORKER - ERROR]:', err.message)
  }, [])

  return (
    <>
      <h1>Vite + React + Web Worker + Graphql</h1>
      {loading && 'LOADING'}
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <br />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <FormItem itemType={FormItemTypeEnum.INPUT} name='' label='' />
      </Form>
    </>
  )
}

export default App