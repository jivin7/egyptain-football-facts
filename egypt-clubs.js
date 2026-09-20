/**
 * Local Egypt clubs + fact helpers (no API).
 * Used by home search, club pages, and fact pages.
 */
const EGYPT_CLUBS = [
  {
    id: 'egypt',
    name: 'Egypt',
    fullName: 'Egypt National Team',
    city: 'Cairo',
    nickname: 'The Pharaohs',
    founded: 1921,
    national: true,
    aliases: ['pharaohs', 'national', 'egypt nt', 'egyptian national'],
    color: '#ce1126',
    matchKeys: ['egypt'],
  },
  {
    id: 'ahly',
    name: 'Al Ahly',
    fullName: 'Al Ahly Sporting Club',
    city: 'Cairo',
    nickname: 'The Red Devils',
    founded: 1907,
    aliases: ['ahly', 'al-ahly', 'al ahly sc', 'red devils'],
    color: '#ce1126',
    matchKeys: ['ahly'],
  },
  {
    id: 'zamalek',
    name: 'Zamalek',
    fullName: 'Zamalek Sporting Club',
    city: 'Cairo',
    nickname: 'The White Knights',
    founded: 1911,
    aliases: ['zamalek sc', 'white knights', 'qasr el nil'],
    color: '#ffffff',
    matchKeys: ['zamalek'],
  },
  {
    id: 'pyramids',
    name: 'Pyramids FC',
    fullName: 'Pyramids Football Club',
    city: 'Cairo',
    nickname: 'Pyramids',
    founded: 2008,
    aliases: ['pyramids', 'pyramids fc'],
    color: '#1e3a5f',
    matchKeys: ['pyramids'],
  },
  {
    id: 'ismaily',
    name: 'Ismaily',
    fullName: 'Ismaily Sporting Club',
    city: 'Ismailia',
    nickname: 'The Yellow Dragons',
    founded: 1924,
    aliases: ['ismaily sc', 'yellow dragons', 'ismailia'],
    color: '#f5c518',
    matchKeys: ['ismaily'],
  },
  {
    id: 'masry',
    name: 'Al Masry',
    fullName: 'Al Masry Sporting Club',
    city: 'Port Said',
    nickname: 'The Green Eagles',
    founded: 1920,
    aliases: ['masry', 'al-masry', 'green eagles', 'port said'],
    color: '#1a7a3a',
    matchKeys: ['masry'],
  },
  {
    id: 'smouha',
    name: 'Smouha',
    fullName: 'Smouha Sporting Club',
    city: 'Alexandria',
    nickname: 'The Blues',
    founded: 1949,
    aliases: ['smouha sc', 'smouha alexandria'],
    color: '#2563eb',
    matchKeys: ['smouha'],
  },
  {
    id: 'ittihad',
    name: 'Al Ittihad Alexandria',
    fullName: 'Al Ittihad Alexandria Club',
    city: 'Alexandria',
    nickname: 'The Masters',
    founded: 1914,
    aliases: ['ittihad', 'al ittihad', 'ittihad alex', 'alexandria ittihad'],
    color: '#111827',
    matchKeys: ['ittihad'],
  },
  {
    id: 'geish',
    name: 'Tala\'ea El Gaish',
    fullName: 'Tala\'ea El Gaish SC',
    city: 'Cairo',
    nickname: 'Army Club',
    founded: 1992,
    aliases: ['el gaish', 'gaish', 'talaea', 'army', 'elgeish'],
    color: '#166534',
    matchKeys: ['geish', 'gaish'],
  },
  {
    id: 'enppi',
    name: 'ENPPI',
    fullName: 'ENPPI Club',
    city: 'Cairo',
    nickname: 'Petroleum',
    founded: 1985,
    aliases: ['enppi fc', 'enppi club', 'petroleum'],
    color: '#0f766e',
    matchKeys: ['enppi'],
  },
  {
    id: 'mokawloon',
    name: 'Al Mokawloon',
    fullName: 'Arab Contractors SC',
    city: 'Cairo',
    nickname: 'The Mountain Wolves',
    founded: 1973,
    aliases: ['mokawloon', 'arab contractors', 'contractors'],
    color: '#15803d',
    matchKeys: ['mokawloon'],
  },
  {
    id: 'gouna',
    name: 'El Gouna',
    fullName: 'El Gouna Football Club',
    city: 'El Gouna',
    nickname: 'The Mountain Wolves',
    founded: 2003,
    aliases: ['gouna', 'el gouna fc', 'red sea'],
    color: '#0369a1',
    matchKeys: ['gouna'],
  },
  {
    id: 'ceramica',
    name: 'Ceramica Cleopatra',
    fullName: 'Ceramica Cleopatra FC',
    city: 'Suez',
    nickname: 'Cleopatra',
    founded: 2007,
    aliases: ['ceramica', 'cleopatra', 'ceramica cleopatra'],
    color: '#7c3aed',
    matchKeys: ['ceramica'],
  },
  {
    id: 'pharco',
    name: 'Pharco',
    fullName: 'Pharco Football Club',
    city: 'Alexandria',
    nickname: 'Pharco',
    founded: 2009,
    aliases: ['pharco fc', 'pharco alexandria'],
    color: '#0891b2',
    matchKeys: ['pharco'],
  },
  {
    id: 'nbe',
    name: 'National Bank',
    fullName: 'National Bank of Egypt FC',
    city: 'Cairo',
    nickname: 'NBE',
    founded: 2010,
    aliases: ['national bank', 'nbe', 'nbe fc', 'bank'],
    color: '#166534',
    matchKeys: ['national bank'],
  },
  {
    id: 'future',
    name: 'Future FC',
    fullName: 'Future Football Club',
    city: 'Cairo',
    nickname: 'Future',
    founded: 2011,
    aliases: ['future', 'future fc', 'modern future'],
    color: '#ea580c',
    matchKeys: ['future'],
  },
  {
    id: 'baladiyat',
    name: 'Baladiyat El Mahalla',
    fullName: 'Baladiyat El Mahalla SC',
    city: 'El Mahalla',
    nickname: 'Municipality',
    founded: 1931,
    aliases: ['baladiyat', 'el mahalla', 'mahalla', 'baladiyat el mahalla'],
    color: '#b45309',
    matchKeys: ['baladiyat'],
  },
  {
    id: 'ghazl',
    name: 'Ghazl El Mahalla',
    fullName: 'Ghazl El Mahalla SC',
    city: 'El Mahalla',
    nickname: 'The Spinners',
    founded: 1936,
    aliases: ['ghazl', 'ghazl el mahalla', 'spinners'],
    color: '#1d4ed8',
    matchKeys: ['ghazl'],
  },
  {
    id: 'haras',
    name: 'Haras El Hodoud',
    fullName: 'Haras El Hodoud SC',
    city: 'Alexandria',
    nickname: 'Border Guards',
    founded: 1950,
    aliases: ['haras', 'hodoud', 'haras el hodoud', 'border'],
    color: '#1e40af',
    matchKeys: ['haras', 'hodoud'],
  },
  {
    id: 'petrojet',
    name: 'Petrojet',
    fullName: 'Petrojet FC',
    city: 'Suez',
    nickname: 'Petrojet',
    founded: 1980,
    aliases: ['petrojet', 'petro jet'],
    color: '#0e7490',
    matchKeys: ['petrojet'],
  },
  {
    id: 'zed',
    name: 'ZED FC',
    fullName: 'ZED Football Club',
    city: 'Cairo',
    nickname: 'ZED',
    founded: 2009,
    aliases: ['zed', 'zed fc', 'fc masr'],
    color: '#334155',
    matchKeys: ['zed'],
  },
  {
    id: 'aswan',
    name: 'Aswan SC',
    fullName: 'Aswan Sporting Club',
    city: 'Aswan',
    nickname: 'The Nile Crocodiles',
    founded: 1928,
    aliases: ['aswan', 'aswan sc', 'crocodiles'],
    color: '#0f766e',
    matchKeys: ['aswan'],
  },
  {
    id: 'wadi',
    name: 'Wadi Degla',
    fullName: 'Wadi Degla SC',
    city: 'Cairo',
    nickname: 'Degla',
    founded: 2002,
    aliases: ['wadi degla', 'degla', 'wadi'],
    color: '#f97316',
    matchKeys: ['wadi', 'degla'],
  },
  {
    id: 'modern',
    name: 'Modern Sport',
    fullName: 'Modern Sport FC',
    city: 'Cairo',
    nickname: 'Modern',
    founded: 2015,
    aliases: ['modern sport', 'modern', 'modern fc'],
    color: '#7c2d12',
    matchKeys: ['modern'],
  },
  {
    id: 'qanah',
    name: 'El Qanah',
    fullName: 'El Qanah FC',
    city: 'Suez',
    nickname: 'Canal',
    founded: 1946,
    aliases: ['qanah', 'el qanah', 'canal'],
    color: '#0369a1',
    matchKeys: ['qanah'],
  },
  {
    id: 'entag',
    name: 'El Entag El Harby',
    fullName: 'El Entag El Harby SC',
    city: 'Cairo',
    nickname: 'Military Production',
    founded: 2005,
    aliases: ['entag', 'el entag', 'military production'],
    color: '#14532d',
    matchKeys: ['entag'],
  },
  {
    id: 'dakhlia',
    name: 'El Dakhlia',
    fullName: 'El Dakhlia SC',
    city: 'Cairo',
    nickname: 'Interior',
    founded: 2005,
    aliases: ['dakhlia', 'el dakhlia', 'interior'],
    color: '#1e3a8a',
    matchKeys: ['dakhlia'],
  },
  {
    id: 'olympic',
    name: 'Olympic Club',
    fullName: 'Olympic Club Alexandria',
    city: 'Alexandria',
    nickname: 'Olympic',
    founded: 1905,
    aliases: ['olympic', 'olympic alexandria', 'olympic club'],
    color: '#1d4ed8',
    matchKeys: ['olympic'],
  },
  {
    id: 'telecom',
    name: 'Telecom Egypt',
    fullName: 'Telecom Egypt SC',
    city: 'Cairo',
    nickname: 'We',
    founded: 2006,
    aliases: ['telecom', 'telecom egypt', 'we'],
    color: '#7c3aed',
    matchKeys: ['telecom'],
  },
  {
    id: 'suez',
    name: 'Suez SC',
    fullName: 'Suez Sporting Club',
    city: 'Suez',
    nickname: 'Suez',
    founded: 1927,
    aliases: ['suez', 'suez sc'],
    color: '#0ea5e9',
    matchKeys: ['suez'],
  },
];

