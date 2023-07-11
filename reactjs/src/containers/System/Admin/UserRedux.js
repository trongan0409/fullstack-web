import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { languages, crudActions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],
            roleArray: [],
            previewImageURL: '',
            isOpen: false,
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArray: res.data
        //         })
        //     }
        //     console.log('check res', res);
        // } catch (e) {
        //     console.log(e);
        // }
    };

    componentDidUpdate(prevProps, prevState, spapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArray: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        };

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArray: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevProps.allUsers !== this.props.allUsers) {
            let arrGender = this.props.genderRedux;
            let arrRole = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                previewImageURL: '',
                action: crudActions.CREATE
            })
        }
    };

    handleOnChangeImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check base64 image: ', base64);
            let imageObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: imageObjectUrl,
                avatar: base64
            })
        }
    };

    isOpenImage = () => {
        if (!this.state.previewImageURL) return;

        this.setState({ isOpen: true });
    };

    handleCreateUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            address: this.state.address,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber,
            roleId: this.state.role,
            avatar: this.state.avatar
        });
    };
    handleUpdateUser = () => {
        this.props.editUser({
            id: this.state.userEditId,
            fullName: this.state.fullName,
            address: this.state.address,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber,
            roleId: this.state.role,
            avatar: this.state.avatar
        });
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'fullName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    handleEditUserParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'hashcode',
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            avatar: '',
            previewImageURL: imageBase64,
            action: crudActions.EDIT,
            userEditId: user.id
        })
    };

    handleClearForm = () => {
        this.setState({
            previewImageURL: '',
            isOpen: false,
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''
        })
    };

    render() {
        let genders = this.state.genderArray;
        let roles = this.state.roleArray;
        let language = this.props.language;

        let { email, password, fullName, phoneNumber, address, gender, role, avatar } = this.state;

        return (
            <div className='user-redux-container'>
                <div className="title" >QUẢN LÝ NGƯỜI DÙNG</div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.email" /></label>
                            <input className='form-control' type='email' value={email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                disabled={this.state.action === crudActions.EDIT ? true : false}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.password" /></label>
                            <input className='form-control' type='password' value={password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                disabled={this.state.action === crudActions.EDIT ? true : false}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.fullname" /></label>
                            <input className='form-control' type='text' value={fullName}
                                onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.phonenumber" /></label>
                            <input className='form-control' type='text' value={phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                        </div>
                        <div className='col-5'>
                            <label><FormattedMessage id="manage-user.address" /></label>
                            <input className='form-control' type='text' value={address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <select className="form-control" value={gender}
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === languages.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-2'>
                            <label><FormattedMessage id="manage-user.roleid" /></label>
                            <select className="form-control" value={role}
                                onChange={(event) => this.handleOnChangeInput(event, 'role')}>
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === languages.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.image" /></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnChangeImage(event)} />
                                <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                                <div
                                    className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                    onClick={() => this.isOpenImage()}
                                ></div>
                            </div>
                        </div>
                        <div className='col-12 mt-3 mb-4'>
                            <button
                                className={this.state.action === crudActions.EDIT ? "btn btn-warning" : 'btn btn-primary'}
                                onClick={this.state.action === crudActions.EDIT ? () => this.handleUpdateUser() : () => this.handleCreateUser()}
                            >
                                {
                                    this.state.action === crudActions.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.create" />
                                }
                            </button>
                            <button
                                className='btn btn-secondary ml-3'
                                onClick={this.handleClearForm}
                            >
                                Làm mới
                            </button>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableManageUser
                                handleEditUserParent={this.handleEditUserParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <LightBox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        allUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data))

        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
