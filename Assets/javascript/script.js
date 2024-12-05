const courseTitleInput=document.querySelector(".course-Title-Input");
const courseCapacityInput=document.querySelector(".course-Capacity-Input");
const coursePriceInput=document.querySelector(".course-Price-Input");
const courseTagInput=document.querySelector(".course-Tag-Input");
const courseDescriptionInput=document.querySelector(".course-Description-Input");
const addBtn=document.querySelector(".add-btn");
const cardsContainer=document.querySelector(".cards-row");
const deleteAllBtn=document.querySelector(".delete-all-btn")
let enableImage=false;
let courses=[];
let localStorageInfoLoad=()=>{
    if(JSON.parse(localStorage.getItem("courses")) != null){
        courses=JSON.parse(localStorage.getItem("courses"));
    }
    
}



addBtn.addEventListener("click",function(){
    //! here i should do the validation 


    //! here i should do the validation
    let course={
        title:courseTitleInput.value,
        capacity:courseCapacityInput.value,
        price:coursePriceInput.value,
        tag:courseTagInput.value,
        description:courseDescriptionInput.value
    }
    console.log(course);

    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    loadCourses();
    courseTitleInput.value="";
    courseCapacityInput.value="";
    coursePriceInput.value="";
    courseTagInput.value="";
    courseDescriptionInput.value="";

    Swal.fire({
        title: "Course Adedd",
        text: "",
        icon: "success"
      });



});


 function loadCourses(){
    if(courses.length==0){
    cardsContainer.innerHTML=`No Courses Added Yet (You Can Add From The Plus Button)`;
    }
    else{
    cardsContainer.innerHTML=courses.map((item,i)=>{
    return `
    <div class="col-lg-4 col-md-6 col-sm-12 card-cont">
          <div class="card " >
            <img src="./Assets/public/cover.png" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title fa-2x">${item.title}</h5>
              <p class="card-text ">${item.description}</p>
              <div class="tags mb-2"><span class="badge text-bg-dark">${item.tag}</span></div>
              <div class="cap-price">
              <div class="course-price mb-2 fw-semibold ">${item.price} <span class="text-success">$</span></div>
              <div class="course-capacity mb-2 text-secondary">${item.capacity} <i class="fa-solid fa-user"></i></div>
            </div>
              
              <a href="#" class="btn btn-primary">Edit</a>
              <a href="#" class="btn btn-danger"onclick="deleteBtn(${i})">Delete</a>
            </div>
          </div>
        </div>
    `
}).join("");
    }
};

function deleteBtn(i){
    courses.splice(i,1);
    localStorage.setItem("courses",JSON.stringify(courses));
    loadCourses();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Course Deleted"
      });
}
deleteAllBtn.onclick=async ()=>{
    if(courses.length==0){
        Swal.fire({
            title: "There Is No Courses To Delete",
            text: "",
            icon: "warning"
          });
    }else{
    let answer=await Swal.fire({
        title: "Are You Sure To Delete All Courses?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
        showCancelButton: true,
        showCloseButton: true
      });
      if(answer.isConfirmed){
    courses=[];
    localStorage.removeItem("courses");
    loadCourses();
    Swal.fire({
        title: "All Courses Has Been Deleted",
        text: "",
        icon: "success"
      });
    }
}
}

localStorageInfoLoad();
console.log(courses)
loadCourses();