/** Extra local facts for clubs that may not be in CURATED/EXTRA banks yet */
const LOCAL_CLUB_FACTS = {
  ittihad: [
    'Al Ittihad Alexandria is one of Egypt\'s oldest clubs, founded in 1914.',
    'The Masters represent Alexandria\'s historic football pride.',
    'Ittihad have won the Egyptian Cup multiple times.',
    'Alexandria derbies involving Ittihad draw passionate coastal crowds.',
    'The club\'s black and white identity is famous across Egyptian football.',
    'Ittihad produced players who starred for the Pharaohs.',
    'Home nights in Alexandria are known for intense atmospheres.',
    'Ittihad remain a historic pillar of Egyptian Premier League football.',
    'The club\'s youth teams feed talent into Alexandria football.',
    'Fans call big Ittihad wins nights the whole city remembers.',
    'Ittihad\'s cup giant-killings against Cairo clubs are local folklore.',
    'The Masters\' academy emphasises technical Alexandrian football.',
    'Matchday markets around Ittihad sell classic black-and-white scarves.',
    'Ittihad\'s rivalry games with Smouha heat up the Mediterranean city.',
    'Long-serving Ittihad players become neighbourhood legends.',
    'The club values loyalty and city identity over flash spending.',
    'Ittihad\'s set pieces have decided tense Egyptian Cup nights.',
    'Away support from Alexandria travels loudly to Cairo stadiums.',
    'Ittihad\'s history books fill shelves in Alexandrian sports clubs.',
    'Every generation of Masters fans claims their era had the bravest side.',
  ],
  geish: [
    'Tala\'ea El Gaish is known as Egypt\'s Army club.',
    'El Gaish have been a regular Premier League competitor.',
    'The club develops disciplined, hard-working squads.',
    'Army-linked football gives El Gaish a unique Egyptian identity.',
    'El Gaish often punch above their weight in cup competitions.',
    'Cairo matches against bigger clubs are always competitive.',
    'The club\'s green kits stand out in league photo galleries.',
    'El Gaish coaches emphasise organisation and fitness.',
    'Young players get first-team chances at the Army club.',
    'A famous cup upset would define any El Gaish season.',
    'El Gaish\'s midfielders cover huge distances every match.',
    'Fans take pride when the Army club frustrates title favourites.',
    'The club\'s training culture is famously strict and professional.',
    'El Gaish\'s set pieces are a key scoring route.',
    'Defenders at El Gaish learn compact, physical football.',
    'The Army club\'s away days are treated as missions.',
    'El Gaish captains lead by example more than celebrity.',
    'Cup semi-final nights put El Gaish on national TV.',
    'The club\'s story is discipline, grit, and Cairo pride.',
    'El Gaish remain a respected name in Egyptian football.',
  ],
  ghazl: [
    'Ghazl El Mahalla represent the famous textile city of El Mahalla.',
    'Nicknamed the Spinners, Ghazl are rooted in industrial Egypt.',
    'The club has won the Egyptian Premier League in its history.',
    'Delta football culture runs deep around Ghazl El Mahalla.',
    'Textile workers and families form the club\'s historic fanbase.',
    'Ghazl derbies against Baladiyat light up El Mahalla.',
    'The Spinners\' blue identity is known across the league.',
    'Ghazl\'s academy develops tough Delta midfielders.',
    'Cup nights in El Mahalla feel like town festivals.',
    'The club\'s history includes continental African appearances.',
    'Ghazl fans are famous for loyalty through every division.',
    'Industrial-city grit defines Ghazl\'s playing style.',
    'A return to title contention is every Spinner\'s dream.',
    'Ghazl\'s home support can surprise visiting Cairo giants.',
    'Local newspapers cover Ghazl like a flagship club.',
    'The Spinners\' set pieces decide tight Delta matches.',
    'Youth call-ups from Ghazl inspire street footballers.',
    'Ghazl\'s away end stays loud in hostile stadiums.',
    'The club proves Egyptian football thrives beyond Cairo.',
    'Ghazl El Mahalla stand for Delta pride and never quitting.',
  ],
  haras: [
    'Haras El Hodoud are Alexandria\'s Border Guards club.',
    'The club has a proud history in Egyptian cup competitions.',
    'Haras El Hodoud develop tough, organised defenders.',
    'Alexandria nights for Haras draw passionate coastal support.',
    'Border Guards identity gives the club a unique story.',
    'Haras have caused cup upsets against bigger Cairo sides.',
    'The club\'s blue colours fly across Alexandria matchdays.',
    'Youth pathways at Haras feed Egyptian football.',
    'Physical, high-intensity football is a Haras trademark.',
    'Local derbies with Smouha and Ittihad heat up the city.',
    'Haras captains lead with work-rate and discipline.',
    'Cup runs put Border Guards on national highlight reels.',
    'The club values fighters who leave everything on the pitch.',
    'Haras\' set pieces create chaos in crowded boxes.',
    'Away travel from Alexandria builds strong squad character.',
    'Fans debate Haras\' greatest cup nights in waterfront cafés.',
    'The club\'s academy watches northern coast talent closely.',
    'A deep Egyptian Cup run would define a Haras generation.',
    'Haras El Hodoud remain a pillar of Alexandrian football.',
    'Border Guards pride means never soft away performances.',
  ],
  petrojet: [
    'Petrojet FC are based in the Suez region.',
    'The club\'s petroleum industry link shapes its identity.',
    'Petrojet have competed in Egypt\'s top flight for many seasons.',
    'Suez Canal zone fans rally behind Petrojet on matchdays.',
    'The club develops hard-working, organised squads.',
    'Petrojet\'s away days to Cairo are long but competitive.',
    'Cup ties give Petrojet chances to shock bigger clubs.',
    'Industry backing helped build a professional club structure.',
    'Petrojet\'s midfielders cover ground to protect compact defences.',
    'Local sponsorships keep Petrojet rooted in Suez business life.',
    'The club\'s kits often feature industrial and energy colours.',
    'Petrojet coaches emphasise fitness for congested calendars.',
    'A famous cup giant-killing would write Petrojet folklore.',
    'Youth players see Petrojet as a path to Premier League minutes.',
    'Suez weather and travel test visiting teams\' focus.',
    'Petrojet\'s set pieces are vital in low-scoring matches.',
    'The club treats every Premier League point as precious.',
    'Petrojet\'s story adds Canal-zone depth to Egyptian football.',
    'Fans hope Petrojet stay a permanent top-flight name.',
    'Petrojet FC prove industry towns can build football clubs.',
  ],
  zed: [
    'ZED FC are a modern Cairo club with rising ambitions.',
    'The club rebranded and rebuilt to climb Egypt\'s football ladder.',
    'ZED invest in facilities and a contemporary club structure.',
    'Cairo\'s football map grew with ZED\'s Premier League push.',
    'Young Egyptian talent gets minutes in ZED\'s project.',
    'The club\'s modern branding stands out among historic giants.',
    'ZED\'s coaching staff chase organised, progressive football.',
    'Cup runs help ZED write early club folklore.',
    'Fans of newer clubs sometimes adopt ZED as their story.',
    'ZED\'s recruitment mixes experience with hungry prospects.',
    'Matchday presentation aims for a polished, modern feel.',
    'A win over Ahly or Zamalek would define ZED\'s rise.',
    'The club\'s academy ideas look beyond short-term results.',
    'ZED\'s midfield signings often shape their seasonal tactics.',
    'Away support grows louder each successful season.',
    'Sports science recovery keeps ZED\'s squad match-fit.',
    'The club treats identity-building as seriously as tactics.',
    'ZED\'s night matches start new floodlit traditions.',
    'A first major trophy is the north star for early supporters.',
    'ZED FC want history to remember more than being "new".',
  ],
  aswan: [
    'Aswan SC represent Egypt\'s southern Nile city of Aswan.',
    'Nicknamed with Nile crocodile pride, Aswan bring Upper Egypt football.',
    'Long journeys north make every Aswan away day an adventure.',
    'The club develops talent from Upper Egypt communities.',
    'Aswan home support creates unique southern atmospheres.',
    'Cup ties in Aswan give Cairo clubs tough travel tests.',
    'The Nile setting makes Aswan one of Egypt\'s most scenic football cities.',
    'Aswan fans are famous for loyalty through every division.',
    'Southern Egyptian football culture centres on clubs like Aswan.',
    'The club\'s colours fly across Aswan on big match weekends.',
    'Aswan coaches know every local pitch and youth coach.',
    'Physical, determined football fits Aswan\'s identity.',
    'A famous giant-killing would echo across Upper Egypt.',
    'Youth call-ups from Aswan inspire the next Nile generation.',
    'The club proves Egyptian football stretches from Alexandria to Aswan.',
    'Aswan\'s set pieces decide tense survival and cup nights.',
    'Local newspapers cover Aswan with hometown intensity.',
    'Away fans enjoy rare football trips to the deep south.',
    'Aswan SC stand for Upper Egypt pride that never quits.',
    'Every point on the road is celebrated like a derby win in Aswan.',
  ],
  wadi: [
    'Wadi Degla are known for a strong academy and modern facilities.',
    'The club has produced players who moved to bigger Egyptian sides and abroad.',
    'Wadi Degla\'s project mixes sport with a wider club brand.',
    'Cairo youth football often points talented kids toward Degla.',
    'The club emphasises technical development from early ages.',
    'Wadi Degla have competed in Egypt\'s Premier League.',
    'Orange kits make Degla easy to spot in league montages.',
    'Academy showcases at Degla attract scouts from across Egypt.',
    'The club\'s model influenced how others think about youth pathways.',
    'Wadi Degla coaches trust teenagers in high-pressure games.',
    'Cup runs give academy kids rare TV moments.',
    'Degla\'s training complex aims for European-level standards.',
    'Fans take pride when academy graduates make the first XI.',
    'The club\'s identity is modern Cairo football education.',
    'Wadi Degla\'s midfield graduates are known for clean technique.',
    'A deep cup run would accelerate Degla\'s senior reputation.',
    'Sports science at Degla protects growing adolescent athletes.',
    'The club sells and develops talent as part of its engine.',
    'Wadi Degla remain a respected name in Egyptian player development.',
    'Every sold graduate funds the next Degla generation.',
  ],
  modern: [
    'Modern Sport are among Egypt\'s newer professional club projects.',
    'The club aims to build a modern structure in Cairo football.',
    'Modern Sport recruit to stay competitive in the top flight.',
    'Fresh branding helps Modern stand out among historic giants.',
    'Young players see Modern as a path to Premier League minutes.',
    'Cup ties give the club national exposure beyond the league.',
    'Modern\'s coaching staff chase organised, ambitious football.',
    'The club\'s fanbase is still growing match by match.',
    'A famous win over a giant would write Modern\'s first legend.',
    'Matchday presentation aims for polished professionalism.',
    'Modern\'s midfield signings often define seasonal tactics.',
    'Away days teach a young supporter culture how to travel.',
    'Sports science support helps a developing squad stay fit.',
    'The club treats every Premier League point as precious.',
    'Modern Sport measure success in stability and growth.',
    'Set pieces are practised as a primary scoring plan.',
    'Fan chants are invented in real time by new supporters.',
    'A cup semi-final would accelerate Modern\'s profile.',
    'The club\'s story is short — and intentionally unfinished.',
    'Modern Sport want to become a permanent Premier League name.',
  ],
  qanah: [
    'El Qanah FC represent the Suez Canal city football tradition.',
    'Canal-zone pride runs through every El Qanah matchday.',
    'The club has competed across Egypt\'s league pyramid.',
    'El Qanah fans bring drums and canal-city energy.',
    'Cup nights against Cairo clubs empty local cafés.',
    'The club develops local Suez talent for the first team.',
    'Away trips from the canal are long — fans still travel.',
    'El Qanah\'s identity is community football with canal roots.',
    'Physical derbies define much of El Qanah\'s folklore.',
    'Youth coaches at El Qanah emphasise toughness and skill.',
    'A famous giant-killing would echo across Suez for decades.',
    'Local newspapers cover El Qanah with hometown intensity.',
    'The club\'s colours fly on canal streets after big wins.',
    'El Qanah captains speak for working canal communities.',
    'Set pieces decide tense cup and league nights.',
    'The club proves Egyptian football thrives in canal cities.',
    'El Qanah\'s academy is a pathway for Suez kids.',
    'Night matches under lights feel huge in the canal city.',
    'Loyalty through every division defines El Qanah supporters.',
    'El Qanah FC stand for canal pride that never softens.',
  ],
  entag: [
    'El Entag El Harby are linked to Egypt\'s military production sector.',
    'The club has been a familiar name in Egyptian league football.',
    'El Entag develop disciplined, hard-running squads.',
    'Cairo matches for Entag are competitive against richer clubs.',
    'Military Production identity gives the club a unique brand.',
    'Young players get chances in Entag\'s first-team plans.',
    'Cup runs put El Entag on national highlight shows.',
    'The club emphasises organisation over star names.',
    'Entag\'s midfielders cover box-to-box distances proudly.',
    'Fans take pride when Entag frustrate title favourites.',
    'Set pieces are a primary route to Entag goals.',
    'The club\'s training culture stresses fitness and focus.',
    'Away days teach young debutants big-match character.',
    'El Entag captains lead with work-rate examples.',
    'A cup upset against a giant would define a season.',
    'Community links keep Entag grounded in Cairo life.',
    'The club\'s kits carry institutional colours with pride.',
    'Entag\'s story is graft, structure, and ambition.',
    'Premier League points are celebrated as hard-earned gold.',
    'El Entag El Harby remain a distinctive Egyptian club.',
  ],
  dakhlia: [
    'El Dakhlia SC are linked to Egypt\'s Interior institutions.',
    'The club has competed in Egypt\'s Premier League eras.',
    'El Dakhlia build organised, disciplined matchday sides.',
    'Cairo football calendars include Dakhlia\'s competitive fixtures.',
    'Young Egyptians get minutes that bigger clubs may not offer.',
    'Cup ties give Dakhlia rare national spotlight moments.',
    'The club\'s recruitment looks for character and work-rate.',
    'Dakhlia coaches emphasise compact defensive shapes.',
    'Fans are building traditions around Interior club nights.',
    'A famous win over a giant would write Dakhlia folklore.',
    'Set pieces create Dakhlia\'s best chances in tight games.',
    'The club treats relegation battles as seasons to learn from.',
    'Away travel across Egypt builds squad toughness.',
    'Dakhlia\'s midfielders win second balls relentlessly.',
    'Matchday presentation grows more polished each campaign.',
    'Youth pathways aim to create a stable talent pipeline.',
    'The club\'s identity mixes institution and football passion.',
    'Clean sheets against top sides are celebrated hard.',
    'El Dakhlia measure success in stability and pride.',
    'Interior football adds another chapter to Cairo\'s league map.',
  ],
  olympic: [
    'Olympic Club Alexandria is among Egypt\'s oldest football institutions.',
    'Founded in 1905, Olympic carry deep Alexandrian history.',
    'The club\'s longevity makes it a museum of coastal football.',
    'Olympic have contributed players to Egypt\'s football story for generations.',
    'Alexandria derbies involving Olympic stir old rivalries.',
    'Historic kits and crests make Olympic instantly recognisable locally.',
    'The club\'s academy roots stretch across decades of youth football.',
    'Olympic fans value heritage as much as modern results.',
    'Cup nights reconnect the city with Olympic\'s classic identity.',
    'Mediterranean Alexandria shapes Olympic\'s football culture.',
    'Long-serving Olympic players become waterfront legends.',
    'The club\'s archives hold chapters of early Egyptian league history.',
    'Olympic\'s home support still creates proper coastal atmospheres.',
    'Youth coaches teach Olympic kids club history alongside tactics.',
    'A strong league push energises Olympic\'s historic fanbase.',
    'The club proves Alexandria\'s football tree has many branches.',
    'Olympic\'s set pieces and grit define tough home matches.',
    'Local media treat Olympic as living Alexandrian heritage.',
    'Every generation claims their Olympic side kept the flame alive.',
    'Olympic Club remain a foundational name in Egyptian football.',
  ],
  telecom: [
    'Telecom Egypt SC bring a telecom-industry identity to Egyptian football.',
    'The club is also associated with modern "We" branding eras.',
    'Telecom Egypt compete to establish a stable top-flight presence.',
    'Corporate backing helps plan multi-year squad building.',
    'Young players find opportunities in Telecom\'s project.',
    'Cup runs give the telecom club national TV moments.',
    'The club\'s kits introduce contemporary colours to league galleries.',
    'Telecom coaches build organised, hard-working sides.',
    'Cairo\'s busy calendar includes Telecom Egypt fixtures.',
    'A famous cup upset would define the club\'s early legends.',
    'Set pieces are practised as a primary scoring weapon.',
    'Fan culture around Telecom is still growing and inventing chants.',
    'Away days teach the supporter base how to travel.',
    'Sports science support helps a developing squad stay fit.',
    'The club measures success in stability first, then trophies.',
    'Telecom\'s midfielders cover ground to protect compact blocks.',
    'Community programmes link the brand\'s social mission to sport.',
    'Night matches under lights build new club rituals.',
    'Telecom Egypt want a permanent place on Egypt\'s football map.',
    'Industry clubs like Telecom show how Egyptian football keeps expanding.',
  ],
  suez: [
    'Suez SC represent the historic canal city of Suez.',
    'Canal football culture is loud, loyal, and local.',
    'Suez home nights challenge visiting teams after long travel.',
    'The club\'s history sits inside Egypt\'s wider canal-zone story.',
    'Suez fans paint the city in club colours after big wins.',
    'Youth football in Suez feeds the first-team dream.',
    'Cup ties against Cairo giants become city-wide events.',
    'Suez SC value fighters who understand canal-city pride.',
    'Physical matches define much of Suez\'s football folklore.',
    'Local newspapers cover Suez with hometown intensity.',
    'The club\'s academy watches canal neighbourhoods closely.',
    'Away support from Suez stays loud in hostile stadiums.',
    'A giant-killing cup night would echo for decades.',
    'Suez captains speak for working waterfront communities.',
    'Set pieces decide tense league and cup evenings.',
    'The club proves Egyptian football thrives in Suez.',
    'Night matches under lights feel huge by the canal.',
    'Loyalty through every division defines Suez supporters.',
    'Suez SC stand for canal pride that never softens.',
    'Every point on the road is celebrated across the city.',
  ],
};

