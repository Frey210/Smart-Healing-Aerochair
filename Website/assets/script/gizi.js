// const next1 = document.querySelector('#next1');
// let tinggi;
// let berat;
// let gender;
// let usia;
// let bmi;

// next1.addEventListener('click', function(e){
//     tinggi = document.querySelector('#tinggi').value;
//     berat = document.querySelector('#berat').value;
//     usia = document.querySelector('#usia').value;
//     gender = document.querySelectorAll('input[name="gender"]')


//     if(tinggi == '' || berat == ''){
//         alert('Tolong Isi Kolom Di bawah');
//     }
//     else{
        
//         tinggi = parseFloat(tinggi);
//         berat = parseFloat(berat);
//         usia = parseFloat(usia);
//         let selectedGender;
//             for (const sex of gender) {
//                 if (sex.checked) {
//                     selectedGender = sex.value;
//                     break;
//                 }
//             }
    
//         document.querySelector('#quest1').style.display = 'none';
//         document.querySelector('#quest2').style.display = 'block';

//     }
//     e.stopPropagation();
//     e.preventDefault();
// });

const next1 = document.querySelector('#next1');
const next2 = document.querySelector('#next2');
const next3 = document.querySelector('#next3');
const next4 = document.querySelector('#next4');
const next5 = document.querySelector('#next5');
const next6 = document.querySelector('#next6');
const rekGizi = document.querySelector('#rekGizi');

next1.addEventListener('click', function(e){
    document.querySelector('#quest1').style.display = 'none';
    document.querySelector('#quest2').style.display = 'block';
    
    e.preventDefault();
});
next2.addEventListener('click', function(e){
    document.querySelector('#quest2').style.display = 'none';
    document.querySelector('#quest3').style.display = 'block';
    
    e.preventDefault();
});
next3.addEventListener('click', function(e){
    document.querySelector('#quest3').style.display = 'none';
    document.querySelector('#quest4').style.display = 'block';
    
    e.preventDefault();
});
next4.addEventListener('click', function(e){
    document.querySelector('#quest4').style.display = 'none';
    document.querySelector('#quest5').style.display = 'block';
    
    e.preventDefault();
});
next5.addEventListener('click', function(e){
    document.querySelector('#quest5').style.display = 'none';
    document.querySelector('#quest6').style.display = 'block';
    
    e.preventDefault();
});
next6.addEventListener('click', function(e){
    document.querySelector('#quest6').style.display = 'none';
    document.querySelector('#rekGizi').style.display = 'block';
    
    e.preventDefault();
});
