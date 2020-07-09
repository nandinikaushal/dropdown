import React, { Component } from "react";
import Select from "react-select";
import styles from "./DropDown.css";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.createDropDownList(this.props.options, this.props.type),
    };
    this.customStyles = {
      menu: provided => ({
        ...provided,
        maxHeight: props.menuMaxHeight ? props.menuMaxHeight : "170px",
      }),
      menuList: provided => ({
        ...provided,
        maxHeight: props.menuMaxHeight ? props.menuMaxHeight : "170px",
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      options: this.createDropDownList(nextProps.options, nextProps.type),
    });
  }

  onSelectChange(item) {
    if (item) {
      this.props.optionSelected(item.value, this.props.type);
    } else {
      this.props.optionSelected(item);
    }
  }

  createDropDownList = (list, type) => {
    if (list) {
      return list.map(listItem => {
        return { value: listItem, label: listItem, type };
      });
    }
    return [];
  };

  render() {
    const { isClearable, placeholder, ccmDropdownStyle, id } = this.props;
    return (
      <div
        className={
          ccmDropdownStyle ? styles.ccmDropdownStyle : styles.dropDownStyle
        }
      >
        <Select
          id={id}
          isClearable={isClearable}
          styles={this.customStyles}
          defaultValue={{ label: this.props.title }}
          onChange={e => this.onSelectChange(e)}
          options={this.state.options}
          isDisabled={this.props.disabled}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
