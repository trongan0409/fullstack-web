import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            fullName: '',
            address: '',
            phoneNumber: '',
            gender: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                fullName: user.fullName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
            })
        }
    }

    toggle = () => {
        this.props.toggleEditUser();
    };

    handleOnchange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    };

    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'fullName', 'address', 'phoneNumber', 'gender'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    saveUser = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    };


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'abcClassname'}
                size='md'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div class="container">
                        <div class="row">
                            <form action="postCRUD" method="post">
                                <div class="form-group">
                                    <label for="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        placeholder="Input here..."
                                        onChange={(event) => { this.handleOnchange(event, 'email') }}
                                        value={this.state.email}
                                        disabled
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        placeholder="Input here..."
                                        onChange={(event) => { this.handleOnchange(event, 'password') }}
                                        value={this.state.password}
                                        disabled
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="inputName">fullName</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="fullName"
                                        placeholder="Input here..."
                                        onChange={(event) => { this.handleOnchange(event, 'fullName') }}
                                        value={this.state.fullName}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="address"
                                        placeholder=" Input here..."
                                        onChange={(event) => { this.handleOnchange(event, 'address') }}
                                        value={this.state.address}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="inputPhone">Phone Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="phoneNumber"
                                        placeholder=" Input here..."
                                        onChange={(event) => { this.handleOnchange(event, 'phoneNumber') }}
                                        value={this.state.phoneNumber}
                                    />
                                </div>
                                <div class="form-row">
                                    <div>
                                        <label for="inputGender">Gender</label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input
                                                type="radio"
                                                className=''
                                                name="gender" value="1"
                                                onChange={(event) => { this.handleOnchange(event, 'gender') }}
                                            />Male
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input
                                                type="radio"
                                                className=''
                                                name="gender"
                                                value="0"
                                                onChange={(event) => { this.handleOnchange(event, 'gender') }}
                                            />Female
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => { this.saveUser() }}>
                        Save
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
