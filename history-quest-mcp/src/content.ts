export type Choice = { id: string; title: string; detail: string; outcome: string };
export type Quest = {
  id: string;
  topic: string;
  era: string;
  subtitle: string;
  premise: string;
  stakes: string;
  everydayAnalogy: string;
  timeline: { year: string; label: string; detail: string }[];
  choices: Choice[];
  connections: string[];
  challenge: { prompt: string; answer: string; explanation: string };
};

const frenchRevolution: Quest = {
  id: "french-revolution-1789",
  topic: "The French Revolution",
  era: "France, 1789–1799",
  subtitle: "A kingdom runs out of room to compromise.",
  premise: "You arrive in Paris as bread prices surge, public debt mounts, and arguments about political power spill into the streets.",
  stakes: "Food, safety, political voice, and the survival of the monarchy are all in play. Nobody knows that the revolution will become more radical—or how far violence will go.",
  everydayAnalogy: "Imagine a school where a small group writes every rule and pays almost none of the costs, while everyone else faces rising lunch prices. A meeting meant to solve the budget becomes a fight over who gets a voice.",
  timeline: [
    { year: "May 1789", label: "Estates-General meets", detail: "Louis XVI calls representatives to address the financial crisis." },
    { year: "June 1789", label: "Tennis Court Oath", detail: "Third Estate deputies claim to represent the nation." },
    { year: "July 1789", label: "Bastille falls", detail: "Parisians seek arms amid fears of royal repression." },
    { year: "1792", label: "Monarchy ends", detail: "War and distrust drive a more radical revolution." }
  ],
  choices: [
    { id: "reform", title: "Demand a constitutional monarchy", detail: "Keep a king but put lawmaking power in an elected assembly.", outcome: "This path had supporters and briefly became policy. Its weakness: trust collapsed as war, hunger, and fear mounted." },
    { id: "insurrection", title: "Join a crowd seeking weapons", detail: "Act now because you fear royal troops will crush the assembly.", outcome: "Armed popular action changed the balance of power, but it also made violence a recurring political tool." },
    { id: "wait", title: "Wait for a royal compromise", detail: "Avoid bloodshed and hope the king accepts reform.", outcome: "This was understandable, but delay gave other groups time to set events in motion and reduced the king’s credibility." }
  ],
  connections: ["Enlightenment", "Haitian Revolution", "Industrial Revolution", "Russian Revolution"],
  challenge: { prompt: "Prediction: why might war with neighboring monarchies make the revolution more radical?", answer: "War intensified fear of enemies at home and abroad.", explanation: "Leaders and crowds worried that internal opponents would help invading armies, making compromise look dangerous." }
};

export function questFor(topic: string): Quest {
  if (/french|1789|bastille/i.test(topic)) return frenchRevolution;
  const clean = topic.trim() || "your chosen topic";
  return {
    ...frenchRevolution,
    id: clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    topic: clean,
    era: "Investigation mission",
    subtitle: "Begin with a question, then follow the pressures and choices.",
    premise: `This starter quest frames ${clean} as a human problem: people acted with incomplete information, competing values, and real constraints. Ask ChatGPT for a fact-checked topic brief before treating this exploration as a source.`,
    stakes: "Identify who had power, who faced risk, and what could not be known at the time.",
    everydayAnalogy: "Think of a group decision where resources are tight, facts are uncertain, and each person experiences the costs differently.",
    timeline: [
      { year: "Before", label: "Conditions", detail: "What pressures and ideas made this moment possible?" },
      { year: "Turning point", label: "Decision", detail: "Which choices narrowed or opened the future?" },
      { year: "After", label: "Consequences", detail: "Who gained, lost, or saw new problems emerge?" }
    ],
    connections: ["Causes and conditions", "Comparative revolution", "Technology and power", "Memory and legacy"]
  };
}
