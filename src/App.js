import ShowHome from './ShowHome';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import MovieInfo from './MovieInfo';

// TODO create nav-bar



const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowHome />} />

          <Route path='movie/:movieId' element={<MovieInfo />} />



          <Route path='*' element={
            <main>
              <h1 id='not-found-heading'>You should not be here!</h1>
            </main>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
