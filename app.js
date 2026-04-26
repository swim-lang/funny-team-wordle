const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "funny-team-wordle-v2";
const DAILY_EPOCH = "2026-04-26";
const TEAM_MEMBERS = ["Kira", "Sean", "Logan", "Alexis"];
const TMZ_FEED_URL = "https://www.tmz.com/rss.xml";
const TMZ_JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(TMZ_FEED_URL)}`;
const TMZ_PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(TMZ_FEED_URL)}`;
const FALLBACK_HEADLINES = [
  { title: "TMZ headlines are warming up", link: "https://www.tmz.com/" },
  { title: "Celebrity chaos pending refresh", link: "https://www.tmz.com/" },
  { title: "Big headline energy loading", link: "https://www.tmz.com/" },
];

const ANSWER_POOL = `CHAOS FERAL PETTY SALTY TOXIC TIPSY VODKA TWERK DRAMA PANIC SWEAT CURSE HEXED COVEN OUIJA CRYPT RABID MANIC MOODY SPITE SAUCY SNARK WRECK CRASH VEXED JUICY MESSY GRIFT YIKES WOOZY SHADY CRAVE WORST ROAST GUILT SHAME DOOMY ZESTY SASSY HAZED RAGER FROTH SNEER SNIDE BRASH WEIRD AWFUL PISSY BOOZY GRUMP ZONED HYPED LURID BITCH FUCKS SHITS DILDO BOOBS BONER KINKY PERVY HORNY ABHOR ABIDE ABUSE ACHES ACIDS ACORN ACRID ACTOR ADIEU ADMIN ADMIT ADOPT ADORE ADULT AGENT AGONY ALARM ALBUM ALIEN ALIVE ALLOY ALONE ALTER AMASS AMAZE AMBER AMBLE AMEND AMONG AMUSE ANGER ANGST ANNOY ANTIC ANVIL AORTA APART APPLE APPLY APRON ARGUE ARISE ARSON ARTSY ASIDE ASKEW ASSET AUDIO AUDIT AVERT AVOID AWARD AWARE AXIOM BACON BADGE BADLY BAGEL BAKER BANAL BANJO BARGE BASIC BASIL BASIN BATCH BATHE BEACH BEARD BEAST BEFIT BEGUN BEING BELCH BELLY BELOW BENCH BERTH BINGE BIRTH BLACK BLADE BLAME BLAND BLANK BLARE BLAST BLEAK BLEAT BLEED BLEEP BLEND BLESS BLIMP BLIND BLINK BLISS BLITZ BLOAT BLOCK BLOKE BLOOD BLOOM BLOWN BLUER BLUFF BLUNT BLURB BLURT BLUSH BOAST BONEY BONUS BOOST BOOZE BOSSY BOTCH BOUGH BOUND BOWEL BRAIN BRAKE BRAND BRAVE BRAWL BREAD BREAK BRIBE BRICK BRIDE BRIEF BRINE BRING BRINK BROAD BROIL BROKE BROOM BROTH BROWN BRUNT BRUSH BRUTE BUDDY BUDGE BUGGY BUILD BULGE BULLY BUNCH BURLY BURNT BURST BUTCH BUYER CABIN CABLE CACHE CACTI CAGED CANDY CANNY CANOE CANON CAPER CARGO CARRY CARVE CATCH CATER CAUSE CEDAR CHAFE CHAIN CHAIR CHALK CHAMP CHANT CHARD CHARM CHART CHASE CHASM CHEAP CHEAT CHECK CHEEK CHEER CHESS CHEST CHIEF CHILD CHILL CHIME CHINA CHIRP CHOIR CHOKE CHOMP CHORD CHORE CHOSE CHUCK CHUMP CHUNK CHURN CHUTE CIDER CINCH CIVIC CIVIL CLAIM CLAMP CLASH CLASP CLEAN CLEAR CLEAT CLEFT CLERK CLICK CLIFF CLIMB CLING CLINK CLOAK CLOCK CLONE CLOSE CLOTH CLOUD CLOVE CLOWN CLUCK CLUMP COACH COAST COBRA COCOA COLON COMET COMFY COMIC COMMA CONDO CONIC COUCH COUGH COULD COUNT COURT COVER COWER CRACK CRAFT CRAMP CRANE CRANK CRASS CRATE CRAWL CRAZE CRAZY CREAK CREAM CREDO CREEP CREPE CREPT CREST CRICK CRIED CRIME CRIMP CRISP CROAK CRONE CROOK CROSS CROUP CROWD CROWN CRUDE CRUEL CRUMB CRUSH CRUST CUBIC CURVE CYCLE CYNIC DADDY DAISY DANCE DANDY DATED DEATH DEBIT DEBUG DECAY DECOR DEFER DELAY DELTA DEMON DENSE DEPTH DERBY DETOX DIARY DICEY DITCH DITTO DIZZY DODGE DOING DOUBT DOUGH DOWRY DOZEN DRAFT DRAIN DRANK DRAPE DREAD DREAM DRESS DRIER DRIFT DRINK DRIVE DROLL DROWN DRUNK DRYLY DUMPY DUSTY EAGER EARLY EARTH EATEN EERIE EIGHT ELATE ELBOW ELDER ELECT ELITE ELOPE EMPTY ENACT ENJOY ENNUI ENSUE ENTER EPOCH EQUAL ERROR ERUPT ESSAY ETHER ETHIC EVADE EVENT EVERY EVOKE EXACT EXILE EXIST EXTRA FABLE FANCY FATAL FAULT FAVOR FEAST FELON FETCH FEVER FICUS FIERY FIGHT FINAL FINCH FIRED FIRST FIZZY FLAIR FLAKE FLAME FLARE FLASH FLASK FLEET FLESH FLICK FLING FLIRT FLOAT FLOOD FLOOR FLOSS FLOUR FLUNK FLUSH FOCUS FOLLY FORCE FORGE FORGO FORTH FOUND FOYER FRAIL FRAME FRAUD FREAK FREED FRESH FRIAR FRIED FRISK FROCK FROST FROWN FUDGE FUNGI FUNKY FUROR FUSSY FUZZY GAFFE GASSY GAUDY GAVEL GAWKY GHOST GIANT GIDDY GIVEN GLARE GLASS GLAZE GLOAT GLOOM GLORY GLOVE GLYPH GNASH GONER GOOEY GOOFY GRACE GRADE GRAFT GRAIN GRAND GRANT GRAPE GRAPH GRASP GRASS GRATE GRAVE GRAVY GRAZE GREAT GREED GRIEF GRIME GRIMY GRIND GROAN GROOM GROPE GROSS GROUP GROUT GROVE GROWL GUARD GUEST GUIDE GUSTO HABIT HAIRY HAPPY HARDY HARSH HASTE HATER HAUNT HAVOC HAZEL HEART HEATH HEAVE HEIST HELIX HELLO HENCE HERON HINGE HIPPO HITCH HOARD HOBBY HOMER HONEY HONOR HORDE HORSE HOTEL HOTLY HOUND HOUSE HUMAN HUMID HUMOR HURRY HUSKY HUTCH ICILY IDIOM IDIOT IMAGE IMBUE IMPLY INANE INBOX INDEX INFER INPUT INTER INTRO IRATE IRONY ISLET ITCHY IVORY JAZZY JELLY JERKY JETTY JOINT JOLLY JUDGE JUICE JUMBO JUMPY JUNKY KAPPA KARMA KAYAK KEBAB KHAKI KIOSK KNEEL KNIFE KNOCK KNOLL KNOWN KOALA LABEL LAGER LANCE LANKY LAPSE LARGE LARVA LATCH LATER LATTE LAUGH LAYER LEACH LEAKY LEARN LEASE LEECH LEERY LEFTY LEGAL LEMON LEVEL LEVER LIGHT LIKEN LILAC LIMBO LIMIT LINEN LINGO LIVER LOATH LOBBY LOCAL LOCUS LODGE LOFTY LOGIC LOOPY LOSER LOUSE LOVER LOWER LOWLY LOYAL LUCID LUCKY LUNAR LUNCH LUSTY LYING MACRO MADAM MAGIC MAGMA MAJOR MAMBO MANIA MANOR MAPLE MARCH MARRY MARSH MATCH MAUVE MAXIM MAYBE MEATY MEDAL MERCY MERGE MERIT MERRY METAL MICRO MIGHT MIMIC MINOR MINTY MINUS MIRTH MISER MISSY MOCHA MODEL MOGUL MOIST MOLAR MONEY MONTH MORAL MORON MOTEL MOTOR MOUNT MOURN MOUSE MOUTH MOVIE MOWER MUDDY MULCH MUMMY MUNCH MURAL MURKY MUSHY MUSIC MUSTY NADIR NASTY NATAL NERDY NEVER NEWER NICER NIGHT NINJA NOBLE NOISE NOISY NORTH NOSEY NOTCH NOVEL NUDGE NURSE NUTTY NYMPH OBESE OCCUR OCEAN OFFER OFTEN OLDER OLIVE OMEGA ONION ONSET OPERA OPIUM ORBIT ORDER ORGAN OTHER OUGHT OUNCE OUTER OVARY OWNER OXIDE PAINT PANEL PAPER PARRY PARTY PASTA PATCH PAUSE PAYEE PEACH PEARL PECAN PEDAL PENAL PENNE PHASE PHONE PHOTO PIANO PICKY PIECE PIETY PILOT PINCH PINKY PIOUS PITHY PIVOT PIXEL PIZZA PLACE PLAID PLAIN PLANE PLANK PLANT PLATE PLAZA PLEAD PLEAT PLUCK PLUMB PLUMP PLUSH POESY POINT POISE POKER POLAR POLKA POUND POWER PRANK PRESS PRICE PRICK PRIDE PRIME PRINT PRIOR PRISM PRIVY PRIZE PROBE PRONE PROOF PROUD PROVE PROWL PROXY PRUDE PSALM PULPY PUNCH PUPPY PURGE PUSHY QUAKE QUALM QUEEN QUERY QUEST QUEUE QUICK QUIET QUILL QUIRK QUITE QUOTA QUOTE RACER RADAR RADIO RALLY RANCH RANDY RANGE RAPID RATIO RAVEN REACT READY REALM REBEL RECAP RECUR REDDY REIGN RELAX RELIC REMIT RENEW REPEL REPLY RESET RETRO RHINO RIDER RIDGE RIFLE RIGHT RIGID RINSE RIPEN RISEN RISKY RIVAL RIVER ROACH ROBIN ROCKY RODEO ROGUE ROOMY ROOST ROTOR ROUGE ROUGH ROUND ROUSE ROUTE ROYAL RUDDY RUGBY RULER RUMBA RURAL RUSTY SADLY SALON SALSA SAUCE SAVVY SCALE SCALP SCAMP SCANT SCARE SCARF SCARY SCENE SCENT SCOFF SCOLD SCONE SCOOP SCOPE SCORE SCORN SCOUR SCOUT SCRAM SCRAP SCREW SCRUB SEDAN SEEDY SENSE SEPIA SERUM SERVE SEVEN SEVER SHACK SHADE SHAKE SHANK SHAPE SHARE SHARK SHARP SHAVE SHAWL SHEAR SHEEN SHEET SHELF SHELL SHINE SHINY SHIRE SHIRK SHIRT SHOAL SHOCK SHONE SHOOT SHORE SHORT SHOUT SHOVE SHRED SHREW SHRUB SHRUG SIEGE SIEVE SIGHT SILKY SILLY SINCE SIREN SIXTH SIXTY SKATE SKEIN SKILL SKIMP SKIRT SKULK SKULL SLACK SLAIN SLANG SLANT SLASH SLATE SLEEK SLEEP SLEET SLICE SLICK SLIME SLIMY SLING SLINK SLOPE SLOSH SLOTH SLUMP SLUNG SLUSH SMACK SMALL SMART SMASH SMEAR SMELL SMELT SMILE SMIRK SMITE SMITH SMOCK SMOKE SMOKY SMOTE SNACK SNAIL SNAKE SNARE SNARL SNEAK SNIFF SNIPE SNOOP SNORE SNORT SNOUT SNOWY SOAPY SOBER SOLAR SOLID SOLVE SONAR SONIC SORRY SOUND SOUTH SPACE SPADE SPANK SPARE SPARK SPASM SPAWN SPEAK SPEAR SPECK SPEED SPELL SPEND SPENT SPICE SPICY SPIED SPIEL SPIKE SPIKY SPILL SPINE SPINY SPIRE SPLAT SPLIT SPOIL SPOKE SPOOF SPOOK SPOON SPORE SPORT SPOUT SPRAY SPREE SPRIG SPUNK SPURN SQUAD SQUAT STACK STAFF STAGE STAIN STALK STAMP STAND STANK STARE STARK START STASH STATE STEAD STEAK STEAL STEAM STEEL STEEP STEER STICK STIFF STILL STING STINK STINT STOCK STOIC STOMP STONE STOOL STOOP STORE STORK STORM STORY STOUT STOVE STRAP STRAW STRIP STRUT STUCK STUDY STUFF STUMP STUNG STUNK STUNT STYLE SUGAR SUITE SULKY SUNNY SUPER SURER SURGE SURLY SUSHI SWAMP SWARM SWEAR SWEEP SWEET SWELL SWEPT SWIFT SWILL SWINE SWING SWIRL SWORD TABBY TABLE TABOO TACIT TACKY TANGO TANGY TAPER TARDY TAROT TASTE TASTY TATTY TAUNT TEACH TEARY TEASE TEMPO TENSE TENTH TEPID TERSE TESTY THANK THEFT THEME THERE THESE THICK THIEF THIGH THING THINK THIRD THORN THOSE THREE THREW THROB THROW THUMB THUMP TIDAL TIGER TIGHT TILDE TIMER TIMID TITAN TITLE TOAST TODAY TOKEN TONAL TONIC TOOTH TOPAZ TOPIC TORCH TORSO TOTAL TOUCH TOUGH TRACE TRACK TRACT TRADE TRAIL TRAIN TRAIT TRAMP TRASH TREAD TREAT TREND TRIAD TRIAL TRIBE TRICK TRIED TRIPE TRITE TROOP TROPE TROUT TRUCE TRUCK TRUER TRULY TRUNK TRUST TRUTH TULIP TUMMY TWEAK TWEED TWEET TWICE TWINE TWIRL TWIST UDDER ULTRA UMBRA UNARM UNCLE UNCUT UNDER UNDID UNFED UNFIT UNIFY UNION UNITE UNITY UNMET UNSET UNTIE UNTIL UNWED UNZIP UPPER UPSET URBAN URINE USAGE USHER USUAL USURP UTTER VAGUE VALET VALID VALOR VALUE VALVE VAPID VAPOR VAULT VAUNT VENOM VENUE VERGE VERSE VERVE VIDEO VIGIL VIGOR VILLA VINYL VIPER VIRAL VIRUS VISIT VISOR VISTA VITAL VIVID VIXEN VOGUE VOICE VOILA VOMIT VOTER VOUCH VOWEL VYING WACKY WAFER WAGER WAGON WAIST WAIVE WALTZ WARTY WASTE WATCH WATER WAVER WEARY WEAVE WEDGE WEEDY WEIGH WELCH WELSH WHACK WHALE WHARF WHEAT WHEEL WHERE WHICH WHIFF WHILE WHINE WHINY WHIRL WHISK WHITE WHOLE WHOOP WHOSE WIDEN WIDER WIDOW WIDTH WIELD WIGHT WILLY WINCE WINCH WINDY WISER WITCH WITTY WOKEN WOMAN WOMEN WORDY WORLD WORRY WORSE WORTH WOULD WOUND WOVEN WRACK WRATH WREAK WREST WRING WRIST WRITE WRONG WROTE WRUNG WRYLY YACHT YEARN YEAST YIELD YOUNG YOUTH ZEBRA`.split(/\s+/);

