import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import WordList from '../../components/WordList/WordList';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  static contextType = UserContext;

	componentDidMount() {
		this.context.clearError();

    LanguageApiService.getWords()
    .then(this.context.setWords)
    .catch(this.context.setError);
	}

  render() {
    let language = this.context.words.language ? 
    this.context.words.language.name : 'Language'

    let score = this.context.words.language ? 
    this.context.words.language.total_score : 0

    console.log(this.context.words);

    return (
      <section className='dashboard'>
        <h2 className='dash-header'>Dashboard</h2>
        <hr/>

        <div className='group'>

          <div className='item'>
            <h2>{language}</h2>
            <p>Total correct answers: {score}</p>
            </div>

          <div className='b-g item'>
            <Link to='/learn'><button>Start practicing!</button></Link>
            </div>

        </div>
        <WordList/>
      </section>
    );
  }
}

export default DashboardRoute
