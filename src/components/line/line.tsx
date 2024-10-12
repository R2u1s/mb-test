import styles from "./line.module.css";
import { LineWrapperProps } from "../../types/types";

//компонент Line - строка, в которой размещаются три передаваемых компонента 
//например для первой строки это будет стрелка, инпут, кнопка добавить
//добавляемые компоненты могут быть с пропсами или без
//третий компонент не обязательный - для task 
export const Line = <T1 extends object, T2 extends object, T3 extends object>({
  firstComponent,
  secondComponent,
  thirdComponent,
  extraClass=""
}: LineWrapperProps<T1, T2, T3>) => {

  return (
    <div className={`${styles.line} ${extraClass}`}>
      <div className={styles.line__last}><firstComponent.LineComponent {...firstComponent.lineProps || ({} as T1)} /></div>
      <div className={styles.line__center}><secondComponent.LineComponent {...secondComponent.lineProps || ({} as T2)} /></div>
      {thirdComponent && <div className={styles.line__last}><thirdComponent.LineComponent {...thirdComponent.lineProps || ({} as T3)} /></div>}
    </div>
  );
}

