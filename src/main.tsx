import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from 'contexts/auth';
import { Router } from 'components/Router';
import { Header } from 'components/Header';
import './styles/main.sass';
import './i18n';

// # =============================== #
// # ==> [GRAPHQL] APOLLO CLIENT <== #
// # =============================== #
const client = new ApolloClient({
  uri: 'https://www.predic8.de/fruit-shop-graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

// # ============================== #
// # ==> [REST API] REACT QUERY <== #
// # ============================== #
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='main-container'>
          <Header />
          <Router />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </ApolloProvider>,
);
