import React from 'react';
import './App.css';
import { getPosts } from './api';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      is_loading: true,
      is_error: false,
      posts: []
    }
  }

  async componentDidMount() {
    await getPosts();
  }

  render() {
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}

