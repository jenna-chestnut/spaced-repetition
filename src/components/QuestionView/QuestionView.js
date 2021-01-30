import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageApiService from '../../services/language-api-service';
import QuestionForm from '../QuestionForm/QuestionForm'
import './QuestionView.css'

class QuestionView extends Component {
  static contextType = UserContext;

  
  componentDidMount() {
    this.context.clearError();
    
    LanguageApiService.getWords()
    .then(this.context.setWords)
    .catch(this.context.setError);
  }

  render() {
    let language = this.context.words.language 
    ? this.context.words.language.name : 'Language';

    let score = this.context.answer.totalScore 
    ? this.context.answer.totalScore
    : this.context.head.totalScore 
    ? this.context.head.totalScore 
    : 0;

    let nextWord = this.context.answer.nextWord 
    ? this.context.answer.nextWord
    : this.context.head.nextWord 
    ? this.context.head.nextWord 
    : 'Next Word';

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
          </p>
          <span className='to-translate '>{nextWord}</span>
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
