import { Container } from "unstated";

export default class GlobalContainer extends Container<any> {
  state = { customerListLoaded: false };

  public update(key, value) {
    this.setState({
      ...this.state,
      ...{
        [key]: value
      }
    });
  }
}
