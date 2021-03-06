import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleReactValidator from 'simple-react-validator';
import ShowWishes from './ShowWishes';
const backend_url = 'http://localhost:5001'
export default class PostWish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWishes: [],
      form: {
        username: '',
        empId: '',
        wish: '',
      },
      errorMessage: '',
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      validators: {
        uname: {
          // name the rule
          message: 'Not valid Infosys username',
          rule: (val, params, validator) => {
            return (
              validator.helpers.testRegex(val, /^[A-z0-9._]+$/i) &&
              params.indexOf(val) === -1
            );
          },
          messageReplace: (message, params) =>
            message.replace(':values', this.helpers.toSentence(params)), // optional
          required: true, // optional
        },
      },
    });
  }

  getAllWishes() {
    axios
      .get(backend_url+'/posts')
      .then(response => {
        console.log(response.data);
        this.setState({ allWishes: response.data });
      })
      .catch(err => {
        let error = err.response
          ? err.response.data.message
          : 'Not connected to server';
        this.setState({ errorMessage: error, allWishes: [] });
      });
  }

  componentDidMount() {
    this.getAllWishes();
  }

  submitPost = () => {
    this.setState({ errorMessage: '' });
    console.log(this.state.form);
    axios
      .post(backend_url+'/posts', this.state.form)
      .then(response => {
        this.getAllWishes();
      })
      .catch(err => {
        let error = err.response
          ? err.response.data.message
          : 'Not connected to the server';
        // console.log(error)
        this.setState({
          errorMessage: error,
        });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.submitPost();
    } else {
      this.validator.showMessages();
    }
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.validator.showMessageFor(event.target.name);

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
        <div className='main'>
          <div className='container-fluid mlr-5s'>
            <div className='d-flex justify-content-center'>
              <div className='card bg-card bg-transparent my-2'   style={{width:'80%'}}>
                <div className='card-body' style={{paddingBottom: '0px'}}>
                  {/* Create the form here */}
                  <form className='form-inline' onSubmit={this.handleSubmit}>
                    {/* Username */}
                    <div className='form-group'>
                      {/* <label htmlFor='username'>
                        Employee Name <span style={{ color: 'red' }}>*</span>
                      </label> */}
                      <center>
                        <input
                          className='form-control ml-1'
                          style={{marginRight:'3vw', width:'20vw'}}
                          id='username'
                          name='username'
                          placeholder='Infosys Username'
                          onChange={this.handleChange}
                        />
                      </center>
                      {/* <div name='usernameError' className='text-danger'>
                        {this.validator.message(
                          'username',
                          this.state.form.username,
                          'required|uname|max:20'
                        )}
                      </div> */}
                    </div>

                    {/* Employee ID */}
                    {/* <div className='form-group mx-1'>
                      <label htmlFor='empId'>
                        Employee ID <span style={{ color: 'red' }}>*</span>
                      </label>
                      <center>
                        <input
                          className='form-control ml-1'
                          id='empId'
                          name='empId'
                          placeholder='6 digit Employee Id'
                          onChange={this.handleChange}
                        />
                      </center>
                    </div> */}

                    {/* Wish */}
                    <div className='form-group mx-1'>
                      <center>
                        <textarea
                          className='form-control ml-1'
                          style={{width:'37vw'}}
                          id='wish'
                          name='wish'
                          placeholder='Drop in your Wish'
                          rows='1'
                          onChange={this.handleChange}
                        />
                      </center>
                      {/* <span name='wishError' className='text-danger'>
                        {this.validator.message(
                          'wish',
                          this.state.form.wish,
                          'required|max:75'
                        )}
                      </span> */}
                    </div>

                    {/* Button */}
                    <button
                      type='submit'
                      className='btn btn-primary mx-1'
                      name='postWish'
                      disabled={!this.validator.allValid()}
                    >
                      Post Wish
                    </button>
                  </form>
                  <span name='errorMessage' className='text-danger'>
                    {this.state.errorMessage}
                  </span>
                </div>
                <div className='d-flex'>
                  <div
                    name='usernameError'
                    className='ml-4 alignleft text-danger'
                    style={{textAlign:'left'}}
                  >
                    {this.validator.message(
                      'username',
                      this.state.form.username,
                      'required|uname|max:20'
                    )}
                  </div>
                  {/* <p name='empIdError' className='aligncenter text-danger'>
                    {this.validator.message(
                      'empId',
                      this.state.form.empId,
                      'required|numeric|size:6'
                    )}
                  </p> */}
                  <div name='wishError' className='mr-5 alignright text-danger' style={{textAlign:'left'}}>
                    {this.validator.message(
                      'wish',
                      this.state.form.wish,
                      'required|max:75'
                    )}
                  </div>
                </div>
              </div>
            </div>
              <ShowWishes allWishes={this.state.allWishes} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
