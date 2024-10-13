import {CLASS_NEWTASK} from '../../src/utils/test';

describe('Корректная работа инпута', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Пустой инпут дизейблит кнопку', () => {
    cy.get('input').should('be.empty');
    cy.get('button[type=submit]').should('not.exist');
  });

  it('Ввод строки в инпут включает кнопку submit', () => {
    cy.get('input').type('new task');
    cy.get('button[type=submit]').should('be.visible');
  });

  it('Вводим текст задачи и жмем submit', () => {
    const inputValue = 'new task 123'
    cy.get('input').type(inputValue);
    cy.get('button[type=submit]').click();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue);
  });

});