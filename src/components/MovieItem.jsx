import React from 'react';
import './MovieItem.css'

class MovieItem extends React.Component {

    constructor(props) {
        super(props)
    }

    showLang() {
        if (this.props.lang !== undefined) {
            return (`[${this.props.lang}]`)
        }
        else {
            return
        }
    }

    showGenre() {

        let mGenre;

        if (this.props.genre) {
            if (this.props.genre.length > 1) {
                mGenre = this.props.genre.slice(0, 2)
            }
            else {
                mGenre = this.props.genre
            }
        }

        return mGenre?.map((genre, index) => {
            return <p key={this.props.id + "-genre" + "-" + index}>{genre}</p>
        })
    }

    moviePath() {
        window.location.href = "/movie/" + this.props.id
    }

    render() {
        return (
            <div className="movie-container" id={this.props.id + "-container" + this.props.key_param}>
                <div id='hover-container'
                    onMouseEnter={() => {
                        let extraInfo = document.getElementById(this.props.id + "-movie-info" + this.props.key_param);
                        extraInfo.style.display = 'flex'
                    }}

                    onMouseLeave={() => {
                        let extraInfo = document.getElementById(this.props.id + "-movie-info" + this.props.key_param);
                        extraInfo.style.display = 'none'
                    }}
                >
                    <img id="movie-image" src={this.props.movieImage} alt={this.props.movieTitle} />
                    <div id={this.props.id + "-movie-info" + this.props.key_param} className='extra-movie-info'>
                        <div id='rating'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/1200px-Red_star.svg.png' alt='rating' />
                            <p>{this.props.rating}</p>
                        </div>

                        <div id='genre'>
                            {this.showGenre()}
                        </div>

                        <button id='details-button' onClick={() => this.moviePath()}>View Details</button>
                    </div>
                </div>
                <p id="movie-title">
                    <span id="lang">{this.showLang()}</span>
                    {this.props.movieTitle}
                </p>
                <p id='movie-year'>
                    {this.props.year}
                </p>
                <div id='quality-div'>
                    {
                        this.props.availableQuality?.map((quality, index) => {
                            return <a href='#' className='movie-quality' key={index + "-a-key-" + this.props.id}>{quality}</a>
                        })
                    }
                </div>
            </div>
        );
    }
}


export default MovieItem
