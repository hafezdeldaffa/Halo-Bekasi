document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
                    elm.addEventListener('click', function (event) {

                        let sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute('href').substr(1);
                        loadPage(page);
                    })
                })
            }
        };
        xhttp.open('GET', 'nav.html', true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page === '') page = 'home';
    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 400) {
                    content.innerHTML = '<p>Halaman tidak ditemukan</p>'
                } else {
                    content.innerHTML = '<p>Halaman tidak dapat anda akses.</p>';
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});