import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link } from 'react-router-dom';
import './DrawerNav.css';

const DrawerNav = () => {
        const [state, setState] = useState({
          left: false,
        });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
        sx={{ width: 280 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
        {/* Header */}
        <Box sx={{ backgroundColor: '#232f3e', color: '#fff', padding: '16px' }}>
            <div className="drawer__header">Hello, Sign In</div>
        </Box>

        {/* Main Navigation */}
        <List>
            {[
                { text: 'Home', link: '/' },
                { text: 'Shop All', link: '/shop' },
                { text: "Men's Fashion", link: '/category/men' },
                { text: "Women's Fashion", link: '/category/women' },
                { text: "Kids' Fashion", link: '/category/kids' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding sx={{ borderBottom: '1px solid #f0f0f0' }}>
                <ListItemButton sx={{ padding: '12px 16px', '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <ListItemText>
                    <Link to={item.link} style={{ textDecoration: 'none', color: '#232f3e', fontWeight: '500' }}>{item.text}</Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
        </List>

        <Divider />

        {/* Account Section */}
        <List>
            <ListItem disablePadding>
                <ListItemButton sx={{ padding: '12px 16px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <ListItemText>
                        <Link to="/account/login" style={{ textDecoration: 'none', color: '#232f3e', fontWeight: '500' }}>Your Account</Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton sx={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                    <ListItemText>
                        <Link to="/wishlist" style={{ textDecoration: 'none', color: '#232f3e', fontWeight: '500' }}>Your Wishlist</Link>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton sx={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                    <ListItemText>
                        <a href="#settings" style={{ textDecoration: 'none', color: '#232f3e', fontWeight: '500' }}>Settings</a>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton sx={{ padding: '12px 16px' }}>
                    <ListItemText>
                        <a href="#help" style={{ textDecoration: 'none', color: '#232f3e', fontWeight: '500' }}>Help & Support</a>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
        </Box>
      );

    return ( 
        <Fragment>
            {['left'].map((anchor) => (
                <Fragment key={anchor}>
                    {state.left ? (
                        <MenuOpenIcon 
                            fontSize='large' 
                            sx={{ color: '#fff', cursor: 'pointer' }}
                            onClick={toggleDrawer(anchor, false)}
                        />
                    ) : (
                        <MenuIcon 
                            fontSize='large' 
                            sx={{ color: '#fff', cursor: 'pointer' }}
                            onClick={toggleDrawer(anchor, true)} 
                        />
                    )}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        sx={{
                            '& .MuiDrawer-paper': {
                                backgroundColor: '#fff',
                                top: 'auto',
                            }
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </Fragment>
     );
}
 
export default DrawerNav;