const SPECIAL_HINTS = {
  CHAOS: "The plan after one group text",
  FERAL: "Outside voice, inside event",
  PETTY: "Revenge, but make it tiny",
  SALTY: "Seasoned with resentment",
  TOXIC: "Bad idea wearing confidence",
  TIPSY: "Two drinks past charisma",
  VODKA: "Clear liquid plot device",
  TWERK: "Dance floor emergency broadcast",
  DRAMA: "The group chat found oxygen",
  PANIC: "Calendar invite to the nervous system",
  SWEAT: "Body leaked the meeting notes",
  CURSE: "Spicy promise to the universe",
  HEXED: "Bad vibes with paperwork",
  COVEN: "A meeting with excellent lighting",
  OUIJA: "After-hours customer support",
  CRYPT: "Basement with legacy branding",
  RABID: "Passionate, but legally concerning",
  MANIC: "Productivity with sirens on",
  MOODY: "Weather report for a person",
  SPITE: "Premium motivation fuel",
  SAUCY: "Flirting with plausible deniability",
  SNARK: "Side-eye in sentence form",
  WRECK: "A plan after screenshots arrive",
  CRASH: "Energy leaving the building",
  VEXED: "Annoyed in a velvet jacket",
  JUICY: "Gossip with a pulse",
  MESSY: "Entertaining for everyone nearby",
  GRIFT: "Side hustle with a fake mustache",
  YIKES: "A full sentence, honestly",
  WOOZY: "Brain took a carousel",
  SHADY: "Suspicious, but accessorized",
  CRAVE: "The snack app has entered the chat",
  WORST: "A compliment in some friendships",
  ROAST: "Affection with grill marks",
  GUILT: "Emotional invoice, unpaid",
  SHAME: "The morning-after spreadsheet",
  DOOMY: "Forecast says absolutely not",
  ZESTY: "Too much personality per ounce",
  SASSY: "Mouth opened before legal review",
  HAZED: "Memory has fog machine settings",
  RAGER: "Event with questionable flooring",
  FROTH: "Emotions, but caffeinated",
  SNEER: "Judgment using only lips",
  SNIDE: "Mean, but wearing a blazer",
  BRASH: "Volume knob missing",
  WEIRD: "Correct amount of wrong",
  AWFUL: "A disaster with branding",
  PISSY: "Tiny thunderstorm in jeans",
  BOOZY: "The brunch has consequences",
  GRUMP: "Bad mood with furniture",
  ZONED: "Mentally buffering",
  HYPED: "Excited past the warranty",
  LURID: "Too vivid to be innocent",
  BITCH: "A complaint with stilettos on",
  FUCKS: "Things currently unavailable to give",
  SHITS: "Several tiny disasters",
  DILDO: "Drawer lore, unfortunately real",
  BOOBS: "Anatomy with sitcom timing",
  BONER: "A timing issue with a heartbeat",
  KINKY: "The safe word is dictionary",
  PERVY: "A stare that needs HR",
  HORNY: "Brain chemistry with bad manners",
};

