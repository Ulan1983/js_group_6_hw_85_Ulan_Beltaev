import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Register extends Component {
	state = {
		username: '',
		password: '',
		displayName: '',
		avatarImage: ''
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	fileChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.files[0]
		})

	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();
		Object.keys(this.state).forEach(key => {
			formData.append(key, this.state[key]);
		});

		this.props.registerUser(formData);
	};

	getFieldError = fieldName => {
		try {
			return this.props.error.errors[fieldName].message;
		} catch (e) {
			return undefined;
		}
	};

	render() {
		return (
			<>
				<h2>Register new user</h2>
				<FacebookLogin />

				<Form onSubmit={this.submitFormHandler}>
					<FormElement
						propertyName="username"
						title="Username"
						type="text"
						value={this.state.username}
						onChange={this.inputChangeHandler}
						error={this.getFieldError('username')}
						placeholder="Enter username"
						autoComplete="new-username"
					/>

					<FormElement
						propertyName="password"
						title="Password"
						type="password"
						value={this.state.password}
						onChange={this.inputChangeHandler}
						error={this.getFieldError('password')}
						placeholder="Enter password"
						autoComplete="new-password"
					/>

					<FormElement
						propertyName="displayName"
						title="DisplayName"
						type="text"
						value={this.state.displayName}
						onChange={this.inputChangeHandler}
						error={this.getFieldError('displayName')}
						placeholder="Enter display name"
						autoComplete="new-displayName"
					/>

					<FormElement
						propertyName="avatarImage"
						title="Avatar"
						type="file"
						onChange={this.fileChangeHandler}
						error={this.getFieldError('avatarImage')}
					/>
					<FormGroup row>
						<Col sm={{offset: 2, size: 10}}>
							<Button type="submit" color="primary">
								Register
							</Button>
						</Col>
					</FormGroup>
				</Form>
			</>
		);
	}
}

const mapStateToProps = state => ({
	error: state.users.registerError,
	loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
	registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);