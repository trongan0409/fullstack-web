import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        };
    };

    componentDidMount() {
        this.props.getAllUsers();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allUsers !== this.props.allUsers) {
            this.setState({ userRedux: this.props.allUsers })
        }
    };

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    };

    handleEditUser = (user) => {
        this.props.handleEditUserParent(user);
    };

    render() {
        let arrAllUsers = this.state.userRedux;

        return (
            <div className='users-container mx-0'>
                <table id='TableManageUser'>
                    <tr>
                        <th>Email</th>
                        <th>Họ và Tên</th>
                        <th>Địa chỉ hiện tại</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        {/* <th>Image</th> */}
                        <th>Action</th>
                    </tr>
                    {arrAllUsers && arrAllUsers.length > 0 &&
                        arrAllUsers.map((item, index) => {
                            return (
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
                                            onClick={() => { this.handleDeleteUser(item) }}
                                            type='button'
                                            className='btn-delete'
                                        ><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        allUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.getAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
