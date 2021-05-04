import React, { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import './slideDrawer.scss';

// Actions
import { closeSlideDrawer } from '../../actions';

class SlideDrawer extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  clickButton = (e) => {
    e.preventDefault();
    this.props.closeSlideDrawer();
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
        this.props.closeSlideDrawer();
    }
  }

  render() {
    let drawerClasses = 'slide-drawer';
    if(this.props.UI.showSlideDrawer) {
      drawerClasses = 'slide-drawer open'
    }
    return (
      <div className={drawerClasses} ref={this.wrapperRef}>
        <button onClick={this.clickButton}> x </button>
        drawer
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { closeSlideDrawer }
)(SlideDrawer);
