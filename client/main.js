let baseUrl = 'http://localhost:3000'

$('document').ready(() => {
    checkToken();

    $('#btn-login').on('click', (e) => {
        e.preventDefault();
        login();
    })

    $('#btn-logout').on('click', (e) => {
        e.preventDefault();
        logout();
    })

    $('#btn-register').on('click', (e) => {
        e.preventDefault();
        $("#register-page").show();
        $("#login-page").hide();
    })

    $("#btn-close-register").on('click', (e) => {
        e.preventDefault();
        $("#register-page").hide();
        $("#login-page").show();
    })

    $("#btn-submit-register").on('click', (e) => {
        e.preventDefault();
        register()
    })
})

function checkToken () {
    if (localStorage.access_token) {
        fetchNews();
        changeBackground();
        generateQuote();
        setInterval(generateQuote, 4000)
        $('#navbar').show();
        $('#login-page').hide();
        $('#register-page').hide();
        $('#main-page').show();
    } else {
        $('#navbar').hide();
        $('#login-page').show();
        $('#register-page').hide();
        $('#main-page').hide();
    }
}

function login () {
    let email = $('#login-email').val();
    let password = $('#login-password').val();

    $.ajax({
        url: baseUrl+'/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token);
        checkToken();
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $('#login-email').val('');
        $('#login-password').val('');
    })
}

function logout () {
    localStorage.removeItem('access_token');
    checkToken();
}

function fetchNews () {
    $('#news-list').empty();
    $.ajax({
        url: baseUrl+'/news',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        response.forEach(news => {
            if (news.content) {
                $('#news-list').append(`
                <div class="card col-sm-12 shadow mb-2 bg-body rounded">
                    <div class="card-body">
                        <div class="row">
                            <div class="col d-flex align-items-center d-flex justify-content-center mx-3">
                                <img class="pt-4" src="${news.image_url}" alt="" style="width: 90%;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <small class="mt-2" style="font-size: 10px">Published: ${news.published}</small>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <h3 id="news-title" class="text-center mt-4 mx-4">${news.title}</h3>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col d-flex align-items-center d-flex justify-content-center mx-3">
                                <p id="news-content" class="mx-4" style="font-size: 14px;">${news.content}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col d-flex align-items-center d-flex justify-content-center mx-3">
                                <a href="${news.url}" target="_blank"><small> Read more... </small></a>
                            </div>
                        </div>
                    </div>
                </div>`);
            }
        })
    })
    .fail(err => {
        console.log(err);
    })

}

function changeBackground () {
    $.ajax({
        url: baseUrl+'/pictures',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        let countSlash = 0;
        let urlTemp = ''

        for (let i = 0; i < response.result.length; i++) {
            if (response.result[i] === '/') {
                urlTemp += response.result[i];
                countSlash++
                if (countSlash === 5) {
                    break;
                }
            } else {
                urlTemp += response.result[i];
            }
        }
        
        let newUrl = `${urlTemp}1000`

        $('#body-background').attr('style', `
        transition: background 1s;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${newUrl}') no-repeat fixed center ;
        background-size: cover;
        `)
    })
    .fail(err => {
        console.log(err);
    })
}

function generateQuote () {
    $.ajax({
        url: baseUrl+'/quotes',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        $("#quote").fadeOut().text(`${response}`).fadeIn();
    })
    .fail(err => {
        console.log(err);
    })

}

function register () {
    let email = $("#register-email").val();
    let password = $("#register-password").val();

    $.ajax({
        url: baseUrl+'/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done(response => {
        swal({
            title: "Register success!",
            icon: "success",
            button: "Okay",
        });
        $("#register-page").hide();
        $("#login-page").show();
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $("#register-email").val("");
        $("#register-password").val("");
    })
}