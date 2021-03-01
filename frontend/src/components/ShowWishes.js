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
        <div className='row'>
          {this.state.allWishes.map(wishObj => (
            <div className='col' key={wishObj._id}>
              <div className='star-image'>
                {wishObj.wish.length > 50 ? <img src='star.png' style={{width: '600px', height: '500px'}} alt='star' /> : wishObj.wish.length >30? <img src='star.png' style={{width: '500px', height:'400px'}} alt='atar' />: <img src='star.png' alt='star' />}
                {/* <img src='star.png' alt='' /> */}
                <div className='centered'>
                  <h4>
                    {wishObj.wish}
                  </h4>
                </div>
              </div>
            </div>

            // <div key={wishObj._id} className='col-xxl-6'>
            //   <div
            //     className='card m-2'
            //     style={{ background: 'rgba(117, 139, 85, 0.6)' }}
            //   >
            //     {/* <img
            //       className='card-img'
            //       src='leaf.jpg'
            //       alt='Card image'
            //       // style={{ width: '100%' }}
            //     /> */}
            //     {/* <div className='card-img-overlay'> */}
            //     <div className='card-body'>
            //       <h5 className='card-title'>{wishObj.wish}</h5>
            //       <div className='card-subtitle'>
            //         <span>{wishObj.username}</span> <span>{wishObj.empId}</span>
            //       </div>
            //     </div>
            //     {/* </div> */}
            //   </div>
            // </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
