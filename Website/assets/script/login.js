let users = [
    {
        username: "ibni",
        password: "12345"
    },
    {
        username: "fariz",
        password: "12345"
    },
    {
        username: "salam",
        password: "12345"
    }
];

const formLogin = document.querySelector('form');


formLogin.addEventListener('submit', function(e){
    const username = document.querySelector('#exampleInputEmail1').value;
    const password = document.querySelector('#exampleInputPassword1').value;
    const invalid = document.querySelector('.invalid');
            
    for (let i=0; i < users.length; i++) {
        if(username == users[i].username && password == users[i].password){
               window.location.href = "./monitor.html";
               e.stopPropagation();
        }
        else{
            invalid.style.visibility = 'visible';
        }
    }
    e.preventDefault();
});