const HINT_VIBES = [
  "Starts with {first}. The vibe is suspiciously specific",
  "Starts with {first}. Something about this word has afterparty energy",
  "Starts with {first}. A real word, unfortunately",
  "Starts with {first}. The group chat would overuse this",
  "Starts with {first}. Slightly dramatic, fully dictionary-approved",
  "Starts with {first}. Feels like a decision made too late",
  "Starts with {first}. Useful when the night gets weird",
  "Starts with {first}. Not made up, just acting like it is",
];

function hintForWord(word) {
  if (SPECIAL_HINTS[word]) return SPECIAL_HINTS[word];
  const seed = word.split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  return HINT_VIBES[seed % HINT_VIBES.length].replace("{first}", word[0]);
}

const WORDS = ANSWER_POOL.map((word) => ({ word, hint: hintForWord(word) }));

const ANSWER_WORDS = new Set(WORDS.map(({ word }) => word));
const VALID_GUESSES = new Set([...(window.VALID_WORDS || []), ...WORDS.map(({ word }) => word)]);

const EMOJIS = ["😀", "😎", "🤠", "🤖", "👻", "🧙", "🥸", "😈", "🤡", "👽", "🦄", "🐸", "🦖", "🐙", "🦀", "🍕", "🌮", "🍄", "🧃", "🪩", "🚀", "⚡", "🔥", "💅"];
const KEYS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const defaultState = {
  usedWords: [],
  currentWord: null,
  players: createTeamPlayers(),
  activePlayerId: null,
  selectedMemberId: null,
};

