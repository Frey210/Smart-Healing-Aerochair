/*void Defuzzy(){
  FuzzyInput *distance = new FuzzyInput(1); //input fuzzy (pertama)
  FuzzySet *small = new FuzzySet(0, 20, 20, 40); //nilai FuzzySet input 1
  distance-&amp;gt;addFuzzySet(small); //memasukkan nilai small
  FuzzySet *safe = new FuzzySet(30, 50, 50, 70); //nilai FuzzySet input 2
  distance-&amp;gt;addFuzzySet(safe); //memasukkan nilai safe
  FuzzySet *big = new FuzzySet(60, 80, 80, 80); //nilai FuzzySet input 3
  distance-&amp;gt;addFuzzySet(big); //memasukkan nilai big
  fuzzy-&amp;gt;addFuzzyInput(distance); //memasukkan Fuzzy input ke Fuzzy


  FuzzyOutput *speed = new FuzzyOutput(1); //output fuzzy (pertama)
  FuzzySet *slow = new FuzzySet(0, 10, 10, 20); //nilai FuzzySet output 1
  speed-&amp;gt;addFuzzySet(slow); //memasukkan nilai slow
  FuzzySet *average = new FuzzySet(10, 20, 30, 40); //nilai FuzzySet output 2
  speed-&amp;gt;addFuzzySet(average); //memasukkan nilai average
  FuzzySet *fast = new FuzzySet(30, 40, 40, 50);  //nilai FuzzySet output 3
  speed-&amp;gt;addFuzzySet(fast); //memasukkan nilai fast
  fuzzy-&amp;gt;addFuzzyOutput(speed);  //memasukkan Fuzzy output ke Fuzzy

  // membuat FuzzyRule "JIKA distance = small MAKA speed = slow"
  FuzzyRuleAntecedent *ifDistanceSmall = new FuzzyRuleAntecedent();
  ifDistanceSmall-&amp;gt;joinSingle(small);
  FuzzyRuleConsequent *thenSpeedSlow = new FuzzyRuleConsequent();
  thenSpeedSlow-&amp;gt;addOutput(slow);
  FuzzyRule *fuzzyRule01 = new FuzzyRule(1, ifDistanceSmall, thenSpeedSlow);
  fuzzy-&amp;gt;addFuzzyRule(fuzzyRule01);

  // membuat FuzzyRule "JIKA distance = safe MAKA speed = average"
  FuzzyRuleAntecedent *ifDistanceSafe = new FuzzyRuleAntecedent();
  ifDistanceSafe-&amp;gt;joinSingle(safe);
  FuzzyRuleConsequent *thenSpeedAverage = new FuzzyRuleConsequent();
  thenSpeedAverage-&amp;gt;addOutput(average);
  FuzzyRule *fuzzyRule02 = new FuzzyRule(2, ifDistanceSafe, thenSpeedAverage);
  fuzzy-&amp;gt;addFuzzyRule(fuzzyRule02);

  // membuat FuzzyRule "JIKA distance = big MAKA speed = high"
  FuzzyRuleAntecedent *ifDistanceBig = new FuzzyRuleAntecedent();
  ifDistanceBig-&amp;gt;joinSingle(big);
  FuzzyRuleConsequent *thenSpeedFast = new FuzzyRuleConsequent();
  thenSpeedFast-&amp;gt;addOutput(fast);
  FuzzyRule *fuzzyRule03 = new FuzzyRule(3, ifDistanceBig, thenSpeedFast);
  fuzzy-&amp;gt;addFuzzyRule(fuzzyRule03);
}*/
