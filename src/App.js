import React, { Component } from 'react';
import Search from './Search'

class App extends Component {
  state = {
    query: null,
    bookInfo: null,
  };

  componentDidMount() {}

  _getQueryValue = async value => {
    await this.setState({ query: value });
    this._getBooks();
  };

  _getBooks = async () => {
    const bookInfo = await this._callApi();
    this.setState({
      bookInfo,
    });
  };

  _callApi = () => {

    let headers = { Authorization: 'KakaoAK '+ '227c557d727e7912353d9bcb15d9f333'}
    
    return fetch(`https://dapi.kakao.com/v3/search/book?query=${this.state.query}`, { headers })
    .then(res => res.json)
    .then(json => json.documents)
    .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <Search books={this._callApi} query={this._getQueryValue}/>
      </div>
    )
  }
}

export default App;
