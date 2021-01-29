import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import happyCatImg from '../../images/cat-love.webp';
import sadCatImg from '../../images/crying-cat.webp';
import './AnswerView.css'
import Button from '../Button/Button';

class AnswerView extends Component {
  static contextType = UserContext
  static defaultProps = {
    onClick: () => {}
  }

  renderCorrect(isCorrect) {
    let isC = isCorrect 
    ? 'correct!' : 'incorrect..';
    let img = isCorrect
    ? happyCatImg : sadCatImg;
    return (
      <>
      <div className='item'>
      <h2>You are {isC}</h2>
      </div>
      <div className='item'>
      <img src={img} alt='Cat' />
      </div>
      </>
    )
  }

  renderNext(isC) {
    let { answer } = this.context;
    let word = isC ? answer.nextWord : answer.answer;
    let p = isC ? 'Next word: ' : 'Correct answer: '
    return <p className='bgr'>{p} 
    <span className='to-translate'>{word || 'word'}</span>
    </p>
  }

  render() {
    let { isCorrect = 'false', wordCorrectCount, wordIncorrectCount, answer } = this.context.answer;
    let score = this.context.words.language ? 
    this.context.words.language.total_score : 0;

    return (<>
    <div className='group a-v'>

           {this.renderCorrect(isCorrect)}

          <div className='item a-s'>
          <p>Total correct answers: {score}</p>
          <p><b>Scores for {answer}: </b></p>
          <p>{wordCorrectCount} correct {' | '} 
          {wordIncorrectCount} incorrect</p>
          </div>
        </div>

        <div className='d-bg answer'>
          {this.renderNext(isCorrect)}
        </div>

      <Button onClick={() => this.props.onNext()}>Keep practicing!</Button>
    </>
    )
  }
}

export default AnswerView
