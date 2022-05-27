import React from 'react';
import Container from '@mui/material/Container';
import UserDataComponent from "./UserDataComponent";

function UserPageComponent({user, error}) {

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '15vh'
            }}>
            <UserDataComponent user={user} error={error}/>
        </Container>
    );
}

export default UserPageComponent;
