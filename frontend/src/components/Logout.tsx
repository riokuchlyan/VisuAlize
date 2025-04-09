// internal
import { useAuth } from '../contexts/AuthContext';

// external
import { supabase } from '../supabaseClient';

// built-in
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error);
            alert('Failed to log out. Please try again.');
        } else {
            navigate('/');
        }
    };

    return (
        currentUser && (
            <button onClick={handleLogout}>
                Logout
            </button>
        )
    );
};

export default Logout;