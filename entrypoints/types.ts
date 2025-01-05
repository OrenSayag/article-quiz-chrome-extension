export enum MessageType {
  clickExtIcon = "clickExtIcon",
  changeTheme = "changeTheme",
  changeLocale = "changeLocale",
  openDashboardLogin = "openDashboardLogin",
  LOGGED_IN = "LOGGED_IN",
  UPDATE_USER_INFO = "UPDATED_USER_INFO",
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
