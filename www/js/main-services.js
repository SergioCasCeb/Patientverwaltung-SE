"strict"

URLS = 'http://localhost:3000/services';
const subSer = document.querySelector('#submit-service');
subSer.addEventListener('click', () => {

    var serviceName = $('.input-service-name').val();
    var pricePrivate = $('.price-private').val();
    var pricePV = $('.price-pv').val();

    if (serviceName == '' || pricePrivate == '' || pricePV == '') {
        alert("Please fill all the necesary fields");
    } else {

        $('body').addClass("active");
        $('.confirm-text-ser').removeClass("hidden");

        $('.ser-confim-content').append(`
            <h3 class="mb-5">Confirm Service Information</h3>
            <p><span>Service Name:</span> ${serviceName}</p>
            <p><span>Private Insurance Price:</span> ${pricePrivate}</p>
            <p><span>PV Insurance Price:</span> ${pricePV}</p>
            <div class="row pt-3">
                <div class="col-md-6">
                    <button type="submit" class="btn btn-primary btn-lg btn-block mb-3" id="confirm-service">Confirm</button>
                </div>
                <div class="col-md-6">
                    <button type="button" class="btn btn-danger btn-lg btn-block mb-3" id="cancel-confirm-ser">Close</button>
                </div>
            </div>
        `);

        

        $(document).ready(mainServices);

        function mainServices(){
        $('#confirm-service').click(sendDataService);      
        }
        

        $('#cancel-confirm-ser').on("click", function(){
            $('body').removeClass("active");
            $('.confirm-text-ser').addClass("hidden");
            $('.ser-confim-content').empty();
            
        });

    }

});




function sendDataService(){
    var amountTr = document.querySelectorAll('.body-service-table tr');
    var lastTr = amountTr[amountTr.length - 1];
    var lastId = parseInt($(lastTr).children('td:first').text(), 10);
    lastId++;
    console.log(lastId);
    var serviceName = $('.input-service-name').val();
    var pricePrivate = $('.price-private').val();
    var pricePV = $('.price-pv').val();




    var dataService = {
            idSer: lastId,
            name: serviceName,
            privatePrice: pricePrivate,
            pvPrice: pricePV
    }

    $.post(URLS, dataService, (res, status) =>{
            alert(`Status: ${status}, Message: ${res.msg}\n`);
    });

    $('body').removeClass("active");
    $('.confirm-text-ser').addClass("hidden");

    $('.input-service-name').val('');
    $('.price-private').val('');
    $('.price-pv').val('');

    setTimeout(function(){
        window.location.reload();

    }, 500); 

}
