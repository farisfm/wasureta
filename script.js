let soal=[];
let quiz=[];

let index=0;
let score=0;

async function load(){

const res=await fetch("kata_kerja.json");

soal=await res.json();

quiz=[...soal]
.sort(()=>Math.random()-0.5)
.slice(0,5);

show();

}

function show(){

document.getElementById("result").innerHTML="";

document.getElementById("next").style.display="none";

document.getElementById("answer").value="";

document.getElementById("progress").innerHTML=
`Soal ${index+1} / ${quiz.length}`;

document.getElementById("meaning").innerHTML=
quiz[index]["Meaning (EN)"];

}

function normalize(text){

return text
.trim()
.replace(/\s+/g," ")
.toLowerCase();

}

document.getElementById("submit").onclick=function(){

const user=normalize(
document.getElementById("answer").value
);

const kanji=normalize(quiz[index]["Kanji"]);

const kana=normalize(quiz[index]["Kana"]);

let benar=user===kanji||user===kana;

if(benar){

score++;

document.getElementById("result").innerHTML=`

<h2 class="correct">✅ Benar</h2>

<p>
<b>Kanji</b><br>

${quiz[index]["Kanji"]}

(${quiz[index]["penjelas kanji"]})
</p>

<p>

<b>Kana</b><br>

${quiz[index]["Kana"]}

(${quiz[index]["penjelas kana"]})

</p>

`;

}else{

document.getElementById("result").innerHTML=`

<h2 class="wrong">❌ Salah</h2>

<p>

<b>Kanji</b><br>

${quiz[index]["Kanji"]}

(${quiz[index]["penjelas kanji"]})

</p>

<p>

<b>Kana</b><br>

${quiz[index]["Kana"]}

(${quiz[index]["penjelas kana"]})

</p>

`;

}

document.getElementById("next").style.display="inline-block";

}

document.getElementById("next").onclick=function(){

index++;

if(index>=quiz.length){

document.querySelector(".card").innerHTML=`

<h2>Selesai</h2>

<h1>${score} / ${quiz.length}</h1>

<button onclick="location.reload()">

Latihan Lagi

</button>

`;

return;

}

show();

}

load();
