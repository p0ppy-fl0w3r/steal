import ShowHome from './ShowHome';
import { useQuery, useQueryClient, QueryProvider, QueryClient, QueryClientProvider } from 'react-query'

// TODO create nav-bar



const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShowHome />
    </QueryClientProvider>
  )
}

export default App;
