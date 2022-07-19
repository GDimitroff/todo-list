import { actionsController } from '../controllers/actionsController';
import { projectsController } from '../controllers/projectsController';
import { format } from 'date-fns';

export default function createEditCardForm(id) {
  const projects = projectsController.getProjects();
  const currentProject = projectsController.getCurrentProject();

  const task = projectsController.getTaskById(id);
  let date = null;
  if (task.date) {
    date = format(new Date(task.date), 'yyyy-MM-dd');
  }

  const select = document.createElement('select');
  select.name = 'projectId';
  select.id = 'projectId';

  projects
    .map((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;

      if (currentProject && project.id === currentProject.id) {
        option.defaultSelected = true;
      }

      return option;
    })
    .forEach((option) => select.appendChild(option));

  const editCardForm = document.createElement('div');
  editCardForm.classList.add('edit-task');
  editCardForm.innerHTML = `
    <div class="edit-task-header">
      <h4>Edit task</h4>
    </div>
    <form class="edit-task-form">
      <div class="edit-form-header">
        <div class="left">
          <input name="title" type="text" value="${task.title}" required />
        </div>
        <div class="right">
          <div class="select">
            ${select.outerHTML}
            <span class="select-focus"></span>
          </div>
        </div>
      </div>
  
      <textarea name="description" id="description">${
        task.description
      }</textarea>

      <div class="edit-form-content">
        <div class="select">
          <select name="priority" id="priority">
            <option value="low" ${
              task.priority === 'low' ? 'selected' : ''
            }>Low</option>
            <option value="medium" ${
              task.priority === 'medium' ? 'selected' : ''
            }>Medium</option>
            <option value="high" ${
              task.priority === 'high' ? 'selected' : ''
            }>High</option>
          </select>
          <span class="select-focus"></span>
        </div>
        <input type="date" id="date" name="date" value="${
          task.date ? date : ''
        }"/>
      </div>

      <div class="edit-form-footer">
        <button type="button" class="btn btn-close">Cancel</button>
        <button type="button" class="btn btn-submit">Save</button>
      </div>
    </form>
  `;

  actionsController.handleEditTaskForm(editCardForm);
  return editCardForm;
}