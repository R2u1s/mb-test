import {CLASS_ADDBUTTON, CLASS_NEWTASK} from '../../src/utils/test';

describe('Корректная работа инпута', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Пустой инпут дизейблит кнопку', () => {
    cy.get('input').should('be.empty');
    cy.get(CLASS_ADDBUTTON).should('not.exist');
  });

  it('Ввод строки в инпут включает кнопку submit', () => {
    cy.get('input').type('new task');
    cy.get(CLASS_ADDBUTTON).should('be.visible');
  });

  it('Вводим текст задачи и жмем submit', () => {
    const inputValue = 'new task 123'
    cy.get('input').clear().type(inputValue, { delay: 100 });
    cy.get('form').submit();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue);
  });

});