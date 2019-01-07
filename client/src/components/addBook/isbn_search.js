import React, { Component } from 'react';


class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }

  onChange(e) {
    this.setState({value: e.target.value});
    this.props.onChange(this.state.value);
  }

  render() {
    return (
             <div className="container">
                <div id="modal1" className="modalIsbn">
                    <div className="modal-content">
                        <form onSubmit={this.getBooks}className='form-isbn'>
                            <input type="text" onChange={this.handleIsbnChange.bind(this)} name={"ISBN"} placeholder={" Enter ISBN"} value={this.state.ISBN}/>
                            <div className="modal-footer">
                                <div className='searchButtonContainer'>
                                    <button type="button" className=' btn btn-large'>Search</button>
                                </div>
                            
                            </div>
                        </form>
                    </div>
                </div>
                </div> 
    );
  }
}

export default SearchInput;