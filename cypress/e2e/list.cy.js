import {CLASS_NEWTASK} from '../../src/utils/test';

describe('Корректная работа списка задач', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Проверка, что добавленная задача отображается как невыполненная', () => {
    const inputValue = 'new task 123'
    cy.get('input').type(inputValue);
    cy.get('button[type=submit]').click();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue);
    cy.contains('div', inputValue)
      .should('have.css', 'text-decoration')
      .and('not.include', 'line-through');
  });

  it('Клик по задаче меняет её стили как для выполненной', () => {
    const inputValue = 'new task 123'
    cy.get('input').type(inputValue);
    cy.get('button[type=submit]').click();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue);
    cy.contains('div', inputValue).click();
    cy.contains('div', inputValue)
    .should('have.css', 'text-decoration')
    .and('include', 'line-through');
  });
});