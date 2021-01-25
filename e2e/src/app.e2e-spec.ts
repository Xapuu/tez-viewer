import { AppPage } from './app.po';
import { browser, logging , WebDriver} from 'protractor';

describe('workspace-project Tez', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('On load', () => {

    it('should render a tez-table table component', async () => {
      await page.navigateTo();
      expect(await page.getTezTable()).toBeTruthy();
    });

    it('should render two table elements inside the tez-table component', async () => {
      await page.navigateTo();

      const tableReferencesLength = (await page.getHtmlTableOfTezTable()).length;
      expect(tableReferencesLength).toEqual(2);
    });

    it('should render Header row with refresh button', async () => {
      await page.navigateTo();
      expect(await page.getRefreshButton()).toEqual('Recent Transactions');
    });

    it('should render eleven table rows', async () => {
      await page.navigateTo();

      const tableReferencesLength = (await page.getTableRows()).length;
      expect(tableReferencesLength).toEqual(11);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
