import { Container } from "unstated";
import { authenticator } from "otplib";
import localforage from "localforage";
import { Mutex, Semaphore, withTimeout } from 'async-mutex';

export default class GlobalContainer extends Container<any> {
  private stateMutex = new Mutex();

  state = {
    alertMessage: "",
    alertMessageLevel: "info",
    accounts: []
  };

  constructor(props = {}) {
    super();
    this.init();
  }

  private async init() {
    let release;
    try {
      release = await this.stateMutex.acquire();
      const accounts: any = await localforage.getItem("accounts");
      if (accounts) {
        console.log(accounts);
        this.state.accounts = accounts
      }
    } catch (error) {
      console.error(error);
    } finally {
      release && release();
    }

    setInterval(async () => {
      try {
        release = await this.stateMutex.acquire();
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
          account.progress = ((counter > 30 ? (counter - 30) : counter) / 30) * 100;
        }
        this.update({ "accounts": this.state.accounts });
      } catch (error) {
        console.error(error);
      } finally {
        release && release();
      }
    }, 1000);

  }

  private async update(value) {
    this.setState({
      ...this.state,
      ...value
    });
  }

  public async addAccount(value) {
    let release;
    try {
      release = await this.stateMutex.acquire();
      const accounts = [...this.state.accounts, value];
      this.update({ "accounts": accounts });
      await localforage.setItem("accounts", accounts);
    } catch (error) {
      console.error(error);
    } finally {
      release && release();
    }
  }

  public async setAlertMessage(message, level) {
    let release;
    try {
      release = await this.stateMutex.acquire();
      this.update(
        {
          alertMessage: message,
          alertMessageLevel: level,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      release && release();
    }
  }

}
