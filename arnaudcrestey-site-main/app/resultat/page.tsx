"use client";

import { useState } from "react";

export default function LeadCapture() {

const [firstName,setFirstName] = useState("");
const [email,setEmail] = useState("");
const [birthDay,setBirthDay] = useState("");
const [birthMonth,setBirthMonth] = useState("");
const [birthYear,setBirthYear] = useState("");
const [birthHour,setBirthHour] = useState("");
const [birthMinute,setBirthMinute] = useState("");
const [birthPlace,setBirthPlace] = useState("");

const [sending,setSending] = useState(false);
const [submitted,setSubmitted] = useState(false);

async function handleSubmit(e:any){

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
birthPlace
};

try{

const res = await fetch("/api/lead-astrologie",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

const result = await res.json();

if(result.success){

setSubmitted(true);

}else{

alert("Une erreur est survenue.");

}

}catch(error){

console.error(error);
alert("Erreur serveur");

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

<section className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-10 text-center shadow-xl">

<h2 className="text-3xl font-semibold mb-4">
Comprendre réellement votre situation professionnelle
</h2>

<p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
Au <strong>Cabinet Astrae</strong>, l’étude du thème astral permet
d’explorer les dynamiques personnelles qui influencent les choix
de vie et les orientations professionnelles.
</p>

<p className="mt-6 text-lg text-white font-medium">
🎁 Recevez gratuitement votre première lecture personnalisée
</p>

<form
onSubmit={handleSubmit}
className="mt-8 flex flex-col gap-4 w-full max-w-md mx-auto"
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

<div className="flex flex-col sm:flex-row gap-2">

<input
type="text"
placeholder="Jour"
value={birthDay}
onChange={(e)=>setBirthDay(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<input
type="text"
placeholder="Mois"
value={birthMonth}
onChange={(e)=>setBirthMonth(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<input
type="text"
placeholder="Année"
value={birthYear}
onChange={(e)=>setBirthYear(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

</div>

<div className="flex flex-col sm:flex-row gap-2">

<input
type="text"
placeholder="Heure"
value={birthHour}
onChange={(e)=>setBirthHour(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
/>

<input
type="text"
placeholder="Minute"
value={birthMinute}
onChange={(e)=>setBirthMinute(e.target.value)}
required
className="w-full rounded-xl bg-white px-4 py-3 text-black outline-none"
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
disabled={sending}
className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 text-lg font-semibold text-white disabled:opacity-50"
>

{sending ? "Envoi..." : "Recevoir ma première analyse"}

</button>

</form>

</section>

);

}
