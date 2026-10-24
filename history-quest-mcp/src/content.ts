export type Artifact = { kind: "pamphlet" | "bread" | "fortress" | "crown" | "map"; label: string; caption: string; detail: string };
export type SceneChoice = { id: string; title: string; detail: string; nextScene: string; consequence: string; unlocks: string[] };
export type Scene = { id: string; act: string; year: string; title: string; narrative: string; decision: string; artifact: Artifact; choices: SceneChoice[] };
export type Concept = { id: string; label: string; x: number; y: number; description: string };
export type Quest = { id: string; topic: string; era: string; subtitle: string; premise: string; stakes: string; everydayAnalogy: string; openingScene: string; scenes: Scene[]; concepts: Concept[]; challenge: { prompt: string; explanation: string } };
export type QuestState = { sceneId: string; visited: string[]; unlocked: string[]; points: number; lastConsequence?: string };

const frenchRevolution: Quest = {
  id: "french-revolution-1789", topic: "The French Revolution", era: "France, 1789–1799", subtitle: "A kingdom runs out of room to compromise.",
  premise: "You enter Paris when bread prices surge, the crown is deeply in debt, and a meeting intended to solve a budget crisis becomes a fight over political voice.",
  stakes: "Food, safety, political voice, and the survival of the monarchy are all in play. Nobody knows that the revolution will grow more radical—or how far violence will go.",
  everydayAnalogy: "Imagine a school where a small group writes every rule and pays almost none of the costs, while everyone else faces rising lunch prices. A budget meeting becomes a fight over who gets a voice.",
  openingScene: "estates-general",
  concepts: [
    { id: "monarchy", label: "Monarchy", x: 48, y: 16, description: "A king held executive authority, but legitimacy was under pressure." },
    { id: "enlightenment", label: "Enlightenment", x: 20, y: 42, description: "Ideas about rights and popular sovereignty gave reformers a language." },
    { id: "bread", label: "Bread crisis", x: 77, y: 43, description: "Poor harvests and high prices made politics immediate and physical." },
    { id: "national-assembly", label: "National Assembly", x: 35, y: 75, description: "Representatives claimed to speak for the nation rather than an estate." },
    { id: "popular-action", label: "Popular action", x: 70, y: 78, description: "Crowds became a decisive political force in Paris and beyond." },
    { id: "haitian", label: "Haitian Revolution", x: 88, y: 18, description: "Revolutionary ideals collided with slavery in the French colony of Saint-Domingue." }
  ],
  scenes: [
    { id: "estates-general", act: "Act I · The pressure builds", year: "May 1789", title: "A meeting with unequal rules", narrative: "Louis XVI has summoned the Estates-General. Clergy and nobles each vote as a group; the much larger Third Estate fears that it can always be outvoted.", decision: "As a Third Estate deputy, what do you push for?", artifact: { kind: "pamphlet", label: "Printed pamphlet", caption: "Ideas could move faster than officials.", detail: "Cheap print helped arguments about rights, taxation, and representation reach a large public." }, choices: [
      { id: "assembly", title: "Claim a National Assembly", detail: "Say the deputies represent the nation, not just one estate.", nextScene: "tennis-court", consequence: "You turn a procedural dispute into a claim about sovereignty. It is bold, but it creates a new source of legitimacy.", unlocks: ["enlightenment", "national-assembly"] },
      { id: "negotiate", title: "Seek a compromise vote", detail: "Try to win reform without a public break with the king.", nextScene: "tennis-court", consequence: "Compromise could have lowered the temperature, but distrust and the voting rules made a stable bargain difficult.", unlocks: ["monarchy"] }
    ] },
    { id: "tennis-court", act: "Act II · Authority changes hands", year: "June 1789", title: "The hall is locked", narrative: "Finding their meeting room closed, deputies gather on a tennis court and swear not to separate until France has a constitution.", decision: "What makes the pledge credible?", artifact: { kind: "crown", label: "A constitutional question", caption: "Could a king share sovereignty?", detail: "A constitutional monarchy would preserve a crown while moving lawmaking authority to representatives." }, choices: [
      { id: "public-oath", title: "Make the oath public", detail: "Use a visible promise to bind deputies and invite public support.", nextScene: "bastille", consequence: "Public commitment raises the cost of retreat. It also turns a meeting into a national drama.", unlocks: ["national-assembly"] },
      { id: "king", title: "Ask the king to endorse reform", detail: "Try to make change look lawful rather than revolutionary.", nextScene: "bastille", consequence: "Royal cooperation could reassure moderates, but hesitation made many people fear repression instead.", unlocks: ["monarchy"] }
    ] },
    { id: "bastille", act: "Act III · Fear becomes action", year: "July 1789", title: "Rumors, troops, and the Bastille", narrative: "Troops gather near Paris. Rumors say the king will crush the Assembly. Crowds look for arms and gunpowder.", decision: "What do you do when facts are incomplete but danger feels immediate?", artifact: { kind: "fortress", label: "The Bastille", caption: "A fortress became a symbol.", detail: "The prison held few inmates, but its fall signaled that popular action could reshape national politics." }, choices: [
      { id: "arms", title: "Join the search for arms", detail: "Act before royal troops can move.", nextScene: "fork-in-the-road", consequence: "The fall of the Bastille shifted power toward Parisian crowds and made political violence feel possible.", unlocks: ["popular-action", "bread"] },
      { id: "guard", title: "Organize a civic guard", detail: "Protect the city while limiting uncontrolled violence.", nextScene: "fork-in-the-road", consequence: "A civic guard could create local order, yet it still showed that authority no longer rested only with royal forces.", unlocks: ["popular-action"] }
    ] },
    { id: "fork-in-the-road", act: "Act IV · A revolution opens outward", year: "1791–1792", title: "Can the revolution stay moderate?", narrative: "War, economic anxiety, and suspicion make every faction fear betrayal. The monarchy’s failed flight deepens the crisis.", decision: "Which danger seems most urgent?", artifact: { kind: "map", label: "A connected Atlantic world", caption: "Ideas and consequences travelled.", detail: "The French Revolution influenced debates on citizenship, empire, slavery, and revolution far beyond France." }, choices: [
      { id: "constitution", title: "Defend constitutional limits", detail: "Protect rights by narrowing emergency power.", nextScene: "aftermath", consequence: "This path highlights a lasting dilemma: safeguards can seem slow when people feel existentially threatened.", unlocks: ["monarchy"] },
      { id: "emergency", title: "Back emergency measures", detail: "Use extraordinary power against perceived enemies.", nextScene: "aftermath", consequence: "Emergency rule may seem necessary in crisis, but it can also make violence and repression self-reinforcing.", unlocks: ["haitian", "popular-action"] }
    ] },
    { id: "aftermath", act: "Debrief · No inevitable ending", year: "1799 and beyond", title: "What did the revolution make possible?", narrative: "The Revolution destroyed old privileges and spread new political language, but it also passed through war, terror, and eventually Napoleon’s rule.", decision: "Choose a connection to carry into your next quest.", artifact: { kind: "bread", label: "The ordinary and the political", caption: "History happens at the level of daily life.", detail: "Bread prices, work, fear, and family security help explain why abstract politics became urgent." }, choices: [
      { id: "haitian-path", title: "Follow the Haitian Revolution", detail: "Ask who was included in claims about liberty and equality.", nextScene: "aftermath", consequence: "Connection unlocked: the Haitian Revolution forces a deeper look at slavery, empire, and revolutionary ideals.", unlocks: ["haitian"] },
      { id: "ideas-path", title: "Trace Enlightenment ideas", detail: "Explore where concepts of rights and sovereignty came from.", nextScene: "aftermath", consequence: "Connection unlocked: ideas become powerful when institutions, media, and people carry them into crises.", unlocks: ["enlightenment"] }
    ] }
  ],
  challenge: { prompt: "Prediction: why might war with neighboring monarchies make a revolution more radical?", explanation: "War intensified fear of enemies at home and abroad. Leaders and crowds worried that internal opponents would help invading armies, making compromise look dangerous." }
};

export function questFor(topic: string): Quest {
  if (/french|1789|bastille/i.test(topic)) return frenchRevolution;
  const clean = topic.trim() || "your chosen topic";
  return { ...frenchRevolution, id: clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), topic: clean, era: "Investigation mission", subtitle: "Trace pressure, choice, and consequence.", premise: `This multi-scene inquiry frames ${clean} as a human problem: people acted with incomplete information, competing values, and real constraints. Ask ChatGPT for a fact-checked topic brief before treating this starter mission as a source.` };
}

export function initialState(quest: Quest): QuestState { return { sceneId: quest.openingScene, visited: [quest.openingScene], unlocked: ["monarchy", "bread"], points: 0 }; }
export function advance(quest: Quest, state: QuestState, choiceId: string): QuestState {
  const scene = quest.scenes.find((item) => item.id === state.sceneId);
  const choice = scene?.choices.find((item) => item.id === choiceId);
  if (!choice) return state;
  return { sceneId: choice.nextScene, visited: [...new Set([...state.visited, choice.nextScene])], unlocked: [...new Set([...state.unlocked, ...choice.unlocks])], points: state.points + 15, lastConsequence: choice.consequence };
}
