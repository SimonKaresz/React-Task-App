export interface iTask {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
  }

export interface iProps{
    task:iTask;
}  

export interface iSuccess{
    successId:string;
    userId:string;
}

export interface iTaskData {
    title: string;
    description: string;
  }