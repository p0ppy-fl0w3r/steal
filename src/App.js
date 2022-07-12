import MovieItem from './components/MovieItem'

function App() {
  return (

    <MovieItem movieImage="https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/266090/3991871/api2mmoci__08560.1625624401.jpg?c=2"
      movieTitle="Akira"
      lang="Jp"
      year="1987"
      availableQuality={["1080p", "720p"]}
      rating="9.5"
      genre={["Action", "Comedy"]}
    />
  );
}

export default App;
