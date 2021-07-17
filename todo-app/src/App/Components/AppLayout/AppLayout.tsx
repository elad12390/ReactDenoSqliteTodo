import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { AppRouteDefinition } from '../../App';
import AppleIcon from '@material-ui/icons/Apple';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

export interface IAppLayoutProps {
    currentPath: string;
    routes: AppRouteDefinition[];
    handleLinkClick: (name: string, path: string) => void;
}

const AppLayout = ({currentPath, routes, handleLinkClick}: IAppLayoutProps) => (
    <>
        <AppBar className="top-bar" position="sticky">
            <Toolbar>
                <Typography variant="h6">
                {currentPath}
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className="drawer"
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem>
                    <ListItemIcon><AppleIcon /></ListItemIcon>
                </ListItem>
                {routes.map(({name, path}, index) => (
                    <ListItem button key={name} onClick={() => handleLinkClick(name, path)}>
                        <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <ListIcon />}</ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </>
);

export default AppLayout;
