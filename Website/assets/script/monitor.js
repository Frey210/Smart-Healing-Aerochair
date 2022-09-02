const firebaseConfig = {
  apiKey: "AIzaSyBKQRGLheH8vX70btyhm_Mn5HEUeCd2prk",
  authDomain: "aerochair-26ee4.firebaseapp.com",
  databaseURL: "https://aerochair-26ee4-default-rtdb.firebaseio.com",
  projectId: "aerochair-26ee4",
  storageBucket: "aerochair-26ee4.appspot.com",
  messagingSenderId: "1050850637693",
  appId: "1:1050850637693:web:a87ae93e3c96e169e3be14",
  measurementId: "G-RK9N6KDPLB"
};
firebase.initializeApp(firebaseConfig);

let BPM;
let fatigueState;

const data1 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Beat Per Minute (BPM)',
            data: [],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',    
            borderWidth: 1
        }]
};

const config1 = {
  type: 'line',
  data: data1,
  options: {
    scales: {
      x:{
        type: 'realtime',
        realtime: {
          delay: 100,
          onRefresh: chart => {
            chart.data.datasets.forEach(dataset => {
              dataset.data.push({
                x: Date.now(),
                y: BPM
              });
            });
          }
        }
      },
      y: {
          min: 0,
          max: 200,
        }
      }
    }
};
const data2 = {
  labels: ['Normal', 'Ngantuk', 'Tidur'],
        datasets: [{
            label: 'Kelelahan Kerja',
            data: [],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',    
            borderWidth: 1
        }]
};

const config2 = {
  type: 'line',
  data: data2,
  options: {
    scales: {
      x:{
        type: 'realtime',
        realtime: {
          delay: 500,
          onRefresh: chart => {
            chart.data.datasets.forEach(dataset => {
              dataset.data.push({ 
                x: Date.now(),
                y: fatigueState
              });
            });
          }
        }
      },
      y: {
        type: 'category',
        labels: ['Tidur', 'Ngantuk', 'Normal']
        // min: 1,
        // max: 3,
        // ticks:{
        //   callback: function(value, index){
        //       if(this.getLabelForValue(index) == 1){
        //         return 'Normal'
        //       }
        //       if(this.getLabelForValue(index) == 2){
        //         return 'Ngantuk'
        //       }
        //       if(this.getLabelForValue(index) == 3){
        //         return 'Tidur'
        //       }
        //     }
        //   }
        }
      }
    }
};

let db = firebase.database();
db.ref('ESP32/BPM').on('value', (snapshoot) => {
  BPM = snapshoot.val();
});

db.ref('Raspberry pi 4/state').on('value', (snapshoot) => {
  fatigueState = snapshoot.val();
});

const heartChart = new Chart(
  document.getElementById('heartChart'),
  config1
);


const fatigueChart = new Chart(
  document.getElementById('fatigueChart'),
  config2
);

const tombolGizi = document.querySelector('.tombolGizi');


tombolGizi.addEventListener('click', ()=>{
  window.location.href = "./gizi.html";
});

