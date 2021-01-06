const Email = require('email-templates');
const path = require('path');
const fs = require('fs');


exports.send = (toEmail, nameCustomer) => {
  let logo = fs.readFileSync(path.resolve('emails/templates/images/logo.png')).toString('base64');

  const email = new Email({
    send: true,
    preview: false,
    juice: true,
    message: {
      from: 'info@fasadni.by'
    },
    transport: {
    secure: true,
    host: 'mailbe04.hoster.by',
    port: 465,
      auth: {
        user: 'info@fasadni.by',
        pass: '!S@bchuk1'
      }
    },
    htmlToText: false,
    textOnly: false,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: path.resolve('emails/templates'),
        images: true 
      }
    },
    views: { options: { extension: 'ejs' }}
  });
      
  email.send({
    template: 'templates',
    message: { to: toEmail },
    locals: { image: logo, name: nameCustomer }
  }).catch(console.error);
};

exports.sendToAdmin = (emailAdmin, dataForm) => {
  let dateTime = `${new Date(Date.now()).toLocaleDateString('ru-RU')} - ${new Date(Date.now()).toLocaleTimeString('ru-RU')}`;

  const email = new Email({
    send: true,
    preview: false,
    message: {
      from: 'info@fasadni.by'
    },
    transport: {
      secure: true,
      host: 'mailbe04.hoster.by',
      port: 465,
      auth: {
        user: 'info@fasadni.by',
        pass: '!S@bchuk1'
      }
    }
  });
    
  email.send({
  template: 'admin',
  message: {
    to: emailAdmin,
    attachments: [{
      filename: 'log.txt',
      content: dataForm
    }]
  },
  locals: { date: dateTime }
  })
  .then(console.log("Email sent!"))
  .catch(console.error);
};

exports.saveData = mail => {
  let date = new Date(Date.now());

  let data = fs.readFileSync(path.resolve('emails/log.txt')).toString('utf8');
  let result = `${data} \n потенциальный клиент: ${ mail.body.name }, е-mail: ${ mail.body.email }, тел.: ${ mail.body.phone },
  сообщение: ${ mail.body.message }, дата и время отпр.: ${ date.toLocaleDateString('ru-RU') } \n`;

  fs.writeFile(path.resolve('emails/log.txt'), result, function(err) {
    if(err) {
      return console.log(err);
    }    
    console.log("The file was saved!");
  });
  return result;
};

exports.getAdmin = () => {
  return JSON.parse(fs.readFileSync(path.resolve('public/area/admin/admin.json'))).mail;
};