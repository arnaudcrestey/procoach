"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
"Je ressens du sens dans mon travail.",
"Je me sens motivé par mes missions.",
"Je dispose d'une autonomie suffisante dans mon travail.",
"Je vois des perspectives d'évolution.",
"Mon niveau d'énergie est bon au travail.",
"Mes compétences sont reconnues à leur juste valeur.",
"Je peux exprimer pleinement mes capacités dans mon poste.",
"Je me projette dans mon métier sur plusieurs années.",
"Mon environnement professionnel correspond à mes valeurs.",
"Je ressens que mon travail contribue réellement à quelque chose d'important."
];

export default function DiagnosticPage() {

const router = useRouter();

const [answers,setAnswers] = useState<number[]>([]);
const [animating,setAnimating] = useState(false);

const index = answers.length;
const question = questions[index];

const progress = ((index )/questions.length)*100;

function answer(value:number){

if(animating) return;

setAnimating(true);

const updated=[...answers,value];

setTimeout(()=>{

setAnswers(updated);
setAnimating(false);

if(updated.length===questions.length){

localStorage.setItem(
"procoach_answers",
JSON.stringify(updated)
);

router.push("/resultat");

}

},200);

}

return(

<main className="flex min-h-screen items-center justify-center px-6">

<div className="glass w-full max-w-3xl rounded-3xl p-12 text-center">

<h1 className="text-4xl font-bold mb-10">
Diagnostic professionnel
</h1>

<div className="mb-10">

<div className="flex justify-between text-sm text-white/60 mb-3">

<span>Question {Math.min(index , questions.length)} sur {questions.length}</span>

<span>{Math.round(progress)}%</span>

</div>

<div className="w-full h-2 bg-white/10 rounded-full">

<div
className="h-2 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-500"
style={{width:`${progress}%`}}
/>

</div>

</div>

<p className={`text-3xl mb-12 transition-opacity duration-300 ${animating?"opacity-0":"opacity-100"}`}>
{question}
</p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<button
onClick={()=>answer(1)}
className="rounded-2xl bg-white/10 py-5 text-lg font-medium hover:bg-red-500/20 transition"
>
Pas du tout
</button>

<button
onClick={()=>answer(3)}
className="rounded-2xl bg-white/10 py-5 text-lg font-medium hover:bg-yellow-400/20 transition"
>
Moyennement
</button>

<button
onClick={()=>answer(5)}
className="rounded-2xl bg-white/10 py-5 text-lg font-medium hover:bg-green-500/20 transition"
>
Beaucoup
</button>

</div>

<p className="mt-10 text-sm text-white/50">
10 questions • moins de 2 minutes
</p>

</div>

</main>

);

}