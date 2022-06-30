/**
 * redirects web to argument email
 * @param {string} EmailAddress - addres of email web will be redirected to.
 */
function sentEmail(EmailAddress){
    var linkArray = ['https://mail.google.com/mail/u/0/?fs=1&to=', EmailAddress, '&tf=cm'];
    window.location.href = linkArray.join('');
}