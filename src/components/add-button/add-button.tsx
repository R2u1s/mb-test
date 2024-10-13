import { FC } from 'react';
import { AddIcon } from '../../ui/icons/add-icon';
import styles from "./add-button.module.css";
import { AddButtonProps } from '../../types/types';

export const AddButton: FC<AddButtonProps> = ({ isShown, onClick }) => {

  return (
    <>
      {isShown && <button className={styles.add} type="submit" onClick={onClick} disabled={!isShown}>
        <AddIcon />
      </button>}
    </>
  );
}

