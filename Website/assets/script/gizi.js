const next1 = document.querySelector('#next1');
const next2 = document.querySelector('#next2');
const next3 = document.querySelector('#next3');
const next4 = document.querySelector('#next4');
const next5 = document.querySelector('#next5');
const next6 = document.querySelector('#next6');
const rekGizi = document.querySelector('#rekGizi');
let tinggi,
    berat,
    male,
    female,
    usia,
    bmr,
    aktif1,
    aktif2,
    aktif3,
    aktif4,
    aktif5,
    tdee,
    kategoriBmi,
    katBmi,
    rekBmi,
    rekKalori,
    bmi;


const genMale = document.querySelector('#genMale');
const genFemale = document.querySelector('#genFemale');
genMale.addEventListener('click', function(){
    genMale.classList.add('genActive');
    genFemale.classList.remove('genActive');
});
genFemale.addEventListener('click', function(){
    genMale.classList.remove('genActive');
    genFemale.classList.add('genActive');
});

const formCheck21 = document.querySelector('#quest2 .form-check:nth-child(1)');
const formCheck22 = document.querySelector('#quest2 .form-check:nth-child(2)');
const formCheck23 = document.querySelector('#quest2 .form-check:nth-child(3)');
const formCheck24 = document.querySelector('#quest2 .form-check:nth-child(4)');
const formCheck25 = document.querySelector('#quest2 .form-check:nth-child(5)');

formCheck21.addEventListener('click', ()=>{
    formCheck21.classList.add('formCheckActive');
    formCheck22.classList.remove('formCheckActive');
    formCheck23.classList.remove('formCheckActive');
    formCheck24.classList.remove('formCheckActive');
    formCheck25.classList.remove('formCheckActive');
});
formCheck22.addEventListener('click', ()=>{
    formCheck22.classList.add('formCheckActive');
    formCheck21.classList.remove('formCheckActive');
    formCheck23.classList.remove('formCheckActive');
    formCheck24.classList.remove('formCheckActive');
    formCheck25.classList.remove('formCheckActive');
});
formCheck23.addEventListener('click', ()=>{
    formCheck23.classList.add('formCheckActive');
    formCheck22.classList.remove('formCheckActive');
    formCheck21.classList.remove('formCheckActive');
    formCheck24.classList.remove('formCheckActive');
    formCheck25.classList.remove('formCheckActive');
});
formCheck24.addEventListener('click', ()=>{
    formCheck24.classList.add('formCheckActive');
    formCheck22.classList.remove('formCheckActive');
    formCheck23.classList.remove('formCheckActive');
    formCheck21.classList.remove('formCheckActive');
    formCheck25.classList.remove('formCheckActive');
});
formCheck25.addEventListener('click', ()=>{
    formCheck25.classList.add('formCheckActive');
    formCheck22.classList.remove('formCheckActive');
    formCheck23.classList.remove('formCheckActive');
    formCheck24.classList.remove('formCheckActive');
    formCheck21.classList.remove('formCheckActive');
});

const formCheck31 = document.querySelector('#quest3 .form-check:nth-child(1)');
const formCheck32 = document.querySelector('#quest3 .form-check:nth-child(2)');
formCheck31.addEventListener('click', ()=>{
    formCheck31.classList.add('formCheckActive');
    formCheck32.classList.remove('formCheckActive');
});
formCheck32.addEventListener('click', ()=>{
    formCheck32.classList.add('formCheckActive');
    formCheck31.classList.remove('formCheckActive');
});

const formCheck41 = document.querySelector('#quest4 .form-check:nth-child(1)');
const formCheck42 = document.querySelector('#quest4 .form-check:nth-child(2)');
formCheck41.addEventListener('click', ()=>{
    formCheck41.classList.add('formCheckActive');
    formCheck42.classList.remove('formCheckActive');
});
formCheck42.addEventListener('click', ()=>{
    formCheck42.classList.add('formCheckActive');
    formCheck41.classList.remove('formCheckActive');
});

const formCheck51 = document.querySelector('#quest5 .form-check:nth-child(1)');
const formCheck52 = document.querySelector('#quest5 .form-check:nth-child(2)');
formCheck51.addEventListener('click', ()=>{
    formCheck51.classList.add('formCheckActive');
    formCheck52.classList.remove('formCheckActive');
});
formCheck52.addEventListener('click', ()=>{
    formCheck52.classList.add('formCheckActive');
    formCheck51.classList.remove('formCheckActive');
});

