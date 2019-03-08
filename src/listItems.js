import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import QuestionAnswerSharp from '@material-ui/icons/QuestionAnswerSharp';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button ata-index="1">
      <ListItemIcon data-index="1">
        <SettingsIcon data-index="1"/>
      </ListItemIcon>
      <ListItemText primary="Settings" data-index="1"/>
    </ListItem>
    <ListItem button data-index="2">
      <ListItemIcon data-index="2">
        <QuestionAnswerSharp data-index="2"/>
      </ListItemIcon>
      <ListItemText primary="Question 1" data-index="2"/>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);