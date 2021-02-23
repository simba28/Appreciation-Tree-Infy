import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleReactValidator from 'simple-react-validator';
const url = 'http://localhost:5000/posts';

export default class PostWish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableFlights: null,
      form: {
        username: '',
        empId: '',
        wish: '',
      },
      errorMessage: '',
    };
    this.validator = new SimpleReactValidator({autoForceUpdate: this});
  }
  submitBooking = () => {
    // Make an axios get request to get the flights in the specified route
    // populate the availableFlights or errorMessage appropriately
    this.setState({ errorMessage: ''});
    console.log(this.state.form);
    axios
      .post(url, this.state.form)
      .then(response => {
         console.log(response.data, 'success')
      })
      .catch(err => {
        // console.log(err)
        // console.log(err,'kkkk')

        let error = err.response
          ? err.response.data.message
          : 'Not connected to the server';
        // console.log(error)
        this.setState({
          errorMessage: error
        });
      });
  };
  handleSubmit = event => {
    // Prevent the default behaviour of form submission
    // Call appropriate method to make the axios get request
    event.preventDefault();
    if(this.validator.allValid()){
      this.submitBooking();
    }
    else{
      this.validator.showMessages();
    }
    
  };
  handleChange = event => {
    // Get the names and values of the input fields
    // Update the formValue object in state
    // Call the validateField method by passing the name and value of the input field
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };
  render() {
      return (
        <React.Fragment>
          <div className='container'>
            <div className='row mt-5'>
              <div className='col-lg-4 offset-lg-1'>
                <div className='card bg-card'>
                  <div className='card-body'>
                    {/* Create the form here */}
                    <form onSubmit={this.handleSubmit}>
                      {/* Username */}
                      <div className='form-group'>
                        <label htmlFor='username'>Username</label>
                        <center>
                          <input
                            className='form-control'
                            id='username'
                            name='username'
                            placeholder='Username'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='usernameError' className='text-danger'>
                        {this.validator.message('username', this.state.form.username, 'required')}
                        </span>
                      </div>

                      {/* Employee ID */}
                      <div className='form-group'>
                        <label htmlFor='empId'>Employee ID</label>
                        <center> 
                          <input
                            className='form-control'
                            id='empId'
                            name='empId'
                            placeholder='Employee Id'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='empIdError' className='text-danger'>
                        {this.validator.message('empId', this.state.form.empId, 'required|numeric|size:6')}
                        </span>
                      </div>

                      {/* Wish */}
                      <div className='form-group'>
                        <label htmlFor='wish'>Wish</label>
                        <center>
                          <input
                            type='wish'
                            className='form-control'
                            id='wish'
                            name='wish'
                            placeholder="Happy Women's day"
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='wishError' className='text-danger'>
                        {this.validator.message('wish', this.state.form.wish, 'required')}
                        </span>
                      </div>

                      {/* Button */}
                      <button
                        type='submit'
                        className='btn btn-primary btn-block'
                        name='postWish'
                        // disabled={!this.validator.allValid()}
                      >
                        Post Wish
                      </button>
                    </form>
                    <span name='errorMessage' className='text-danger'>
                      {this.state.errorMessage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
  }
}
