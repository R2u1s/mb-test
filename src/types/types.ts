import { FilterValues } from "./enums";

export interface AddButtonProps {
  isShown: boolean;
  onClick: () => void
}

export interface CheckProps {
  isDone: boolean;
}

export interface ItemsLeftProps {
  left: number
}

export interface ClearCompletedProps {
  onClearHandler:()=>void
}

export interface FilterProps {
  filterValue: FilterValues, 
  onClick: (filter:FilterValues) => void
}

export interface ControlProps {
  left: number,
  filter: FilterValues,
  setFilter: (filter:FilterValues)=>void,
  onClear:()=>void
}

export type LineWrapperProps = {
  firstComponent: React.ReactNode;
  secondComponent: React.ReactNode;
  thirdComponent?: React.ReactNode;
  extraClass?: string;
};

export type ListProps = { 
  tasks: TList, 
  filter:FilterValues, 
  onClick:(id:string)=>void 
}

export type TTask = {
  id:string,
  done: boolean,
  text: string
};

export type TList = TTask[];