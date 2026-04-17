const {getEmployees, getEmployeeById, updateEmployee} = window.employeeState;

const employeeList = document.querySelector('#employee-list');
const form = document.querySelector('#employee-form');
const nameInput = document.querySelector('#employee-name');
const titleInput = document.querySelector('#employee-title');
const saveButton = document.querySelector('#save-button');

let selectedEmployeeId = null;

function createEmployeeCard(employee) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'employee-card';
  card.innerHTML = `<strong>${employee.name}</strong><span>${employee.title}</span>`;
  card.addEventListener('click', () => {
    selectedEmployeeId = employee.id;
    render();
  });
  if (employee.id === selectedEmployeeId) {
    card.classList.add('active');
  }
  return card;
}

function renderEmployeeList() {
  employeeList.innerHTML = '';
  const employees = getEmployees();
  employees.forEach(employee => {
    employeeList.appendChild(createEmployeeCard(employee));
  });
}

function renderEditor() {
  const employee = selectedEmployeeId ? getEmployeeById(selectedEmployeeId) : null;

  if (!employee) {
    nameInput.value = '';
    titleInput.value = '';
    saveButton.disabled = true;
    return;
  }

  nameInput.value = employee.name;
  titleInput.value = employee.title;
  saveButton.disabled = false;
}

function attachEventHandlers() {
  saveButton.addEventListener('click', () => {
    if (!selectedEmployeeId) {
      return;
    }
    updateEmployee(selectedEmployeeId, {
      name: nameInput.value.trim(),
      title: titleInput.value.trim()
    });
    render();
  });
}

function render() {
  if (!selectedEmployeeId) {
    const employees = getEmployees();
    selectedEmployeeId = employees.length > 0 ? employees[0].id : null;
  }
  renderEmployeeList();
  renderEditor();
}

attachEventHandlers();
render();
