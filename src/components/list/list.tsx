import { FC } from 'react';
import styles from "./list.module.css";
import { Line } from '../line/line';
import { Check } from '../check/check';
import { TTask, ListProps } from '../../types/types';
import { FilterValues } from '../../types/enums';

const Task: FC<TTask> = ({ text, done }) => {
  return (
    <div className={`${styles.task} ${done ? styles.task_status_done : ''}`}>{text}</div>
  )
}

//функция выдает булево значение, которое отражает нужно ли показывать задачу
//в списке в соответствии с выбранным фильтром
const isShownByFilter = (filter:FilterValues,task:TTask):boolean => {
  if (filter === FilterValues.Active) {
    if (task.done) {
      return false;
    } else {
      return true;
    }
  }
  if (filter === FilterValues.Completed) {
    if (task.done) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

export const List: FC<ListProps> = ({ tasks,filter, onClick }) => {

  return (
    <ul className={styles.content}>
      {
        tasks && tasks.map((item) => {
          return (
            isShownByFilter(filter,item) && <li onClick={()=>{onClick(item.id)}} key={item.id}>
              <Line
                firstComponent={{
                  LineComponent: Check,
                  lineProps: {
                    isDone: item.done
                  }
                }}
                secondComponent={{
                  LineComponent: Task,
                  lineProps: {
                    id: item.id,
                    text: item.text,
                    done: item.done
                  }
                }}
                extraClass={styles.line}
              />
            </li>
          )
        })
      }
    </ul>
  );
}

