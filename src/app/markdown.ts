export const appStructure = {
  allBoards: [
    {
      id: '',
      boardName: '',
      boardColumns: [{ id: '', name: '' }], // Can be prefilled with the default or can be null
      task: [
        {
          taskName: '',
          taskDescription: '',
          currentStatus: '',
          subtasks: [{ id: '', name: '', isCompleted: false }] // Can be prefilled with the default or can be null
        }
      ] // by default this can be an empty object {} or null
    }
  ]
};

// boards = [];
// (task = taskName: string, description: string, subtasks = [] (empty by default) but has an add new subtask, currentStatus: [{name: "todo" and so on note: based on the column }]) for each board

// new Column = (an array by default ) => [{name: "todo", id: "todo"}, {name: "doing", id: "doing"}] but you can add new column
