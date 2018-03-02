import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      term: '',
      type: '',
      limit: '12'
    };
  }

  dataSearch() {
    fetch(`https://itunes.apple.com/search?term=${this.state.term}&media=${this.state.type}&limit=${this.state.limit}`)
      .then(res => {
        if (res.status !== 200) {
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            results: result.results
          });
        }
      )
      .catch(e => {
        this.setState({ results: [] });
        console.log(e);
      })
  }

  handleChange = e => {
    this.setState({ term: e.target.value.toLowerCase() }, this.dataSearch);
  }

  handleSelectChange = e => {
    this.setState({ type: e.target.value }, this.dataSearch)
  }

  render() {
    const results = this.state.results;
    return (
      <form>
        <div className="container main">
          <div className="input-group mb-3">
            <select 
              className="form-control col-md-2"
              value={this.state.type}
              onChange={this.handleSelectChange}>
              <option selected value="music">Music</option>
              <option value="movie">Movie</option>
              <option value="tvShow">TV Show</option>
            </select>
            <input
              className="form-control"
              placeholder="Search"
              type="text"
              value={this.state.term}
              onChange={this.handleChange} />
          </div>
          <div className="list-group">
            <ul>
              {results.length > 0 ?
                results.map(result => (
                  <li key={result.trackId}
                    className="list-group-item">
                    <a target="_blank"
                      className="a-decoration"
                      href={result.trackViewUrl}>
                      <img src={result.artworkUrl30} alt="" />
                      {'  '}{result.artistName} - {result.trackName}
                    </a>
                  </li>
                )) : <p><i> No results </i></p>
              }
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
