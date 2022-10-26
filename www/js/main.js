const addPat = document.querySelector('.add-patient');
const closePat = document.querySelector('#close-patient');
const addSer = document.querySelector('.add-service');
const closeSer = document.querySelector('#close-service');
const showPat = document.querySelector('.show-patients');
const showSer = document.querySelector('.show-services');




//Variables for the table load
const loadPat = document.querySelector('.load-patients');
const patContainer = document.querySelector('#new-patient-container');


window.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    loadAmountSer(); //asegurar que funcione cuando se anada un nuevo servicio
});


function showPatients() {
    $('.service-table').addClass("hidden");
    $('.patient-table').removeClass("hidden");
    loadPatients();
}

function showServices() {
    $('.patient-table').addClass("hidden");
    $('.service-table').removeClass("hidden");
    loadServices();
}


addPat.addEventListener("click", () => {
    $('.add-patient-form').removeClass("hidden");
    $('.add-service-form').addClass("hidden");

});

addSer.addEventListener("click", () => {
    $('.add-service-form').removeClass("hidden");
    $('.add-patient-form').addClass("hidden");

});

closePat.addEventListener("click", () => {
    $('.add-patient-form').addClass("hidden");
    $('.pat-fname').val('');
    $('.pat-lname').val('');
    $('.pat-gender').val('');
    $('.pat-date').val('');
    $('.pat-insurance').val('');
    $('.pat-service').val('');
    $('.pat-address').val('');
    $('.pat-mail').val('');
});

closeSer.addEventListener("click", () => {
    $('.add-service-form').addClass("hidden");
    $('.input-service-name').val('');
    $('.price-private').val('');
    $('.price-pv').val('');
});

//Show patient table with the btn
showPat.addEventListener('click', showPatients);

//Show service table with the btn
showSer.addEventListener('click', showServices);

//Function to load patients table
function loadPatients() {
    console.log("the patients have loaded");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);


    xhr.onload = function() {
        if (this.status == 200) {
            $(".body-patient-table tr").remove();
            //alert("The patient database has loaded successfully")
            var patients = JSON.parse(this.responseText);
            console.log(patients);

            for (var i in patients) {

                $('.body-patient-table').append(`
                <tr>
                    <td>${patients[i].id}</td>
                    <td>${patients[i].fname}</td>
                    <td>${patients[i].lname}</td>
                    <td>${patients[i].gender}</td>
                    <td>${patients[i].bdate}</td>
                    <td>${patients[i].address}</td>
                    <td>${patients[i].insurance}</td>
                    <td>${patients[i].service}</td>
                    <td><div><i class="fas fa-edit edit-pat-btn mr-3"></i> <i class="fas fa-trash-alt delete-pat-btn ml-3"></i></div></td>
                    <td><button type="button" class="btn btn-outline-secondary show-profile ${patients[i].fname+patients[i].id}">See Profile</button></td>
                </tr>
                `);
            }

        }

        const rows = document.querySelectorAll('tbody.body-patient-table tr');

        $('.search-patient').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            console.log(value);

            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent.toLowerCase().includes(value) ? row.style.display = 'table-row' : row.style.display = 'none';
            });

        });

    }
    xhr.send();
}

//Function load services table
function loadServices() {
    //console.log("the services have loaded");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'services.json', true);


    xhr.onload = function() {
        if (this.status == 200) {
            $(".body-service-table tr").remove();
            //alert("The services database has loaded successfully")
            var services = JSON.parse(this.responseText);
            console.log(services);

            for (var i in services) {

                $('.body-service-table').append(`
                <tr>
                    <td>${services[i].idSer}</td>
                    <td>${services[i].name}</td>
                    <td>${services[i].privatePrice}</td>
                    <td>${services[i].pvPrice}</td>
                </tr>
                `);
            }

        }

        const rows = document.querySelectorAll('tbody.body-service-table tr');

        $('.search-service').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            console.log(value);

            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent.toLowerCase().includes(value) ? row.style.display = 'table-row' : row.style.display = 'none';
            });

        });

    }
    xhr.send();
}


//Function load amount of services in the patients select
function loadAmountSer() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'services.json', true);
    xhr.onload = function() {
        if (this.status == 200) {
            $("select.pat-service").empty();
            var services = JSON.parse(this.responseText);
            
            $('select.pat-service').append(`
                <option value="">Service</option>
            `);

            for (var i in services) {

                $('select.pat-service').append(`
                <option value="${services[i].idSer}">${services[i].idSer}</option>
                `);
            }
        }
    }
    xhr.send();
}

function getService(serId, insuranceType) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'services.json', true);
    xhr.onload = function() {
        if (this.status == 200) {
            var services = JSON.parse(this.responseText);
            

            $('.profile-pat-content').append(`
            <p><span>Service: </span>${services[serId-1].name}</p>
            `);
            if(insuranceType == "private"){
                $('.profile-pat-content').append(`
                <p class="pb-3"><span>Price: </span>${services[serId-1].privatePrice}</p>
                `);
            }else{
                $('.profile-pat-content').append(`
                <p class="pb-3"><span>Price: </span>${services[serId-1].pvPrice}</p>
                `);
            }
            $('.profile-pat-content').append(`
            <button type="button" class="btn btn-danger btn-lg close-profile">Close</button>
            `);

        }
    }
    xhr.send();
}


//Function to show full profile

$("tbody.body-patient-table").on('click', '.show-profile', function() {
    
    var userId = parseInt($(this).parents('tr').find('td:eq(0)').text(), 10);
    console.log(userId);
    $(".container-profile-pat").removeClass("hidden");
   
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);
    xhr.onload = function() {
        if (this.status == 200) {
            $('.profile-pat-content').empty();
            
            var patients = JSON.parse(this.responseText);

            var patId = patients[userId-1].id;
            var patFName = patients[userId-1].fname;
            var patLName = patients[userId-1].lname;
            var patGender = patients[userId-1].gender;
            var patBDate = patients[userId-1].bdate;
            var patAddress = patients[userId-1].address;
            var patMail = patients[userId-1].mail;
            var patInsurance = patients[userId-1].insurance;
            var patService = patients[userId-1].service;


            $('.profile-pat-content').append(`
            <p class="pat-number">Patient Num.: ${patId}</p>
            <h2 class="text-center mb-5">${patFName} ${patLName}</h2>
            <p><span>Gender: </span>${patGender}</p>
            <p><span>Date of Birth: </span>${patBDate}</p>
            <p><span>Address: </span>${patAddress}</p>
            <p><span>Email: </span>${patMail}</p>
            <p><span>Insurance: </span>${patInsurance}</p>
            `);

            getService(patService);
        }   
    }
    xhr.send();


});

$(".profile-pat-content").on('click', '.close-profile', function() {
    
    $(".container-profile-pat").addClass("hidden");
    $(".profile-pat-content").empty();


});