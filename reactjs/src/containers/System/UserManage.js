import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleGetAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        };
    };

    async componentDidMount() {
        await this.getUser();
    };

    getUser = async () => {
        let response = await handleGetAllUsers('ALL');
        console.log('check res: ', response);
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        };
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    };

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.message.errCode !== 0) {
                alert(response.message.errMessage);
            } else {
                await this.getUser();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            };
        } catch (e) {
            console.log(e)
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            console.log('check res: ', response);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getUser();
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    };

    editUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                })
                await this.getUser();
            } else {
                alert(res.errCode);
            };
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUser={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleEditUser={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }
                <div className="text-center title">User Manage</div>
                <div className='add-user'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    ><i className='fas fa-plus icon'></i>Add a new user
                    </button>
                </div>
                <div className='users-table'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Adress</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender}</td>
                                        {/* <td>{item.image}</td> */}
                                        <td>
                                            <button
                                                type='button'
                                                className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className='fas fa-pencil-alt'></i></button>
                                            <button
                                                type='button'
                                                className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
