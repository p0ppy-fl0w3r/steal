import { useQuery, useQueryClient, QueryProvider, QueryClient, QueryClientProvider } from 'react-query'
import Home from './Home';


let popularList = []
let latestMovies = []
let upcomingMovies = []

function ShowHome() {

    const { data: popular_data } = useQuery(['movie'], () =>

        fetch('https://yts.mx/api/v2/list_movies.json?limit=4').then(movie_data =>
            movie_data.json()
        )
    )

    const { data: latest_data } = useQuery(['latest_movie'], () =>

        fetch('https://yts.mx/api/v2/list_movies.json?limit=8').then(movie_data =>
            movie_data.json()
        )
    )

    const { data: upcoming_data } = useQuery(['upcoming_movie'], () =>

    fetch('https://yts.mx/api/v2/list_movies.json?limit=3').then(movie_data =>
        movie_data.json()
    )
)

    //TODO Add loading screen?
    // if (isLoading) {
    //     return <h3>Loading...</h3>
    // }
    // if (isError) {
    //     return <h3>Error!</h3>
    // }



    popularList = getFilteredMovie(popular_data)
    latestMovies = getFilteredMovie(latest_data)
    upcomingMovies = getFilteredMovie(upcoming_data)

    console.log(popularList)


    return (
        <Home popularList={popularList} latestList={latestMovies} upcomingList={upcomingMovies} />
    );
}

function getFilteredMovie(movieData) {
    return movieData?.data.movies.map(
        (r_movie) => {
            return {
                id: r_movie.id,
                movieImage: r_movie.medium_cover_image,
                movieTitle: r_movie.title_english,
                lang: r_movie.language,
                year: r_movie.year,
                availableQuality: r_movie.torrents.map((t) => { return t.quality }),
                rating: r_movie.rating,
                genre: r_movie.genres,

            }
        }
    )
}

export default ShowHome