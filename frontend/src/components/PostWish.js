import React, { Component } from 'react';
// import axios from 'axios';
// import '../App.css';
// import FlightDetails from './flightDetails';
// import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://localhost:1050/getFlights/';

export default class PostWish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableFlights: null,
      form: {
        origin: '',
        destination: '',
        departureDate: '',
        noOfTickets: 0,
      },
      formErrorMessage: {
        originError: '',
        destinationError: '',
        departureDateError: '',
        noOfTicketsError: '',
      },
      formValid: {
        originfield: false,
        destinationfield: false,
        departureDatefield: false,
        noOfTicketsfield: false,
        buttonActive: false,
      },
      errorMessage: '',
    };
  }
  submitBooking = () => {
    // Make an axios get request to get the flights in the specified route
    // populate the availableFlights or errorMessage appropriately
    this.setState({ errorMessage: '', availableFlights: null });
    console.log(url + this.state.form.origin + this.state.form.destination);
    console.log('succcccc');
    // axios
    //   .get(url + this.state.form.origin + '/' + this.state.form.destination)
    //   .then(response => {
    //     //  console.log(response.data, 'success')
    //     this.setState({ availableFlights: response.data, errorMessage: '' });
    //   })
    //   .catch(err => {
    //     // console.log(err)
    //     // console.log(err,'kkkk')

    //     let error = err.response
    //       ? err.response.data.message
    //       : 'Not connected to the server';
    //     // console.log(error)
    //     this.setState({
    //       errorMessage: error,
    //       availableFlights: null,
    //     });
    //   });
  };
  handleSubmit = event => {
    // Prevent the default behaviour of form submission
    // Call appropriate method to make the axios get request
    event.preventDefault();
    this.submitBooking();
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
    this.validateField(name, value);
  };
  validateField = (fieldName, value) => {
    // Validate the values entered in the input fields
    // Update the formErrorMessage and formValid objects in the state
    let message = '';
    let validity = false;

    switch (fieldName) {
      case 'origin':
        let regex = new RegExp(/^[A-z]{1,15}$/);
        value === ''
          ? (message = 'field required')
          : regex.test(value)
          ? (message = '')
          : (message = 'Please enter a valid origin city');
        break;
      case 'destination':
        let regex_ = new RegExp(/^[A-z]{1,15}$/);
        value === ''
          ? (message = 'field required')
          : regex_.test(value)
          ? (message = '')
          : (message = 'Please enter a valid destination city');
        break;
      case 'departureDate':
        let date = new Date();
        value === ''
          ? (message = 'field required')
          : date < new Date(value)
          ? (message = '')
          : (message = 'Departure date cannot be before today');
        break;
      case 'noOfTickets':
        if (value === '') {
          message = 'field required';
        } else if (value < 1) {
          message = 'Number of Tickets cannot be less than 1';
        } else if (value > 5) {
          message = 'You can book 5 tickets at a time';
        } else {
          message = '';
        }
        break;
      default:
        break;
    }

    let formErrorMessageObj = this.state.formErrorMessage;
    formErrorMessageObj[fieldName + 'Error'] = message;
    this.setState({ formErrorMessage: formErrorMessageObj });
    // console.log(this.state.formErrorMessage)

    validity = message === '' ? true : false;

    let formValidityObj = this.state.formValid;
    formValidityObj[fieldName + 'field'] = validity;
    formValidityObj.buttonActive =
      formValidityObj.originfield &&
      formValidityObj.destinationfield &&
      formValidityObj.departureDatefield &&
      formValidityObj.noOfTicketsfield;
    // console.log(formValidityObj)
    this.setState({ formValid: formValidityObj });
  };
  render() {
    if (this.state.availableFlights != null) {
      // Pass appropriate props to the FlightDetails component below
      // console.log(this.state.availableFlights,'hiiiiii')
      return (
        <h1>jjjjjjjjjjjj</h1>
        // <FlightDetails
        //   flightData={this.state.form}
        //   availableFlights={this.state.availableFlights}
        // />
      );
    } else {
      let {
        originError,
        destinationError,
        departureDateError,
        noOfTicketsError,
      } = this.state.formErrorMessage; // creating err msg variables
      return (
        <React.Fragment>
          <div className='container'>
            <div className='row mt-5'>
              <div className='col-lg-4 offset-lg-1'>
                <div className='card bg-card text-light '>
                  <div className='card-body'>
                    {/* Create the form here */}
                    <form onSubmit={this.handleSubmit}>
                      {/* Origin */}
                      <div className='form-group'>
                        <label htmlFor='origin'>Origin</label>
                        <center>
                          <input
                            className='form-control'
                            id='origin'
                            name='origin'
                            placeholder='Origin'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='originError' className='text-danger'>
                          {originError}
                        </span>
                      </div>

                      {/* Destination */}
                      <div className='form-group'>
                        <label htmlFor='destination'>Destination</label>
                        <center>
                          <input
                            className='form-control'
                            id='destination'
                            name='destination'
                            placeholder='Destination'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='destinationError' className='text-danger'>
                          {destinationError}
                        </span>
                      </div>

                      {/* Departure Date */}
                      <div className='form-group'>
                        <label htmlFor='departureDate'>Departure Date</label>
                        <center>
                          <input
                            type='date'
                            className='form-control'
                            id='departureDate'
                            name='departureDate'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='departureDateError' className='text-danger'>
                          {departureDateError}
                        </span>
                      </div>

                      {/* Tickets */}
                      <div className='form-group'>
                        <label htmlFor='noOfTickets'>No of Tickets</label>
                        <center>
                          <input
                            type='number'
                            className='form-control'
                            id='noOfTickets'
                            name='noOfTickets'
                            placeholder='0'
                            onChange={this.handleChange}
                          />
                        </center>
                        <span name='noOfTicketsError' className='text-danger'>
                          {noOfTicketsError}
                        </span>
                      </div>

                      {/* Button */}
                      <button
                        type='submit'
                        className='btn btn-primary btn-block'
                        name='viewFlightsButton'
                        disabled={!this.state.formValid.buttonActive}
                      >
                        View Flights
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
}