let state = loadState();
let currentGuess = "";
normalizeState();
randomizePlayerEmojis();
ensureUniquePlayerEmojis();
if (!state.activePlayerId) state.activePlayerId = state.players[0].id;
const activeDateKey = todayKey();
if (state.currentWord?.word?.length !== WORD_LENGTH || !ANSWER_WORDS.has(state.currentWord?.word) || state.currentWord?.dateKey !== activeDateKey) {
  state.currentWord = null;
}
if (!state.currentWord) pickNewWord(activeDateKey);

const els = {
  board: document.querySelector("#board"),
  keyboard: document.querySelector("#keyboard"),
  hintBox: document.querySelector("#hintBox"),
  hintButton: document.querySelector("#hintButton"),
  newWordButton: document.querySelector("#newWordButton"),
  dayLabel: document.querySelector("#dayLabel"),
  emojiButton: document.querySelector("#emojiButton"),
  emojiGrid: document.querySelector("#emojiGrid"),
  currentPlayerName: document.querySelector("#currentPlayerName"),
  identityGate: document.querySelector("#identityGate"),
  identityButtons: document.querySelector("#identityButtons"),
  switchPlayerButton: document.querySelector("#switchPlayerButton"),
  headlineTrack: document.querySelector("#headlineTrack"),
  leaderboardList: document.querySelector("#leaderboardList"),
  winsStat: document.querySelector("#winsStat"),
  streakStat: document.querySelector("#streakStat"),
  playedStat: document.querySelector("#playedStat"),
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return structuredClone(defaultState);
  }
}

