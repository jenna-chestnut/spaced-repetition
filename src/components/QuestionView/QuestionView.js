import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import QuestionForm from '../QuestionForm/QuestionForm'
import './QuestionView.css'

class QuestionView extends Component {
  static contextType = UserContext

  render() {
    let language = this.context.words.language 
    ? this.context.words.language.name : 'Language';

    let score = this.context.answer.totalScore 
    ? this.context.answer.totalScore
    : this.context.words.language 
    ? this.context.words.language.total_score 
    : 0;

    console.log(this.context)
    let head = this.context.head 
    ? this.context.head : {};

    return (<>
    <div className='group'>
          <div className='item'>
            <h2>{language}</h2>
          </div>
          <div className='item'>
          <p>Total correct answers: {score}</p>
          </div>
        </div>

        <div className='d-bg question'>
          <p className='bgr'>Translate the word: 
          <span className='to-translate'>{head.nextWord}</span>
          </p>
          <hr/>
          <span>Current scores: {head.wordCorrectCount} correct {' | '} 
          {head.wordIncorrectCount} incorrect</span>
        </div>

      <QuestionForm onAnswer={this.props.onAnswer}/>
    </>
    )
  }
}

export default QuestionView
