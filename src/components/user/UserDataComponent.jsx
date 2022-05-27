import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {Alert, Button, Input, TextField, Typography} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import ModeIcon from '@mui/icons-material/Mode';
import {AccountCircle} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {editUserDataRequest} from "../../ducks/users";

function UserDataComponent({user, error}) {
    const [userData, setUserData] = useState(user);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [sendData, setSendData] = useState({});
    const [isEmailValid, setIsEmailValid] = useState(true);

    function handleChange(event) {
        const target = event.target;
        const name = target.name;
        if (name === 'avatar') {
            setAvatarUrl(target.value);
            setSendData((prevState) =>
                ({...prevState, [name]: target.value}));
        } else {
            setUserData((prevState) =>
                ({...prevState, [name]: target.value}));
            setSendData((prevState) =>
                ({...prevState, [name]: target.value}));
        }
    }

    function handlePhotoChange() {
        setUserData((prevState) =>
            ({...prevState, avatar: avatarUrl}));
    }

    function isEmailValidCheck(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let isValid = true;

        if (email && !regex.test(email)) {
            isValid = false;
            setIsEmailValid(false);
        }

        return isValid;

    }

    function submitChanges() {
        if (isEditing) {
            if (isEmailValidCheck(sendData.email)) {
                dispatch(editUserDataRequest(sendData));
                setIsEditing(false);
            }
        } else {
            setIsEditing(true);
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '15px 0px'
                }}>

                {userData?.avatar
                    ? <Avatar alt="User" src={userData?.avatar}/>
                    : <Avatar alt="User" src={'https://placekitten.com/200/200'}/>
                }

                {
                    isEditing ? (
                        <TextField
                            onChange={handleChange}
                            id="username"
                            name="username"
                            label="Username"
                            defaultValue={userData.username}
                            variant="standard"
                            sx={{marginLeft: '20px'}}/>
                    ) : (
                        error && error.payload.statusCode.toString() === '422' ? (
                            (<Alert severity="error">
                                User with such username already exists. Please choose a different username
                            </Alert>)
                        ) : (
                            <Typography onChange={handleChange}
                                        sx={{marginLeft: '20px'}}>{userData?.username}</Typography>
                        )
                    )
                }
            </Box>
            {
                isEditing ? (
                    <>
                        <Input
                            id="avatar"
                            name="avatar"
                            fullWidth
                            defaultValue={avatarUrl}
                            placeholder='Enter image URL'
                            onChange={handleChange}/>
                        <Button
                            size='small'
                            variant="contained"
                            sx={{width: '200px', alignSelf: 'center', margin: '10px 0px 15px 0px'}}
                            onClick={handlePhotoChange}
                        >
                            Set new photo
                        </Button>
                    </>
                ) : (<></>)
            }
            <Box sx={{display: 'flex', alignItems: 'flex-end', margin: '5px 0px'}}>
                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField
                    onChange={handleChange}
                    disabled={!isEditing}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    defaultValue={userData?.firstName}
                    variant="standard"/>
                <TextField
                    onChange={handleChange}
                    disabled={!isEditing}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    defaultValue={userData?.lastName}
                    variant="standard"/>
            </Box>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end', margin: '5px 0px'}}>
                    <EmailIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField
                        error={!isEmailValid}
                        onChange={handleChange}
                        disabled={!isEditing}
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        defaultValue={userData?.email}
                        variant="standard"/>
                </Box>
                {
                    !isEmailValid && <span className='inputErrorMessage'>Email is not valid.</span>
                }
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-start', margin: '20px 0px'}}>
                <ModeIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField
                    onChange={handleChange}
                    disabled={!isEditing}
                    id="about"
                    name="about"
                    label="About"
                    defaultValue={userData?.about}
                    multiline
                    rows={3}
                    fullWidth/>
            </Box>
            <Button
                onClick={submitChanges}
                variant="contained"
                sx={{width: '200px', alignSelf: 'center'}}
            >
                {
                    isEditing ? 'Save changes' : 'Edit profile'
                }
            </Button>
        </>
    );
}

export default UserDataComponent;