function memberId(name) {
  return name.toLowerCase();
}

function blankTeamPlayer(name) {
  return {
    id: memberId(name),
    name,
    emoji: randomEmoji(),
    wins: 0,
    played: 0,
    streak: 0,
  };
}

function createTeamPlayers() {
  return TEAM_MEMBERS.map(blankTeamPlayer);
}

function normalizeState() {
  state.usedWords = Array.isArray(state.usedWords)
    ? state.usedWords
        .map((entry) => typeof entry === "string" ? { word: entry, dateKey: null } : entry)
        .filter((entry) => entry?.word && ANSWER_WORDS.has(entry.word))
    : [];
  const nextPlayers = createTeamPlayers();
  state.players = nextPlayers;
  state.activePlayerId = state.players.some((player) => player.id === state.activePlayerId) ? state.activePlayerId : state.selectedMemberId;
  state.selectedMemberId = state.players.some((player) => player.id === state.selectedMemberId) ? state.selectedMemberId : null;
}

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function randomAvailableEmoji(ignorePlayerId = null) {
  const used = new Set(state.players.filter((player) => player.id !== ignorePlayerId).map((player) => player.emoji));
  const available = EMOJIS.filter((emoji) => !used.has(emoji));
  return available[Math.floor(Math.random() * available.length)] || randomEmoji();
}

