const {describe, it, expect} = require('../spec-kit');
const {resetEmployees, getEmployees, getEmployeeById, updateEmployee} = require('../src/employee-state');

describe('Employee state', () => {
  it('loads a default list of employees', () => {
    resetEmployees();
    const list = getEmployees();

    expect(list.length).toBe(3);
    expect(list[0]).toEqual({id: 'e1', name: 'Ava Rivera', title: 'Designer'});
  });

  it('returns a copy of state so tests cannot mutate it directly', () => {
    resetEmployees();
    const list = getEmployees();
    list[0].name = 'Tampered';

    const original = getEmployeeById('e1');
    expect(original.name).toBe('Ava Rivera');
  });

  it('updates an employee and preserves list order', () => {
    resetEmployees();
    const updated = updateEmployee('e2', {title: 'Lead Product Manager'});

    expect(updated).toEqual({id: 'e2', name: 'Omar Patel', title: 'Lead Product Manager'});
    expect(getEmployeeById('e1').title).toBe('Designer');
    expect(getEmployees()[1].title).toBe('Lead Product Manager');
  });

  it('throws when updating an employee that does not exist', () => {
    resetEmployees();
    let didThrow = false;

    try {
      updateEmployee('missing', {name: 'No One'});
    } catch (error) {
      didThrow = true;
      expect(error.message).toBe('Employee missing not found');
    }

    expect(didThrow).toBe(true);
  });
});
