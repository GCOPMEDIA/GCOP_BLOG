import React from "react";
import { Avatar } from '@mui/material';

    function UserAvatar({ username }) {
        const profileInitials = username ? username.charAt(0).toUpperCase() : '';

        return (
            <Avatar sx={{ bgcolor: 'primary.main' }}>
                {profileInitials}
            </Avatar>
        );
    }
    
export default UserAvatar;