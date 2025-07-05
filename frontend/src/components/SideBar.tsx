import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import type { DrawerItem } from '../types/types';

const drawerWidth = 300;

export default function SideBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const drawerItems: DrawerItem[] = [
        { text: 'Settings', icon: <SettingsIcon />, to: '/settings' },
        { text: 'Help', icon: <HelpOutlineIcon />, to: '/help' },
        { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout },
    ];

    const drawer = (
        <div className='p-4 h-full'>
            <List className='flex flex-col justify-between h-full'>
                <SearchBar/>
                <ListItem className='pt-13' disablePadding>
                    <ListItemButton onClick={() => navigate('/storage')} >
                        <ListItemIcon>
                            <Inventory2Icon/>
                        </ListItemIcon>
                            <ListItemText primary="Storage"/>
                    </ListItemButton>
                </ListItem>
                <div>
                    {drawerItems.map(({ text, icon, to, onClick }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton 
                            onClick={() => {
                                if (onClick) {
                                    onClick();
                                } else if (to) {
                                    navigate(to); 
                                }
                            }}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </div>
            </List>
        </div>
    );

  return (
    <Box sx={{ display: 'flex' }}>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <div className='m-4 flex items-center gap-1'>
                    <Logo/>
                </div>
                {drawer}
            </Drawer>
        </Box>

    </Box>
  );
}
