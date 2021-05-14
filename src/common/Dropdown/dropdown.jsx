import React, { Component } from 'react';
import classNames from "classnames";
import Icon from "common/Icon/icon.jsx";
import Button from "common/Button/button.jsx";

// Styles
import "./dropdown.scss";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedItem: this.props.displayItem 
    }
    this.container = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.onClickOutside);
  }

  onClick = () => {
    this.setState((state) => {
      return { open: !state.open };
    })  
  }

  onClickOutside = (event) => {
    if(this.container.current && !this.container.current.contains(event.target)) {
      this.setState({ open: false });
    }
  }

  buildItems = () => {
    return (
      this.props.items.map((item, i) => 
        <div className="dropdown-item" key={i}>
          {item}
        </div>
      )
    )
  }

  render() {
    return (
      <div className="dropdown-container">
        <Button className="display" size="lg" withBorder={true} onClick={this.onClick}>
          {this.state.selectedItem}<span><Icon icon="angleDown" /></span>
        </Button>
        { this.state.open && (
          <div className="dropdown-items" ref={this.container}>
            {this.buildItems()}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