const FACT_CATEGORIES = {
  players: {
    title: 'Players',
    blurb: 'Stars, scorers, and Pharaohs who shaped Egyptian football.',
    facts: [
      'Mohamed Salah became Egypt\'s global superstar at Liverpool.',
      'Hossam Hassan is Egypt\'s all-time leading international scorer.',
      'Mohamed Aboutrika was loved for vision, goals, and humility.',
      'Essam El-Hadary kept goals for Egypt into his late forties.',
      'Ahmed Hassan earned a world-class number of caps for Egypt.',
      'Shikabala remains a Zamalek cult hero for flair and skill.',
      'Mohamed Elneny represented Egypt while starring in Europe.',
      'Trezeguet formed a sharp Egypt attack with Salah.',
      'Wael Gomaa was a defensive rock in Egypt\'s AFCON three-peat.',
      'Ahmed Fathy served Egypt for years at full-back.',
      'Hassan Shehata starred as a player before coaching Egypt to glory.',
      'Barakat\'s wing play lit up Ahly and Egypt nights.',
      'Egyptian keepers are trained early for high-pressure derbies.',
      'Many Egypt internationals still return home each summer to train.',
      'Street football in Cairo produces creative close-control attackers.',
      'ENPPI and Wadi Degla academies feed future national-team names.',
      'Egyptian full-backs often push high like modern wing-backs.',
      'Penalty specialists decide AFCON shootouts for the Pharaohs.',
      'Youth call-ups can transform a domestic player overnight.',
      'Every generation argues about Egypt\'s greatest ever XI.',
    ],
  },
  matches: {
    title: 'Matches',
    blurb: 'Derbies, finals, and nights Egypt never forgets.',
    facts: [
      'The Cairo Derby between Ahly and Zamalek stops the capital.',
      'Egypt\'s AFCON finals became national holidays of football.',
      'Egypt 3–1 Algeria in 1989 is still told in cafés.',
      'Salah\'s 2018 World Cup penalty against Russia was historic.',
      'Egypt\'s Group G nights at World Cup 2026 packed every screen.',
      'CAF Champions League nights fill Cairo with red or white smoke.',
      'Port Said home games are among Egypt\'s loudest atmospheres.',
      'Ismailia cup nights against Cairo clubs feel like festivals.',
      'Alexandria derbies heat up the Mediterranean coast.',
      'El Mahalla derbies bring Delta bragging rights.',
      'Club World Cup games give Egyptian sides rare global stages.',
      'Late derby winners become instant YouTube legends.',
      'Penalty shootouts wrote chapters of AFCON folklore.',
      'Away trips across Egypt can mean 8-hour bus journeys for fans.',
      'Floodlit night matches create Africa\'s best football photos.',
      'Egyptian Cup finals draw huge nationwide TV audiences.',
      'A last-minute winner can empty apartment blocks onto balconies.',
      'Canal-city cup upsets live forever in local memory.',
      'World Cup summers pause ordinary life when Egypt play.',
      'Every big Egyptian match starts with drums long before kickoff.',
    ],
  },
  competitions: {
    title: 'Competitions',
    blurb: 'AFCON, CAF, the Egyptian league, and the World Cup path.',
    facts: [
      'Egypt hold a record 7 Africa Cup of Nations titles.',
      'Egypt won AFCON three times in a row: 2006, 2008, and 2010.',
      'Al Ahly are Africa\'s most successful CAF Champions League club.',
      'The Egyptian Premier League is one of Africa\'s oldest leagues.',
      'Egypt were the first African side at a FIFA World Cup (1934).',
      'Egypt finished 2nd in World Cup 2026 Group G.',
      'CAF Super Cup nights add more silverware to Egyptian cabinets.',
      'The Egyptian Cup can crown underdogs as national heroes.',
      'Club World Cup trips put Egyptian clubs on global TV.',
      'AFCON qualifying campaigns fill stadiums from Aswan to Alexandria.',
      'Belgium edged Egypt to win World Cup 2026 Group G on goal difference.',
      'Egypt\'s next World Cup knockout dream: Australia, then maybe Argentina.',
      'CAF Confederation Cup glory is also part of Zamalek\'s story.',
      'League title races between Ahly, Zamalek, and Pyramids light up seasons.',
      'Youth African championships feed Egypt\'s senior talent pool.',
      'Ramadan schedules force Egyptian competitions to adapt kickoff times.',
      'Promotion and relegation battles decide whole cities\' moods.',
      'Egyptian Super Cup matches often open the domestic season.',
      'Continental group draws are watched like World Cup pots.',
      'Every competition in Egypt ends with smoke, songs, and arguments.',
    ],
  },
  legends: {
    title: 'Legends',
    blurb: 'Icons whose names still echo in Egyptian stadiums.',
    facts: [
      'Aboutrika is remembered as a football poet in red.',
      'Hossam Hassan\'s goal record made him a Pharaohs immortal.',
      'El-Hadary\'s longevity turned him into a goalkeeping myth.',
      'Ahmed Hassan\'s cap haul set a leadership standard.',
      'Hassan Shehata\'s three AFCON titles made him a coaching legend.',
      'Salah\'s European goals made him Egypt\'s modern face.',
      'Shikabala\'s skill clips still circulate among Zamalek kids.',
      'Wael Gomaa\'s defending defined a golden Egypt era.',
      'Barakat\'s wing runs are Ahly folklore.',
      'Mido\'s career linked Egyptian talent to European stages.',
      'Club museums in Cairo preserve boots, shirts, and medals of legends.',
      'Legendary coaches become TV voices who never leave the debate.',
      'Street murals across Egypt paint faces of football heroes.',
      'Derby legends are measured in moments, not only trophies.',
      'Academy coaches tell kids stories of Aboutrika before drills.',
      'Goalkeepers still study El-Hadary\'s positioning videos.',
      'Captain armbands in Egypt carry the weight of past legends.',
      'Every café has an older fan who "saw the real legends live".',
      'Egyptian football fashion still copies iconic celebration poses.',
      'Legends never really retire — they live in chants forever.',
    ],
  },
  clubs: {
    title: 'Clubs',
    blurb: 'Search any Egyptian club and open its full fact page.',
    facts: [],
  },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeQuery(q) {
  return String(q || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "'")
    .replace(/\s+/g, ' ');
}

function getFactBanks() {
  const banks = [];
  if (typeof CURATED_CLUB_FACTS !== 'undefined') banks.push(...CURATED_CLUB_FACTS);
  if (typeof EXTRA_CLUB_FACTS !== 'undefined') banks.push(...EXTRA_CLUB_FACTS);
  return banks;
}

function factsForMatchKeys(matchKeys) {
  const out = [];
  const seen = new Set();
  const keys = (matchKeys || []).map((k) => k.toLowerCase());

  getFactBanks().forEach(({ match, facts }) => {
    const m = String(match).toLowerCase();
    if (!keys.some((k) => m.includes(k) || k.includes(m))) return;
    (facts || []).forEach((fact) => {
      if (seen.has(fact)) return;
      seen.add(fact);
      out.push(fact);
    });
  });

  keys.forEach((k) => {
    const local = LOCAL_CLUB_FACTS[k];
    if (!local) return;
    local.forEach((fact) => {
      if (seen.has(fact)) return;
      seen.add(fact);
      out.push(fact);
    });
  });

  return out;
}

function getClubFacts(club) {
  if (!club) return [];
  const facts = factsForMatchKeys(club.matchKeys || [club.id]);
  const meta = [];
  if (club.founded) meta.push(`Founded in ${club.founded} — a historic name in Egyptian football.`);
  if (club.city) meta.push(`Based in ${club.city}, Egypt.`);
  if (club.nickname) meta.push(`Nicknamed "${club.nickname}".`);
  if (club.national) meta.push('Egypt\'s senior national team — the Pharaohs.');
  else meta.push('An Egyptian club competing in Egypt\'s football pyramid.');
  return [...meta, ...facts];
}

function searchEgyptClubs(query) {
  const q = normalizeQuery(query);
  if (!q) return [...EGYPT_CLUBS];

  return EGYPT_CLUBS.filter((club) => {
    const hay = [
      club.name,
      club.fullName,
      club.city,
      club.nickname,
      club.id,
      ...(club.aliases || []),
      ...(club.matchKeys || []),
    ]
      .join(' ')
      .toLowerCase();
    return hay.includes(q) || q.split(' ').every((part) => hay.includes(part));
  });
}

function getClubById(id) {
  return EGYPT_CLUBS.find((c) => c.id === id) || null;
}

function getAllFactPool() {
  const pool = [];
  const seen = new Set();

  EGYPT_CLUBS.forEach((club) => {
    getClubFacts(club).forEach((fact) => {
      const key = `${club.id}::${fact}`;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push({ team: club.name, fact, clubId: club.id, color: club.color });
    });
  });

  Object.entries(FACT_CATEGORIES).forEach(([cat, data]) => {
    (data.facts || []).forEach((fact) => {
      const key = `cat:${cat}::${fact}`;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push({ team: data.title, fact, category: cat });
    });
  });

  if (typeof GLOBAL_FOOTBALL_FACTS !== 'undefined') {
    GLOBAL_FOOTBALL_FACTS.forEach((fact) => {
      const key = `global::${fact}`;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push({ team: 'Egyptian Football', fact, category: 'global' });
    });
  }

  return pool;
}

function clubInitials(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

window.EGYPT_CLUBS = EGYPT_CLUBS;
window.FACT_CATEGORIES = FACT_CATEGORIES;
window.searchEgyptClubs = searchEgyptClubs;
window.getClubById = getClubById;
window.getClubFacts = getClubFacts;
window.getAllFactPool = getAllFactPool;
window.clubInitials = clubInitials;
window.escapeHtml = escapeHtml;
window.normalizeQuery = normalizeQuery;
