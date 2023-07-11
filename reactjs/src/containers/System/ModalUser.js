import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullName: '',
            address: '',
            phoneNumber: '',
            gender: '',
        }

        this.linsenToEmitter();
    }

    linsenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                fullName: '',
                address: '',
                phoneNumber: '',
                gender: '',
            })
        });
    };

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUser();
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

    handleAddNewUser = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
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
                    <Button className='px-3' color="primary" onClick={() => { this.handleAddNewUser() }}>
                        Create
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
