const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "funny-team-wordle-v3";
const TRIVIA_REVEAL_KEY = "funny-team-wordle-trivia-reveal-date";
const CLIENT_ID_KEY = "funny-team-wordle-client-id";
const SHARED_ROOM_KEY = "anchovies-wordle-main-v1";
const SHARED_RELAY_URL = "https://gun.o8.is/gun";
const DAILY_EPOCH = "2026-04-26";
const TEAM_MEMBERS = ["Kira", "Sean", "Logan", "Alexis"];
const WEATHER_LOCATIONS = {
  denver: { label: "Denver", latitude: 39.7392, longitude: -104.9903 },
  myrtle: { label: "Myrtle Beach", latitude: 33.6891, longitude: -78.8867 },
};
const WEATHER_BY_PLAYER = {
  kira: "denver",
  sean: "denver",
  logan: "denver",
  alexis: "myrtle",
};
const WEATHER_CODES = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Icy drizzle",
  57: "Icy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  85: "Snow showers",
  86: "Snow showers",
  95: "Thunderstorms",
  96: "Storms + hail",
  99: "Storms + hail",
};
const HEADLINE_SOURCES = [
  { name: "TMZ", category: "entertainment", feedUrl: "https://www.tmz.com/rss.xml", homeUrl: "https://www.tmz.com/", limit: 8 },
  { name: "IMDb", category: "entertainment", feedUrl: "https://news.google.com/rss/search?q=IMDb%20movie%20TV%20entertainment%20news&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=IMDb%20movie%20TV%20entertainment%20news&hl=en-US&gl=US&ceid=US:en", limit: 8 },
  { name: "Movie News", category: "entertainment", feedUrl: "https://news.google.com/rss/search?q=movie%20news%20OR%20film%20news%20OR%20TV%20news&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=movie%20news%20film%20news%20TV%20news&hl=en-US&gl=US&ceid=US:en", limit: 10 },
  { name: "Google News", category: "general", feedUrl: "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/home?hl=en-US&gl=US&ceid=US:en", limit: 10 },
  { name: "Denver Local", category: "local", feedUrl: "https://news.google.com/rss/search?q=Denver%20Colorado&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=Denver%20Colorado&hl=en-US&gl=US&ceid=US:en", limit: 8 },
  { name: "OpenAI", category: "ai", feedUrl: "https://openai.com/news/rss.xml", homeUrl: "https://openai.com/news/", limit: 5 },
  { name: "AI Labs", category: "ai", feedUrl: "https://news.google.com/rss/search?q=OpenAI%20OR%20Anthropic%20OR%20Claude%20OR%20GPT%20OR%20ElevenLabs%20OR%20Runway%20AI%20OR%20Lovable%20AI&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=OpenAI%20Anthropic%20Claude%20GPT%20ElevenLabs%20Runway%20Lovable&hl=en-US&gl=US&ceid=US:en", limit: 8 },
  { name: "Google + Apple", category: "tech", feedUrl: "https://news.google.com/rss/search?q=Google%20AI%20OR%20Apple%20AI&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=Google%20AI%20Apple%20AI&hl=en-US&gl=US&ceid=US:en", limit: 6 },
  { name: "AI News", category: "ai", feedUrl: "https://news.google.com/rss/search?q=artificial%20intelligence%20news&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=artificial%20intelligence%20news&hl=en-US&gl=US&ceid=US:en", limit: 6 },
  { name: "Design", category: "design", feedUrl: "https://news.google.com/rss/search?q=%22The%20Brand%20Identity%22%20OR%20Pentagram%20design%20news&hl=en-US&gl=US&ceid=US:en", homeUrl: "https://news.google.com/search?q=%22The%20Brand%20Identity%22%20Pentagram%20design%20news&hl=en-US&gl=US&ceid=US:en", limit: 6 },
];
const HEADLINE_CATEGORY_ROTATION = ["entertainment", "ai", "general", "entertainment", "local", "tech", "entertainment", "design"];
const FALLBACK_HEADLINES = [
  { source: "TMZ", category: "entertainment", title: "Celebrity chaos pending refresh", link: "https://www.tmz.com/", summary: "TMZ headlines are taking a dramatic little lap before loading.", body: "TMZ headlines are taking a dramatic little lap before loading." },
  { source: "AI Labs", category: "ai", title: "AI headlines are warming up", link: "https://news.google.com/search?q=artificial%20intelligence%20news&hl=en-US&gl=US&ceid=US:en", summary: "AI headlines are loading into the rotation.", body: "AI headlines are loading into the rotation." },
  { source: "Movie News", category: "entertainment", title: "Movie headlines are finding seats", link: "https://news.google.com/search?q=movie%20news%20film%20news&hl=en-US&gl=US&ceid=US:en", summary: "Entertainment headlines are joining the ticker.", body: "Entertainment headlines are joining the ticker." },
  { source: "Google News", category: "general", title: "Top stories are warming up", link: "https://news.google.com/home?hl=en-US&gl=US&ceid=US:en", summary: "Google News is loading the main headlines.", body: "Google News is loading the main headlines." },
  { source: "Denver Local", category: "local", title: "Denver local headlines loading", link: "https://news.google.com/search?q=Denver%20Colorado&hl=en-US&gl=US&ceid=US:en", summary: "Denver-area headlines are getting in line.", body: "Denver-area headlines are getting in line." },
];
const DAILY_TRIVIA = [
  { question: "How many bones are in a giraffe's neck?", answer: "Seven" },
  { question: "What is a dab of toothpaste called?", answer: "Nurdle" },
  { question: "What is the smallest nation?", answer: "Vatican City" },
  { question: "Who was on the $10,000 bill?", answer: "Salmon P. Chase" },
  { question: "What is the largest desert?", answer: "Antarctica" },
  { question: "What horror series has Michael Myers?", answer: "Halloween" },
  { question: "Who has hosted the most Olympics?", answer: "United States" },
  { question: "Pete Best drummed for what band?", answer: "The Beatles" },
  { question: "Ornithology is the study of what?", answer: "Birds" },
  { question: "Which males give birth?", answer: "Seahorses" },
  { question: "Blue Ribbon Sports became what?", answer: "Nike" },
  { question: "Where is the smallest bone?", answer: "Ear" },
  { question: "Who produces the most coffee?", answer: "Brazil" },
  { question: "First woman in the Rock Hall?", answer: "Aretha Franklin" },
  { question: "Which planet has the longest day?", answer: "Venus" },
  { question: "How many brains does an octopus have?", answer: "Nine" },
  { question: "What food does not expire?", answer: "Honey" },
  { question: "Which countries share the longest border?", answer: "U.S. and Canada" },
  { question: "What is America's oldest soft drink?", answer: "Dr. Pepper" },
  { question: "What did the first vending machine sell?", answer: "Holy water" },
  { question: "What is atop the Supreme Court?", answer: "Basketball court" },
  { question: "Which fruit has seeds outside?", answer: "Strawberries" },
  { question: "What is the rarest M&M color?", answer: "Brown" },
  { question: "Which state borders only one state?", answer: "Maine" },
  { question: "What was the first toy advertised on TV?", answer: "Mr. Potato Head" },
  { question: "What bones do newborns lack?", answer: "Kneecaps" },
  { question: "What is Cookie Monster's real name?", answer: "Sid" },
  { question: "How much skin do we lose yearly?", answer: "About 1.5 lbs" },
  { question: "What was Walt Disney afraid of?", answer: "Mice" },
  { question: "What are people who love eating ice called?", answer: "Pagophagiacs" },
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
const DOODLE_COLORS = ["#111111", "#ff5c5c", "#68d8ff", "#72e06a", "#ffd24a", "#ff7ab8"];
const DOODLE_SYNC_KEY = "funny-team-wordle-doodles-sync";
const GAME_SYNC_KEY = "funny-team-wordle-game-sync";
const ARTICLE_IMAGE_CACHE = new Map();
const WEATHER_CACHE = new Map();
let activePreviewItem = null;
let activeArticleItem = null;
let doodleEnabled = false;
let doodleColor = DOODLE_COLORS[0];
let activeDoodlePath = null;
let doodlePointerId = null;
let doodleChannel = null;
let gameChannel = null;
let activeWeatherKey = "";
let sharedNode = null;
let sharedPublishTimer = null;
let isApplyingSharedState = false;
let lastSharedUpdate = 0;
const clientId = getClientId();

const defaultState = {
  usedWords: [],
  currentWord: null,
  doodles: { dateKey: null, paths: [] },
  players: createTeamPlayers(),
  activePlayerId: null,
  selectedMemberId: null,
};

let state = loadState();
let currentGuess = "";
localStorage.removeItem("funny-team-wordle-theme");
normalizeState();
ensureUniquePlayerEmojis();
if (!state.activePlayerId) state.activePlayerId = state.players[0].id;
const activeDateKey = todayKey();
if (state.currentWord?.word?.length !== WORD_LENGTH || !ANSWER_WORDS.has(state.currentWord?.word) || state.currentWord?.dateKey !== activeDateKey) {
  state.currentWord = null;
}
if (!state.currentWord) pickNewWord(activeDateKey);
ensureDoodleState(activeDateKey);

const els = {
  board: document.querySelector("#board"),
  keyboard: document.querySelector("#keyboard"),
  gamePlayArea: document.querySelector("#gamePlayArea"),
  doodleCanvas: document.querySelector("#doodleCanvas"),
  pencilToggle: document.querySelector("#pencilToggle"),
  doodleMenu: document.querySelector("#doodleMenu"),
  colorSwatches: document.querySelector("#colorSwatches"),
  clearDoodlesButton: document.querySelector("#clearDoodlesButton"),
  articlePanel: document.querySelector("#articlePanel"),
  articleSource: document.querySelector("#articleSource"),
  articleTitle: document.querySelector("#articleTitle"),
  articleSummary: document.querySelector("#articleSummary"),
  articleImage: document.querySelector("#articleImage"),
  articleLink: document.querySelector("#articleLink"),
  articleCloseButton: document.querySelector("#articleCloseButton"),
  hintBox: document.querySelector("#hintBox"),
  hintButton: document.querySelector("#hintButton"),
  resetGameButton: document.querySelector("#resetGameButton"),
  dayLabel: document.querySelector("#dayLabel"),
  emojiButton: document.querySelector("#emojiButton"),
  emojiGrid: document.querySelector("#emojiGrid"),
  currentPlayerName: document.querySelector("#currentPlayerName"),
  identityGate: document.querySelector("#identityGate"),
  identityButtons: document.querySelector("#identityButtons"),
  homeButton: document.querySelector("#homeButton"),
  weatherBadge: document.querySelector("#weatherBadge"),
  weatherPlace: document.querySelector("#weatherPlace"),
  weatherRangePlace: document.querySelector("#weatherRangePlace"),
  weatherTemp: document.querySelector("#weatherTemp"),
  weatherHigh: document.querySelector("#weatherHigh"),
  weatherLow: document.querySelector("#weatherLow"),
  weatherCondition: document.querySelector("#weatherCondition"),
  triviaToggle: document.querySelector("#triviaToggle"),
  triviaQuestion: document.querySelector("#triviaQuestion"),
  triviaAnswer: document.querySelector("#triviaAnswer"),
  headlineTrack: document.querySelector("#headlineTrack"),
  headlinePreview: document.querySelector("#headlinePreview"),
  leaderboardList: document.querySelector("#leaderboardList"),
};

function getClientId() {
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

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
  state.doodles = state.doodles && Array.isArray(state.doodles.paths)
    ? { dateKey: state.doodles.dateKey, paths: normalizeDoodlePaths(state.doodles.paths), clearedAt: state.doodles.clearedAt || 0 }
    : { dateKey: null, paths: [], clearedAt: 0 };
  const savedPlayers = new Map((Array.isArray(state.players) ? state.players : []).map((player) => [player.id, player]));
  state.players = createTeamPlayers().map((player) => {
    const savedEmoji = savedPlayers.get(player.id)?.emoji;
    return { ...player, emoji: EMOJIS.includes(savedEmoji) ? savedEmoji : player.emoji };
  });
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

function ensureDoodleState(dateKey = todayKey()) {
  if (state.doodles?.dateKey === dateKey && Array.isArray(state.doodles.paths)) return;
  state.doodles = { dateKey, paths: [], clearedAt: 0 };
}

function activePlayer() {
  const playerId = state.selectedMemberId || state.activePlayerId;
  return state.players.find((player) => player.id === playerId) || state.players[0];
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

function nextUnusedWord(dateKey) {
  const used = new Set(state.usedWords.map(entryWord));
  if (state.currentWord?.word) used.add(state.currentWord.word);
  if (used.size >= WORDS.length) {
    state.usedWords = [];
    used.clear();
  }

  const currentIndex = WORDS.findIndex(({ word }) => word === state.currentWord?.word);
  const start = currentIndex >= 0 ? currentIndex + 1 : dayNumber(dateKey);
  for (let offset = 0; offset < WORDS.length; offset += 1) {
    const candidate = WORDS[(start + offset) % WORDS.length];
    if (!used.has(candidate.word)) return candidate;
  }

  return WORDS[((start % WORDS.length) + WORDS.length) % WORDS.length];
}

function recordUsedWord(word, dateKey) {
  if (state.usedWords.some((entry) => entryWord(entry) === word && entryDateKey(entry) === dateKey)) return;
  state.usedWords.push({ word, dateKey });
}

function pickNewWord(dateKey = todayKey(), options = {}) {
  const chosen = options.forceNext ? nextUnusedWord(dateKey) : dailyWordForDate(dateKey);
  state.currentWord = { ...chosen, dateKey, startedAt: new Date().toISOString(), runs: {} };
  state.doodles = { dateKey, paths: [], clearedAt: Date.now() };
  randomizePlayerEmojis();
  ensureUniquePlayerEmojis();
  recordUsedWord(chosen.word, dateKey);
  currentGuess = "";
  saveState();
}

function resetGameForGroup(options = {}) {
  pickNewWord(todayKey(), { forceNext: true });
  activeDoodlePath = null;
  currentGuess = "";
  if (!els.articlePanel.hidden) closeArticlePanel();
  render();
  drawDoodles();
  if (options.broadcast !== false) broadcastGameReset();
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

function render() {
  const player = activePlayer();
  state.activePlayerId = player.id;
  const run = activeRun();
  const canGuess = canGuessThisLine(run);
  els.currentPlayerName.textContent = player.name;
  els.emojiButton.textContent = player.emoji;
  els.dayLabel.textContent = "The Board";
  updateWeatherBadge(player);
  renderTrivia();
  ensureDoodleState(state.currentWord.dateKey);
  els.hintBox.hidden = !run.hintUsed;
  els.hintBox.textContent = run.hintUsed ? state.currentWord.hint : "";
  els.hintButton.disabled = run.hintUsed || !canGuess;
  els.gamePlayArea.classList.toggle("is-waiting", run.status === "playing" && !canGuess);
  renderIdentityGate();
  renderEmojiGrid();
  renderBoard(run, canGuess);
  renderKeyboard(run, canGuess);
  renderLeaderboard();
  renderDoodleControls();
  requestAnimationFrame(resizeDoodleCanvas);
  saveState();
}

function turnLabel() {
  const line = currentLineIndex();
  if (line >= MAX_ATTEMPTS) return "DONE";
  return `TURN ${line + 1}`;
}

function weatherLocationForPlayer(player) {
  const key = WEATHER_BY_PLAYER[player.id] || "denver";
  return { key, ...WEATHER_LOCATIONS[key] };
}

function weatherUrl(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: "temperature_2m,apparent_temperature,weather_code",
    daily: "temperature_2m_max,temperature_2m_min",
    forecast_days: "1",
    temperature_unit: "fahrenheit",
    timezone: "auto",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

function renderWeather(location, weather) {
  els.weatherPlace.textContent = location.label;
  els.weatherRangePlace.textContent = location.label;
  els.weatherTemp.textContent = weather?.temp == null ? "--°" : `${Math.round(weather.temp)}°`;
  els.weatherHigh.textContent = weather?.high == null ? "--°" : `${Math.round(weather.high)}°`;
  els.weatherLow.textContent = weather?.low == null ? "--°" : `${Math.round(weather.low)}°`;
  els.weatherCondition.textContent = weather?.condition || "Weather";
}

async function loadWeather(location) {
  if (WEATHER_CACHE.has(location.key)) return WEATHER_CACHE.get(location.key);
  const response = await fetch(weatherUrl(location), { cache: "no-store" });
  if (!response.ok) throw new Error(`Weather failed: ${response.status}`);
  const data = await response.json();
  const current = data.current || {};
  const daily = data.daily || {};
  const weather = {
    temp: current.temperature_2m,
    high: daily.temperature_2m_max?.[0],
    low: daily.temperature_2m_min?.[0],
    feels: current.apparent_temperature,
    condition: WEATHER_CODES[current.weather_code] || "Outside",
    updatedAt: current.time || "",
  };
  WEATHER_CACHE.set(location.key, weather);
  return weather;
}

function updateWeatherBadge(player) {
  const location = weatherLocationForPlayer(player);
  if (activeWeatherKey === location.key && WEATHER_CACHE.has(location.key)) {
    renderWeather(location, WEATHER_CACHE.get(location.key));
    return;
  }

  activeWeatherKey = location.key;
  renderWeather(location, WEATHER_CACHE.get(location.key));
  loadWeather(location)
    .then((weather) => {
      if (activeWeatherKey === location.key) renderWeather(location, weather);
    })
    .catch(() => {
      if (activeWeatherKey === location.key) {
        els.weatherPlace.textContent = location.label;
        els.weatherRangePlace.textContent = location.label;
        els.weatherTemp.textContent = "--°";
        els.weatherHigh.textContent = "--°";
        els.weatherLow.textContent = "--°";
        els.weatherCondition.textContent = "Weather offline";
      }
    });
}

function dailyTriviaForDate(dateKey = todayKey()) {
  const index = ((dayNumber(dateKey) % DAILY_TRIVIA.length) + DAILY_TRIVIA.length) % DAILY_TRIVIA.length;
  return DAILY_TRIVIA[index];
}

function triviaRevealedForDate(dateKey = todayKey()) {
  return localStorage.getItem(TRIVIA_REVEAL_KEY) === dateKey;
}

function renderTrivia() {
  const dateKey = todayKey();
  const trivia = dailyTriviaForDate(dateKey);
  const revealed = triviaRevealedForDate(dateKey);
  els.triviaQuestion.textContent = revealed ? trivia.answer : trivia.question;
  els.triviaAnswer.textContent = revealed ? "Answer" : "";
  els.triviaAnswer.hidden = !revealed;
  els.triviaToggle.setAttribute("aria-label", revealed ? "Show trivia question" : "Reveal trivia answer");
}

function playerResultLabel(run) {
  if (run.status === "won") return `DONE ${effectiveAttempts(run)}`;
  if (run.status === "lost") return "DONE";
  if (!canGuessThisLine(run)) return "WAIT";
  return `TURN ${currentLineIndex() + 1}`;
}

let audioContext = null;

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioContext ||= new AudioContext();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function tone(frequency, start = 0, duration = 0.08, type = "square", volume = 0.04) {
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const startsAt = context.currentTime + start;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startsAt);
  gain.gain.setValueAtTime(0.0001, startsAt);
  gain.gain.exponentialRampToValueAtTime(volume, startsAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startsAt);
  oscillator.stop(startsAt + duration + 0.02);
}

function noise(start = 0, duration = 0.08, volume = 0.035) {
  const context = getAudioContext();
  if (!context) return;
  const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  const startsAt = context.currentTime + start;
  gain.gain.setValueAtTime(volume, startsAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
  source.connect(gain);
  gain.connect(context.destination);
  source.start(startsAt);
}

const sounds = {
  tap() {
    tone(540, 0, 0.045, "square", 0.025);
  },
  type() {
    noise(0, 0.012, 0.005);
    tone(900, 0, 0.018, "triangle", 0.007);
  },
  backspace() {
    tone(360, 0, 0.026, "triangle", 0.01);
  },
  invalid() {
    tone(140, 0, 0.09, "sawtooth", 0.035);
    tone(95, 0.08, 0.11, "sawtooth", 0.03);
  },
  submit() {
    tone(360, 0, 0.055, "square", 0.03);
    tone(520, 0.06, 0.065, "square", 0.025);
  },
  hint() {
    noise(0, 0.07, 0.025);
    tone(720, 0.06, 0.08, "triangle", 0.035);
  },
  switch() {
    tone(420, 0, 0.05, "triangle", 0.025);
    tone(620, 0.045, 0.05, "triangle", 0.025);
  },
  win() {
    [523, 659, 784, 1047].forEach((frequency, index) => tone(frequency, index * 0.075, 0.12, "square", 0.035));
  },
  lose() {
    [330, 247, 196].forEach((frequency, index) => tone(frequency, index * 0.09, 0.13, "sawtooth", 0.03));
  },
};

function renderDoodleControls() {
  els.pencilToggle.classList.toggle("is-active", doodleEnabled);
  els.pencilToggle.setAttribute("aria-pressed", String(doodleEnabled));
  els.pencilToggle.textContent = "✎";
  els.doodleCanvas.classList.toggle("is-drawing", doodleEnabled);
  els.colorSwatches.innerHTML = "";
  DOODLE_COLORS.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = `color-swatch ${color === doodleColor ? "is-active" : ""}`;
    swatch.style.background = color;
    swatch.setAttribute("aria-label", `Use ${color}`);
    swatch.addEventListener("click", () => {
      doodleColor = color;
      sounds.tap();
      renderDoodleControls();
    });
    els.colorSwatches.append(swatch);
  });
}

function newDoodlePathId() {
  return `${clientId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeDoodlePaths(paths) {
  return (Array.isArray(paths) ? paths : [])
    .filter((path) => path && Array.isArray(path.points) && path.points.length)
    .map((path) => ({
      ...path,
      id: path.id || `${path.color || "ink"}-${JSON.stringify(path.points)}`,
      color: path.color || DOODLE_COLORS[0],
    }));
}

function doodlePointFromEvent(event) {
  const rect = els.doodleCanvas.getBoundingClientRect();
  return {
    x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
    y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
  };
}

function doodleContext() {
  const context = els.doodleCanvas.getContext("2d");
  context.lineCap = "round";
  context.lineJoin = "round";
  return context;
}

function drawDoodlePath(path) {
  if (!path.points?.length) return;
  const context = doodleContext();
  const width = els.doodleCanvas.clientWidth;
  const height = els.doodleCanvas.clientHeight;
  context.strokeStyle = path.color;
  context.lineWidth = Math.max(3, Math.round(Math.min(width, height) * 0.008));
  context.beginPath();
  path.points.forEach((point, index) => {
    const x = point.x * width;
    const y = point.y * height;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
}

function drawDoodles() {
  const context = doodleContext();
  context.clearRect(0, 0, els.doodleCanvas.clientWidth, els.doodleCanvas.clientHeight);
  state.doodles.paths.forEach(drawDoodlePath);
  if (activeDoodlePath) drawDoodlePath(activeDoodlePath);
}

function resizeDoodleCanvas() {
  const rect = els.gamePlayArea.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  if (els.doodleCanvas.width !== Math.round(width * ratio) || els.doodleCanvas.height !== Math.round(height * ratio)) {
    els.doodleCanvas.width = Math.round(width * ratio);
    els.doodleCanvas.height = Math.round(height * ratio);
    els.doodleCanvas.style.width = `${width}px`;
    els.doodleCanvas.style.height = `${height}px`;
    const context = doodleContext();
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  drawDoodles();
}

function broadcastDoodles() {
  const payload = { dateKey: state.doodles.dateKey, paths: state.doodles.paths, clearedAt: state.doodles.clearedAt || 0 };
  try {
    doodleChannel?.postMessage(payload);
  } catch {}
  localStorage.setItem(DOODLE_SYNC_KEY, JSON.stringify({ ...payload, sentAt: Date.now() }));
  publishSharedState();
}

function applySyncedDoodles(payload) {
  if (!payload || payload.dateKey !== state.currentWord.dateKey || !Array.isArray(payload.paths)) return;
  state.doodles = { dateKey: payload.dateKey, paths: normalizeDoodlePaths(payload.paths), clearedAt: payload.clearedAt || 0 };
  activeDoodlePath = null;
  saveState();
  drawDoodles();
}

function broadcastGameReset() {
  const payload = {
    sentAt: Date.now(),
    currentWord: state.currentWord,
    usedWords: state.usedWords,
    players: state.players,
    doodles: state.doodles,
  };
  try {
    gameChannel?.postMessage(payload);
  } catch {}
  localStorage.setItem(GAME_SYNC_KEY, JSON.stringify(payload));
  publishSharedState();
}

function applySyncedGameReset(payload) {
  if (!payload?.currentWord?.word || payload.currentWord.startedAt === state.currentWord?.startedAt) return;
  state.currentWord = payload.currentWord;
  state.usedWords = Array.isArray(payload.usedWords) ? payload.usedWords : state.usedWords;
  if (Array.isArray(payload.players)) state.players = payload.players;
  state.doodles = payload.doodles && Array.isArray(payload.doodles.paths)
    ? { dateKey: payload.doodles.dateKey, paths: normalizeDoodlePaths(payload.doodles.paths), clearedAt: payload.doodles.clearedAt || 0 }
    : { dateKey: state.currentWord.dateKey, paths: [], clearedAt: 0 };
  activeDoodlePath = null;
  currentGuess = "";
  saveState();
  render();
  drawDoodles();
}

function sharedSnapshot() {
  return {
    clientId,
    updatedAt: Date.now(),
    currentWord: state.currentWord,
    usedWords: state.usedWords,
    players: state.players,
    doodles: {
      dateKey: state.doodles.dateKey,
      paths: normalizeDoodlePaths(state.doodles.paths),
      clearedAt: state.doodles.clearedAt || 0,
    },
  };
}

function publishSharedState() {
  if (!sharedNode || isApplyingSharedState) return;
  clearTimeout(sharedPublishTimer);
  sharedPublishTimer = setTimeout(() => {
    const snapshot = sharedSnapshot();
    lastSharedUpdate = Math.max(lastSharedUpdate, snapshot.updatedAt);
    sharedNode.put(JSON.stringify(snapshot));
  }, 120);
}

function mergeUsedWords(remoteUsedWords) {
  if (!Array.isArray(remoteUsedWords)) return false;
  const existing = new Set(state.usedWords.map((entry) => `${entryWord(entry)}-${entryDateKey(entry) || ""}`));
  let changed = false;
  remoteUsedWords.forEach((entry) => {
    const word = entryWord(entry);
    if (!word) return;
    const key = `${word}-${entryDateKey(entry) || ""}`;
    if (existing.has(key)) return;
    existing.add(key);
    state.usedWords.push(typeof entry === "string" ? { word, dateKey: null } : entry);
    changed = true;
  });
  return changed;
}

function mergePlayers(remotePlayers) {
  if (!Array.isArray(remotePlayers)) return false;
  const remoteById = new Map(remotePlayers.map((player) => [player.id, player]));
  let changed = false;
  state.players = state.players.map((player) => {
    const remote = remoteById.get(player.id);
    if (!remote || remote.emoji === player.emoji) return player;
    changed = true;
    return { ...player, emoji: remote.emoji };
  });
  ensureUniquePlayerEmojis();
  return changed;
}

function mergeRuns(remoteRuns = {}) {
  let changed = false;
  let shouldRepublish = false;
  state.currentWord.runs ||= {};
  Object.entries(remoteRuns).forEach(([playerId, remoteRun]) => {
    const localRun = state.currentWord.runs[playerId] || { guesses: [], hintUsed: false, status: "playing" };
    const remoteGuessCount = Array.isArray(remoteRun?.guesses) ? remoteRun.guesses.length : 0;
    const localGuessCount = Array.isArray(localRun.guesses) ? localRun.guesses.length : 0;
    const remoteIsAhead = remoteGuessCount > localGuessCount || (remoteRun?.status !== "playing" && localRun.status === "playing");
    const localIsAhead = localGuessCount > remoteGuessCount || (localRun.status !== "playing" && remoteRun?.status === "playing");

    if (remoteIsAhead) {
      state.currentWord.runs[playerId] = {
        guesses: Array.isArray(remoteRun.guesses) ? remoteRun.guesses : [],
        hintUsed: Boolean(remoteRun.hintUsed),
        status: remoteRun.status || "playing",
      };
      changed = true;
    } else if (localIsAhead) {
      shouldRepublish = true;
    } else if (remoteRun?.hintUsed && !localRun.hintUsed) {
      localRun.hintUsed = true;
      changed = true;
    }
  });
  Object.entries(state.currentWord.runs).forEach(([playerId, localRun]) => {
    if (remoteRuns[playerId]) return;
    if (localRun.guesses?.length || localRun.hintUsed || localRun.status !== "playing") shouldRepublish = true;
  });
  return { changed, shouldRepublish };
}

function mergeDoodles(remoteDoodles) {
  if (!remoteDoodles || remoteDoodles.dateKey !== state.currentWord.dateKey || !Array.isArray(remoteDoodles.paths)) return { changed: false, shouldRepublish: false };
  const remoteClearedAt = remoteDoodles.clearedAt || 0;
  const localClearedAt = state.doodles.clearedAt || 0;
  if (remoteClearedAt > localClearedAt) {
    state.doodles = { dateKey: remoteDoodles.dateKey, paths: normalizeDoodlePaths(remoteDoodles.paths), clearedAt: remoteClearedAt };
    return { changed: true, shouldRepublish: false };
  }

  const localPaths = normalizeDoodlePaths(state.doodles.paths);
  const byId = new Map(localPaths.map((path) => [path.id, path]));
  let changed = false;
  normalizeDoodlePaths(remoteDoodles.paths).forEach((path) => {
    if (byId.has(path.id)) return;
    byId.set(path.id, path);
    changed = true;
  });
  const shouldRepublish = localPaths.length > remoteDoodles.paths.length;
  state.doodles = { dateKey: remoteDoodles.dateKey, paths: [...byId.values()], clearedAt: localClearedAt };
  return { changed, shouldRepublish };
}

function applySharedSnapshot(rawSnapshot) {
  if (!rawSnapshot) return;
  let snapshot;
  try {
    snapshot = typeof rawSnapshot === "string" ? JSON.parse(rawSnapshot) : rawSnapshot;
  } catch {
    return;
  }
  if (!snapshot || snapshot.clientId === clientId || snapshot.updatedAt < lastSharedUpdate) return;
  lastSharedUpdate = snapshot.updatedAt || Date.now();
  isApplyingSharedState = true;
  let changed = false;
  let shouldRepublish = false;

  const remoteIsDifferentBoard = snapshot.currentWord?.word
    && (snapshot.currentWord.word !== state.currentWord?.word || snapshot.currentWord.dateKey !== state.currentWord?.dateKey);
  if (remoteIsDifferentBoard) {
    state.currentWord = snapshot.currentWord;
    state.usedWords = Array.isArray(snapshot.usedWords) ? snapshot.usedWords : state.usedWords;
    if (Array.isArray(snapshot.players)) state.players = snapshot.players;
    state.doodles = snapshot.doodles && Array.isArray(snapshot.doodles.paths)
      ? { dateKey: snapshot.doodles.dateKey, paths: normalizeDoodlePaths(snapshot.doodles.paths), clearedAt: snapshot.doodles.clearedAt || 0 }
      : { dateKey: state.currentWord.dateKey, paths: [], clearedAt: 0 };
    ensureUniquePlayerEmojis();
    currentGuess = "";
    changed = true;
  } else if (snapshot.currentWord?.runs) {
    changed = mergeUsedWords(snapshot.usedWords) || changed;
    changed = mergePlayers(snapshot.players) || changed;
    const runMerge = mergeRuns(snapshot.currentWord.runs);
    const doodleMerge = mergeDoodles(snapshot.doodles);
    changed = runMerge.changed || doodleMerge.changed || changed;
    shouldRepublish = runMerge.shouldRepublish || doodleMerge.shouldRepublish;
  }

  if (changed) {
    activeDoodlePath = null;
    saveState();
    render();
    drawDoodles();
  }
  isApplyingSharedState = false;
  if (shouldRepublish) publishSharedState();
}

function initSharedSync() {
  if (!window.Gun) return;
  const gun = window.Gun({ peers: [SHARED_RELAY_URL] });
  sharedNode = gun.get(SHARED_ROOM_KEY).get("snapshot");
  sharedNode.on(applySharedSnapshot);
  setTimeout(() => {
    if (!lastSharedUpdate) publishSharedState();
  }, 1200);
}

function startDoodle(event) {
  if (!doodleEnabled || !els.articlePanel.hidden) return;
  event.preventDefault();
  doodlePointerId = event.pointerId;
  els.doodleCanvas.setPointerCapture(doodlePointerId);
  activeDoodlePath = { id: newDoodlePathId(), color: doodleColor, points: [doodlePointFromEvent(event)] };
}

function moveDoodle(event) {
  if (!activeDoodlePath || event.pointerId !== doodlePointerId) return;
  event.preventDefault();
  activeDoodlePath.points.push(doodlePointFromEvent(event));
  drawDoodles();
}

function finishDoodle(event) {
  if (!activeDoodlePath || event.pointerId !== doodlePointerId) return;
  event.preventDefault();
  if (activeDoodlePath.points.length > 1) {
    ensureDoodleState(state.currentWord.dateKey);
    state.doodles.paths.push(activeDoodlePath);
    saveState();
    broadcastDoodles();
  }
  activeDoodlePath = null;
  doodlePointerId = null;
  drawDoodles();
}

function chooseMember(playerId) {
  if (!state.players.some((player) => player.id === playerId)) return;
  sounds.switch();
  state.selectedMemberId = playerId;
  state.activePlayerId = playerId;
  currentGuess = "";
  render();
  publishSharedState();
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
      sounds.switch();
      active.emoji = emoji;
      els.emojiGrid.hidden = true;
      render();
      publishSharedState();
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
    const row = document.createElement("div");
    row.className = `leaderboard-row ${player.id === activePlayer().id ? "is-active" : ""}`;
    row.innerHTML = `<strong>${player.emoji} ${player.name}</strong><small>${playerResultLabel(run)} · ${lettersFound(run)}/${WORD_LENGTH} letters</small>`;
    els.leaderboardList.append(row);
  });
}

function decodeHeadline(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function stripMarkup(text = "") {
  const container = document.createElement("div");
  container.innerHTML = text;
  return decodeHeadline(container.textContent || container.innerText || "").replace(/\s+/g, " ").trim();
}

const DEFAULT_PREVIEW_TEXT = "No story text came through the feed, but the headline has enough drama to discuss.";

function fullPreviewText(text, fallback = DEFAULT_PREVIEW_TEXT) {
  const clean = stripMarkup(text);
  return clean || fallback;
}

function trimSummary(text, fallback = DEFAULT_PREVIEW_TEXT) {
  const clean = fullPreviewText(text, fallback);
  if (!clean) return fallback;
  return clean.length > 210 ? `${clean.slice(0, 207).trim()}...` : clean;
}

function imageFromMarkup(text = "") {
  const container = document.createElement("div");
  container.innerHTML = text;
  const image = container.querySelector("img");
  return image?.getAttribute("src")
    || image?.getAttribute("data-src")
    || image?.getAttribute("data-lazy-src")
    || "";
}

function imageFromXmlItem(item) {
  const mediaContent = item.getElementsByTagName("media:content")[0];
  const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0];
  const enclosure = item.querySelector("enclosure");
  return mediaContent?.getAttribute("url")
    || mediaThumbnail?.getAttribute("url")
    || (enclosure?.getAttribute("type")?.startsWith("image/") ? enclosure.getAttribute("url") : "")
    || "";
}

function imageFromJsonItem(item) {
  return item.thumbnail
    || item.enclosure?.link
    || item.enclosure?.url
    || "";
}

function normalizeImageUrl(url, baseUrl) {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  try {
    return new URL(url, baseUrl).href;
  } catch {
    return url;
  }
}

function sourceJsonUrl(source) {
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.feedUrl)}`;
}

function proxyUrl(url) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

function sourceProxyUrl(source) {
  return proxyUrl(source.feedUrl);
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

async function fetchArticleImage(item) {
  if (!item.link) return "";
  if (ARTICLE_IMAGE_CACHE.has(item.link)) return ARTICLE_IMAGE_CACHE.get(item.link);
  try {
    const html = await fetchRss(proxyUrl(item.link));
    const doc = new DOMParser().parseFromString(html, "text/html");
    const metaImage = doc.querySelector("meta[property='og:image'], meta[name='twitter:image'], meta[property='twitter:image']");
    const image = normalizeImageUrl(metaImage?.getAttribute("content") || "", item.link);
    ARTICLE_IMAGE_CACHE.set(item.link, image);
    return image;
  } catch {
    ARTICLE_IMAGE_CACHE.set(item.link, "");
    return "";
  }
}

async function hydrateArticleImage(item) {
  if (item.image) return;
  const image = await fetchArticleImage(item);
  if (!image) return;
  item.image = image;
  if (activePreviewItem === item && !els.headlinePreview.hidden) renderPreviewContent(els.headlinePreview, item);
  if (activeArticleItem === item && !els.articlePanel.hidden) {
    els.articleImage.src = image;
    els.articleImage.hidden = false;
  }
}

function parseHeadlines(xmlText, source) {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  return [...doc.querySelectorAll("item")]
    .slice(0, source.limit)
    .map((item) => {
      const rawStory = item.querySelector("content\\:encoded")?.textContent || item.querySelector("description")?.textContent || "";
      return {
        source: source.name,
        category: source.category,
        title: decodeHeadline(item.querySelector("title")?.textContent?.trim() || ""),
        link: item.querySelector("link")?.textContent?.trim() || source.homeUrl,
        summary: trimSummary(rawStory),
        body: fullPreviewText(rawStory),
        image: imageFromXmlItem(item) || imageFromMarkup(rawStory),
      };
    })
    .filter((item) => item.title);
}

function parseJsonHeadlines(feed, source) {
  return (feed.items || [])
    .slice(0, source.limit)
    .map((item) => {
      const rawStory = item.content || item.description || item.contentSnippet || "";
      return {
        source: source.name,
        category: source.category,
        title: decodeHeadline(item.title || ""),
        link: item.link || source.homeUrl,
        summary: trimSummary(rawStory),
        body: fullPreviewText(rawStory),
        image: imageFromJsonItem(item) || imageFromMarkup(rawStory),
      };
    })
    .filter((item) => item.title);
}

function uniqueHeadlines(headlines) {
  const seen = new Set();
  return headlines.filter((item) => {
    const key = item.title.toLowerCase().replace(/\s+/g, " ").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function balancedHeadlines(headlines) {
  const buckets = new Map();
  headlines.forEach((item) => {
    const category = item.category || "general";
    if (!buckets.has(category)) buckets.set(category, []);
    buckets.get(category).push(item);
  });

  const balanced = [];
  while ([...buckets.values()].some((items) => items.length)) {
    HEADLINE_CATEGORY_ROTATION.forEach((category) => {
      const bucket = buckets.get(category);
      if (bucket?.length) balanced.push(bucket.shift());
    });
    buckets.forEach((bucket, category) => {
      if (!HEADLINE_CATEGORY_ROTATION.includes(category) && bucket.length) balanced.push(bucket.shift());
    });
  }
  return balanced;
}

function renderPreviewContent(container, item) {
  const summary = item.summary || trimSummary("");
  container.innerHTML = "";
  if (item.image) {
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "";
    container.append(image);
  }

  const copy = document.createElement("div");
  const source = document.createElement("strong");
  const title = document.createElement("h3");
  const text = document.createElement("p");
  source.textContent = item.source || "Headlines";
  title.textContent = item.title;
  text.textContent = summary;
  copy.append(source, title, text);
  container.append(copy);
}

function showHeadlinePreview(item) {
  activePreviewItem = item;
  els.headlineTrack.classList.add("is-paused");
  renderPreviewContent(els.headlinePreview, item);
  els.headlinePreview.hidden = false;
  hydrateArticleImage(item);
}

function hideHeadlinePreview() {
  activePreviewItem = null;
  els.headlineTrack.classList.remove("is-paused");
  els.headlinePreview.hidden = true;
}

function showArticlePanel(item) {
  sounds.switch();
  hideHeadlinePreview();
  activeArticleItem = item;
  els.headlineTrack.classList.add("is-paused");
  els.gamePlayArea.hidden = true;
  els.articlePanel.hidden = false;
  els.articleSource.textContent = item.source || "Headlines";
  els.articleTitle.textContent = item.title;
  els.articleSummary.textContent = item.body || item.summary || DEFAULT_PREVIEW_TEXT;
  els.articleLink.href = item.link || "#";
  if (item.image) {
    els.articleImage.src = item.image;
    els.articleImage.hidden = false;
  } else {
    els.articleImage.removeAttribute("src");
    els.articleImage.hidden = true;
  }
  hydrateArticleImage(item);
}

function closeArticlePanel() {
  sounds.switch();
  activeArticleItem = null;
  els.headlineTrack.classList.remove("is-paused");
  els.articlePanel.hidden = true;
  els.gamePlayArea.hidden = false;
}

function renderHeadlines(headlines) {
  const items = headlines.length ? headlines : FALLBACK_HEADLINES;
  els.headlineTrack.innerHTML = "";
  for (let loop = 0; loop < 2; loop += 1) {
    const group = document.createElement("div");
    group.className = "ticker-group";
    group.setAttribute("aria-hidden", loop === 1 ? "true" : "false");
    items.forEach((item) => {
      const { source, title, link } = item;
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = title;
      anchor.addEventListener("mouseenter", () => showHeadlinePreview(item));
      anchor.addEventListener("mouseover", () => showHeadlinePreview(item));
      anchor.addEventListener("pointerenter", () => showHeadlinePreview(item));
      anchor.addEventListener("mouseleave", hideHeadlinePreview);
      anchor.addEventListener("pointerleave", hideHeadlinePreview);
      anchor.addEventListener("focus", () => showHeadlinePreview(item));
      anchor.addEventListener("blur", hideHeadlinePreview);
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        showArticlePanel(item);
      });
      group.append(anchor);

      const divider = document.createElement("span");
      divider.className = "ticker-divider";
      divider.textContent = "|";
      group.append(divider);
    });
    els.headlineTrack.append(group);
  }
}

async function loadHeadlinesForSource(source) {
  try {
    return parseHeadlines(await fetchRss(source.feedUrl), source);
  } catch {
    try {
      return parseJsonHeadlines(await fetchJson(sourceJsonUrl(source)), source);
    } catch {
      try {
        return parseHeadlines(await fetchRss(sourceProxyUrl(source)), source);
      } catch {
        return [];
      }
    }
  }
}

async function loadHeadlines() {
  const sourceResults = await Promise.all(HEADLINE_SOURCES.map(loadHeadlinesForSource));
  renderHeadlines(balancedHeadlines(uniqueHeadlines(sourceResults.flat())));
}

function handleKey(key) {
  if (!els.articlePanel.hidden) {
    if (key === "Escape") closeArticlePanel();
    return;
  }

  const run = activeRun();
  if (!canGuessThisLine(run)) {
    sounds.invalid();
    return;
  }

  if (key === "ENTER") {
    submitGuess();
    return;
  }

  if (key === "⌫" || key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
    sounds.backspace();
    render();
    return;
  }

  if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
    currentGuess += key;
    sounds.type();
    render();
  } else if (/^[A-Z]$/.test(key)) {
    sounds.invalid();
  }
}

function submitGuess() {
  const run = activeRun();
  if (!canGuessThisLine(run)) {
    sounds.invalid();
    return;
  }

  if (currentGuess.length !== WORD_LENGTH) {
    sounds.invalid();
    return;
  }
  if (!/^[A-Z]{5}$/.test(currentGuess)) {
    sounds.invalid();
    return;
  }
  if (!VALID_GUESSES.has(currentGuess)) {
    sounds.invalid();
    return;
  }

  const result = evaluateGuess(currentGuess, state.currentWord.word);
  run.guesses.push({ word: currentGuess, result });
  const won = result.every((stateName) => stateName === "correct");
  if (won) {
    sounds.win();
    completeRun(run, true);
  } else if (effectiveAttempts(run) >= MAX_ATTEMPTS) {
    sounds.lose();
    completeRun(run, false);
  } else {
    sounds.submit();
  }
  currentGuess = "";
  render();
}

function completeRun(run, won) {
  if (run.status !== "playing") return;
  run.status = won ? "won" : "lost";
}

els.hintButton.addEventListener("click", () => {
  const run = activeRun();
  if (run.hintUsed || run.status !== "playing") return;
  sounds.hint();
  run.hintUsed = true;
  if (effectiveAttempts(run) >= MAX_ATTEMPTS) completeRun(run, false);
  render();
  publishSharedState();
});

els.resetGameButton.addEventListener("click", () => {
  const confirmed = window.confirm("Start a new game for everyone? This clears all current guesses and doodles.");
  if (!confirmed) return;
  sounds.switch();
  resetGameForGroup();
});

els.triviaToggle.addEventListener("click", () => {
  if (triviaRevealedForDate()) localStorage.removeItem(TRIVIA_REVEAL_KEY);
  else localStorage.setItem(TRIVIA_REVEAL_KEY, todayKey());
  sounds.tap();
  renderTrivia();
});

els.emojiButton.addEventListener("click", () => {
  sounds.tap();
  els.emojiGrid.hidden = !els.emojiGrid.hidden;
});

els.homeButton.addEventListener("click", () => {
  sounds.switch();
  state.selectedMemberId = null;
  saveState();
  renderIdentityGate(true);
});

els.articleCloseButton.addEventListener("click", closeArticlePanel);

els.pencilToggle.addEventListener("click", () => {
  doodleEnabled = !doodleEnabled;
  els.doodleMenu.hidden = !doodleEnabled;
  sounds.switch();
  renderDoodleControls();
});

els.clearDoodlesButton.addEventListener("click", () => {
  ensureDoodleState(state.currentWord.dateKey);
  state.doodles.paths = [];
  state.doodles.clearedAt = Date.now();
  activeDoodlePath = null;
  saveState();
  broadcastDoodles();
  drawDoodles();
  sounds.tap();
});

document.addEventListener("click", (event) => {
  if (!doodleEnabled || event.target.closest(".doodle-tool")) return;
  els.doodleMenu.hidden = true;
});

els.doodleCanvas.addEventListener("pointerdown", startDoodle);
els.doodleCanvas.addEventListener("pointermove", moveDoodle);
els.doodleCanvas.addEventListener("pointerup", finishDoodle);
els.doodleCanvas.addEventListener("pointercancel", finishDoodle);

document.addEventListener("keydown", (event) => {
  if (event.target.tagName === "INPUT") return;
  if (event.key === "Enter") handleKey("ENTER");
  else if (event.key === "Escape") handleKey("Escape");
  else if (event.key === "Backspace") handleKey("Backspace");
  else if (/^[a-zA-Z]$/.test(event.key)) handleKey(event.key.toUpperCase());
});

window.addEventListener("resize", resizeDoodleCanvas);
window.addEventListener("storage", (event) => {
  try {
    if (event.key === DOODLE_SYNC_KEY && event.newValue) applySyncedDoodles(JSON.parse(event.newValue));
    if (event.key === GAME_SYNC_KEY && event.newValue) applySyncedGameReset(JSON.parse(event.newValue));
  } catch {}
});

if ("BroadcastChannel" in window) {
  doodleChannel = new BroadcastChannel("funny-team-wordle-doodles");
  doodleChannel.addEventListener("message", (event) => applySyncedDoodles(event.data));
  gameChannel = new BroadcastChannel("funny-team-wordle-game");
  gameChannel.addEventListener("message", (event) => applySyncedGameReset(event.data));
}

new ResizeObserver(resizeDoodleCanvas).observe(els.gamePlayArea);

render();
initSharedSync();
loadHeadlines();
