import { createContext, useState, ReactNode } from "react";

interface DialogType{
    open:boolean,
    taskId:null | number
}

interface DialogContextType {
  dialog:DialogType;
  openDialog: (taskId?:number) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProviderProps {
  children: ReactNode;
}

interface DialogType{
    open:boolean,
    taskId:null | number
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialog, setDialog] = useState<DialogType>({
    open:false,
    taskId:null
  });

  const openDialog = (taskId?:number) => {
    setDialog({...dialog,open:true,taskId:taskId ?? null});
  }
  const closeDialog = () => {
    setDialog({...dialog,open:false,taskId:null});
  }

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