function shuffleEmojis() {
  return [...EMOJIS].sort(() => Math.random() - 0.5);
}

function randomizePlayerEmojis() {
  const shuffled = shuffleEmojis();
  state.players = state.players.map((player, index) => ({ ...player, emoji: shuffled[index] || randomAvailableEmoji(player.id) }));
}

function ensureUniquePlayerEmojis() {
  const used = new Set();
  state.players = state.players.map((player) => {
    if (!used.has(player.emoji)) {
      used.add(player.emoji);
      return player;
    }
    const emoji = EMOJIS.find((candidate) => !used.has(candidate)) || randomEmoji();
    used.add(emoji);
    return { ...player, emoji };
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activePlayer() {
  return state.players.find((player) => player.id === state.activePlayerId) || state.players[0];
}

function activeRun() {
  const player = activePlayer();
  if (!state.currentWord.runs[player.id]) {
    state.currentWord.runs[player.id] = { guesses: [], hintUsed: false, status: "playing" };
  }
  return state.currentWord.runs[player.id];
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayNumber(dateKey) {
  const epoch = new Date(`${DAILY_EPOCH}T00:00:00`);
  const date = new Date(`${dateKey}T00:00:00`);
  return Math.floor((date - epoch) / 86400000);
}

function entryWord(entry) {
  return typeof entry === "string" ? entry : entry.word;
}

function entryDateKey(entry) {
  return typeof entry === "string" ? null : entry.dateKey;
}

function dailyWordForDate(dateKey) {
  const usedBeforeToday = new Set(state.usedWords.filter((entry) => entryDateKey(entry) !== dateKey).map(entryWord));
  if (usedBeforeToday.size >= WORDS.length) {
    state.usedWords = [];
    usedBeforeToday.clear();
  }

  const start = ((dayNumber(dateKey) % WORDS.length) + WORDS.length) % WORDS.length;
  for (let offset = 0; offset < WORDS.length; offset += 1) {
    const candidate = WORDS[(start + offset) % WORDS.length];
    if (!usedBeforeToday.has(candidate.word)) return candidate;
  }

  return WORDS[start];
}

function recordUsedWord(word, dateKey) {
  if (state.usedWords.some((entry) => entryWord(entry) === word && entryDateKey(entry) === dateKey)) return;
  state.usedWords.push({ word, dateKey });
}

function pickNewWord(dateKey = todayKey()) {
  const chosen = dailyWordForDate(dateKey);
  state.currentWord = { ...chosen, dateKey, startedAt: new Date().toISOString(), runs: {} };
  recordUsedWord(chosen.word, dateKey);
  currentGuess = "";
  saveState();
}

function evaluateGuess(guess, target) {
  const result = Array(WORD_LENGTH).fill("absent");
  const targetChars = target.split("");
  const guessChars = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j += 1) {
      if (!used[j] && guessChars[i] === targetChars[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

function effectiveAttempts(run) {
  return run.guesses.length + (run.hintUsed ? 1 : 0);
}

function runForPlayer(playerId) {
  return state.currentWord.runs[playerId] || { guesses: [], hintUsed: false, status: "playing" };
}

function allPlayersFinished() {
  return state.players.every((player) => runForPlayer(player.id).status !== "playing");
}

function currentLineIndex() {
  const playingRuns = state.players
    .map((player) => runForPlayer(player.id))
    .filter((run) => run.status === "playing");

  if (!playingRuns.length) return MAX_ATTEMPTS;
  return Math.min(...playingRuns.map((run) => run.guesses.length));
}

function canGuessThisLine(run) {
  return run.status === "playing" && run.guesses.length === currentLineIndex();
}

function lettersFound(run) {
  const found = new Set();
  run.guesses.forEach((guess) => {
    guess.word.split("").forEach((letter, index) => {
      if (guess.result[index] === "correct" || guess.result[index] === "present") {
        found.add(letter);
      }
    });
  });
  return Math.min(found.size, WORD_LENGTH);
}

function switchToNextUnfinishedPlayer() {
  const line = currentLineIndex();
  const next = state.players.find((player) => {
    const run = runForPlayer(player.id);
    return run.status === "playing" && run.guesses.length === line;
  }) || state.players.find((player) => runForPlayer(player.id).status === "playing");

  if (next) {
    state.activePlayerId = next.id;
    currentGuess = "";
  }
}

function render() {
  const player = activePlayer();
  const run = activeRun();
  const canGuess = canGuessThisLine(run);
  els.currentPlayerName.textContent = player.name;
  els.emojiButton.textContent = player.emoji;
  els.winsStat.textContent = player.wins;
  els.streakStat.textContent = player.streak;
  els.playedStat.textContent = player.played;
  els.dayLabel.textContent = "The Board";
  els.hintBox.hidden = !run.hintUsed;
  els.hintBox.textContent = run.hintUsed ? state.currentWord.hint : "";
  els.hintButton.disabled = run.hintUsed || !canGuess;
  els.newWordButton.disabled = true;
  els.newWordButton.textContent = allPlayersFinished() ? "Done today" : "Wait for everyone";
  renderIdentityGate();
  renderEmojiGrid();
  renderBoard(run, canGuess);
  renderKeyboard(run, canGuess);
  renderLeaderboard();
  saveState();
}

function turnLabel() {
  const line = currentLineIndex();
  if (line >= MAX_ATTEMPTS) return "DONE";
  return `TURN ${line + 1}`;
}

function playerResultLabel(run) {
  if (run.status === "won") return `DONE ${effectiveAttempts(run)}`;
  if (run.status === "lost") return "DONE";
  if (!canGuessThisLine(run)) return "WAIT";
  return `TURN ${currentLineIndex() + 1}`;
}

function chooseMember(playerId) {
  if (!state.players.some((player) => player.id === playerId)) return;
  state.selectedMemberId = playerId;
  state.activePlayerId = playerId;
  currentGuess = "";
  render();
}

function renderIdentityGate(forceOpen = false) {
  els.identityButtons.innerHTML = "";
  state.players.forEach((player) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${player.emoji} ${player.name}`;
    button.addEventListener("click", () => chooseMember(player.id));
    els.identityButtons.append(button);
  });
  els.identityGate.hidden = !forceOpen && Boolean(state.selectedMemberId);
}

function renderEmojiGrid() {
  els.emojiGrid.innerHTML = "";
  const active = activePlayer();
  const usedByOthers = new Set(state.players.filter((player) => player.id !== active.id).map((player) => player.emoji));
  EMOJIS.forEach((emoji) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = emoji;
    button.disabled = usedByOthers.has(emoji);
    if (emoji === active.emoji) button.classList.add("selected");
    button.addEventListener("click", () => {
      if (usedByOthers.has(emoji)) return;
      active.emoji = emoji;
      els.emojiGrid.hidden = true;
      render();
    });
    els.emojiGrid.append(button);
  });
}

function renderBoard(run, canGuess) {
  els.board.innerHTML = "";
  const playableRows = MAX_ATTEMPTS - (run.hintUsed ? 1 : 0);

  for (let rowIndex = 0; rowIndex < playableRows; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";
    const guess = run.guesses[rowIndex];
    const letters = guess ? guess.word.split("") : canGuess && rowIndex === run.guesses.length ? currentGuess.split("") : [];

    for (let colIndex = 0; colIndex < WORD_LENGTH; colIndex += 1) {
      const tile = document.createElement("div");
      tile.className = `tile ${guess ? guess.result[colIndex] : letters[colIndex] ? "filled" : ""}`;
      tile.textContent = letters[colIndex] || "";
      row.append(tile);
    }
    els.board.append(row);
  }

  if (run.hintUsed) {
    const row = document.createElement("div");
    row.className = "row";
    "HINT!".split("").forEach((letter) => {
      const tile = document.createElement("div");
      tile.className = "tile hint-spent";
      tile.textContent = letter;
      row.append(tile);
    });
    els.board.append(row);
  }
}

function renderKeyboard(run, canGuess) {
  els.keyboard.innerHTML = "";
  const letterStates = new Map();
  run.guesses.forEach((guess) => {
    guess.word.split("").forEach((letter, index) => {
      const next = guess.result[index];
      const current = letterStates.get(letter);
      if (!current || next === "correct" || (next === "present" && current === "absent")) {
        letterStates.set(letter, next);
      }
    });
  });

  KEYS.forEach((keyRow, rowIndex) => {
    const row = document.createElement("div");
    row.className = "key-row";
    if (rowIndex === 2) row.append(keyButton("ENTER", "wide", run));
    keyRow.split("").forEach((letter) => row.append(keyButton(letter, letterStates.get(letter) || "", run)));
    if (rowIndex === 2) row.append(keyButton("⌫", "wide", run));
    els.keyboard.append(row);
  });
}

function keyButton(label, className, run, canGuess = canGuessThisLine(run)) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `key ${className || ""}`;
  button.textContent = label;
  button.disabled = !canGuess;
  button.addEventListener("click", () => handleKey(label));
  return button;
}

function renderLeaderboard() {
  els.leaderboardList.innerHTML = "";
  const rows = state.players.map((player) => {
    const run = runForPlayer(player.id);
    return { player, run };
  });

  rows.forEach(({ player, run }) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "leaderboard-row";
    row.innerHTML = `<strong>${player.emoji} ${player.name}</strong><small>${playerResultLabel(run)} · ${lettersFound(run)}/${WORD_LENGTH} letters</small>`;
    row.addEventListener("click", () => {
      state.activePlayerId = player.id;
      currentGuess = "";
      render();
    });
    els.leaderboardList.append(row);
  });
}

function decodeHeadline(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

async function fetchRss(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Headline feed failed: ${response.status}`);
    return response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Headline JSON failed: ${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseHeadlines(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  return [...doc.querySelectorAll("item")]
    .slice(0, 10)
    .map((item) => ({
      title: decodeHeadline(item.querySelector("title")?.textContent?.trim() || ""),
      link: item.querySelector("link")?.textContent?.trim() || "https://www.tmz.com/",
    }))
    .filter((item) => item.title);
}

function parseJsonHeadlines(feed) {
  return (feed.items || [])
    .slice(0, 10)
    .map((item) => ({
      title: decodeHeadline(item.title || ""),
      link: item.link || "https://www.tmz.com/",
    }))
    .filter((item) => item.title);
}

function renderHeadlines(headlines) {
  const items = headlines.length ? headlines : FALLBACK_HEADLINES;
  els.headlineTrack.innerHTML = "";
  for (let loop = 0; loop < 2; loop += 1) {
    const group = document.createElement("div");
    group.className = "ticker-group";
    group.setAttribute("aria-hidden", loop === 1 ? "true" : "false");
    items.forEach(({ title, link }) => {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = title;
      group.append(anchor);

      const divider = document.createElement("span");
      divider.className = "ticker-divider";
      divider.textContent = "|";
      group.append(divider);
    });
    els.headlineTrack.append(group);
  }
}

async function loadHeadlines() {
  try {
    renderHeadlines(parseJsonHeadlines(await fetchJson(TMZ_JSON_URL)));
  } catch {
    try {
      renderHeadlines(parseHeadlines(await fetchRss(TMZ_PROXY_URL)));
    } catch {
      renderHeadlines(FALLBACK_HEADLINES);
    }
  }
}

function handleKey(key) {
  const run = activeRun();
  if (!canGuessThisLine(run)) return;

  if (key === "ENTER") {
    submitGuess();
    return;
  }

  if (key === "⌫" || key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
    render();
    return;
  }

  if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
    currentGuess += key;
    render();
  }
}

function submitGuess() {
  const run = activeRun();
  if (!canGuessThisLine(run)) {
    return;
  }

  if (currentGuess.length !== WORD_LENGTH) {
    return;
  }
  if (!/^[A-Z]{5}$/.test(currentGuess)) {
    return;
  }
  if (!VALID_GUESSES.has(currentGuess)) {
    return;
  }

  const result = evaluateGuess(currentGuess, state.currentWord.word);
  run.guesses.push({ word: currentGuess, result });
  const won = result.every((stateName) => stateName === "correct");
  if (won) completeRun(run, true);
  else if (effectiveAttempts(run) >= MAX_ATTEMPTS) completeRun(run, false);
  else switchToNextUnfinishedPlayer();
  currentGuess = "";
  render();
}

function completeRun(run, won) {
  if (run.status !== "playing") return;
  const player = activePlayer();
  run.status = won ? "won" : "lost";
  player.played += 1;
  player.wins += won ? 1 : 0;
  player.streak = won ? player.streak + 1 : 0;
  switchToNextUnfinishedPlayer();
}

els.hintButton.addEventListener("click", () => {
  const run = activeRun();
  if (run.hintUsed || run.status !== "playing") return;
  run.hintUsed = true;
  if (effectiveAttempts(run) >= MAX_ATTEMPTS) completeRun(run, false);
  render();
});

els.newWordButton.addEventListener("click", () => {
  if (state.currentWord?.dateKey === todayKey()) return;
  pickNewWord();
  render();
});

els.emojiButton.addEventListener("click", () => {
  els.emojiGrid.hidden = !els.emojiGrid.hidden;
});

els.switchPlayerButton.addEventListener("click", () => {
  state.selectedMemberId = null;
  renderIdentityGate(true);
});

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "INPUT") return;
  if (event.key === "Enter") handleKey("ENTER");
  else if (event.key === "Backspace") handleKey("Backspace");
  else if (/^[a-zA-Z]$/.test(event.key)) handleKey(event.key.toUpperCase());
});

render();
loadHeadlines();
