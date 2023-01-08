import { title } from "process";
import Page from "../../core/templates/page";
import "../error/error.css";

class ErrorPage extends Page {
  private errorType: string;
  
  static TextObject: { [prop: string]:string} = {
    '404': "(404)Error! The page was not found",
  };

  constructor(id: string, errorType: string){
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    title.className = 'error-title';
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;