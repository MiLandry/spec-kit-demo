(function (root, factory) {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.employeeState = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const defaultEmployees = [
    {id: 'e1', name: 'Ava Rivera', title: 'Designer'},
    {id: 'e2', name: 'Omar Patel', title: 'Product Manager'},
    {id: 'e3', name: 'Lin Chen', title: 'Software Engineer'}
  ];

  let employees = [];

  function resetEmployees() {
    employees = defaultEmployees.map(employee => ({...employee}));
  }

  function getEmployees() {
    return employees.map(employee => ({...employee}));
  }

  function getEmployeeById(id) {
    const employee = employees.find(employee => employee.id === id);
    return employee ? {...employee} : null;
  }

  function updateEmployee(id, updates) {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
      throw new Error(`Employee ${id} not found`);
    }
    employees[index] = {...employees[index], ...updates};
    return {...employees[index]};
  }

  resetEmployees();

  return {
    resetEmployees,
    getEmployees,
    getEmployeeById,
    updateEmployee
  };
});
