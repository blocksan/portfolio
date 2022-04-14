//update this with your js_form selector
let form_id_js = 'contact-form';

let data_js = {
  access_token: 'wn547flbcis283pmviuoew0f',
};

function reset() {
  document.querySelector('#' + form_id_js + " [name='contact-message']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='subject']").value = '';
  document.querySelector('#' + form_id_js + " [name='contact-name']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='contact-phone']").value =
    '';
  document.querySelector('#' + form_id_js + " [name='contact-email']").value =
    '';
}

function js_onSuccess() {
  // redirecting
  //   window.location =
  //     window.location.pathname + '?message=Email+Successfully+Sent%21&isError=0';
  document.getElementById('mail-response-success').style.display = 'block';
  reset();
}

function js_onError(error) {
  // Redirecting
  document.getElementById('mail-response-error').style.display = 'block';
}

let sendButton = document.getElementById('submit');

function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    } else if (request.readyState == 4) {
      js_onError(request.response);
    }
  };

  let subject = document.querySelector(
    '#' + form_id_js + " [name='subject']"
  ).value;
  let msgBody = document.querySelector(
    '#' + form_id_js + " [name='contact-message']"
  ).value;
  let emailMessage = 'Message:' + msgBody;
  let nameBody = document.querySelector(
    '#' + form_id_js + " [name='contact-name']"
  ).value;
  let name = 'Name:' + nameBody;
  let phoneBody = document.querySelector(
    '#' + form_id_js + " [name='contact-phone']"
  ).value;
  let contactNo = 'Contact No:' + phoneBody;
  let emailBody = document.querySelector(
    '#' + form_id_js + " [name='contact-email']"
  ).value;
  let contactEmail = 'Contact Email:' + emailBody;

  if (!subject || !msgBody || !emailBody || !nameBody || !phoneBody) {
    document.getElementById('mail-response-error').innerHTML =
      'Please fill all the fields.';
  }
  let message = `
  ${name}
  ${contactNo}
  ${contactEmail}
  ${emailMessage}
  `;
  data_js['subject'] = subject;
  data_js['text'] = message;
  let params = toParams(data_js);

  request.open('POST', 'https://postmail.invotes.com/send', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.send(params);

  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  let form_data = [];
  for (let key in data_js) {
    form_data.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(data_js[key])
    );
  }

  return form_data.join('&');
}

let js_form = document.getElementById(form_id_js);
js_form.addEventListener('submit', function (e) {
  e.preventDefault();
});
