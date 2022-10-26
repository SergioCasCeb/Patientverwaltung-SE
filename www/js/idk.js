const loadPat = document.querySelector('.load-patients');
const patContainer = document.querySelector('#new-patient-container');


loadPat.addEventListener('click', loadPatients);



function loadPatients(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);

    xhr.onload = function(){
        if(this.status == 200){
            var patients = JSON.parse(this.responseText);
            console.log(patients);

            

            for(var i in patients){
                console.log(patients[i].id);
                console.log(patients[i].fname);
                console.log(patients[i].lname);
                console.log(patients[i].gender);
                console.log(patients[i].bdate);
                console.log(patients[i].address);
                console.log(patients[i].insurance);

                $('.body-table').append(`
                <tr>
                    <td class="align-baseline">${patients[i].id}</td>
                    <td>${patients[i].fname}</td>
                    <td>${patients[i].lname}</td>
                    <td>${patients[i].gender}</td>
                    <td>${patients[i].bdate}</td>
                    <td>${patients[i].address}</td>
                    <td>${patients[i].insurance}</td>
                    <td><a href="#">View Profile</a></td>
                </tr>
                `);
            }
        }
    }

    xhr.send();
}
