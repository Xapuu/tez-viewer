import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTezTable(): Promise<boolean> {
    return element(by.tagName('tez-table')).isDisplayed();
  }

  async getHtmlTableOfTezTable(): Promise<any[]> {
    return element.all(by.css('tez-table table'));
  }

  async getTableRows(): Promise<any[]> {
    return element.all(by.css('cdk-virtual-scroll-viewport table tr'));
  }

  async getRefreshButton(): Promise<string> {
    return element(by.css('.table-container .table-refersh-row .recent-transactions-button')).getText();
  }

}
