import React, { Component } from 'react';
import logo from './logo.svg';
import Settings from './Settings'
import Question1 from './Question1'
import './App.css';
import './Dashboard'
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {Neo4JUrl: "http://localhost:8080", CurrentQuestion: 3}
  }

  UpdateNeo4JUrl = (event) =>{
    this.setState({
      Neo4JUrl: event.target.value
    });
  }

  ChangeQuestion = (event) =>{
    this.setState({
      CurrentQuestion: parseInt(event.target.value)
    });
  }

  ShouldRenderQuestion = (QuestionId) =>{
    console.log(this.state.CurrentQuestion, QuestionId, QuestionId === this.state.CurrentQuestion);
    return QuestionId === this.state.CurrentQuestion;
  }

  render() {
    const {Neo4JUrl, CurrentQuestion} = this.state;
    return (
      <div className="App">
        <Dashboard/>
        <Settings Neo4JUrl={Neo4JUrl} UpdateNeo4JUrl={this.UpdateNeo4JUrl}/>
        <select bind={CurrentQuestion} value={CurrentQuestion} onChange={this.ChangeQuestion}>
          <option value="1">Question 1</option>
          <option value="2">Question 2</option>
          <option value="3">Question 3</option>
          <option value="4">Question 4</option>
        </select>
        {this.ShouldRenderQuestion(1) && <Question1/>}
      </div>
    );
  }
}

export default App;
