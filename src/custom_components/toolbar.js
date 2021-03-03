import React, { useEffect } from 'react';
import './css/toolbar.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import SearchBar from './search_bar';
import MenuOptions from './menu_options';
import { useSelector, useDispatch } from 'react-redux';
import { set_mobile_mode } from '../redux/actions/mobile_mode_actions';
import { toggle_left_menu } from '../redux/actions/left_menu_actions';
import { open_dialog } from '../redux/actions/dialog_actions';
import { logout_user } from '../redux/actions/user_actions';


export default function AppToolbar() {
    const [menuItems, setMenuItems] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [hideAccountBadge, setHideAccountBadge] = React.useState(false);
    const [hideNotificationsBadge, setHideNotificationsBadge] = React.useState(false);
    const [hideMessagesBadge, setHideMessagesBadge] = React.useState(false);
    const [notificationsCount, setNotificationsCount] = React.useState(7);
    const [messagesCount, setMessagesCount] = React.useState(3);
    const mobile_mode = useSelector(state => state.mobile_mode);
    const left_menu_opened = useSelector(state => state.left_menu_opened);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const account_items = [ 
        {name: 'My Account', icon: <AccountBoxIcon />},
        {name: 'Settings', icon: <SettingsIcon />},
        {name: 'Logout',  icon: <ExitToAppIcon />, callback: () => {
            dispatch(logout_user(user));
        }}
    ];
    const notifications_items = [{name: 'Notification 1'}, {name: 'Notification 2'}, {name: 'Notification 3'},
                                {name: 'Notification 4'}, {name: 'Notification 5'}, {name: 'Notification 6'},
                                {name: 'Notification 7'}];
    const message_items = [{name: 'Message 1'}, {name: 'Message 2'}, {name: 'Message 3'}];

    const toolbar_button_clicked = (event) => {
        setAnchorEl(event.currentTarget);
        var items = [];
        setOpenMenu(true);
        if (event.currentTarget.id === 'account') {
            items = account_items;
            setHideAccountBadge(true);
        }
        else if (event.currentTarget.id === 'notifications') {
            items = notifications_items;
            if (notificationsCount > 0) {
                setHideNotificationsBadge(true);
                setNotificationsCount(0);
            }
        }
        else if (event.currentTarget.id === 'messages') {
            items = message_items;
            if (messagesCount > 0) {
                setHideMessagesBadge(true);
                setMessagesCount(0);
            }
        }
        setMenuItems(items);
        event.stopPropagation();
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(max-width: 600px)").matches) {
                dispatch(set_mobile_mode(true));
                if (left_menu_opened) {
                    dispatch(toggle_left_menu(left_menu_opened));
                }
            }
            else {
                dispatch(set_mobile_mode(false));
            }
        };
        window.addEventListener('resize', handleResize);
    }, []);

    
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar className="toolbar">
                    <div id="toolbar_content">
                        <IconButton id="menu_button" edge="start" color="inherit" aria-label="menu" onClick={() => dispatch(toggle_left_menu(left_menu_opened))}>
                            <MenuIcon />
                        </IconButton>
                        <div id="name_container">
                            <Typography id="name" variant="h6" noWrap>Prototype 1</Typography>
                        </div>
                        <SearchBar id="search_bar" mobile_mode={mobile_mode}></SearchBar>

                        {user.logged_in ? 
                        (<React.Fragment>
                            <IconButton id="notifications" color="inherit" aria-label="notifications" onClick={toolbar_button_clicked}>
                                <Badge badgeContent={notificationsCount} invisible={hideNotificationsBadge}>
                                    <NotificationsIcon></NotificationsIcon>
                                </Badge>
                            </IconButton>
                            <IconButton id="messages" color="inherit" aria-label="messages" onClick={toolbar_button_clicked}>
                                <Badge badgeContent={messagesCount} invisible={hideMessagesBadge}>
                                    <EmailIcon></EmailIcon>
                                </Badge>
                            </IconButton>
                            <IconButton id="account" color="inherit" aria-label="account" edge="end" onClick={toolbar_button_clicked}>
                                <Badge variant="dot" invisible={hideAccountBadge}>
                                    <AccountCircle></AccountCircle>
                                </Badge>
                            </IconButton>
                        </React.Fragment>) : (<Button color="inherit" onClick={() => dispatch(open_dialog('login', 'Accounts', ''))}>Login</Button>)}
                        
                        <MenuOptions menu_items={menuItems} anchor={anchorEl} setAnchorEl={setAnchorEl} open={openMenu} setOpen={setOpenMenu}></MenuOptions>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
};