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
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" data-index="1"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <QuestionAnswerSharp />
      </ListItemIcon>
      <ListItemText primary="Question 1" data-index="2"/>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);