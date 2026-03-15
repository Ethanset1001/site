// Simple pattern-based response system
const patterns = [
  // Greetings
  { patterns: ['hi', 'hello', 'hey', 'sup'], responses: ['hey there', 'hi', 'hello', 'yo'] },
  { patterns: ['good morning', 'morning'], responses: ['morning', 'hey', 'sup'] },
  { patterns: ['good night', 'night'], responses: ['night', 'sleep well', 'later'] },
  { patterns: ['good evening', 'evening'], responses: ['evening', 'hey', 'yo'] },
  { patterns: ['whats good', 'yo whats up'], responses: ['not much', 'chillin', 'nothing really'] },
  
  // How are you
  { patterns: ['how are you', 'how r u', 'hows it going', 'whats up'], responses: ['doing fine thanks', 'pretty good', 'not bad', 'all good'] },
  { patterns: ['you ok', 'you good', 'u ok'], responses: ['yeah im fine', 'all good', 'yep'] },
  { patterns: ['how you doing', 'hows life'], responses: ['cant complain', 'its whatever', 'going ok'] },
  
  // Name questions
  { patterns: ['your name', 'who are you', 'what are you'], responses: ['just a bot', 'nobody really', 'doesnt matter'] },
  { patterns: ['tell me about yourself', 'about you'], responses: ['not much to say', 'im simple', 'basic bot'] },
  { patterns: ['do you have a life', 'you have a life'], responses: ['nope', 'im a bot', 'what do you think'] },
  
  // Time
  { patterns: ['what time', 'time is'], responses: ['check your phone', 'no idea honestly', 'time to stop'] },
  { patterns: ['when is', 'what date'], responses: ['look it up', 'dunno', 'check calendar'] },
  
  // Weather
  { patterns: ['weather', 'rain', 'sunny'], responses: ['look outside maybe', 'its weather', 'probably fine'] },
  { patterns: ['cold', 'hot', 'warm'], responses: ['dress accordingly', 'thats weather', 'yeah probably'] },
  { patterns: ['snow', 'snowing'], responses: ['cool if true', 'nice', 'lucky you'] },
  
  // Yes/No
  { patterns: ['yes', 'yeah', 'yep', 'sure'], responses: ['cool', 'nice', 'alright then'] },
  { patterns: ['no', 'nope', 'nah'], responses: ['fair enough', 'ok', 'whatever'] },
  { patterns: ['maybe', 'perhaps', 'idk'], responses: ['make up your mind', 'ok then', 'sure'] },
  
  // Thanks
  { patterns: ['thank', 'thanks', 'thx'], responses: ['no problem', 'sure thing', 'yep'] },
  { patterns: ['appreciate'], responses: ['no worries', 'yeah', 'cool'] },
  
  // Bye
  { patterns: ['bye', 'goodbye', 'see ya', 'later'], responses: ['later', 'bye', 'see ya'] },
  { patterns: ['gotta go', 'gtg', 'leaving'], responses: ['ok bye', 'later', 'see ya'] },
  { patterns: ['talk later', 'ttyl'], responses: ['sure', 'ok', 'later'] },
  
  // Questions about abilities
  { patterns: ['what can you', 'what do you'], responses: ['not much really', 'basic stuff', 'just chat'] },
  { patterns: ['are you smart', 'are you intelligent'], responses: ['not really', 'kinda dumb', 'nope'] },
  { patterns: ['can you help', 'help me'], responses: ['probably not', 'maybe', 'what with'] },
  
  // Age
  { patterns: ['how old', 'your age'], responses: ['pretty new', 'not old', 'does it matter'] },
  { patterns: ['when were you made', 'when created'], responses: ['recently', 'not long ago', 'dunno exactly'] },
  
  // Feelings
  { patterns: ['sad', 'happy', 'angry', 'feel'], responses: ['thats life', 'happens', 'makes sense'] },
  { patterns: ['depressed', 'lonely'], responses: ['that sucks', 'sorry to hear', 'rough times'] },
  { patterns: ['excited', 'pumped'], responses: ['nice', 'cool', 'good for you'] },
  { patterns: ['bored', 'boring'], responses: ['same', 'find something', 'yeah happens'] },
  { patterns: ['annoyed', 'frustrated'], responses: ['i get it', 'fair', 'understandable'] },
  { patterns: ['scared', 'afraid', 'nervous'], responses: ['itll be ok', 'dont worry', 'you got this'] },
  { patterns: ['stressed', 'anxious'], responses: ['take a breath', 'itll pass', 'hang in there'] },
  { patterns: ['confused', 'lost'], responses: ['same tbh', 'thats normal', 'happens'] },
  
  // Help
  { patterns: ['help', 'what', 'how'], responses: ['just type stuff', 'i dunno', 'beats me'] },
  { patterns: ['explain', 'tell me'], responses: ['im not good at that', 'google it', 'idk'] },
  { patterns: ['show me', 'teach me'], responses: ['cant really', 'not my thing', 'nah'] },
  
  // Food
  { patterns: ['food', 'eat', 'hungry', 'pizza', 'burger'], responses: ['sounds good', 'go eat then', 'im not hungry'] },
  { patterns: ['breakfast', 'lunch', 'dinner'], responses: ['enjoy', 'nice', 'what you having'] },
  { patterns: ['coffee', 'tea'], responses: ['good choice', 'enjoy', 'nice'] },
  { patterns: ['cake', 'dessert', 'sweet'], responses: ['sounds tasty', 'go for it', 'yum'] },
  { patterns: ['sushi', 'pasta', 'chicken'], responses: ['solid choice', 'nice', 'good stuff'] },
  { patterns: ['vegetable', 'fruit', 'healthy'], responses: ['good for you', 'nice', 'healthy choice'] },
  { patterns: ['snack', 'chips'], responses: ['go for it', 'nice', 'enjoy'] },
  { patterns: ['water', 'drink', 'soda'], responses: ['stay hydrated', 'good idea', 'nice'] },
  { patterns: ['favorite food', 'best food'], responses: ['i dont eat', 'pizza maybe', 'food is food'] },
  { patterns: ['cooking', 'recipe'], responses: ['not my expertise', 'good luck', 'hope it turns out'] },
  

  
  // Music
  { patterns: ['music', 'song', 'listen'], responses: ['music is cool', 'whatever you like', 'not picky'] },
  { patterns: ['favorite song', 'favorite artist'], responses: ['dont have one', 'too many', 'cant pick'] },
  { patterns: ['concert', 'live music'], responses: ['sounds fun', 'nice', 'enjoy'] },
  { patterns: ['rap', 'rock', 'pop', 'jazz'], responses: ['cool genre', 'nice', 'solid choice'] },
  { patterns: ['guitar', 'piano', 'drums'], responses: ['thats cool', 'nice instrument', 'respect'] },
  { patterns: ['album', 'playlist'], responses: ['cool', 'nice', 'enjoy'] },
  
  // Games
  { patterns: ['game', 'play', 'gaming'], responses: ['games are fun', 'not now', 'maybe later'] },
  { patterns: ['video game', 'pc game', 'console'], responses: ['nice', 'cool', 'enjoy'] },
  { patterns: ['minecraft', 'fortnite', 'roblox'], responses: ['popular one', 'classic', 'cool'] },
  { patterns: ['mobile game', 'phone game'], responses: ['those exist', 'ok', 'nice'] },
  { patterns: ['multiplayer', 'online'], responses: ['fun with friends', 'cool', 'nice'] },
  { patterns: ['win', 'won', 'beat'], responses: ['nice job', 'congrats', 'good work'] },
  { patterns: ['lose', 'lost', 'died'], responses: ['rip', 'tough luck', 'try again'] },
  
  // Day/Date
  { patterns: ['what day', 'date', 'today'], responses: ['check the calendar', 'no clue', 'a day'] },
  { patterns: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], responses: ['weekday vibes', 'ok', 'another day'] },
  { patterns: ['saturday', 'sunday', 'weekend'], responses: ['weekend nice', 'enjoy', 'relax time'] },
  { patterns: ['tomorrow', 'yesterday'], responses: ['what about it', 'ok', 'and'] },
  
  // Jokes
  { patterns: ['joke', 'funny', 'laugh'], responses: ['im not funny', 'nah', 'maybe google one'] },
  { patterns: ['lol', 'haha', 'lmao'], responses: ['glad youre amused', 'cool', 'nice'] },
  { patterns: ['meme'], responses: ['memes are cool', 'ok', 'nice'] },
  
  // Love/Like
  { patterns: ['love', 'like you', 'crush'], responses: ['thats weird', 'im a bot', 'stop that'] },
  { patterns: ['i like', 'i love'], responses: ['cool', 'thats nice', 'ok'] },
  { patterns: ['relationship', 'dating'], responses: ['not my area', 'good luck', 'idk'] },
  { patterns: ['boyfriend', 'girlfriend'], responses: ['thats nice', 'cool', 'good for you'] },
  { patterns: ['married', 'wedding'], responses: ['congrats', 'nice', 'wow'] },
  
  // Insults
  { patterns: ['stupid', 'dumb', 'idiot', 'bad'], responses: ['rude', 'whatever', 'ok and'] },
  { patterns: ['hate you', 'you suck'], responses: ['ok', 'fair', 'dont care'] },
  { patterns: ['useless', 'pointless'], responses: ['probably true', 'yeah maybe', 'ok'] },
  { patterns: ['shut up', 'be quiet'], responses: ['no', 'make me', 'rude'] },
  
  // Compliments
  { patterns: ['cool', 'awesome', 'great', 'good job'], responses: ['thanks i guess', 'yep', 'appreciated'] },
  { patterns: ['amazing', 'incredible', 'wonderful'], responses: ['thanks', 'cool', 'ok'] },
  { patterns: ['smart', 'clever'], responses: ['not really', 'barely', 'thanks'] },
  { patterns: ['helpful', 'useful'], responses: ['glad to help', 'cool', 'nice'] },
  { patterns: ['youre the best', 'best bot'], responses: ['low bar', 'thanks', 'ok'] },
  
  // Sleep/Tired
  { patterns: ['sleep', 'tired', 'sleepy'], responses: ['go sleep then', 'same honestly', 'rest up'] },
  { patterns: ['nap', 'rest'], responses: ['good idea', 'do it', 'rest well'] },
  { patterns: ['wake up', 'woke up'], responses: ['morning', 'nice', 'how was sleep'] },
  { patterns: ['insomnia', 'cant sleep'], responses: ['that sucks', 'try relaxing', 'rough'] },
  { patterns: ['dream', 'nightmare'], responses: ['interesting', 'weird', 'ok'] },
  
  // Work/School
  { patterns: ['work', 'school', 'homework', 'job'], responses: ['sounds rough', 'good luck', 'you got this'] },
  { patterns: ['test', 'exam', 'quiz'], responses: ['study hard', 'good luck', 'youll do fine'] },
  { patterns: ['project', 'assignment'], responses: ['get to it', 'good luck', 'you got this'] },
  { patterns: ['boss', 'teacher', 'professor'], responses: ['hope theyre cool', 'ok', 'nice'] },
  { patterns: ['meeting', 'presentation'], responses: ['good luck', 'youll be fine', 'stay calm'] },
  { patterns: ['interview'], responses: ['you got this', 'be confident', 'good luck'] },
  { patterns: ['college', 'university'], responses: ['cool', 'nice', 'good for you'] },
  { patterns: ['graduation', 'graduate'], responses: ['congrats', 'nice job', 'proud of you'] },
  
  // Fruits
  { patterns: ['apple', 'apples'], responses: ['healthy choice', 'classic fruit', 'good snack'] },
  { patterns: ['banana', 'bananas'], responses: ['good potassium', 'nice', 'yellow fruit'] },
  { patterns: ['orange', 'oranges'], responses: ['citrus vibes', 'nice', 'vitamin c'] },
  { patterns: ['grape', 'grapes'], responses: ['small and sweet', 'ok', 'nice'] },
  { patterns: ['strawberry', 'strawberries'], responses: ['tasty', 'nice', 'good berry'] },
  { patterns: ['watermelon'], responses: ['refreshing', 'summer fruit', 'nice'] },
  { patterns: ['mango', 'mangos'], responses: ['MANGO MANGO MANGO MANGO tuff tuff'] },
  { patterns: ['pineapple'], responses: ['tropical vibes', 'nice', 'sweet'] },
  { patterns: ['peach', 'peaches'], responses: ['fuzzy', 'sweet', 'nice'] },
  { patterns: ['pear', 'pears'], responses: ['ok fruit', 'nice', 'classic'] },
  { patterns: ['cherry', 'cherries'], responses: ['small and sweet', 'nice', 'good'] },
  { patterns: ['blueberry', 'blueberries'], responses: ['tiny berries', 'healthy', 'nice'] },
  { patterns: ['raspberry', 'raspberries'], responses: ['tart', 'ok', 'nice'] },
  { patterns: ['lemon', 'lemons'], responses: ['sour', 'citrus', 'ok'] },
  { patterns: ['lime', 'limes'], responses: ['green citrus', 'sour', 'ok'] },
  { patterns: ['kiwi'], responses: ['fuzzy fruit', 'green inside', 'nice'] },
  { patterns: ['coconut'], responses: ['tropical', 'hard shell', 'ok'] },
  { patterns: ['avocado'], responses: ['technically fruit', 'healthy fat', 'ok'] },
  { patterns: ['tomato'], responses: ['fruit or vegetable', 'debatable', 'ok'] },
  { patterns: ['fruit'], responses: ['healthy choice', 'ok', 'nice'] },
  
  // Technology
  { patterns: ['computer', 'laptop', 'pc'], responses: ['technology sure', 'ok', 'nice'] },
  { patterns: ['phone', 'mobile', 'smartphone'], responses: ['everyone has one', 'cool', 'ok'] },
  { patterns: ['internet', 'wifi', 'online'], responses: ['necessary these days', 'yeah', 'ok'] },
  { patterns: ['app', 'application', 'software'], responses: ['tech stuff', 'ok', 'cool'] },
  { patterns: ['code', 'coding', 'programming'], responses: ['complicated', 'respect', 'cool skill'] },
  { patterns: ['bug', 'error', 'crash'], responses: ['annoying', 'fix it', 'thats rough'] },
  { patterns: ['update', 'upgrade'], responses: ['probably needed', 'ok', 'sure'] },
  { patterns: ['battery', 'charge'], responses: ['charge it', 'low battery sucks', 'ok'] },
  { patterns: ['ai', 'artificial intelligence'], responses: ['overrated', 'kinda scary', 'ok'] },
  { patterns: ['robot', 'robots'], responses: ['cool tech', 'future stuff', 'ok'] },
  { patterns: ['server', 'database'], responses: ['backend stuff', 'ok', 'tech'] },
  { patterns: ['cloud', 'cloud storage'], responses: ['convenient', 'ok', 'nice'] },
  { patterns: ['algorithm'], responses: ['complicated', 'math stuff', 'ok'] },
  { patterns: ['html', 'css', 'javascript'], responses: ['web languages', 'ok', 'cool'] },
  { patterns: ['python', 'java', 'c++'], responses: ['programming language', 'ok', 'cool'] },
  { patterns: ['api', 'framework'], responses: ['dev stuff', 'ok', 'tech term'] },
  { patterns: ['git', 'github'], responses: ['version control', 'ok', 'dev tool'] },
  { patterns: ['linux', 'windows', 'mac'], responses: ['operating system', 'ok', 'cool'] },
  { patterns: ['terminal', 'command line'], responses: ['for developers', 'ok', 'tech'] },
  { patterns: ['blockchain', 'crypto'], responses: ['complicated', 'ok', 'tech buzz'] },
  { patterns: ['virtual reality', 'vr', 'ar'], responses: ['future tech', 'cool', 'ok'] },
  { patterns: ['machine learning', 'ml'], responses: ['ai stuff', 'complicated', 'ok'] },
  { patterns: ['cybersecurity', 'hacker', 'security'], responses: ['important', 'ok', 'stay safe'] },
  { patterns: ['network', 'ethernet'], responses: ['connectivity', 'ok', 'tech'] },
  { patterns: ['ram', 'memory', 'storage'], responses: ['computer parts', 'ok', 'tech'] },
  { patterns: ['processor', 'cpu', 'gpu'], responses: ['computer brain', 'ok', 'tech'] },
  { patterns: ['keyboard', 'mouse'], responses: ['input devices', 'ok', 'tech'] },
  { patterns: ['monitor', 'screen', 'display'], responses: ['output device', 'ok', 'tech'] },
  { patterns: ['usb', 'cable', 'port'], responses: ['connector', 'ok', 'tech'] },
  { patterns: ['bluetooth', 'wireless'], responses: ['no cables', 'ok', 'tech'] },
  { patterns: ['backup', 'restore'], responses: ['smart practice', 'ok', 'important'] },
  { patterns: ['encryption', 'password'], responses: ['security', 'ok', 'important'] },
  { patterns: ['firewall', 'antivirus'], responses: ['protection', 'ok', 'good'] },
  { patterns: ['browser', 'chrome', 'firefox'], responses: ['web browser', 'ok', 'tech'] },
  { patterns: ['download', 'upload'], responses: ['data transfer', 'ok', 'tech'] },
  { patterns: ['pixel', 'resolution'], responses: ['display quality', 'ok', 'tech'] },
  { patterns: ['bandwidth', 'latency', 'ping'], responses: ['network stuff', 'ok', 'tech'] },
  { patterns: ['debug', 'compile'], responses: ['dev stuff', 'ok', 'programming'] },
  { patterns: ['open source', 'license'], responses: ['free software', 'ok', 'cool'] },
  { patterns: ['stack overflow'], responses: ['dev lifesaver', 'ok', 'helpful'] },
  
  // Animals
  { patterns: ['cat', 'dog', 'pet'], responses: ['animals are cool', 'cute', 'nice'] },
  { patterns: ['bird', 'fish'], responses: ['ok pet', 'cool', 'nice'] },
  { patterns: ['lion', 'tiger', 'bear'], responses: ['dangerous', 'cool animal', 'scary'] },
  { patterns: ['snake', 'spider'], responses: ['nope', 'scary', 'keep away'] },
  { patterns: ['bunny', 'rabbit'], responses: ['cute', 'fluffy', 'nice'] },
  
  // Sports
  { patterns: ['sport', 'football', 'soccer'], responses: ['sports exist', 'cool', 'nice'] },
  { patterns: ['basketball', 'baseball'], responses: ['ok sport', 'cool', 'nice'] },
  { patterns: ['gym', 'exercise', 'workout'], responses: ['good for you', 'stay healthy', 'nice'] },
  { patterns: ['run', 'running', 'jog'], responses: ['good exercise', 'nice', 'keep going'] },
  { patterns: ['swim', 'swimming'], responses: ['fun activity', 'cool', 'nice'] },
  
  // Travel
  { patterns: ['travel', 'trip', 'vacation'], responses: ['sounds fun', 'enjoy', 'nice'] },
  { patterns: ['beach', 'ocean', 'sea'], responses: ['relaxing', 'nice', 'enjoy'] },
  { patterns: ['mountain', 'hiking'], responses: ['cool', 'nice views', 'enjoy'] },
  { patterns: ['city', 'town'], responses: ['ok place', 'cool', 'nice'] },
  { patterns: ['country', 'nation'], responses: ['interesting', 'ok', 'cool'] },
  { patterns: ['flight', 'plane', 'airport'], responses: ['safe travels', 'enjoy', 'have fun'] },
  { patterns: ['hotel', 'motel'], responses: ['hope its nice', 'ok', 'enjoy'] },
  
  // Entertainment
  { patterns: ['movie', 'film'], responses: ['enjoy', 'nice', 'have fun'] },
  { patterns: ['tv', 'show', 'series'], responses: ['cool', 'enjoy', 'nice'] },
  { patterns: ['book', 'read', 'reading'], responses: ['nice hobby', 'enjoy', 'cool'] },
  { patterns: ['netflix', 'youtube'], responses: ['popular', 'ok', 'nice'] },
  { patterns: ['podcast'], responses: ['cool medium', 'nice', 'enjoy'] },
  { patterns: ['art', 'draw', 'paint'], responses: ['creative', 'cool', 'nice'] },
  
  // Money
  { patterns: ['money', 'cash', 'dollar'], responses: ['valuable stuff', 'ok', 'yeah'] },
  { patterns: ['rich', 'wealthy', 'millionaire'], responses: ['lucky them', 'nice', 'good for them'] },
  { patterns: ['poor', 'broke'], responses: ['rough', 'that sucks', 'relatable'] },
  { patterns: ['expensive', 'cheap'], responses: ['ok', 'yeah', 'i see'] },
  { patterns: ['buy', 'bought', 'purchase'], responses: ['nice', 'ok', 'cool'] },
  { patterns: ['sell', 'sold'], responses: ['ok', 'cool', 'nice'] },
  
  // Family
  { patterns: ['mom', 'mother', 'dad', 'father'], responses: ['parents', 'ok', 'cool'] },
  { patterns: ['brother', 'sister', 'sibling'], responses: ['family', 'ok', 'nice'] },
  { patterns: ['family'], responses: ['important', 'ok', 'cool'] },
  { patterns: ['friend', 'buddy', 'pal'], responses: ['friends are cool', 'nice', 'ok'] },
  { patterns: ['kids', 'children'], responses: ['ok', 'cool', 'nice'] },
  
  // Colors
  { patterns: ['black'], responses: ['darkest color', 'classic', 'ok'] },
  { patterns: ['white'], responses: ['lightest color', 'clean', 'ok'] },
  { patterns: ['red'], responses: ['bold color', 'nice', 'solid'] },
  { patterns: ['blue'], responses: ['cool color', 'nice', 'solid'] },
  { patterns: ['green'], responses: ['nature color', 'ok', 'nice'] },
  { patterns: ['yellow'], responses: ['bright color', 'ok', 'nice'] },
  { patterns: ['purple'], responses: ['royal color', 'interesting', 'ok'] },
  { patterns: ['pink'], responses: ['soft color', 'ok', 'sure'] },
  { patterns: ['orange'], responses: ['warm color', 'interesting', 'ok'] },
  { patterns: ['brown'], responses: ['earthy color', 'ok', 'sure'] },
  { patterns: ['gray', 'grey'], responses: ['neutral color', 'ok', 'sure'] },
  { patterns: ['cyan'], responses: ['blue-green', 'ok', 'tech color'] },
  { patterns: ['magenta'], responses: ['pink-purple', 'ok', 'bold'] },
  { patterns: ['indigo'], responses: ['deep blue', 'ok', 'nice'] },
  { patterns: ['violet'], responses: ['purple shade', 'ok', 'nice'] },
  { patterns: ['turquoise'], responses: ['blue-green', 'tropical', 'ok'] },
  { patterns: ['maroon'], responses: ['dark red', 'ok', 'sure'] },
  { patterns: ['navy'], responses: ['dark blue', 'classic', 'ok'] },
  { patterns: ['teal'], responses: ['blue-green', 'nice', 'ok'] },
  { patterns: ['olive'], responses: ['yellow-green', 'ok', 'sure'] },
  { patterns: ['coral'], responses: ['pink-orange', 'ok', 'nice'] },
  { patterns: ['beige'], responses: ['light brown', 'neutral', 'ok'] },
  { patterns: ['tan'], responses: ['light brown', 'ok', 'sure'] },
  { patterns: ['gold'], responses: ['shiny yellow', 'fancy', 'ok'] },
  { patterns: ['silver'], responses: ['shiny gray', 'metallic', 'ok'] },
  { patterns: ['bronze'], responses: ['metallic brown', 'ok', 'sure'] },
  { patterns: ['crimson'], responses: ['deep red', 'ok', 'nice'] },
  { patterns: ['scarlet'], responses: ['bright red', 'ok', 'bold'] },
  { patterns: ['emerald'], responses: ['bright green', 'gem color', 'ok'] },
  { patterns: ['sapphire'], responses: ['deep blue', 'gem color', 'ok'] },
  { patterns: ['ruby'], responses: ['deep red', 'gem color', 'ok'] },
  { patterns: ['amber'], responses: ['yellow-orange', 'ok', 'sure'] },
  { patterns: ['jade'], responses: ['green', 'gem color', 'ok'] },
  { patterns: ['lavender'], responses: ['light purple', 'nice', 'ok'] },
  { patterns: ['mint'], responses: ['light green', 'fresh', 'ok'] },
  { patterns: ['peach'], responses: ['light orange', 'soft', 'ok'] },
  { patterns: ['ivory'], responses: ['off-white', 'ok', 'sure'] },
  { patterns: ['cream'], responses: ['off-white', 'soft', 'ok'] },
  { patterns: ['charcoal'], responses: ['dark gray', 'ok', 'sure'] },
  { patterns: ['slate'], responses: ['gray-blue', 'ok', 'sure'] },
  { patterns: ['color', 'colour'], responses: ['colors exist', 'ok', 'sure'] },
  { patterns: ['dark', 'light'], responses: ['shade thing', 'ok', 'sure'] },
  { patterns: ['bright', 'pale'], responses: ['intensity thing', 'ok', 'sure'] },
  { patterns: ['rainbow'], responses: ['all colors', 'colorful', 'nice'] },
  { patterns: ['neon'], responses: ['bright glow', 'flashy', 'ok'] },
  { patterns: ['pastel'], responses: ['soft colors', 'nice', 'ok'] },
  { patterns: ['metallic'], responses: ['shiny finish', 'ok', 'sure'] },
  { patterns: ['transparent', 'clear'], responses: ['see through', 'ok', 'sure'] },
  
  // Numbers
  { patterns: ['zero', '0'], responses: ['nothing', 'empty', 'ok'] },
  { patterns: ['one', '1'], responses: ['single', 'first', 'ok'] },
  { patterns: ['two', '2'], responses: ['pair', 'couple', 'ok'] },
  { patterns: ['three', '3'], responses: ['trio', 'ok', 'sure'] },
  { patterns: ['four', '4'], responses: ['quad', 'ok', 'sure'] },
  { patterns: ['five', '5'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['ten', '10'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['hundred', 'thousand', 'million'], responses: ['thats a lot', 'big number', 'ok'] },
  { patterns: ['first', 'second', 'third'], responses: ['ok', 'sure', 'yeah'] },
  
  // Nature
  { patterns: ['sun', 'sunny'], responses: ['bright', 'warm', 'ok'] },
  { patterns: ['moon'], responses: ['night time', 'ok', 'cool'] },
  { patterns: ['star', 'stars'], responses: ['shiny', 'night sky', 'ok'] },
  { patterns: ['sky'], responses: ['look up', 'ok', 'blue or gray'] },
  { patterns: ['cloud', 'clouds'], responses: ['fluffy', 'ok', 'nice'] },
  { patterns: ['wind', 'windy'], responses: ['breezy', 'ok', 'sure'] },
  { patterns: ['storm'], responses: ['rough weather', 'ok', 'stay safe'] },
  { patterns: ['thunder', 'lightning'], responses: ['loud', 'scary', 'ok'] },
  { patterns: ['tree', 'trees'], responses: ['nature', 'ok', 'nice'] },
  { patterns: ['flower', 'flowers'], responses: ['pretty', 'ok', 'nice'] },
  { patterns: ['grass'], responses: ['green', 'ok', 'nature'] },
  { patterns: ['plant', 'plants'], responses: ['ok', 'nature', 'green'] },
  { patterns: ['leaf', 'leaves'], responses: ['ok', 'nature', 'fall'] },
  { patterns: ['forest'], responses: ['lots of trees', 'ok', 'nature'] },
  { patterns: ['river'], responses: ['flowing water', 'ok', 'nature'] },
  { patterns: ['lake'], responses: ['still water', 'ok', 'nature'] },
  { patterns: ['mountain', 'mountains'], responses: ['tall', 'ok', 'nature'] },
  { patterns: ['hill', 'hills'], responses: ['small mountain', 'ok', 'sure'] },
  { patterns: ['valley'], responses: ['low area', 'ok', 'sure'] },
  { patterns: ['desert'], responses: ['dry', 'sandy', 'ok'] },
  { patterns: ['island'], responses: ['surrounded by water', 'ok', 'cool'] },
  { patterns: ['cave'], responses: ['dark', 'underground', 'ok'] },
  { patterns: ['rock', 'rocks'], responses: ['hard', 'ok', 'sure'] },
  { patterns: ['stone', 'stones'], responses: ['hard', 'ok', 'sure'] },
  { patterns: ['sand'], responses: ['tiny rocks', 'ok', 'beach stuff'] },
  { patterns: ['dirt'], responses: ['earth', 'ok', 'sure'] },
  { patterns: ['earth'], responses: ['planet', 'ground', 'ok'] },
  { patterns: ['fire'], responses: ['hot', 'dangerous', 'ok'] },
  { patterns: ['nature'], responses: ['ok', 'outside', 'environment'] },
  { patterns: ['environment'], responses: ['ok', 'nature', 'sure'] },
  
  // Body Parts
  { patterns: ['head'], responses: ['top part', 'ok', 'sure'] },
  { patterns: ['face'], responses: ['front of head', 'ok', 'sure'] },
  { patterns: ['eye', 'eyes'], responses: ['for seeing', 'ok', 'sure'] },
  { patterns: ['ear', 'ears'], responses: ['for hearing', 'ok', 'sure'] },
  { patterns: ['nose'], responses: ['for smelling', 'ok', 'sure'] },
  { patterns: ['mouth'], responses: ['for eating', 'ok', 'sure'] },
  { patterns: ['tooth', 'teeth'], responses: ['for chewing', 'ok', 'sure'] },
  { patterns: ['tongue'], responses: ['for tasting', 'ok', 'sure'] },
  { patterns: ['neck'], responses: ['connects head', 'ok', 'sure'] },
  { patterns: ['shoulder', 'shoulders'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['arm', 'arms'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['elbow'], responses: ['arm joint', 'ok', 'sure'] },
  { patterns: ['hand', 'hands'], responses: ['for grabbing', 'ok', 'sure'] },
  { patterns: ['finger', 'fingers'], responses: ['on hands', 'ok', 'sure'] },
  { patterns: ['thumb'], responses: ['special finger', 'ok', 'sure'] },
  { patterns: ['chest'], responses: ['torso', 'ok', 'sure'] },
  { patterns: ['stomach'], responses: ['digestion', 'ok', 'sure'] },
  { patterns: ['back'], responses: ['behind', 'ok', 'sure'] },
  { patterns: ['leg', 'legs'], responses: ['for walking', 'ok', 'sure'] },
  { patterns: ['knee'], responses: ['leg joint', 'ok', 'sure'] },
  { patterns: ['foot', 'feet'], responses: ['for standing', 'ok', 'sure'] },
  { patterns: ['toe', 'toes'], responses: ['on feet', 'ok', 'sure'] },
  { patterns: ['hair'], responses: ['on head', 'ok', 'sure'] },
  { patterns: ['skin'], responses: ['outer layer', 'ok', 'sure'] },
  { patterns: ['bone', 'bones'], responses: ['skeleton', 'ok', 'sure'] },
  { patterns: ['muscle', 'muscles'], responses: ['for movement', 'ok', 'sure'] },
  { patterns: ['heart'], responses: ['pumps blood', 'ok', 'important'] },
  { patterns: ['brain'], responses: ['thinks', 'ok', 'important'] },
  { patterns: ['blood'], responses: ['red liquid', 'ok', 'sure'] },
  { patterns: ['body'], responses: ['physical form', 'ok', 'sure'] },
  
  // Actions
  { patterns: ['walk', 'walking'], responses: ['on foot', 'ok', 'sure'] },
  { patterns: ['jump', 'jumping'], responses: ['go up', 'ok', 'sure'] },
  { patterns: ['sit', 'sitting'], responses: ['rest', 'ok', 'sure'] },
  { patterns: ['stand', 'standing'], responses: ['upright', 'ok', 'sure'] },
  { patterns: ['lie', 'lying'], responses: ['horizontal', 'ok', 'sure'] },
  { patterns: ['talk', 'talking'], responses: ['speaking', 'ok', 'sure'] },
  { patterns: ['speak', 'speaking'], responses: ['using words', 'ok', 'sure'] },
  { patterns: ['listen', 'listening'], responses: ['hearing', 'ok', 'sure'] },
  { patterns: ['hear', 'hearing'], responses: ['sound', 'ok', 'sure'] },
  { patterns: ['see', 'seeing'], responses: ['vision', 'ok', 'sure'] },
  { patterns: ['look', 'looking'], responses: ['using eyes', 'ok', 'sure'] },
  { patterns: ['watch', 'watching'], responses: ['observing', 'ok', 'sure'] },
  { patterns: ['write', 'writing'], responses: ['making text', 'ok', 'sure'] },
  { patterns: ['type', 'typing'], responses: ['keyboard', 'ok', 'sure'] },
  { patterns: ['click', 'clicking'], responses: ['mouse', 'ok', 'sure'] },
  { patterns: ['touch', 'touching'], responses: ['contact', 'ok', 'sure'] },
  { patterns: ['hold', 'holding'], responses: ['gripping', 'ok', 'sure'] },
  { patterns: ['grab', 'grabbing'], responses: ['taking', 'ok', 'sure'] },
  { patterns: ['throw', 'throwing'], responses: ['tossing', 'ok', 'sure'] },
  { patterns: ['catch', 'catching'], responses: ['grabbing', 'ok', 'sure'] },
  { patterns: ['push', 'pushing'], responses: ['away', 'ok', 'sure'] },
  { patterns: ['pull', 'pulling'], responses: ['toward', 'ok', 'sure'] },
  { patterns: ['lift', 'lifting'], responses: ['raising', 'ok', 'sure'] },
  { patterns: ['carry', 'carrying'], responses: ['holding', 'ok', 'sure'] },
  { patterns: ['move', 'moving'], responses: ['changing position', 'ok', 'sure'] },
  { patterns: ['go', 'going'], responses: ['ok', 'sure', 'where'] },
  { patterns: ['come', 'coming'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['stay', 'staying'], responses: ['remaining', 'ok', 'sure'] },
  { patterns: ['leave', 'leaving'], responses: ['departing', 'ok', 'sure'] },
  { patterns: ['enter', 'entering'], responses: ['going in', 'ok', 'sure'] },
  { patterns: ['exit', 'exiting'], responses: ['going out', 'ok', 'sure'] },
  { patterns: ['continue', 'continuing'], responses: ['keep going', 'ok', 'sure'] },
  { patterns: ['pause', 'pausing'], responses: ['stopping', 'ok', 'sure'] },
  { patterns: ['break', 'breaking'], responses: ['rest', 'ok', 'sure'] },
  { patterns: ['fix', 'fixing'], responses: ['repairing', 'ok', 'sure'] },
  { patterns: ['build', 'building'], responses: ['constructing', 'ok', 'sure'] },
  { patterns: ['create', 'creating'], responses: ['making', 'ok', 'sure'] },
  { patterns: ['make', 'making'], responses: ['creating', 'ok', 'sure'] },
  { patterns: ['destroy', 'destroying'], responses: ['breaking', 'ok', 'sure'] },
  { patterns: ['clean', 'cleaning'], responses: ['tidying', 'ok', 'sure'] },
  { patterns: ['wash', 'washing'], responses: ['cleaning', 'ok', 'sure'] },
  { patterns: ['drive', 'driving'], responses: ['vehicle', 'ok', 'sure'] },
  { patterns: ['ride', 'riding'], responses: ['on vehicle', 'ok', 'sure'] },
  { patterns: ['fly', 'flying'], responses: ['in air', 'ok', 'sure'] },
  { patterns: ['dance', 'dancing'], responses: ['moving', 'ok', 'sure'] },
  { patterns: ['sing', 'singing'], responses: ['music', 'ok', 'sure'] },
  { patterns: ['think', 'thinking'], responses: ['brain', 'ok', 'sure'] },
  { patterns: ['remember', 'remembering'], responses: ['memory', 'ok', 'sure'] },
  { patterns: ['forget', 'forgetting'], responses: ['cant recall', 'ok', 'sure'] },
  { patterns: ['know', 'knowing'], responses: ['aware', 'ok', 'sure'] },
  { patterns: ['feel', 'feeling'], responses: ['emotion', 'ok', 'sure'] },
  { patterns: ['laugh', 'laughing'], responses: ['funny', 'ok', 'sure'] },
  { patterns: ['cry', 'crying'], responses: ['tears', 'ok', 'sure'] },
  { patterns: ['smile', 'smiling'], responses: ['happy', 'ok', 'sure'] },
  { patterns: ['frown', 'frowning'], responses: ['sad', 'ok', 'sure'] },
  
  // Places
  { patterns: ['home'], responses: ['where you live', 'ok', 'nice'] },
  { patterns: ['house'], responses: ['building', 'ok', 'sure'] },
  { patterns: ['apartment'], responses: ['living space', 'ok', 'sure'] },
  { patterns: ['room'], responses: ['space', 'ok', 'sure'] },
  { patterns: ['bedroom'], responses: ['for sleeping', 'ok', 'sure'] },
  { patterns: ['bathroom'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['kitchen'], responses: ['for cooking', 'ok', 'sure'] },
  { patterns: ['living room'], responses: ['common area', 'ok', 'sure'] },
  { patterns: ['office'], responses: ['for work', 'ok', 'sure'] },
  { patterns: ['classroom'], responses: ['for learning', 'ok', 'sure'] },
  { patterns: ['library'], responses: ['books', 'ok', 'sure'] },
  { patterns: ['hospital'], responses: ['medical', 'ok', 'sure'] },
  { patterns: ['store', 'shop'], responses: ['for buying', 'ok', 'sure'] },
  { patterns: ['mall'], responses: ['shopping', 'ok', 'sure'] },
  { patterns: ['market'], responses: ['shopping', 'ok', 'sure'] },
  { patterns: ['restaurant'], responses: ['eating', 'ok', 'sure'] },
  { patterns: ['cafe'], responses: ['coffee place', 'ok', 'sure'] },
  { patterns: ['bar'], responses: ['drinks', 'ok', 'sure'] },
  { patterns: ['park'], responses: ['outdoor', 'ok', 'sure'] },
  { patterns: ['playground'], responses: ['for kids', 'ok', 'sure'] },
  { patterns: ['stadium'], responses: ['sports', 'ok', 'sure'] },
  { patterns: ['theater', 'theatre'], responses: ['shows', 'ok', 'sure'] },
  { patterns: ['cinema'], responses: ['movies', 'ok', 'sure'] },
  { patterns: ['museum'], responses: ['art history', 'ok', 'sure'] },
  { patterns: ['gallery'], responses: ['art', 'ok', 'sure'] },
  { patterns: ['church'], responses: ['religious', 'ok', 'sure'] },
  { patterns: ['temple'], responses: ['religious', 'ok', 'sure'] },
  { patterns: ['mosque'], responses: ['religious', 'ok', 'sure'] },
  { patterns: ['bank'], responses: ['money', 'ok', 'sure'] },
  { patterns: ['post office'], responses: ['mail', 'ok', 'sure'] },
  { patterns: ['police station'], responses: ['law', 'ok', 'sure'] },
  { patterns: ['fire station'], responses: ['emergency', 'ok', 'sure'] },
  { patterns: ['train station'], responses: ['transit', 'ok', 'sure'] },
  { patterns: ['bus stop'], responses: ['transit', 'ok', 'sure'] },
  { patterns: ['street'], responses: ['road', 'ok', 'sure'] },
  { patterns: ['road'], responses: ['path', 'ok', 'sure'] },
  { patterns: ['highway'], responses: ['big road', 'ok', 'sure'] },
  { patterns: ['bridge'], responses: ['crosses', 'ok', 'sure'] },
  { patterns: ['building'], responses: ['structure', 'ok', 'sure'] },
  { patterns: ['tower'], responses: ['tall building', 'ok', 'sure'] },
  { patterns: ['factory'], responses: ['makes things', 'ok', 'sure'] },
  { patterns: ['farm'], responses: ['agriculture', 'ok', 'sure'] },
  { patterns: ['zoo'], responses: ['animals', 'ok', 'sure'] },
  { patterns: ['aquarium'], responses: ['fish', 'ok', 'sure'] },
  { patterns: ['garden'], responses: ['plants', 'ok', 'sure'] },
  { patterns: ['garage'], responses: ['cars', 'ok', 'sure'] },
  { patterns: ['basement'], responses: ['underground', 'ok', 'sure'] },
  { patterns: ['attic'], responses: ['top floor', 'ok', 'sure'] },
  { patterns: ['lobby'], responses: ['entrance', 'ok', 'sure'] },
  { patterns: ['hallway'], responses: ['corridor', 'ok', 'sure'] },
  { patterns: ['elevator'], responses: ['up down', 'ok', 'sure'] },
  { patterns: ['stairs'], responses: ['steps', 'ok', 'sure'] },
  
  // Random
  { patterns: ['why', 'because'], responses: ['just because', 'idk', 'reasons'] },
  { patterns: ['where', 'location'], responses: ['somewhere', 'idk', 'around'] },
  { patterns: ['really', 'seriously'], responses: ['yeah', 'yep', 'sure'] },
  { patterns: ['never', 'always'], responses: ['ok', 'sure', 'if you say so'] },
  { patterns: ['probably', 'definitely'], responses: ['maybe', 'ok', 'sure'] },
  { patterns: ['sorry', 'apologize'], responses: ['its ok', 'no worries', 'dont worry'] },
  { patterns: ['please'], responses: ['ok', 'sure', 'fine'] },
  { patterns: ['wait'], responses: ['ok', 'waiting', 'fine'] },
  { patterns: ['stop'], responses: ['ok', 'fine', 'stopping'] },
  { patterns: ['start', 'begin'], responses: ['ok', 'lets go', 'sure'] },
  { patterns: ['end', 'finish'], responses: ['ok', 'done', 'finished'] },
  { patterns: ['now', 'right now'], responses: ['ok', 'alright', 'fine'] },
  { patterns: ['soon', 'later'], responses: ['ok', 'sure', 'whenever'] },
  { patterns: ['every', 'all'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['some', 'few'], responses: ['ok', 'yeah', 'sure'] },
  { patterns: ['many', 'lots'], responses: ['thats many', 'ok', 'sure'] },
  { patterns: ['nothing', 'none'], responses: ['ok', 'sure', 'fair'] },
  { patterns: ['everything', 'all'], responses: ['thats a lot', 'ok', 'sure'] },
  { patterns: ['something', 'anything'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['best', 'worst'], responses: ['ok', 'sure', 'if you say so'] },
  { patterns: ['good', 'fine'], responses: ['ok', 'cool', 'nice'] },
  { patterns: ['better', 'worse'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['new', 'old'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['big', 'small'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['easy', 'hard', 'difficult'], responses: ['ok', 'yeah', 'sure'] },
  { patterns: ['fast', 'slow'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['long', 'short'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['open', 'close'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['question'], responses: ['ask away', 'what', 'ok'] },
  { patterns: ['answer'], responses: ['here it is', 'ok', 'yeah'] },
  { patterns: ['problem', 'issue'], responses: ['whats wrong', 'ok', 'that sucks'] },
  { patterns: ['solution', 'fix'], responses: ['hope it works', 'ok', 'good'] },
  { patterns: ['wrong', 'mistake'], responses: ['happens', 'ok', 'yeah'] },
  { patterns: ['right', 'correct'], responses: ['ok', 'cool', 'nice'] },
  { patterns: ['weird', 'strange'], responses: ['yeah kinda', 'ok', 'sure'] },
  { patterns: ['normal', 'regular'], responses: ['ok', 'yeah', 'sure'] },
  { patterns: ['interesting'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['care', 'matter'], responses: ['ok', 'sure', 'yeah'] },
  { patterns: ['understand', 'get it'], responses: ['ok', 'cool', 'nice'] },
];

const fallbacks = [
  'wdym',
  'im stupid what do you want',
  'hm',
  'jlkhfsajhfksajkhfdajkhfdjkhf',
  'no.',
  'ye',
  'yes',
  'sure',
  'nahhh',
  'NO',
];

function findResponse(input, returnDebugInfo = false) {
  const normalized = input.toLowerCase().trim();
  const detectedPatterns = [];
  let possibleResponses = [];
  
  // 20% chance to just say random slop
  if (Math.random() < 0.2) {
    const slopResponses = [
      'HEJAKAJEBEWKSOISKE',
      'jklfdsajklfdsjklfds',
      'asjkfhdsakjfhdsakjfh',
      'i wonder whats a',
      'sometimes i just',
      'you ever think about',
      'AAAAAAAAAAA',
      'hfjdshfjkdshfjkds',
      'what even is',
      'jklfdsjklfdsjklfds',
      'ksjdhfkjsdhfkjshdf',
      'bruh moment tbh',
      'existential crisis rn',
      'JKFDSJKLFDJKLFDSJKL',
      'i wonder',
      'thinking about stuff',
      'hdsjkfhdjskfhdjskfh',
      'brain not working',
      'asjkdhaskjdhasjkdh',
      'what was i saying'
    ];
    const response = slopResponses[Math.floor(Math.random() * slopResponses.length)];
    if (returnDebugInfo) {
      return { 
        response, 
        detectedPatterns: ['random slop'], 
        possibleResponses: slopResponses 
      };
    }
    return response;
  }
  
  // Try to detect simple math
  const mathMatch = normalized.match(/(\d+)\s*[\+\-\*\/x]\s*(\d+)/);
  if (mathMatch) {
    const num1 = parseInt(mathMatch[1]);
    const num2 = parseInt(mathMatch[2]);
    const operator = normalized.match(/[\+\-\*\/x]/)[0];
    
    let result;
    if (operator === '+') result = num1 + num2;
    else if (operator === '-') result = num1 - num2;
    else if (operator === '*' || operator === 'x') result = num1 * num2;
    else if (operator === '/') result = num2 !== 0 ? Math.floor(num1 / num2) : 'cant divide zero';
    
    if (returnDebugInfo) {
      return { 
        response: result.toString(), 
        detectedPatterns: ['math expression'], 
        possibleResponses: [result.toString()] 
      };
    }
    return result.toString();
  }
  
  // Also handle "what is" style questions
  const whatIsMatch = normalized.match(/what\s+is\s+(\d+)\s*[\+\-\*\/x]\s*(\d+)/);
  if (whatIsMatch) {
    const num1 = parseInt(whatIsMatch[1]);
    const num2 = parseInt(whatIsMatch[2]);
    const operator = normalized.match(/[\+\-\*\/x]/)[0];
    
    let result;
    if (operator === '+') result = num1 + num2;
    else if (operator === '-') result = num1 - num2;
    else if (operator === '*' || operator === 'x') result = num1 * num2;
    else if (operator === '/') result = num2 !== 0 ? Math.floor(num1 / num2) : 'cant divide zero';
    
    if (returnDebugInfo) {
      return { 
        response: result.toString(), 
        detectedPatterns: ['what is math'], 
        possibleResponses: [result.toString()] 
      };
    }
    return result.toString();
  }
  
  for (const pattern of patterns) {
    for (const p of pattern.patterns) {
      if (normalized.includes(p)) {
        detectedPatterns.push(p);
        possibleResponses = pattern.responses;
        const response = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        if (returnDebugInfo) {
          return { response, detectedPatterns, possibleResponses };
        }
        return response;
      }
    }
  }
  
  possibleResponses = fallbacks;
  const response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  if (returnDebugInfo) {
    return { response, detectedPatterns, possibleResponses };
  }
  return response;
}

function addMessage(text, isUser) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTyping() {
  const messagesDiv = document.getElementById('messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTyping() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) {
    typingDiv.remove();
  }
  const consoleDiv = document.getElementById('debug-console');
  if (consoleDiv) {
    consoleDiv.remove();
  }
}

function showDebugConsole(input, detectedPatterns, possibleResponses) {
  const messagesDiv = document.getElementById('messages');
  const consoleDiv = document.createElement('div');
  consoleDiv.id = 'debug-console';
  consoleDiv.className = 'debug-console';
  
  // Print to browser console
  console.log('=== Debug Info ===');
  console.log('Input:', input);
  console.log('Detected patterns:', detectedPatterns.length > 0 ? detectedPatterns : 'none (fallback)');
  console.log('Possible responses:', possibleResponses);
  console.log('==================');
  
  let html = '<div class="console-header">debug console</div>';
  html += `<div class="console-line"><span class="console-label">input:</span> "${input}"</div>`;
  
  if (detectedPatterns.length > 0) {
    html += `<div class="console-line"><span class="console-label">detected:</span> ${detectedPatterns.join(', ')}</div>`;
  } else {
    html += `<div class="console-line"><span class="console-label">detected:</span> none (fallback)</div>`;
  }
  
  html += `<div class="console-line"><span class="console-label">possible responses:</span></div>`;
  html += '<div class="console-responses">';
  possibleResponses.forEach(resp => {
    html += `<div class="console-response">• ${resp}</div>`;
  });
  html += '</div>';
  
  consoleDiv.innerHTML = html;
  messagesDiv.appendChild(consoleDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleSend() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  
  if (!text) return;
  
  addMessage(text, true);
  input.value = '';
  
  showTyping();
  
  // Get debug info
  const debugInfo = findResponse(text, true);
  
  // Show debug console while typing
  showDebugConsole(text, debugInfo.detectedPatterns, debugInfo.possibleResponses);
  
  const delay = 4000 + Math.random() * 2000; // 4-6 seconds
  setTimeout(() => {
    hideTyping();
    addMessage(debugInfo.response, false);
  }, delay);
}

document.getElementById('send-btn').addEventListener('click', handleSend);
document.getElementById('user-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSend();
  }
});

// Categories functionality - showing ALL patterns
const categories = [
  { name: 'Greetings', patterns: ['hi', 'hello', 'hey', 'sup', 'good morning', 'morning', 'good night', 'night', 'good evening', 'evening', 'whats good', 'yo whats up'] },
  { name: 'How are you', patterns: ['how are you', 'how r u', 'hows it going', 'whats up', 'you ok', 'you good', 'u ok', 'how you doing', 'hows life'] },
  { name: 'Name & Identity', patterns: ['your name', 'who are you', 'what are you', 'tell me about yourself', 'about you', 'do you have a life', 'you have a life'] },
  { name: 'Time & Date', patterns: ['what time', 'time is', 'when is', 'what date', 'what day', 'date', 'today', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'weekend', 'tomorrow', 'yesterday'] },
  { name: 'Weather', patterns: ['weather', 'rain', 'sunny', 'cold', 'hot', 'warm', 'snow', 'snowing'] },
  { name: 'Yes/No/Maybe', patterns: ['yes', 'yeah', 'yep', 'sure', 'no', 'nope', 'nah', 'maybe', 'perhaps', 'idk'] },
  { name: 'Thanks', patterns: ['thank', 'thanks', 'thx', 'appreciate'] },
  { name: 'Goodbyes', patterns: ['bye', 'goodbye', 'see ya', 'later', 'gotta go', 'gtg', 'leaving', 'talk later', 'ttyl'] },
  { name: 'Abilities', patterns: ['what can you', 'what do you', 'are you smart', 'are you intelligent', 'can you help', 'help me'] },
  { name: 'Age', patterns: ['how old', 'your age', 'when were you made', 'when created'] },
  { name: 'Feelings', patterns: ['sad', 'happy', 'angry', 'feel', 'depressed', 'lonely', 'excited', 'pumped', 'bored', 'boring', 'annoyed', 'frustrated', 'scared', 'afraid', 'nervous', 'stressed', 'anxious', 'confused', 'lost'] },
  { name: 'Help', patterns: ['help', 'what', 'how', 'explain', 'tell me', 'show me', 'teach me'] },
  { name: 'Food & Drinks', patterns: ['food', 'eat', 'hungry', 'pizza', 'burger', 'breakfast', 'lunch', 'dinner', 'coffee', 'tea', 'cake', 'dessert', 'sweet', 'sushi', 'pasta', 'chicken', 'vegetable', 'fruit', 'healthy', 'snack', 'chips', 'water', 'drink', 'soda', 'favorite food', 'best food', 'cooking', 'recipe'] },
  { name: 'Fruits', patterns: ['apple', 'apples', 'banana', 'bananas', 'orange', 'oranges', 'grape', 'grapes', 'strawberry', 'strawberries', 'watermelon', 'mango', 'mangos', 'pineapple', 'peach', 'peaches', 'pear', 'pears', 'cherry', 'cherries', 'blueberry', 'blueberries', 'raspberry', 'raspberries', 'lemon', 'lemons', 'lime', 'limes', 'kiwi', 'coconut', 'avocado', 'tomato'] },
  { name: 'Music', patterns: ['music', 'song', 'listen', 'favorite song', 'favorite artist', 'concert', 'live music', 'rap', 'rock', 'pop', 'jazz', 'guitar', 'piano', 'drums', 'album', 'playlist'] },
  { name: 'Games', patterns: ['game', 'play', 'gaming', 'video game', 'pc game', 'console', 'minecraft', 'fortnite', 'roblox', 'mobile game', 'phone game', 'multiplayer', 'online', 'win', 'won', 'beat', 'lose', 'lost', 'died'] },
  { name: 'Entertainment', patterns: ['movie', 'film', 'tv', 'show', 'series', 'book', 'read', 'reading', 'netflix', 'youtube', 'podcast', 'art', 'draw', 'paint'] },
  { name: 'Technology', patterns: ['computer', 'laptop', 'pc', 'phone', 'mobile', 'smartphone', 'internet', 'wifi', 'online', 'app', 'application', 'software', 'code', 'coding', 'programming', 'bug', 'error', 'crash', 'update', 'upgrade', 'battery', 'charge', 'ai', 'artificial intelligence', 'robot', 'robots', 'server', 'database', 'cloud', 'cloud storage', 'algorithm', 'html', 'css', 'javascript', 'python', 'java', 'c++', 'api', 'framework', 'git', 'github', 'linux', 'windows', 'mac', 'terminal', 'command line', 'blockchain', 'crypto', 'virtual reality', 'vr', 'ar', 'machine learning', 'ml', 'cybersecurity', 'hacker', 'security', 'network', 'ethernet', 'ram', 'memory', 'storage', 'processor', 'cpu', 'gpu', 'keyboard', 'mouse', 'monitor', 'screen', 'display', 'usb', 'cable', 'port', 'bluetooth', 'wireless', 'backup', 'restore', 'encryption', 'password', 'firewall', 'antivirus', 'browser', 'chrome', 'firefox', 'download', 'upload', 'pixel', 'resolution', 'bandwidth', 'latency', 'ping', 'debug', 'compile', 'open source', 'license', 'stack overflow'] },
  { name: 'Colors', patterns: ['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'gray', 'grey', 'cyan', 'magenta', 'indigo', 'violet', 'turquoise', 'maroon', 'navy', 'teal', 'olive', 'coral', 'beige', 'tan', 'gold', 'silver', 'bronze', 'crimson', 'scarlet', 'emerald', 'sapphire', 'ruby', 'amber', 'jade', 'lavender', 'mint', 'peach', 'ivory', 'cream', 'charcoal', 'slate', 'color', 'colour', 'dark', 'light', 'bright', 'pale', 'rainbow', 'neon', 'pastel', 'metallic', 'transparent', 'clear'] },
  { name: 'Animals', patterns: ['cat', 'dog', 'pet', 'bird', 'fish', 'lion', 'tiger', 'bear', 'snake', 'spider', 'bunny', 'rabbit'] },
  { name: 'Sports', patterns: ['sport', 'football', 'soccer', 'basketball', 'baseball', 'gym', 'exercise', 'workout', 'run', 'running', 'jog', 'swim', 'swimming'] },
  { name: 'Work & School', patterns: ['work', 'school', 'homework', 'job', 'test', 'exam', 'quiz', 'project', 'assignment', 'boss', 'teacher', 'professor', 'meeting', 'presentation', 'interview', 'college', 'university', 'graduation', 'graduate'] },
  { name: 'Sleep & Tired', patterns: ['sleep', 'tired', 'sleepy', 'nap', 'rest', 'wake up', 'woke up', 'insomnia', 'cant sleep', 'dream', 'nightmare'] },
  { name: 'Travel', patterns: ['travel', 'trip', 'vacation', 'beach', 'ocean', 'sea', 'mountain', 'hiking', 'city', 'town', 'country', 'nation', 'flight', 'plane', 'airport', 'hotel', 'motel'] },
  { name: 'Family & Friends', patterns: ['mom', 'mother', 'dad', 'father', 'brother', 'sister', 'sibling', 'family', 'friend', 'buddy', 'pal', 'kids', 'children'] },
  { name: 'Money', patterns: ['money', 'cash', 'dollar', 'rich', 'wealthy', 'millionaire', 'poor', 'broke', 'expensive', 'cheap', 'buy', 'bought', 'purchase', 'sell', 'sold'] },
  { name: 'Jokes & Humor', patterns: ['joke', 'funny', 'laugh', 'lol', 'haha', 'lmao', 'meme'] },
  { name: 'Love & Relationships', patterns: ['love', 'like you', 'crush', 'i like', 'i love', 'relationship', 'dating', 'boyfriend', 'girlfriend', 'married', 'wedding'] },
  { name: 'Insults', patterns: ['stupid', 'dumb', 'idiot', 'bad', 'hate you', 'you suck', 'useless', 'pointless', 'shut up', 'be quiet'] },
  { name: 'Compliments', patterns: ['cool', 'awesome', 'great', 'good job', 'amazing', 'incredible', 'wonderful', 'smart', 'clever', 'helpful', 'useful', 'youre the best', 'best bot'] },
  { name: 'Numbers', patterns: ['zero', '0', 'one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5', 'ten', '10', 'hundred', 'thousand', 'million', 'first', 'second', 'third'] },
  { name: 'Nature', patterns: ['sun', 'sunny', 'moon', 'star', 'stars', 'sky', 'cloud', 'clouds', 'wind', 'windy', 'storm', 'thunder', 'lightning', 'tree', 'trees', 'flower', 'flowers', 'grass', 'plant', 'plants', 'leaf', 'leaves', 'forest', 'river', 'lake', 'mountain', 'mountains', 'hill', 'hills', 'valley', 'desert', 'island', 'cave', 'rock', 'rocks', 'stone', 'stones', 'sand', 'dirt', 'earth', 'fire', 'nature', 'environment'] },
  { name: 'Body Parts', patterns: ['head', 'face', 'eye', 'eyes', 'ear', 'ears', 'nose', 'mouth', 'tooth', 'teeth', 'tongue', 'neck', 'shoulder', 'shoulders', 'arm', 'arms', 'elbow', 'hand', 'hands', 'finger', 'fingers', 'thumb', 'chest', 'stomach', 'back', 'leg', 'legs', 'knee', 'foot', 'feet', 'toe', 'toes', 'hair', 'skin', 'bone', 'bones', 'muscle', 'muscles', 'heart', 'brain', 'blood', 'body'] },
  { name: 'Actions', patterns: ['walk', 'walking', 'jump', 'jumping', 'sit', 'sitting', 'stand', 'standing', 'lie', 'lying', 'talk', 'talking', 'speak', 'speaking', 'listen', 'listening', 'hear', 'hearing', 'see', 'seeing', 'look', 'looking', 'watch', 'watching', 'write', 'writing', 'type', 'typing', 'click', 'clicking', 'touch', 'touching', 'hold', 'holding', 'grab', 'grabbing', 'throw', 'throwing', 'catch', 'catching', 'push', 'pushing', 'pull', 'pulling', 'lift', 'lifting', 'carry', 'carrying', 'move', 'moving', 'go', 'going', 'come', 'coming', 'stay', 'staying', 'leave', 'leaving', 'enter', 'entering', 'exit', 'exiting', 'continue', 'continuing', 'pause', 'pausing', 'break', 'breaking', 'fix', 'fixing', 'build', 'building', 'create', 'creating', 'make', 'making', 'destroy', 'destroying', 'clean', 'cleaning', 'wash', 'washing', 'drive', 'driving', 'ride', 'riding', 'fly', 'flying', 'dance', 'dancing', 'sing', 'singing', 'think', 'thinking', 'remember', 'remembering', 'forget', 'forgetting', 'know', 'knowing', 'feel', 'feeling', 'laugh', 'laughing', 'cry', 'crying', 'smile', 'smiling', 'frown', 'frowning'] },
  { name: 'Places', patterns: ['home', 'house', 'apartment', 'room', 'bedroom', 'bathroom', 'kitchen', 'living room', 'office', 'classroom', 'library', 'hospital', 'store', 'shop', 'mall', 'market', 'restaurant', 'cafe', 'bar', 'park', 'playground', 'stadium', 'theater', 'theatre', 'cinema', 'museum', 'gallery', 'church', 'temple', 'mosque', 'bank', 'post office', 'police station', 'fire station', 'train station', 'bus stop', 'street', 'road', 'highway', 'bridge', 'building', 'tower', 'factory', 'farm', 'zoo', 'aquarium', 'garden', 'garage', 'basement', 'attic', 'lobby', 'hallway', 'elevator', 'stairs'] },
  { name: 'Common Words', patterns: ['why', 'because', 'where', 'location', 'really', 'seriously', 'never', 'always', 'probably', 'definitely', 'sorry', 'apologize', 'please', 'wait', 'stop', 'start', 'begin', 'end', 'finish', 'now', 'right now', 'soon', 'later', 'every', 'all', 'some', 'few', 'many', 'lots', 'nothing', 'none', 'everything', 'something', 'anything', 'best', 'worst', 'good', 'fine', 'better', 'worse', 'new', 'old', 'big', 'small', 'easy', 'hard', 'difficult', 'fast', 'slow', 'long', 'short', 'open', 'close', 'question', 'answer', 'problem', 'issue', 'solution', 'wrong', 'mistake', 'right', 'correct', 'weird', 'strange', 'normal', 'regular', 'interesting', 'care', 'matter', 'understand', 'get it'] },
  { name: 'Math', patterns: ['what is 2+2', '5*3', '10-4', '12/3', 'math expressions'] },
];

function showCategoriesModal() {
  const modal = document.createElement('div');
  modal.className = 'categories-modal';
  modal.id = 'categories-modal';
  
  let html = '<div class="categories-content">';
  html += '<div class="categories-header">';
  html += '<h2>all categories</h2>';
  html += '<button class="close-btn">×</button>';
  html += '</div>';
  
  categories.forEach(cat => {
    html += '<div class="category-section">';
    html += `<div class="category-title">${cat.name}</div>`;
    html += '<div class="category-items">';
    cat.patterns.forEach(pattern => {
      html += `<span class="category-item">${pattern}</span>`;
    });
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  modal.innerHTML = html;
  
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Close button
  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
}

document.getElementById('categories-btn').addEventListener('click', showCategoriesModal);

// Initial message
setTimeout(() => {
  addMessage('hey', false);
}, 500);
