import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import styles from './BackTo.module.css'
interface IBackToProps {
   title: string,
   route: string
}

export const BackTo: FC<IBackToProps> = ({title, route}) => {
   return (
      <NavLink to={route} className={styles.link}>
         <ArrowBack />
         {title}
      </NavLink>
   );
};

