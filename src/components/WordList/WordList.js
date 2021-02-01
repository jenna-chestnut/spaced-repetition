import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import './WordList.css'

class WordList extends Component {
  static contextType = UserContext

  renderWords(words = []) {
      return words.map((el, idx) => {
      return (
        <li key={idx}>
        <h4>{el.original}</h4>
        <span>Incorrect: {el.incorrect_count}
        {' | '}
        Correct: {el.correct_count} </span>
        </li>
      )
      })
  }

  render() {
    let { words } = this.context;
    return (
    <div className='word-list'>
    <h3>Words to practice:</h3>
     <ul>
       {this.renderWords(words.words)}
     </ul>
     </div>
    );
  }
}

export default WordList