const formCheck61 = document.querySelector('#quest6 .form-check:nth-child(1)');
const formCheck62 = document.querySelector('#quest6 .form-check:nth-child(2)');
formCheck61.addEventListener('click', ()=>{
    formCheck61.classList.add('formCheckActive');
    formCheck62.classList.remove('formCheckActive');
});
formCheck62.addEventListener('click', ()=>{
    formCheck62.classList.add('formCheckActive');
    formCheck61.classList.remove('formCheckActive');
});


next1.addEventListener('click', function(e){
    tinggi = document.querySelector('#tinggi').value;
    berat = document.querySelector('#berat').value;
    usia = document.querySelector('#usia').value;
    male = document.querySelector('#male').checked;
    female = document.querySelector('#female').checked;

    
    tinggi = parseFloat(tinggi);
    berat = parseFloat(berat);
    usia = parseFloat(usia);

    bmi = berat/(tinggi/100)**2 ;
    bmi = parseFloat(bmi.toFixed(1));

    if(bmi < 18.5){
        kategoriBmi = "Kurang Berat Badan";
    }
    else if(bmi >= 18.5 && bmi <= 22.9){
        kategoriBmi = "Normal";
    }
    else if(bmi >= 23 && bmi <= 24.9){
        kategoriBmi = "Kelebihan Berat Badan";
    }
    else if(bmi >= 25 && bmi <= 29.9){
        kategoriBmi = "Obesitas Tingkat 1";
    }
    else if(bmi > 30){
        kategoriBmi = "Obesitas Tingkat 2";
    }

    

    if(male == true){
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) + 5;
    }
    else{
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) - 161;
    }

    // bmr = (bmr.toFixed())/1000;

    document.querySelector('#quest1').style.display = 'none';
    document.querySelector('#quest2').style.display = 'block';
    
    e.stopPropagation();
    e.preventDefault();
    
    console.log(`BMI : ${bmi}`);
});

next2.addEventListener('click', function(e){
    aktif1 = document.querySelector('#aktif1').checked;
    aktif2 = document.querySelector('#aktif2').checked;
    aktif3 = document.querySelector('#aktif3').checked;
    aktif4 = document.querySelector('#aktif4').checked;
    aktif5 = document.querySelector('#aktif5').checked;

    if(aktif1 == true){
        tdee = bmr * 1.2;
    }
    else if(aktif2 == true){
        tdee = bmr * 1.375;
    }
    else if(aktif3 == true){
        tdee = bmr * 1.55;
    }
    else if(aktif4 == true){
        tdee = bmr * 1.725;
    }
    else if(aktif5 == true){
        tdee = bmr * 1.9;
    }

    document.querySelector('#quest2').style.display = 'none';
    document.querySelector('#quest3').style.display = 'block';
        
    e.preventDefault();
    console.log(`Kebutuhan Kalori : ${tdee} kkal`);
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
    rekBmi = document.querySelector('#rekBmi');
    katBmi = document.querySelector('#kategoriBmi');
    rekKalori = document.querySelector('#rekKalori');

    rekBmi.textContent = bmi;
    katBmi.textContent = kategoriBmi;
    rekKalori.textContent = (tdee.toFixed())/1000;


    document.querySelector('#quest6').style.display = 'none';
    document.querySelector('#rekGizi').style.display = 'block';
    
    e.preventDefault();
});



// const next1 = document.querySelector('#next1');
// const next2 = document.querySelector('#next2');
// const next3 = document.querySelector('#next3');
// const next4 = document.querySelector('#next4');
// const next5 = document.querySelector('#next5');
// const next6 = document.querySelector('#next6');
// const rekGizi = document.querySelector('#rekGizi');

// next1.addEventListener('click', function(e){
//     document.querySelector('#quest1').style.display = 'none';
//     document.querySelector('#quest2').style.display = 'block';
    
//     e.preventDefault();
// });
// next2.addEventListener('click', function(e){
//     document.querySelector('#quest2').style.display = 'none';
//     document.querySelector('#quest3').style.display = 'block';
    
//     e.preventDefault();
// });
// next3.addEventListener('click', function(e){
//     document.querySelector('#quest3').style.display = 'none';
//     document.querySelector('#quest4').style.display = 'block';
    
//     e.preventDefault();
// });
// next4.addEventListener('click', function(e){
//     document.querySelector('#quest4').style.display = 'none';
//     document.querySelector('#quest5').style.display = 'block';
    
//     e.preventDefault();
// });
// next5.addEventListener('click', function(e){
//     document.querySelector('#quest5').style.display = 'none';
//     document.querySelector('#quest6').style.display = 'block';
    
//     e.preventDefault();
// });
// next6.addEventListener('click', function(e){
//     document.querySelector('#quest6').style.display = 'none';
//     document.querySelector('#rekGizi').style.display = 'block';
    
//     e.preventDefault();
// });
