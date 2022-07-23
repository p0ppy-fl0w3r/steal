import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

function MovieInfo() {

    let params = useParams()

    const {isLoading, isError, data } = useQuery(['movie-info'], () =>
        fetch("https://yts.mx/api/v2/movie_details.json?movie_id="+params.movieId+"&with_images=true&with_cast=true")
            .then(res =>
                res.json()
            )
    )

    if (isLoading) {
        return (<div>
            Loading...
        </div>)
    }

    if (isError) {
        return <div>Error...</div>
    }

    if (data != undefined) {
        console.log(data)
        let movieDetail = getFilteredMovieDetail(data.data.movie)

        return (
            <div>
                <img src={movieDetail.coverImage} alt="Cover image" />
                <p>{movieDetail.description}</p>
            </div>
        );
    }
}


// TODO add more info
function getFilteredMovieDetail(movieDetail) {
    return {
        id: movieDetail.id,
        title: movieDetail.title,
        year: movieDetail.year,
        rating: movieDetail.rating,
        runtime: movieDetail.runtime,
        genres: movieDetail.genres,
        downloadCount: movieDetail.download_count,
        likeCount: movieDetail.like_count,
        description: movieDetail.description_full,
        youtubeCode: movieDetail.yt_trailer_code,
        mpaRating: movieDetail.mpa_rating,
        language: movieDetail.language,
        coverImage: movieDetail.large_cover_image,

    }
}

export default MovieInfo