var atn1 = 500 //
var atn2 = 800 //
function emSignout(){
    $.post('/kelon-moonhub/index.php',{
        action: 'emSignout'
    },(data,status)=>{
        
        
        
    });
    window.location.href='/kelon-moonhub/auth.html';
}
function createJob(){
    let job_title = $('#cj-title').val();
    let company_name = $('#cj-company').val();
    let salary = $('#cj-salary').val();
    let type = $('#cj-type').val();
    let location = $('#cj-location').val();
    let requirements = $('#cj-requirements').val();
    let application_deadline = $('#cj-deadline').val();
    let date_posted = $('#cj-date-posted').val();

    $.post('/kelon-moonhub/index.php',{

        action: 'emCreateJob',
        job_title: job_title,
        company_name: company_name,
        salary: salary,
        type: type,
        location: location,
        requirements: requirements,
        application_deadline: application_deadline,
        date_posted: date_posted
    },(data,status)=>{
        console.log(status);
            console.log(data);
            alert("Job Creation Successful.");
            window.location.href='/kelon-moonhub/em_dashboard.html';
        });

}

function adDeleteJob(param){
    $.post('/kelon-moonhub/index.php',{
        action: 'adDeleteJob', job_id: param},(data,success)=>{
            console.log(data);
            alert("Job Deleted Successfully.");
            window.location.href='/kelon-moonhub/admin.html';
        });
    console.log(param);
}
function adEditJob(param){
    console.log(param);
}
$('#admin_body').ready(function(){

    let adminEmail = document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin='))
    ?.split('=')[1];
    console.log(adminEmail);
    // alert(adminEmail);
    $('#admin-email').text(adminEmail);

    

    $.post('/kelon-moonhub/index.php',{
        action: 'adminJobs',
        email: adminEmail
    },(data,status)=>{
        // console.log(data);
        let res = JSON.parse(data).message;
        // console.table(res);
        // console.log(res);
        var allJobs=``;
        for(let i=0; i<res.length; i++){
            // console.log(res.job_title);
            allJobs += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${res[i].job_id}</td>
                        <td>${res[i].job_title}</td>
                        <td>${res[i].salary}</td>
                        <td>${res[i].type}</td>
                        <td>${res[i].location}</td>
                        <td>${res[i].company_name}</td>
                        <td>${res[i].date_posted}</td>
                        <td>${res[i].recruiter_id}</td>
                        <td><a><i class="fa fa-edit" aria-hidden="true" onclick=adEditJob(${res[i].job_id})></i></a><a><i class="fa fa-trash" aria-hidden="true" onclick=adDeleteJob(${res[i].job_id})></i></a></td>
                    </tr>
            `;
        }
        console.log(allJobs);
        $('#job-table').append(allJobs);
        $('#job-table').addClass('overflow-scroll');
    });
    
});
//Admin Login ;/
function adminLogin(){
    let email = $('#email').val();
    
    console.log(email);
    let password = $('#password').val();

    $.post('/kelon-moonhub/index.php',{
        action: 'adminSignin',
        email: email,
        password: password
    },(data, status)=>{
        let res = JSON.parse(data).message;
        document.cookie="admin:"+res.email;
        // alert(document.cookie);
        window.location.href='/kelon-moonhub/admin.html';
        $('#admin-email').text(res.email);
        console.log($('#admin-email').text()); 
    });
    
}

// Delete Single Job Function
function deleteJob(job_id){
    let getCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('job_id:'))
    ?.split(':')[1];

    $.post('/kelon-moonhub/index.php',{
        action: 'emDeleteJob',
        job_id: getCookie
    },(data,status)=>{
        console.log(data);
        window.location.href='/kelon-moonhub/em_dashboard.html';
    });
}


// View Single Job Function
function viewSingleJob(job_id){
    $.post('/kelon-moonhub/index.php',{
        action:'viewSingleJob',
        job_id: job_id
    },(data,status)=>{
        let res = JSON.parse(data).message;
        $('#title').text(res.job_title);
        $('#company').text(res.company_name);
        $('#salary').text(res.salary);
        $('#type').text(res.type);
        $('#location').text(res.location);
        $('#requirements').text(res.requirements);
        $('#deadline').text(res.application_deadline);
        $('#date-posted').text(new Date(res.date_posted).toDateString);
        $('#delete-job-id').text(res.job_id);
    });
    document.cookie="job_id:"+job_id;
}



// Job HTML code
function renderEmJobs(jobs){

    
    var job = ``;
    for(let i=0; i<jobs.length; i++){
        job +=`
        <div
                    class="card text-dark bg-light mb-3 border-0 shadow"
                    style="max-width: 18rem; min-width: 14rem"
                  >
                    <div
                      class="card-header text-light bg-dark bg-opacity-50 fw-bold"
                    >
                        <span class="d-none" id="job-id">${jobs[i].job_id}</span>
                      <span class="text-warning text-opacity-75 fs-6">${jobs[i].company_name}</span>
                      <button
                        class="button float-end border-0 rounded-1 bg-opacity-75"
                        onclick="viewSingleJob(${jobs[i].job_id})"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        View
                      </button>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${jobs[i].job_title}</h5>
                      <p class="card-text">
                      ${jobs[i].requirements}
                      </p>
                    </div>
                  </div>
        `;
    }
    // console.log(job);
    $('#job-cards').append(job);
}


// Todo List
function deleteItem(param){
    $(param).addClass('text-decoration-line-through').delay(500).fadeOut(500);
}
function addItem(){
    $('#task-item').append($('#task-input').val());
}
// Authentication Functions
function renderSignin(){
    $('.auth-signin').removeClass('d-none');
    $('.auth-signup').hide(atn2);
    $('.auth-signin').show(atn2);
}

function renderSignup(){
    $('.auth-signin').hide(atn2);
    $('.auth-signup').show(atn2);
}

// Create Account
function createAccount(){
    // Fetch Cookie data for User Type
    let userType = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userType='))
    ?.split('=')[1];

    // Fetch User Input
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        let company_name = $('#company_name').val();
        let phone = $('#phone').val();
        let industry = $('#industry').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let city = $('#city').val();
        let state = $('#state').val();

    if (userType == 'Employer'){
        // Create Employer Account
        if(firstname!="" && lastname != "" && company_name != "" && phone != "" && industry != "" && email !="" && password !="" && city !="" && state !=""){
            // Parse Data with Ajax.
            $.post('/kelon-moonhub/index.php',{
                firstname: firstname,
                lastname: lastname,
                company_name: company_name,
                phone: phone,
                industry: industry,
                email: email,
                password: password,
                city: city,
                state: state,
                action: 'createEmployer'
            },(data,status)=>{
                let res = JSON.parse(data);
                if(res.message==true){
                    $('#auth_span').addClass('bg-success').text('Account Created Successfully.').delay(1000);
                    renderSignin();
                    $('input').val('');
                    // window.location.href('/kelon-moonhub/')
                }else{
                    $('#auth_span').text('Please try again.').addClass('bg-danger').slideDown(1000);
                }
                
            })
        }else{
            $('#auth_span').text('Complete all fields.');
        }
    }else{
        // Create Job Seeker Account
        console.log("Job seeker login");
    }
}

// Login User
function login(){
    // Fetch Cookie data for User Type
    let userType = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userType='))
    ?.split('=')[1];

    // fetch user email and password
    let email = $('#email').val();
    let password = $('#password').val();

    if(email !='' && password !=''){  
    // Ajax
    $.post('/kelon-moonhub/index.php',{
        email: email,
        password: password,
        action: "employerSignin"
    }, (data,status)=>{
        let res = JSON.parse(data);
    
        if(res.message.firstname.length>0){
            $('#auth_span').addClass('bg-success').text('Welcome back, '+res.message.firstname).delay(1000);
            setTimeout(()=>{
                window.location.href='/kelon-moonhub/em_dashboard.html';
            },1500);
        }else{
            $('#auth_span').addClass('bg-danger').text('Invalid Email or Password').delay(1000);
            $('input').val('');
        }
    });
}else{
    $('#auth_span').addClass('bg-danger').text("Please Enter Your Email and Password.").delay(1000);
}
}


$(document).ready(function () {
    
// alert();
    let userType = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userType='))
    ?.split('=')[1];

    // $('.userType').text(userType);
    

    // On Employer Dashboard Page load, fetch data from the session.
    $.post('/kelon-moonhub/index.php',{
        action: 'emProfile'
    },(data,status)=>{
        console.log(data);
        let res = JSON.parse(data).message;
        $('#em_dropdown').text(res.firstname);

    });

    // On Employer Dashboard Page load, fetch data from the session.
    $.post('/kelon-moonhub/index.php',{
        action: 'emJobs'
    },(data,status)=>{
        // console.log(data);
        let res = JSON.parse(data).message;
        console.log(res);
        // $('#em_dropdown').text(res.firstname);
        renderEmJobs(res);

        // ############# Append Jobs ########################
        
    });


    // Authentication form handling.
    // employerForm = false;
    
    






















});