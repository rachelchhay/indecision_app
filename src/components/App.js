import React from 'react';
import AddOptions from './AddOptions';
import Options from './Options';
import Action from './Action';
import Header from './Header';

class IndecisionApp extends React.Component {
  constructor(props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.state = {
          options: []
      };
  }

  // lifecycle method
  componentDidMount() {
      try {
          const json = localStorage.getItem('options');
          const options = JSON.parse(json);
  
          if (options) {
              this.setState(() => ({ options }));
          }
      } catch (e) {

      }
  }
  componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
          const json = JSON.stringify(this.state.options);
          localStorage.setItem('options', json);
      }
  }
  componentWillUnmount() {
      console.log('componentWillUnmount');
  }

  handleDeleteOptions() {
      this.setState(() => ({ options: [] }));
  }

  // Deleting one specific option
  handleDeleteOption(optionToRemove) {
      this.setState((prevState) => ({
          options: prevState.options.filter((option) => optionToRemove !== option)
      }));
  }

  handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const randomOption = this.state.options[randomNum];
      alert(randomOption);
  }

  handleAddOption(option) {
      // if empty string
      if (!option) {
          return 'Enter valid value'
      } else if (this.state.options.indexOf(option) > -1) {
          // if option already exists
          return 'This option already exists'
      } 

      this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
  }


  render() {
      const subtitle = 'Put your life in the hand of the computer.';

      return (
          <div>
              <Header subtitle={subtitle} />
              <Action 
                  hasOptions={this.state.options.length > 0} 
                  handlePick={this.handlePick}
              />
              <Options 
                  options={this.state.options} 
                  handleDeleteOptions={this.handleDeleteOptions}
                  handleDeleteOption={this.handleDeleteOption}
              />
              <AddOptions 
                  handleAddOption={this.handleAddOption}
              />
          </div>
      );
  }
}

export default IndecisionApp;