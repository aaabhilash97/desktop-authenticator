import { Container } from "unstated";

export default class GlobalContainer extends Container<any> {
  state = {
    accounts: []
  };

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
