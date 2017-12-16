import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { graphql, createFragmentContainer } from 'react-relay';
import { isAuthenticated } from 'modules/auth/utils';
import styles from './AutoComplete.scss';



class AutoComplete extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      options: props.data
    }
  }


  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => this.setState({ currentValue: value })





  render() {
      const { currentValue } = this.state





    return(
      <Dropdown
           options={this.state.options}
           placeholder='Choose State'
           search
           selection
           fluid
           allowAdditions
           value={currentValue}
           onAddItem={this.handleAddition}
           onChange={this.handleChange}
         />
    )
  }
}







export default AutoComplete;
