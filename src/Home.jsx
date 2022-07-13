import React from 'react';
import MovieItem from './components/MovieItem'
import './home.css'


class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    titleHeading() {
        return (
            <div id='title-area'>
                <h1>Steal movies in HD and 4k for free!</h1>
                <article>
                    Welcome to the official Steal.com website. Here you can illegally download movies in excellent 720p, 1080p, 4k and 3D quality, all at the smallest size. Steal movie torrents.
                </article>
                <p><strong>IMPORTANT</strong> - Make sure you're cat is fat. </p>
            </div>
        );
    }

    render() {
        return (

            <div id='home-container'>
                <div id='head-area'>
                    {/* TODO add background image */}
                    {this.titleHeading()}
                    <h2 id='popular-heading'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1200px-Red_star.svg.png' />
                        Popular Downloads
                    </h2>
                </div>
                <hr />
                <div id='popular-area'>
                    
                    {this.props.popularList?.map((movie) => {
                        return <MovieItem
                            id={movie.id}
                            movieImage={movie.movieImage}
                            movieTitle={movie.movieTitle}
                            lang={movie.lang}
                            year={movie.year}
                            availableQuality={movie.availableQuality}
                            rating={movie.rating}
                            genre={movie.genre}
                            key = {movie.id+"-key"}
                        />
                    })}
                </div>
            </div>

        );
    }
}


export default Home