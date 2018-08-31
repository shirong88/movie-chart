import React, { Component } from 'react';
import './App.css';

import Movie from './Movie';


class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 블라블라블라....

  componentWillMount() {
    // api 관련 작업 진행
  }

  componentDidMount() {
    // 데이터 관련 작업 진행
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie
        key={movie.id}
        title={movie.title_english}
        poster={movie.medium_cover_image}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    });
    return movies;
  }

  // asynchronous function
  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(res => res.json())
    .then(jsonRes => jsonRes.data.movies)
    .catch(err => {
      console.log(err);
      return [];
    });
  }

  state = {
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? 'App' : 'App--loading'}>
        {movies ? this._renderMovies() : 'Loading...'}
      </div>
    );
  }
}

export default App;
