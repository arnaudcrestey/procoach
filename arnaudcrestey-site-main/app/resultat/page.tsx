"use client";

import { useEffect, useMemo, useState } from "react";
import { ProfileRadar } from "@/components/radar-chart";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import { computeResults } from "@/lib/quiz";

export default function ResultPage() {

const [answers,setAnswers] = useState<number[]>([]);
const [analysis,setAnalysis] = useState<string | null>(null);

const [firstName,setFirstName] = useState("");
const [email,setEmail] = useState("");

const [birthDay,setBirthDay] = useState("");
const [birthMonth,setBirthMonth] = useState("");
const [birthYear,setBirthYear] = useState("");
const [birthHour,setBirthHour] = useState("");
const [birthMinute,setBirthMinute] = useState("");
const [birthPlace,setBirthPlace] = useState("");

const [analysisRequested,setAnalysisRequested] = useState(false);
const [sending,setSending] = useState(false);
const [submitted,setSubmitted] = useState(false);

useEffect(()=>{

if(typeof window === "undefined") return;

const rawAnswers = localStorage.getItem("procoach_answers");

if(rawAnswers){
setAnswers(JSON.parse(rawAnswers));
}

},[]);

const result = useMemo(()=>{

if(!answers.length) return null;

return computeResults(answers);

},[answers]);

const alignmentScore = useMemo(()=>{

if(!result?.radar) return 0;

const values = result.radar.map((item:any)=>Number(item.score ?? 0));

if(!values.length) return 0;

const avg = values.reduce((a,b)=>a+b,0) / values.length;

const normalized = ((avg - 1) / 4) * 100;

return Math.round(normalized);

},[result]);

useEffect(()=>{

if(!result || !alignmentScore || analysisRequested) return;

setAnalysisRequested(true);

async function generateAnalysis(){

try{

const res = await fetch("/api/diagnostic",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
answers,
profile: result?.profile?.title ?? "",
score: alignmentScore
})
});

const data = await res.json();

if(data?.analysis){
setAnalysis(data.analysis);
}

}catch(error){

console.error("Erreur analyse :",error);

setAnalysis(
"Une erreur est survenue lors de la génération de l'analyse."
);

}

}

generateAnalysis();

},[result,alignmentScore,answers,analysisRequested]);

async function handleSubmit(e:React.FormEvent){

e.preventDefault();

if(sending) return;

setSending(true);

const data = {
firstName,
email,
birthDay,
birthMonth,
birthYear,
birthHour,
birthMinute,
birthPlace,
score: alignmentScore
};

try{

const res = await fetch("/api/lead-astrologie",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(data)
});

const result = await res.json();

if(result.success){
setSubmitted(true);
}else{
alert("Une erreur est survenue.");
}

}catch(error){

console.error("Erreur envoi :",error);
alert("Erreur serveur.");

}

setSending(false);

}

if(submitted){

return(

<main className="flex min-h-screen items-center justify-center px-6 text-center">

<div className="glass max-w-xl rounded-2xl p-10">

<h2 className="text-3xl font-semibold mb-4">
✓ Demande envoyée
</h2>

<p className="text-white/80">
Votre première lecture personnalisée vous sera envoyée prochainement.
</p>

</div>

</main>

);

}

return(

<main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">

<h1 className="text-4xl font-bold">
Voici votre diagnostic professionnel
</h1>

<p className="mt-2 text-white/75">
Analyse générée automatiquement à partir de vos réponses.
</p>

{result && (

<section className="mt-8 grid gap-6 md:grid-cols-2">

{result.profile && (
<ResultCard profile={result.profile} />
)}

{result.radar && (
<ProfileRadar data={result.radar} />
)}

</section>

)}

<section className="glass mt-8 rounded-2xl p-6 text-center">

<p className="text-lg text-white/80">
Score d’alignement professionnel actuel
</p>

<p className="mt-2 text-4xl font-bold text-neon">
{alignmentScore}%
</p>

<p className="mt-2 text-white/60 text-sm">
Score moyen des participants : 54 %
</p>

</section>

<section className="glass mt-8 rounded-2xl p-6">

<h3 className="text-xl font-semibold mb-3">
Analyse personnalisée
</h3>

{!analysis && (
<p className="text-white/60 italic">
Analyse en cours… 🔎
</p>
)}

{analysis && (
<p className="text-white/80 leading-relaxed">
{analysis}
</p>
)}

</section>

<section className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-10 text-center shadow-xl">

<h2 className="text-3xl font-semibold mb-4">
Comprendre réellement votre situation professionnelle
</h2>

<p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
Au <strong>Cabinet Astrae</strong>, l’étude du thème astral permet
d’explorer les dynamiques personnelles qui influencent
les choix de vie et les orientations professionnelles.
</p>

<p className="mt-6 text-lg text-white font-medium">
🎁 Recevez <span className="font-bold text-cyan-400">gratuitement</span> votre première lecture personnalisée
</p>

<form
onSubmit={handleSubmit}
className="mt-8 grid gap-4 w-full max-w-md mx-auto"
>

<input
type="text"
placeholder="Votre prénom"
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<input
type="email"
placeholder="Votre email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<p className="text-sm text-white/70 text-left">
Date de naissance
</p>

<div className="grid grid-cols-3 gap-3">

<input
type="text"
inputMode="numeric"
placeholder="Jour"
value={birthDay}
onChange={(e)=>setBirthDay(e.target.value)}
required
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
placeholder="Mois"
value={birthMonth}
onChange={(e)=>setBirthMonth(e.target.value)}
required
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
value={birthYear}
onChange={(e)=>setBirthYear(e.target.value)}
required
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
placeholder={typeof window !== "undefined" && window.innerWidth < 640 ? "An" : "Année"}
/>

</div>

<p className="text-sm text-white/70 text-left">
Heure de naissance
</p>

<div className="grid grid-cols-2 gap-3">

<input
type="text"
inputMode="numeric"
placeholder="Heure"
value={birthHour}
onChange={(e)=>setBirthHour(e.target.value)}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

<input
type="text"
inputMode="numeric"
placeholder="Minute"
value={birthMinute}
onChange={(e)=>setBirthMinute(e.target.value)}
className="rounded-xl bg-white px-4 py-3 text-black text-center outline-none"
/>

</div>

<input
type="text"
placeholder="Ville de naissance"
value={birthPlace}
onChange={(e)=>setBirthPlace(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<button
type="submit"
disabled={!analysis || sending}
className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-lg font-semibold text-white disabled:opacity-50"
>

{sending ? "Envoi..." : "Recevoir ma première analyse"}

</button>

</form>

</section>

<section className="mt-12 text-center">

<p className="text-white/70 mb-3">
Partagez ce diagnostic avec quelqu’un qui traverse peut-être la même situation.
</p>

<ShareButtons />

</section>

</main>

);

}
