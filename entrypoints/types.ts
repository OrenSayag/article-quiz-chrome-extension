export enum MessageType {
  clickExtIcon = "clickExtIcon",
  changeTheme = "changeTheme",
  changeLocale = "changeLocale",
  openDashboardLogin = "openDashboardLogin",
  LOGGED_IN = "LOGGED_IN",
  UPDATE_USER_INFO = "UPDATED_USER_INFO",
  GO_TO_URL = "GO_TO_URL",
  GOT_QUIZ = "GOT_QUIZ",
}

export enum MessageFrom {
  contentScript = "contentScript",
  background = "background",
  popUp = "popUp",
  sidePanel = "sidePanel",
}

class ExtMessage {
  content?: string;
  from?: MessageFrom;

  constructor(messageType: MessageType) {
    this.messageType = messageType;
  }

  messageType: MessageType;
}

export default ExtMessage;
