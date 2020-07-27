import { Container } from "unstated";
import { authenticator } from "otplib";
export default class GlobalContainer extends Container<any> {

  state = {
    accounts: []
  };

  constructor(props = {}) {
    super();
    console.log("timer>>>>>>>");
    setInterval(() => {
      let counter = new Date().getSeconds();
      for (let account of this.state.accounts) {
        if (!account.token || !authenticator.verify(account)) {

          try {
            account.token = authenticator.generate(account.secret);
          } catch (error) {
            console.error(error);
            return;
          }
        }
        account.progress = ((counter > 30 ? (counter - 30) : counter) / 30) * 100
      }
      this.update("accounts", this.state.accounts)
    }, 1000);
  }

  private update(key, value) {
    this.setState({
      ...this.state,
      ...{
        [key]: value
      }
    });
  }

  public addAccount(value) {
    this.update("accounts", [...this.state.accounts, value])
  }

}
