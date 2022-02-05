import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/examlist">
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="考試" />
    </ListItemButton>
    <ListItemButton component={Link} to="/examlist">
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="題庫" />
    </ListItemButton>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved exam</ListSubheader>
    <ListItemButton component={Link} to="/history">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="歷史紀錄" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/exam">
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="修改考試項目" />
    </ListItemButton>
  </div>
);