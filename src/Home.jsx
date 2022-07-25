import React from 'react';
import MovieItem from './components/MovieItem'
import './home.css'


class Home extends React.Component {

    titleHeading() {
        return (
            <div id='title-area'>
                <h1>Steal movies in HD and 4k for free!</h1>
                <article>
                    Welcome to the official Steal.com website. Here you can illegally download movies in excellent 720p, 1080p, 4k and 3D quality, all at the smallest size. Steal movie torrents.
                </article>
                <p><strong>IMPORTANT</strong> - Make sure your cat is fat. </p>
            </div>
        );
    }

    showMovieList(movieList, key_param = "") {
        return (movieList?.map((movie) => {
            return <MovieItem
                id={movie.id}
                movieImage={movie.movieImage}
                movieTitle={movie.movieTitle}
                lang={movie.lang}
                year={movie.year}
                rating={movie.rating}
                genre={movie.genre}
                torrents={movie.torrents}
                key_param={key_param}
                key={movie.id + "-key" + key_param}
            />
        }));
    }

    render() {
        return (
            <div>
                <div id='background-div'>
                    <img src='https://animeukiyo.com/wp-content/uploads/2021/08/ghost-in-the-shell.jpg' alt=''></img>
                </div>
                <div id='background-blur'></div>
                <div id='home-container'>
                    <div id='head-area' className='container'>
                        {this.titleHeading()}
                        <h2 id='popular-heading'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1200px-Red_star.svg.png' alt='' />
                            Popular Downloads
                        </h2>
                        <hr />
                    </div>

                    <div id='popular-area' className='container movie-list-area'>

                        {this.showMovieList(this.props.popularList, "-popular")}

                    </div>
                    <div id='latest-area' className='container'>
                        <h2>
                            Latest movie torrent to steal
                        </h2>

                        <div id='latest-movies' className='movie-list-area'>

                            {this.showMovieList(this.props.latestList, "-latest")}

                        </div>
                    </div>

                    <div id='upcoming-area'>
                        <div className='container'>
                            <h2>
                                Upcoming Movies
                            </h2>
                            <div id='upcoming-movies' className='movie-list-area'>


                                {this.showMovieList(this.props.upcomingList, "-upcoming")}

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Home