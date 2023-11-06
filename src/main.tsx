import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'components/Router';
import './styles/main.sass';

// # =============================== #
// # ==> [GRAPHQL] APOLLO CLIENT <== #
// # =============================== #
const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

// # ============================== #
// # ==> [REST API] REACT QUERY <== #
// # ============================== #
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </ApolloProvider>,
);
