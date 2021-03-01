import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ShowWishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWishes: this.props.allWishes,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allWishes !== this.props.allWishes) {
      this.setState({ allWishes: this.props.allWishes });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="ml-5 ">
          {this.state.allWishes.map(wishObj => (
            // <div className='col' key={wishObj._id}>
              <div className='star-image' key={wishObj.id}>
                {wishObj.wish.length > 50 ? (
                  <img
                    src='star.png'
                    style={{ width: '600px', height: '500px' }}
                    alt='star'
                  />
                ) : wishObj.wish.length > 30 ? (
                  <img
                    src='star.png'
                    style={{ width: '500px', height: '400px' }}
                    alt='atar'
                  />
                ) : (
                  <img src='star.png' alt='star' />
                )}
                {/* <img src='star.png' alt='' /> */}
                <div className='centered'>
                  <h3>{wishObj.wish} <br/> --{wishObj.username}</h3>
                </div>
              </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
