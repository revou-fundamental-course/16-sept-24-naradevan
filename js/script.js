// Welcoming Speech Logic
window.onload = function() {
  let name = localStorage.getItem('userName'); // Retrieve the stored name

  if (!name) {
    name = prompt("Please enter your name:");
    if (name) {
      localStorage.setItem('userName', name); // Save the name in localStorage
    }
  }

  // Set the name in the "Hi, Name!" section
  if (name) {
    document.getElementById("name").textContent = name;
  }
};

// Form Validation Logic
document.getElementById('message-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name-input').value;
  let birthDateInput = document.getElementById('birthdate-input').value;
  const genderInput = document.querySelector('input[name="gender"]:checked').value;
  const messageInput = document.getElementById('message-input').value;

  // Get today's date
  const today = new Date();
  let birthDate = new Date(birthDateInput);

  // Calculate age based on the birth date input
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // If age is less than 18, auto-adjust the birthdate to 18 years ago
  if (age < 18) {
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    const formattedDate = eighteenYearsAgo.toISOString().split('T')[0];
    document.getElementById('birthdate-input').value = formattedDate;
    alert(`The minimum age is 18. We have adjusted the birth date to: ${formattedDate}`);
    return; // Prevent the form from submitting with the wrong age
  }

  // If age is more than 72, auto-adjust the birthdate to 72 years ago
  if (age > 72) {
    const seventyTwoYearsAgo = new Date(today.setFullYear(today.getFullYear() - 72));
    const formattedDate = seventyTwoYearsAgo.toISOString().split('T')[0];
    document.getElementById('birthdate-input').value = formattedDate;
    alert(`The maximum age is 72. We have adjusted the birth date to: ${formattedDate}`);
    return; // Prevent the form from submitting with the wrong age
  }

  // If all fields are valid, display the submission
  if (nameInput && birthDateInput && genderInput && messageInput) {
    // Create a new div to display this submission result
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('submission-result');
    
    // Create two rows: first row for name, birth date, and gender, second row for message
    resultDiv.innerHTML = `
      <div class="submission-row1">
        <p><strong>Name:</strong> ${nameInput}</p>
        <p><strong>Birth Date:</strong> ${birthDateInput}</p>
        <p><strong>Gender:</strong> ${genderInput}</p>
      </div>
      <div class="submission-row2">
        <p><strong>Message:</strong> "${messageInput}"</p>
      </div>
      <hr>
    `;

    // Append the new result to the form-result div
    document.getElementById('form-result').appendChild(resultDiv);

    // Clear the form for new input
    document.getElementById('message-form').reset();

    // Save the name again in case it was changed in the form
    localStorage.setItem('userName', nameInput);
  } else {
    alert('Please fill out all fields.');
  }
});

// slidshow dimulai dari gambar 1
var slideIndex = 1;
showDivs(slideIndex);

// function plusDivs(n) digunakan untuk mengubah slideIndex dan menampilkan gambar berikutnya atau sebelumnya
function plusDivs(n){
    showDivs(slideIndex += n);
}

function showDivs(n){
    var i;
    var imgList = document.getElementsByClassName("img-slideshow");
    // Kondisi if dan else if digunakan untuk memastikan bahwa ketika slideIndex melampaui jumlah gambar, slideshow akan kembali ke gambar pertama. 
    // Sebaliknya, jika slideIndex lebih kecil dari 1, slideshow akan berpindah ke gambar terakhir.
    if (n > imgList.length) {slideIndex = 1}
    else if(n < 1) {slideIndex =imgList.length};

    // for digunakan untuk menyembunyikan semua gambar dengan mengatur style.display menjadi "none".
    for(i = 0; i < imgList.length; i++){
        imgList[i].style.display= "none";
    }
    // setelah semua gambar disembunyikan, gambar yang sesuai dengan slideIndex ditampilkan dengan mengubah properti display menjadi "block".
    imgList[slideIndex -1].style.display = "block";
}

// set waktu auto run
setInterval(() => {
    plusDivs(1);
}, 2000)

