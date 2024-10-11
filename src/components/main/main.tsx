import { FC, useState } from 'react';
import styles from "./main.module.css";
import { Input } from '../../ui/input/input';
import { ArrowIcon } from '../../ui/icons/arrow-icon';

export const Main: FC = () => {

  const [inputValue, setInputValue] = useState<string>(''); //управляемый инпут

  return (
    <main className={styles.content}>
      <div className={styles.line}>
        <div className={styles.line__first}><ArrowIcon /></div>
        <div className={styles.line__second}><Input value={inputValue} placeholder="What needs to be done?" onChange={event => setInputValue(event.target.value)} /></div>
      </div>

    </main>
  );
}

