import React, {Component} from 'react';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

export default class IndecisionApp extends Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handlePick = () => { 
    const randomNum =Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({selectedOption: option}));
  }

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined}));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState(prevState => {
      return {options: prevState.options.filter(option => {
        return optionToRemove !== option
      })};
    });
  }

  handleAddOption = (option) => {
    if(!option) {
      return 'Enter a valid options';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'The option already exists';
    }

    this.setState(prevState => ({options: prevState.options.concat(option)}));
  }

  render() {
    const subtitle = 'Let a machine make those hard choices!';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
        </div>
        <div className="widget">
          <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption handleAddOption={this.handleAddOption} />
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}