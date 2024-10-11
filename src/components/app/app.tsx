import React from 'react';
import styles from "./app.module.css";
import { Main } from '../main/main';

export const App:React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.title}>todos</p>
      </header>
      <Main/>
    </div>
  );
}

