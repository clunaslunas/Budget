import { BudgetUIPage } from './app.po';

describe('budget-ui App', () => {
  let page: BudgetUIPage;

  beforeEach(() => {
    page = new BudgetUIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
