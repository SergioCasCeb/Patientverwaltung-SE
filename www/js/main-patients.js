"strict"

URLP = 'http://localhost:3000/patients';
const subPat = document.querySelector('#submit-patient');
subPat.addEventListener('click', () => {

    var patFName = $('.pat-fname').val();
    var patLName = $('.pat-lname').val();
    var patGender = $('.pat-gender').val();
    var patDate = $('.pat-date').val();
    var patInsurance = $('.pat-insurance').val();
    var patService = $('.pat-service').val();
    var patAddress = $('.pat-address').val();
    var patMail = $('.pat-mail').val();

    
    if (patFName == '' || patLName == '' || patGender == '' || patDate == '' || patInsurance == '' || patService == '' || patAddress == '' || patMail == '') {
        alert('Please fill all the necessary fields');
    } else {
        $('body').addClass("active");
        $('.confirm-text-pat').removeClass("hidden");

        $('.pat-confim-content').append(`
            <h3 class="mb-5">Confirm Patient Information</h3>
            <p><span>First Name:</span> ${patFName}</p>
            <p><span>Last Name:</span> ${patLName}</p>
            <p><span>Gender:</span> ${patGender}</p>
            <p><span>Date of Birth:</span> ${patDate}</p>
            <p><span>Insurance:</span> ${patInsurance}</p>
            <p><span>Service:</span> ${patService}</p>
            <p><span>Address:</span> ${patAddress}</p>
            <p><span>Mail:</span> ${patMail}</p>
            <div class="row pt-3">
                <div class="col-md-6">
                    <button type="submit" class="btn btn-primary btn-lg btn-block mb-3" id="confirm-patient">Confirm</button>
                </div>
                <div class="col-md-6">
                    <button type="button" class="btn btn-danger btn-lg btn-block mb-3" id="cancel-confirm-pat">Close</button>
                </div>
            </div>
        `);

        $(document).ready(mainPatients);

        function mainPatients(){
            $('#confirm-patient').click(sendDataPatient);      
        }
        
        $('#cancel-confirm-pat').on("click", function(){
            $('body').removeClass("active");
            $('.confirm-text-pat').addClass("hidden");
            $('.pat-confim-content').empty();
        });
    }

});


function sendDataPatient(){
    var amountTr = document.querySelectorAll('.body-patient-table tr');
    var lastTr = amountTr[amountTr.length - 1];
    var lastId = parseInt($(lastTr).children('td:first').text(), 10);
    lastId++;
    console.log(lastId);
    var patFName = $('.pat-fname').val();
    var patLName = $('.pat-lname').val();
    var patGender = $('.pat-gender').val();
    var patDate = $('.pat-date').val();
    var patInsurance = $('.pat-insurance').val();
    var patService = $('.pat-service').val();
    var patAddress = $('.pat-address').val();
    var patMail = $('.pat-mail').val();

    var dataPatient = {
            id: lastId,
            fname: patFName,
            lname: patLName,
            gender: patGender,
            bdate: patDate,
            insurance: patInsurance,
            service: patService,
            address: patAddress,
            mail: patMail
    }

    $.post(URLP, dataPatient, (res, status) =>{
            alert(`Status: ${status}, Message: ${res.msg}\n`);
    });

    $('body').removeClass("active");
    $('.confirm-text-pat').addClass("hidden");

    $('.pat-fname').val('');
    $('.pat-lname').val('');
    $('.pat-gender').val('');
    $('.pat-date').val('');
    $('.pat-insurance').val('');
    $('.pat-service').val('');
    $('.pat-address').val('');
    $('.pat-mail').val('');

    setTimeout(function(){
        window.location.reload();

    }, 500); 

}
