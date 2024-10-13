import { FC } from 'react';
import styles from "./control.module.css";
import { Line } from '../line/line';
import { FilterValues } from '../../types/enums';
import { ItemsLeftProps,ClearCompletedProps,FilterProps,ControlProps } from '../../types/types';

const ItemsLeft: FC<ItemsLeftProps> = ({ left }) => {
  return (
    <span className={styles.left}>{left}&nbsp;items&nbsp;left</span>
  )
}

const ClearCompleted: FC<ClearCompletedProps> = ({onClearHandler}) => {
  return (
    <button className={styles.clear} onClick={onClearHandler}>Clear&nbsp;completed</button>
  )
}

const Filter: FC<FilterProps> = ({ filterValue, onClick }) => {
  return (
    <ul className={styles.filter}>
      {Object.values(FilterValues).map((item,index) => {
        return (
          <li 
          className={`${styles.filter__el} ${filterValue === item ? styles.filter_status_active : ''}`}
          onClick={()=>{onClick(item)}}
          key={index}>{item}</li>
        )
      })}
    </ul>
  )
}

export const Control: FC<ControlProps> = ({ left,filter,setFilter,onClear }) => {

  return (
    <Line
      firstComponent={{ LineComponent: ItemsLeft, lineProps: { left: left } }}
      secondComponent={{ LineComponent: Filter, lineProps: { filterValue: filter, onClick: setFilter } }}
      thirdComponent={{ LineComponent: ClearCompleted, lineProps: {onClearHandler:onClear} }}
    />
  );
}

