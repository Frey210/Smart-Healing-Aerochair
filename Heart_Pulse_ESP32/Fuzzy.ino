void Fuzzy_HaerRate(){
  // untuk BPM Rendah
  if (BPMval <= 40)
  { BPM [0] = 1;}
  else if (BPMval > 40 && BPMval <= 60)
  {  BPM [0] = (60 - BPMval)/(60 - 40); }
  else
  { BPM [0] = 0;}

  // untuk BPM Sedang
  if (BPMval <= 40)
  { BPM [1] = 0;}
  else if (BPMval > 40 && BPMval <= 60)
  { BPM [1] = (BPMval-40)/(60-40);}
  else if (BPMval > 60 && BPMval <= 100)
  { BPM [1] = (100-BPMval)/(100 - 60);}
  else
 { BPM [1] = 0;}

  // untuk BPM Tinggi
  if (BPMval <= 60)
  { BPM [2] = 0;}
  else if (BPMval > 60 && BPMval <= 100)
  { BPM [2] = (BPMval-60)/(100-60);}
  else
  { BPM [2] = 1;}
}
