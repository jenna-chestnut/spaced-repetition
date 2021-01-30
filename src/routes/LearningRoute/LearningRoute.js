import React, { Component } from 'react'
import AnswerView from '../../components/AnswerView/AnswerView';
import QuestionView from '../../components/QuestionView/QuestionView';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';
import './LearningRoute.css';

class LearningRoute extends Component {
  static contextType = UserContext;

  state = { answer : false }

	componentDidMount() {
		this.context.clearError();

    LanguageApiService.getHead()
    .then(this.context.setHead)
    .catch(this.context.setError);
  }

  onAnswer = () => {
    LanguageApiService.getHead()
    .then(this.context.setHead)
    .then(() => this.setState({ answer : true }))
    .catch(this.context.setError);
  }

  onNext = () => {
    LanguageApiService.getHead()
    .then(this.context.setHead)
    .then(() => this.setState({ answer : false }))
    .catch(this.context.setError);
  }
  
  render() {
    let view = !this.state.answer ? 
    <QuestionView onAnswer={this.onAnswer}/>
    :
    <AnswerView onNext={this.onNext}/>

    return (
      <section className='learning-page'>
        <h2>Learn Words</h2>
        <hr/>

          {view}

      </section>
    );
  }
}

export default LearningRoute
