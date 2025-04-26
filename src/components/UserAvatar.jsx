import React from "react";
import { Avatar } from '@mui/material';

function UserAvatar({ username, size = 40 }) {
    const profileInitials = username ? username.charAt(0).toUpperCase() : '';

    return (
        <Avatar 
            sx={{ 
                background: 'linear-gradient(135deg,rgba(252, 252, 252, 0.75),rgba(241, 231, 244, 0.6))', // Notice: 'background' not 'bgcolor'
                color: 'black',
                fontWeight: 'bold',
                fontSize: size / 2.5,
                width: size,
                height: size,
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                border: '2px solid white',
            }}
        >
            {profileInitials}
        </Avatar>
    );
}

export default UserAvatar;
