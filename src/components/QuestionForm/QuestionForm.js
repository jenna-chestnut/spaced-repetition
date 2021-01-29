import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import LanguageApiService from '../../services/language-api-service'

class QuestionForm extends Component {
  static defaultProps = {
    onAnswer: () => {}
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { guess } = ev.target

    this.setState({ error: null })

    LanguageApiService.postGuess(guess.value)
      .then(res => {
        guess.value = ''
        this.context.setAnswer(res)
      })
      .then(() => this.props.onAnswer())
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='question-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className='l-p'>
          <Label htmlFor='guess-input'>
            Guess
          </Label>
          <Input
            ref={this.firstInput}
            id='guess-input'
            name='guess'
            required
          />
        </div>
        <Button type='submit'>
          Submit
        </Button>
      </form>
    )
  }
}

export default QuestionForm
