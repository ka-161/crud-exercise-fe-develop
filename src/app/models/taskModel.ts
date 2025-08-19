class taskModel{
    _id!: string; //exclamatin to avoid type checking - good idea? exception?
    title!: string;
    taskListId!: string; //potential error
    completed!: boolean;
}

export default taskModel;