const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(keys.sendGridApiKey);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "mauricioaznar94@gmail.com",
      subject: subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true }
    };
  }

  async send() {
    return await sgMail.send(this.msg);
  }
}

module.exports = Mailer;