import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  handleText,
  handleSubmit,
  fetchJoke,
  sendEmails
} from './actions/actions';



class App extends Component {
  componentDidMount(){
    this.props.fetchJoke()
  }

  render() {
    const { isError, text, emails, joke } = this.props.appState;
    return (
      <div className="App">
        {emails.length >= 1 && <button type="click" onClick={() => this.props.sendEmails(emails,joke)}>Send Joke</button>} 
        <form onSubmit={this.props.handleSubmit}>
          <input
            value={text}
            onChange={e=> this.props.handleText(e.target.value)}
          />
          <button type="submit">submit email</button>
        </form>
        {isError && <div className="error"> Invalid Email... Chuck is coming for you </div>}
          {emails.map(item=> {
            return(
              <div key={item.id}>
                {item.email}
              </div>
            )
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.rootReducer
})

const mapDispatchToProps = {
  handleText,
  handleSubmit,
  fetchJoke,
  sendEmails
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
