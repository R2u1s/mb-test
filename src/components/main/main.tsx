import { FC, useState, ChangeEvent } from 'react';
import styles from "./main.module.css";
import { Input } from '../../ui/input/input';
import { ArrowIcon } from '../../ui/icons/arrow-icon';
import { Line } from '../line/line';
import { List } from '../list/list';
import { TList, TTask } from '../../types/types';
import { Control } from '../control/control';
import { v4 as uuidv4 } from 'uuid';
import { AddButton } from '../add-button/add-button';
import { FilterValues } from '../../types/enums';
import { mockTasks } from '../../utils/mock';

export const Main: FC = () => {

  //список задач
  const [tasks, setTasks] = useState<TList>(mockTasks);

  //управляемый инпут
  const [inputValue, setInputValue] = useState<string>('');

  //коллбэк изменения инпута
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  //коллбэк добавления новой задачи
  const addTaskHandler = (text: string) => {
    const newId = uuidv4();
    const newTask: TTask = {
      id: newId,
      done: false,
      text: text
    }
    setTasks([...tasks, newTask]);
    setInputValue('');
  }

  //коллбэк выполнения задачи
  const doneTask = (id:string) => {
    setTasks(
      tasks.map(item => 
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  //значение фильтра
  const [filter,setFilter] = useState<FilterValues>(FilterValues.All);

  //коллбэк удаления всех выполненных задач
  const clearCompleted = () => {
    setTasks(
      tasks.filter(item => !item.done)
    );
  }

  //вычисляем сколько невыполненных задач осталось
  const itemsLeft = tasks.filter(item => item.done === false).length;

  return (
    <main className={styles.content}>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTaskHandler(inputValue);
      }}>
        <Line
          firstComponent={{
            LineComponent: ArrowIcon,
            lineProps: {
              extraClass: `${styles.arrow} ${tasks.length > 0 ? '' : styles.arrow_status_inactive}`
            }
          }}
          secondComponent={{
            LineComponent: Input,
            lineProps: {
              value: inputValue,
              placeholder: "What needs to be done?",
              onChange: onChangeHandler
            }
          }}
          thirdComponent={{
            LineComponent: AddButton,
            lineProps: {
              isShown:inputValue.length > 0,
              onClick:()=>{addTaskHandler(inputValue)}
            }
          }}
          extraClass={styles.border}
        />
      </form>
      <List tasks={tasks} filter={filter} onClick={doneTask} />
      <Control left={itemsLeft} filter={filter} setFilter={setFilter} onClear={clearCompleted} />
    </main>
  );
}

