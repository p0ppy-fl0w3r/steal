import ShowHome from './ShowHome';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import './App.css'
import MovieInfo from './MovieInfo';


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {navBar()}
        <div id='content'>
          <Routes>
            <Route path='/' element={<ShowHome />} />
            <Route path='movie/:movieId' element={<MovieInfo />} />
            <Route path='*' element={
              <main>
                <h1 id='not-found-heading'>You should not be here!</h1>
              </main>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function navBar() {
  return (
    <header>
      <nav>
        <NavLink to='/' className={({ isActive }) => {
          return isActive ? "on-home" : "away-from-home"
        }} >
        </NavLink>
      </nav>

    </header>
  )
}

export default App;
