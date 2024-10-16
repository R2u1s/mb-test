import {
  CLASS_NEWTASK,
  CLASS_CLEAR_BUTTON,
  CLASS_FILTER_EL,
  CLASS_FILTER_EL_ACTIVE,
  TEXT_FILTER_ALL,
  TEXT_FILTER_ACTIVE,
  TEXT_FILTER_COMPLETED,
  CLASS_CONTROL_LEFT,
  TEXT_CONTROL_LEFT
} from '../../src/utils/test';

function clearAllTasks() {
  //удалим все имеющиеся задачи кликнув по всем невыполненным задачам и на кнопку "clear completed"
  cy.get(CLASS_NEWTASK).each(($el) => {
    cy.wrap($el).then(($element) => {
      if (!$element.css('text-decoration').includes('line-through')) {
        cy.wrap($element).click();
      }
    });
  });
  cy.get(CLASS_CLEAR_BUTTON).click();
  //проверим, что действительно не осталось задач в списке
  cy.get(CLASS_NEWTASK).should('not.exist');
}

describe('Корректная работа нижней панели управления', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Проверка работы кнопки Clear completed перед остальными тестами для очистки списка', () => {
    clearAllTasks();
  });

  it('Работа кнопок фильтрации списка', () => {
    clearAllTasks();
    //добавляем 3 задачи
    const inputValue1 = 'new task 1';
    const inputValue2 = 'new task 2';
    const inputValue3 = 'new task 3';
    cy.get('input').type(inputValue1);
    cy.get('form').submit();
    cy.get('input').type(inputValue2);
    cy.get('form').submit();
    cy.get('input').type(inputValue3);
    cy.get('form').submit();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue1);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue2);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue3);

    //одну задачу отмечаем как выполненную
    cy.contains('div', inputValue2).click();

    //Проверяем, что в фильтрах выбран All
    cy.get(`[class*=${CLASS_FILTER_EL}][class*=${CLASS_FILTER_EL_ACTIVE}]`)
      .contains(TEXT_FILTER_ALL)
      .should('exist');

    //Нажмем на Active
    cy.contains(TEXT_FILTER_ACTIVE).click();

    //Проверяем, что теперь выбран Active
    cy.get(`[class*=${CLASS_FILTER_EL}][class*=${CLASS_FILTER_EL_ACTIVE}]`)
      .contains(TEXT_FILTER_ACTIVE)
      .should('exist');

    //Проверяем, что отображаются только текущие задачи
    cy.get(CLASS_NEWTASK).should('have.length', 2);
    cy.get(CLASS_NEWTASK).contains(inputValue1);
    cy.get(CLASS_NEWTASK).contains(inputValue3);

    //Теперь жмем на Completed
    cy.contains(TEXT_FILTER_COMPLETED).click();

    //Проверяем, что теперь выбран Completed
    cy.get(`[class*=${CLASS_FILTER_EL}][class*=${CLASS_FILTER_EL_ACTIVE}]`)
      .contains(TEXT_FILTER_COMPLETED)
      .should('exist');

    //Проверяем, что отображаются только текущие задачи
    cy.get(CLASS_NEWTASK).should('have.length', 1);
    cy.get(CLASS_NEWTASK).contains(inputValue2);
  });

  //Проверяем кнопку удаления задач на новых добавленных задачах
  it('Проверка работы кнопки Clear completed на новых добавленных задачах', () => {
    clearAllTasks();

    //добавляем 3 задачи
    const inputValue1 = 'new task 1';
    const inputValue2 = 'new task 2';
    const inputValue3 = 'new task 3';
    cy.get('input').type(inputValue1);
    cy.get('form').submit();
    cy.get('input').type(inputValue2);
    cy.get('form').submit();
    cy.get('input').type(inputValue3);
    cy.get('form').submit();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue1);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue2);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue3);

    //одну задачу отмечаем как выполненную
    cy.contains('div', inputValue2).click();

    cy.get(CLASS_CLEAR_BUTTON).click();

    //Проверяем, что отображаются только текущие задачи
    cy.get(CLASS_NEWTASK).should('have.length', 2);
    cy.get(CLASS_NEWTASK).contains(inputValue1);
    cy.get(CLASS_NEWTASK).contains(inputValue3);
  });

  //Проверяем подсчет текущих задач
  it('Проверка подсчета текущих задач', () => {
    clearAllTasks();

    //добавляем 3 задачи
    const inputValue1 = 'new task 1';
    const inputValue2 = 'new task 2';
    const inputValue3 = 'new task 3';
    cy.get('input').type(inputValue1);
    cy.get('form').submit();
    cy.get('input').type(inputValue2);
    cy.get('form').submit();
    cy.get('input').type(inputValue3);
    cy.get('form').submit();
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue1);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue2);
    cy.get(CLASS_NEWTASK).should('contain.text', inputValue3);

    //одну задачу отмечаем как выполненную
    cy.contains('div', inputValue2).click();

    cy.get(CLASS_CONTROL_LEFT).should('contain.text', TEXT_CONTROL_LEFT);

  });


});