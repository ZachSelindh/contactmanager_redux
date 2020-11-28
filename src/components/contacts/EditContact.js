import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
    waiting: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone,
      waiting: false,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ waiting: true });
    this.props.getContact(id);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const { id } = this.props.match.params;

    const updContact = {
      id,
      name,
      email,
      phone,
    };

    this.props.updateContact(updContact);

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    this.props.history.push("/");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        {this.state.waiting ? (
          <p className="text-danger text-center mb-1 mt-1">
            Request to API is Loading
          </p>
        ) : null}

        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
        <p className="text-danger text-center mb-2 mt-1">
          Please excuse long loading times from JSONPlaceholder API on Edits
        </p>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact.contact,
});

export default connect(mapStateToProps, { getContact, updateContact })(
  EditContact
);
