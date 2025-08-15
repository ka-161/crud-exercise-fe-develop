class taskModel{
    _id!: string; //exclamatin to avoid type checking
    title!: string;
    taskListId!: string; //potential error
    completed!: boolean;
}

export default taskModel;