import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  state = {
    isLoading: true,
    posts: [],
    error: null,
    query: '' // search query
  }

  fetchPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          posts: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchPosts();
  }

  handleInputChange = () => {
    // to do
  }

  render() {
    const {isLoading, posts, error} = this.state;
    return (
      <div class="content">
      <h1>Some Posts</h1>
      {error ? <p>{error.message}</p> : null}

      <form>
        <input
          placeholder="Search by post id..."
          onChange={this.handleInputChange}
        />
        <input
          placeholder="Search by user id..."
          onChange={this.handleInputChange}
        />
      </form>

      {!isLoading ? (
        posts.map(post => {
          const { id, userId, title, body } = post;
          return (
            <div key={id} class="post">
            <p>Post #{id}, by User {userId}:</p>
              <p class="post-title">{title}</p>
              <p>{body}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      </div>
    );
  }
}

export default App;


