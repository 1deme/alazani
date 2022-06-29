function sentEmail(EmailAddress){
    var linkArray = ['https://mail.google.com/mail/u/0/?fs=1&to=', EmailAddress, '&tf=cm'];
    window.location.href = linkArray.join('');
}

// https://mail.google.com/mail/u/0/?fs=1&to=email@domain.example&tf=cm -->