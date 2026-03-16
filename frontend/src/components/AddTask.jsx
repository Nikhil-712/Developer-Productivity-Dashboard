import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Development');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    onAddTask({
      text,
      priority,
      category,
      dueDate,
    });

    setText('');
    setDueDate('');
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="add-task-main-row">
        <label htmlFor="new-task" className="visually-hidden">
          Add Task
        </label>
        <input
          id="new-task"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </div>

      <div className="add-task-meta-row">
        <div className="field-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="task-category">Category</label>
          <select
            id="task-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Development">Development</option>
            <option value="Bug Fix">Bug Fix</option>
            <option value="Deployment">Deployment</option>
            <option value="Documentation">Documentation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="task-due-date">Due date</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default AddTask;
