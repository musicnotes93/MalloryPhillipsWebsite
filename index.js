const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
    if (!hCaptcha) {
        e.preventDefault();
        alert("Please fill out captcha field");
        return;
    }
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "<span>Thank you for your message!<span>";
            } else {
                console.log(response);
                result.innerHTML = "<span>There was a problem with your submission.<span>";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "<span>Something went wrong!<span>";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 8000);
        });
});

