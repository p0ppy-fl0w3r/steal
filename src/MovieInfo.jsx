import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useState } from 'react';

import moment from 'moment';
import './MovieInfo.css'
import person from './images/person.png'
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import SdCardIcon from '@mui/icons-material/SdCard';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



function MovieInfo() {

    let params = useParams()

    const { isLoading, isError, data } = useQuery(['movie-info'], () =>
        fetch("https://yts.mx/api/v2/movie_details.json?movie_id=" + params.movieId + "&with_images=true&with_cast=true")
            .then(res =>
                res.json()
            )
    )

    const { isLoading: suggestionLoad, isError: suggestionError, data: suggestionData } = useQuery(['similar-movies'], () =>
        fetch("https://yts.mx/api/v2/movie_suggestions.json?movie_id=" + params.movieId).then((res) =>
            res.json()
        )
    )

    let [currentSpec, setSpec] = useState(null)

    if (isLoading) {
        return (<div>
            Loading...
        </div>)
    }

    if (isError) {
        return <div>Error...</div>
    }

    if (data != undefined) {
        let movieDetail = getFilteredMovieDetail(data.data.movie)

        if (movieDetail.torrents[0] && currentSpec == null) {
            setSpec(movieDetail.torrents[0])
        }

        return (
            <div className='container'>
                {titleAndPoster(movieDetail, suggestionLoad, suggestionError, suggestionData)}
                {movieDescription(movieDetail)}
                {techSpec(movieDetail.torrents, currentSpec, setSpec)}
            </div>
        );
    }
}


function techSpec(torrentInfo, currentSpec, onSpecChanged) {
    if (currentSpec !== null) {
        return (
            <div id='tech-spec'>
                <div id='tech-titles'>
                    <h3>Tech Spec</h3>
                    {torrentInfo.map((t) => {
                        return (
                            <span className={'tech-quality' + (currentSpec.hash === t.hash ? " selected-span" : "")}
                                key={t.hash + "-tech-info"}
                                onClick={() => {
                                    onSpecChanged(t)
                                }}>
                                {t.quality}.{t.type}
                            </span>
                        )
                    })}
                </div>
                {specTable(currentSpec)}

            </div>)
    }
}

function specTable(spec) {
    return (<div id='specs'>
        <table>
            <tbody>
                <tr>
                    <td>
                        <p>
                            <SdCardIcon />
                            {spec.size}
                        </p>
                    </td>
                    <td>
                        <p>
                            <HighQualityIcon />
                            {spec.quality}
                        </p>
                    </td>
                    <td>
                        <p>
                            <CalendarMonth />
                            {moment(spec.date_uploaded).format("YYYY/MM/DD")}
                        </p>

                    </td>
                    <td>
                        <p>
                            <span>P/S</span>
                            {spec.seeds}/{spec.peers}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>)
}

function titleAndPoster(movieDetail, suggestionLoad, suggestionError, suggestionData) {
    return (
        <div id='info-container'>

            {moviePosters(movieDetail)}

            {baseRatingDetails(movieDetail)}

            <div id='similar-movie'>
                {SimilarMovies(suggestionLoad, suggestionError, suggestionData)}
            </div>
        </div>
    )
}

function movieDescription(movieDetail) {
    return (
        <div id='desc-container'>
            {screenCaps(movieDetail)}
            {plotAndCast(movieDetail)}
        </div>
    )
}

function plotAndCast(movieDetail) {
    return (<div id='plot-cast'>
        <div id="plot">
            <h3>Plot Summary</h3>
            <p>{movieDetail.description}</p>
        </div>
        {cast(movieDetail)}
    </div>)
}

function cast(movieDetail) {
    return (
        <div id="cast">
            <h3>Top Cast</h3>
            {movieDetail.cast?.map((c) => {
                return (
                    <div id={c.imdb_code + "-cast-id"} key={c.imdb_code + "-cast-key"} className="cast-info" >
                        <img src={c.url_small_image || person} />
                        <p>{c.name} <span>as {c.character_name}</span> </p>
                    </div>
                )
            }
            )
            }

        </div>

    )
}

function screenCaps(movie) {
    return (
        <div id='screen-caps'>
            <img src={movie.screenCap1} />
            <img src={movie.screenCap2} />
            <img src={movie.screenCap3} />
        </div>
    )
}

function moviePosters(movieDetail) {
    return (<div id='movie-poster'>
        <img id='poster-image' src={movieDetail.coverImage} alt="Movie Poster" />

        <button className='movie-button poster-button' id='download-button' onClick={() => {
            window.open(movieDetail.torrents[0].url)
        }} >
            <div className='button-container'>
                <FileDownloadIcon />Download
            </div>
        </button>

        <button className='movie-button poster-button' id='watch-button' onClick={() => {
            window.open("http://www.youtube.com/watch?v=" + movieDetail.youtubeCode)
        }}>
            <div className='button-container'>
                <PlayArrowIcon />Watch Trailer
            </div>
        </button>

    </div>)
}

function baseRatingDetails(movieDetail) {
    return (<div id='movie-ratings'>
        <h1>{movieDetail.title}</h1>
        <p className='big-p'>{movieDetail.year}</p>
        <p className='big-p'>{movieDetail.genres.map((g, index) => {
            if (index === movieDetail.genres.length - 1) {
                return g
            }
            return g + "/"
        })}</p>
        <p id='available-quality'><em>Available in: </em>{downloadLinks(movieDetail.torrents)} </p>
        <div id='ratings'>
            {movieRating(movieDetail)}
        </div>
    </div>)
}

function movieRating(movieDetail) {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <FavoriteBorderIcon style={{
                            color: "red",
                        }} />
                    </td>
                    <td>
                        {movieDetail.likeCount}
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png' style={
                            {
                                height: "1em"
                            }
                        } />
                    </td>
                    <td>
                        {movieDetail.rating}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function downloadLinks(torrents) {
    return torrents?.map((t, index) => {
        return (
            <a key={index + "-link-keyZ"} className='box-link' href={t.url}>{t.quality}</a>
        )
    })
}

function SimilarMovies(loading, error, data) {
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error...</div>
    }

    if (data !== undefined) {
        return (
            <div id='suggestions'>
                <p style={{
                    margin: "0"
                }}>You might also like:</p>
                {
                    data.data.movies.map((m) => {
                        return (
                            <Tooltip title={m.title} trigger="mouseenter" >
                                <img key={m.id + "-suggestion-key"} className='suggestion-poster' src={m.medium_cover_image} onClick={() => {
                                    suggestionPath(m.id)
                                }} />
                            </Tooltip>
                        )
                    })
                }
            </div>
        )
    }

}

function suggestionPath(id) {
    window.location.href = "/movie/" + id
}

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
        torrents: movieDetail.torrents,
        screenCap1: movieDetail.medium_screenshot_image1,
        screenCap2: movieDetail.medium_screenshot_image2,
        screenCap3: movieDetail.medium_screenshot_image3,
        cast: movieDetail.cast
    }
}

export default MovieInfo