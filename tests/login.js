exports.loginPage = class loginPage {

  constructor(page) {
    this.page = page;
  }
  
  async loginWithCredentials(url, username, password) {

    // XPath Locators
    const usernameLocator = 'xpath = //input[@id="username"]';
    const passwordLocator = 'xpath = //input[@id="password"]';
    const loginLocator = 'xpath = //*[@id="Login"]';

    // login with credentials
    await this.page.goto(url);
    await this.page.type(usernameLocator, username);
    await this.page.locator(passwordLocator).fill(password);
    await this.page.click(loginLocator);
  }
}
