// ============================================================================
// STADSDATA — schaalbare bron voor alle SEO-stadspagina's (/vastgoed-[slug]/).
// Nieuwe stad toevoegen? Voeg één object toe aan de array hieronder; de pagina,
// sitemap-entry en interne links worden automatisch gegenereerd.
// Schrijf voorzichtig: geen ongefundeerde claims. Gebruik "kan interessant zijn
// voor", "is vaak populair bij", "moet per object worden beoordeeld".
// ============================================================================

export interface Gebied {
  naam: string;
  over: string; // korte, feitelijke omschrijving zonder harde claims
}

export interface Stad {
  slug: string;
  naam: string;
  regio: string;
  /** Korte, unieke invalshoek — gebruikt in meta description en hero-sub. */
  invalshoek: string;
  /** Unieke intro van 2-4 zinnen. */
  intro: string;
  /** Voor wie de stad kan passen. */
  voorWie: string[];
  /** Voordelen (voorzichtig geformuleerd). */
  voordelen: string[];
  /** Aandachtspunten / risico's specifiek voor deze stad. */
  risicos: string[];
  /** Populaire wijken/gebieden, feitelijk en zonder claims. */
  gebieden: Gebied[];
  /** Verhuurpotentie — voorzichtig. */
  verhuur: string;
  /** Bij wie de stad vaak populair is. */
  populairBij: string;
}

export const steden: Stad[] = [
  {
    slug: 'tanger', naam: 'Tanger', regio: 'Tanger-Tetouan-Al Hoceima',
    invalshoek: 'Een van de snelst groeiende steden van Marokko, met sterke waardeontwikkeling en verhuur aan expats en zakelijke huurders.',
    intro: 'Tanger is de poort tussen Europa en Afrika en een van de dynamischste steden van Marokko. De haven Tanger Med, een groeiende economie en een grote diaspora met roots in het noorden zorgen voor een aanhoudende vraag naar vastgoed. De stad ontwikkelt zich snel, van de moderne baai tot de historische medina.',
    voorWie: ['Investeerders die inzetten op waardegroei', 'Noord-Marokkaanse (Rif-)families uit Nederland en België', 'Kopers die verhuren aan expats of zakelijke huurders', 'Wie een moderne stad met kust én vliegveldverbinding zoekt'],
    voordelen: ['Sterke economische groei en werkgelegenheid rond Tanger Med', 'Goede verbindingen met Europa (haven, luchthaven, ferry)', 'Breed aanbod: van medina tot moderne nieuwbouw aan de baai'],
    risicos: ['Prijzen lopen per wijk sterk uiteen — vergelijken is essentieel', 'Snelle ontwikkeling betekent ook off-plan aanbod dat u goed moet laten controleren', 'Kwaliteit van nieuwbouw verschilt per ontwikkelaar'],
    gebieden: [
      { naam: 'Malabata', over: 'kustzone ten oosten van het centrum met veel nieuwbouw en zeezicht' },
      { naam: 'Centrum / Medina', over: 'historisch hart, gemengd aanbod van appartementen en te renoveren panden' },
      { naam: 'Marshan & Iberia', over: 'gewilde woonwijken nabij het centrum' },
    ],
    verhuur: 'Tanger kent een gemengde huurmarkt: langetermijnverhuur aan werkenden en expats, en in de zomer seizoensverhuur. De potentie hangt sterk af van wijk en type en moet per object worden beoordeeld.',
    populairBij: 'investeerders en Noord-Marokkaanse families',
  },
  {
    slug: 'casablanca', naam: 'Casablanca', regio: 'Casablanca-Settat',
    invalshoek: 'De economische hoofdstad met de grootste en meest liquide vastgoedmarkt van Marokko — sterk voor stabiele, zakelijke verhuur.',
    intro: 'Casablanca is de economische motor van Marokko en heeft de grootste vastgoedmarkt van het land. Van moderne appartementen in Anfa tot grootschalige nieuwbouwprojecten: het aanbod is divers en de vraag stabiel. Voor wie zoekt naar liquiditeit en langetermijnwaarde is Casablanca vaak een logische keuze.',
    voorWie: ['Investeerders die stabiliteit en verhuurzekerheid zoeken', 'Kopers gericht op zakelijke of langetermijnverhuur', 'Wie een goed verhandelbaar object wil (grote markt)'],
    voordelen: ['Grootste en meest liquide markt van Marokko', 'Constante huurvraag door economie en werkgelegenheid', 'Breed spectrum aan prijsniveaus en wijken'],
    risicos: ['Toplocaties kennen hogere instapprijzen', 'Grote stad: leefbaarheid en waarde verschillen sterk per wijk', 'Verkeer en drukte kunnen locatiekeuze beïnvloeden'],
    gebieden: [
      { naam: 'Anfa', over: 'gewilde, hoogwaardige woonwijk' },
      { naam: 'Maârif', over: 'centraal, levendig, veel appartementen en voorzieningen' },
      { naam: 'Ain Diab', over: 'kustboulevard (Corniche) met zeezicht' },
      { naam: 'Casa-Anfa / nieuwbouwzones', over: 'grootschalige moderne ontwikkeling' },
    ],
    verhuur: 'De huurvraag in Casablanca is doorgaans constant door de zakelijke bedrijvigheid. Langetermijnverhuur is gebruikelijk; het netto rendement verschilt per wijk en object en moet individueel worden doorgerekend.',
    populairBij: 'investeerders die rendement en zekerheid zoeken',
  },
  {
    slug: 'mohammedia', naam: 'Mohammedia', regio: 'Casablanca-Settat',
    invalshoek: 'Kuststad tussen Casablanca en Rabat, met stranden, een rustiger tempo en groeiende nieuwbouw in en rond de stad.',
    intro: 'Mohammedia ligt aan de Atlantische kust, op ongeveer 25 kilometer van Casablanca en aan de as richting Rabat. De stad combineert stranden en een overzichtelijk centrum met een eigen haven en bedrijvigheid. In en rond de stad verschijnt nieuwbouw, onder meer in Zenata Eco-Cité en in de kustplaats Mansouria. Voor wie dicht bij Casablanca wil wonen of investeren, maar aan zee en in een rustigere omgeving, kan Mohammedia interessant zijn.',
    voorWie: ['Gezinnen die dicht bij Casablanca aan zee willen wonen', 'Kopers van een tweede woning aan de kust', 'Investeerders in langetermijnverhuur in de regio Casablanca'],
    voordelen: ['Kustligging met stranden, dicht bij Casablanca', 'Goede verbindingen via snelweg en trein richting Casablanca en Rabat', 'Groeiend nieuwbouwaanbod, onder meer in Zenata en Mansouria'],
    risicos: ['Kwaliteit en opleverplanning verschillen per ontwikkelaar — off-plan goed laten controleren', 'Prijzen verschillen sterk tussen centrum, kustzone en nieuwe wijken', 'Seizoensverhuur is beperkter dan in uitgesproken toeristische kuststeden'],
    gebieden: [
      { naam: 'Centrum / Parc Floral', over: 'appartementen nabij winkels en voorzieningen' },
      { naam: 'Mannesmann / kustzone', over: 'residenties dicht bij het strand' },
      { naam: 'Zenata Eco-Cité', over: 'nieuwe, groene stad tussen Casablanca en Mohammedia' },
      { naam: 'Mansouria', over: 'kustplaats ten noordoosten van Mohammedia met nieuwe residenties' },
    ],
    verhuur: 'Mohammedia kent vooral langetermijnverhuur aan gezinnen en werkenden in de regio Casablanca, aangevuld met zomerverhuur aan de kust. De potentie verschilt per wijk en moet per object worden beoordeeld.',
    populairBij: 'gezinnen en kopers uit de regio Casablanca',
  },
  {
    slug: 'rabat', naam: 'Rabat', regio: 'Rabat-Salé-Kénitra',
    invalshoek: 'De bestuurlijke hoofdstad geldt als een van de stabielste en rustigste vastgoedmarkten van Marokko.',
    intro: 'Rabat is de bestuurlijke hoofdstad: groen, verzorgd en relatief rustig. De aanwezigheid van overheid, ambassades en internationale instellingen zorgt voor een stabiele markt en een gestage vraag naar kwaliteitswoningen. Voor kopers die zekerheid en rust boven snelle groei stellen, is Rabat vaak aantrekkelijk.',
    voorWie: ['Kopers die stabiliteit en zekerheid zoeken', 'Verhuurders gericht op ambtenaren, diplomaten en expats', 'Wie een rustige, groene woonomgeving wil'],
    voordelen: ['Stabiele markt met beperkte volatiliteit', 'Verzorgde, groene stad met goede voorzieningen', 'Vraag vanuit overheids- en diplomatensector'],
    risicos: ['Instapprijzen in toplocaties kunnen hoog liggen', 'Minder uitgesproken waardegroei dan in groeisteden', 'Aanbod op toplocaties kan beperkt zijn'],
    gebieden: [
      { naam: 'Agdal', over: 'gewilde, centrale wijk met veel voorzieningen' },
      { naam: 'Hassan', over: 'centraal gelegen, gemengd aanbod' },
      { naam: 'Souissi', over: 'ruime, residentiële wijk' },
    ],
    verhuur: 'Rabat leent zich goed voor stabiele langetermijnverhuur aan werkenden, ambtenaren en diplomaten. Het rendement is doorgaans gematigd maar voorspelbaar en moet per object worden bekeken.',
    populairBij: 'kopers die zekerheid en rust zoeken',
  },
  {
    slug: 'marrakech', naam: 'Marrakech', regio: 'Marrakech-Safi',
    invalshoek: 'De toeristische topbestemming van Marokko, met een sterke markt voor vakantieverhuur en riads.',
    intro: 'Marrakech is wereldwijd bekend en trekt het hele jaar door toeristen. Van riads in de historische medina tot villa’s in de Palmeraie en appartementen in Guéliz: de stad heeft een uitgesproken internationale markt. Voor wie mikt op toeristische verhuur is Marrakech een van de interessantste steden.',
    voorWie: ['Investeerders in vakantie-/Airbnb-verhuur', 'Kopers van een riad of tweede woning met verhuurpotentie', 'Wie een internationaal georiënteerde markt zoekt'],
    voordelen: ['Sterke, jaarrond toeristische vraag', 'Herkenbare bestemming met internationaal koperspubliek', 'Divers aanbod: riads, appartementen, villa’s'],
    risicos: ['Vakantieverhuur is seizoens- en trendgevoelig', 'Riads vragen vaak onderhoud en renovatie-inschatting', 'Regels rond toeristische verhuur en registratie in acht nemen'],
    gebieden: [
      { naam: 'Medina', over: 'historisch centrum, riads en authentiek vastgoed' },
      { naam: 'Guéliz', over: 'moderne stadswijk met appartementen en voorzieningen' },
      { naam: 'Palmeraie', over: 'groene zone met villa’s buiten het centrum' },
      { naam: 'Hivernage', over: 'hotel- en uitgaanszone, hoogwaardig segment' },
    ],
    verhuur: 'De potentie voor toeristische verhuur is in Marrakech doorgaans hoog, maar wisselt met seizoen en bezetting. Voor een realistisch beeld moet u rekenen met kosten, leegstand en beheer — wij maken dit graag concreet.',
    populairBij: 'investeerders in vakantieverhuur',
  },
  {
    slug: 'agadir', naam: 'Agadir', regio: 'Souss-Massa',
    invalshoek: 'Moderne badplaats met veel zon, geschikt voor een tweede woning en vakantieverhuur aan de kust.',
    intro: 'Agadir is na de wederopbouw uitgegroeid tot een moderne, ruim opgezette badplaats met een lange boulevard en een aangenaam klimaat. De stad combineert strand met een groeiend aanbod nieuwbouw, wat het aantrekkelijk maakt voor een tweede woning of vakantieverhuur.',
    voorWie: ['Kopers van een tweede woning aan zee', 'Investeerders in vakantieverhuur', 'Wie zon, strand en moderne voorzieningen zoekt'],
    voordelen: ['Aangenaam klimaat met veel zonuren', 'Moderne, ruim opgezette stad met strand', 'Groeiend nieuwbouwaanbod'],
    risicos: ['Vakantieverhuur is seizoensgebonden', 'Kwaliteit en oplevering van nieuwbouw per ontwikkelaar controleren', 'Locatie t.o.v. strand en voorzieningen bepaalt waarde sterk'],
    gebieden: [
      { naam: 'Founty / Marina', over: 'gewild kustgebied nabij strand en jachthaven' },
      { naam: 'Centrum', over: 'nabij boulevard en voorzieningen' },
      { naam: 'Sonaba / uitbreidingszones', over: 'nieuwere ontwikkeling' },
    ],
    verhuur: 'Agadir kent een duidelijke vakantieverhuurmarkt, met pieken in de zonnige maanden. Langjarige verhuur is ook mogelijk. De haalbare bezetting moet per locatie en object worden beoordeeld.',
    populairBij: 'kopers van een tweede woning',
  },
  {
    slug: 'nador', naam: 'Nador', regio: 'Oriental',
    invalshoek: 'Thuisbasis voor veel Rif-families uit de diaspora, met gebiedsontwikkeling rond de Marchica-lagune en de haven.',
    intro: 'Nador is voor veel families uit de Rif-diaspora dé plek van herkomst. De stad groeit door de nabijheid van de haven Nador West Med en de ontwikkeling rond de lagune van Marchica. Familievastgoed en binding met de regio spelen hier een grote rol.',
    voorWie: ['Rif-families uit Nederland en België', 'Kopers met binding aan de regio', 'Investeerders die inzetten op gebiedsontwikkeling'],
    voordelen: ['Sterke diasporaband en familienetwerken', 'Gebiedsontwikkeling rond Marchica en de haven', 'Herkenbare, vertrouwde omgeving voor de doelgroep'],
    risicos: ['Informele afspraken binnen families kunnen tot onduidelijkheid leiden', 'Eigendomspapieren en titelregistratie extra goed controleren', 'Marktdata is beperkter dan in grote steden'],
    gebieden: [
      { naam: 'Centrum', over: 'stedelijk aanbod van appartementen' },
      { naam: 'Marchica-zone', over: 'gebied rond de lagune, in ontwikkeling' },
      { naam: 'Omliggende dorpen', over: 'familievastgoed, vaak per object te beoordelen' },
    ],
    verhuur: 'De verhuurmarkt is gemengd en deels seizoensgebonden door de diaspora. Verhuurpotentie kan interessant zijn, maar moet per wijk en object realistisch worden ingeschat.',
    populairBij: 'Rif-families uit de diaspora',
  },
  {
    slug: 'al-hoceima', naam: 'Al Hoceima', regio: 'Tanger-Tetouan-Al Hoceima',
    invalshoek: 'Middellandse-Zeestad met stranden en een sterke band met de Rif-diaspora.',
    intro: 'Al Hoceima ligt schilderachtig aan de Middellandse Zee, omringd door de Rif. De stad staat bekend om zijn baaien en stranden en is geliefd bij de diaspora. Toerisme en kustvastgoed zijn in ontwikkeling.',
    voorWie: ['Rif-families en kustliefhebbers', 'Kopers van een vakantie- of familiewoning', 'Wie een rustige kustplaats zoekt'],
    voordelen: ['Aantrekkelijke ligging aan zee met stranden', 'Sterke diasporaband', 'Rustiger alternatief voor de drukke badplaatsen'],
    risicos: ['Seizoensgebonden verhuur en bezoek', 'Beperktere marktdata en aanbod', 'Bereikbaarheid buiten het seizoen meewegen'],
    gebieden: [
      { naam: 'Centrum', over: 'stedelijk aanbod nabij voorzieningen' },
      { naam: 'Kustzone', over: 'woningen met zeezicht, per object te beoordelen' },
    ],
    verhuur: 'Verhuur is vooral seizoensgebonden (zomer). De potentie kan interessant zijn voor wie de zomerpieken benut, maar vraagt om een realistische inschatting van bezetting.',
    populairBij: 'Rif-families en kustliefhebbers',
  },
  {
    slug: 'tetouan', naam: 'Tetouan', regio: 'Tanger-Tetouan-Al Hoceima',
    invalshoek: 'Cultuurstad met UNESCO-medina, dicht bij de gewilde badplaatsen Martil en M’diq.',
    intro: 'Tetouan, de “witte duif”, ligt tegen het Rif-gebergte en vlak bij de kust. De UNESCO-medina geeft de stad karakter, terwijl de nabijheid van Martil en M’diq de kust binnen handbereik brengt. Instapprijzen liggen vaak lager dan direct aan zee.',
    voorWie: ['Kopers die cultuur en kust willen combineren', 'Wie een betaalbaarder alternatief nabij de kust zoekt', 'Diaspora met binding aan het noorden'],
    voordelen: ['Vaak lagere instapprijzen dan direct aan de kust', 'Nabijheid van Martil en M’diq', 'Authentiek karakter met UNESCO-medina'],
    risicos: ['Niet direct aan zee: locatie t.o.v. kust meewegen', 'Medina-panden kunnen renovatie vragen', 'Marktdata per wijk beoordelen'],
    gebieden: [
      { naam: 'Medina', over: 'historisch centrum (UNESCO), authentiek vastgoed' },
      { naam: 'Moderne stadswijken', over: 'appartementen en nieuwbouw buiten de medina' },
    ],
    verhuur: 'Verhuur kan interessant zijn richting studenten en werkenden (langjarig) en in de zomer via de nabije kust. Potentie per wijk en object beoordelen.',
    populairBij: 'kopers die cultuur en kust combineren',
  },
  {
    slug: 'martil', naam: 'Martil', regio: 'Tanger-Tetouan-Al Hoceima',
    invalshoek: 'Populaire badplaats bij Tetouan met een druk zomerseizoen — sterk op seizoensverhuur.',
    intro: 'Martil is een geliefde badplaats vlak bij Tetouan, met een lange boulevard en een levendig zomerseizoen. Bij de diaspora is Martil populair voor zomerverblijf en verhuur in de piekmaanden.',
    voorWie: ['Zomergasten uit de diaspora', 'Investeerders in seizoensverhuur', 'Kopers van een vakantieappartement aan zee'],
    voordelen: ['Directe kustligging met boulevard', 'Sterke zomervraag', 'Populair en herkenbaar bij de diaspora'],
    risicos: ['Sterk seizoensgebonden: rustig buiten de zomer', 'Bezetting buiten het seizoen realistisch inschatten', 'Kwaliteit nieuwbouw per ontwikkelaar controleren'],
    gebieden: [
      { naam: 'Boulevard / kustzone', over: 'appartementen nabij het strand' },
      { naam: 'Centrum', over: 'nabij voorzieningen, iets landinwaarts' },
    ],
    verhuur: 'De verhuurpotentie is geconcentreerd in de zomermaanden en kan dan aantrekkelijk zijn. Voor een realistisch jaarrendement moet u de lagere bezetting buiten het seizoen meewegen.',
    populairBij: 'zomergasten uit de diaspora',
  },
  {
    slug: 'mdiq', naam: 'M’diq', regio: 'Tanger-Tetouan-Al Hoceima',
    invalshoek: 'Verzorgde, moderne kustplaats met jachthaven — gericht op kwaliteitskustvastgoed.',
    intro: 'M’diq ligt tussen Tetouan en Fnideq en geldt als een van de meest verzorgde kustplaatsen van het noorden, met een jachthaven en hoogwaardige nieuwbouw. De stad trekt kopers die kwaliteit en een nette uitstraling zoeken aan zee.',
    voorWie: ['Kopers van kwaliteitskustvastgoed', 'Investeerders in nette vakantieverhuur', 'Wie een verzorgde badplaats zoekt'],
    voordelen: ['Verzorgde uitstraling en jachthaven', 'Hoogwaardig nieuwbouwaanbod', 'Gewilde kustlocatie in het noorden'],
    risicos: ['Hoger prijssegment dan omliggende plaatsen', 'Seizoensinvloed op verhuur', 'Oplevering en kwaliteit nieuwbouw laten controleren'],
    gebieden: [
      { naam: 'Marina / kustzone', over: 'hoogwaardig kustvastgoed nabij de jachthaven' },
      { naam: 'Centrum', over: 'appartementen nabij voorzieningen' },
    ],
    verhuur: 'M’diq heeft een aantrekkelijke vakantieverhuurmarkt in het kwaliteitssegment. De haalbare bezetting en het rendement moeten per object worden beoordeeld.',
    populairBij: 'kopers van kwaliteitskustvastgoed',
  },
  {
    slug: 'saidia', naam: 'Saïdia', regio: 'Oriental',
    invalshoek: 'Resortbestemming met een kilometerslang strand, jachthaven en golf — uitgesproken vakantievastgoed.',
    intro: 'Saïdia staat bekend om zijn lange zandstrand en de resortontwikkeling met jachthaven en golfbanen. Het is een uitgesproken vakantiebestemming in het oosten, populair bij wie een resortappartement zoekt.',
    voorWie: ['Kopers van een vakantieappartement in resortstijl', 'Investeerders in seizoensverhuur', 'Wie strand, golf en jachthaven waardeert'],
    voordelen: ['Lang strand en resortvoorzieningen', 'Jachthaven en golf in de omgeving', 'Duidelijk vakantieprofiel'],
    risicos: ['Sterk seizoensgebonden', 'Servicekosten van resortcomplexen meewegen', 'Bezetting buiten het seizoen realistisch inschatten'],
    gebieden: [
      { naam: 'Resortzone / Marina', over: 'appartementen in resortcomplexen nabij strand en haven' },
      { naam: 'Centrum Saïdia', over: 'stedelijker aanbod' },
    ],
    verhuur: 'De verhuurpotentie is geconcentreerd in het zomerseizoen. Resortappartementen kunnen interessant zijn voor vakantieverhuur, mits u servicekosten en bezetting realistisch meerekent.',
    populairBij: 'kopers van een vakantieappartement',
  },
  {
    slug: 'oujda', naam: 'Oujda', regio: 'Oriental',
    invalshoek: 'De grootste stad van het oosten: betaalbaar instapniveau met sterke binding aan de Oriental-diaspora.',
    intro: 'Oujda is de hoofdstad van de Oriental, dicht bij de Algerijnse grens. De markt is doorgaans betaalbaarder dan in de grote kuststeden en er is een sterke band met de diaspora uit deze regio.',
    voorWie: ['Families uit de Oriental-regio', 'Kopers met een beperkter budget', 'Wie stabiele langjarige verhuur zoekt'],
    voordelen: ['Betaalbaar instapniveau', 'Sterke regionale diasporaband', 'Stedelijke voorzieningen als regiohoofdstad'],
    risicos: ['Minder uitgesproken waardegroei dan in kuststeden', 'Beperktere toeristische verhuur', 'Marktdata per wijk beoordelen'],
    gebieden: [
      { naam: 'Centrum', over: 'stedelijk appartementenaanbod' },
      { naam: 'Nieuwere woonwijken', over: 'uitbreiding met nieuwbouw' },
    ],
    verhuur: 'Verhuur is vooral gericht op langjarige huurders (werkenden, studenten). De potentie is stabiel maar gematigd en moet per object worden bekeken.',
    populairBij: 'families uit de Oriental',
  },
  {
    slug: 'fes', naam: 'Fès', regio: 'Fès-Meknès',
    invalshoek: 'Cultureel hart van Marokko met de grootste middeleeuwse medina — kansen in riads en cultuurtoerisme.',
    intro: 'Fès is het spirituele en culturele hart van Marokko en herbergt de grootste middeleeuwse medina ter wereld. De stad trekt cultuurtoeristen en kent een authentieke markt met groeiende belangstelling van kopers, met name voor riads.',
    voorWie: ['Liefhebbers van authenticiteit en cultuur', 'Kopers van een riad met verhuurpotentie', 'Investeerders gericht op cultuurtoerisme'],
    voordelen: ['Unieke, authentieke medina (UNESCO)', 'Cultuurtoerisme het hele jaar', 'Vaak aantrekkelijke prijzen voor karaktervol vastgoed'],
    risicos: ['Riads en medina-panden vragen vaak renovatie', 'Onderhoud en toegankelijkheid in de medina meewegen', 'Verhuurbezetting realistisch inschatten'],
    gebieden: [
      { naam: 'Medina (Fès el-Bali)', over: 'historisch centrum, riads en authentieke panden' },
      { naam: 'Ville Nouvelle', over: 'moderne stadsdeel met appartementen' },
    ],
    verhuur: 'Verhuur richt zich vooral op cultuurtoerisme (riads) en langjarige huur in de nieuwe stad. Potentie kan interessant zijn, maar renovatie- en onderhoudskosten moeten worden meegenomen.',
    populairBij: 'liefhebbers van authenticiteit',
  },
  {
    slug: 'essaouira', naam: 'Essaouira', regio: 'Marrakech-Safi',
    invalshoek: 'Charmante kuststad met UNESCO-medina en een internationale gemeenschap, geliefd bij Europese kopers.',
    intro: 'Essaouira is een charmante, winderige kuststad met een ommuurde UNESCO-medina en een groeiende internationale gemeenschap. De stad heeft een eigen sfeer en trekt Europese kopers die authenticiteit met kust combineren.',
    voorWie: ['Europese kopers en creatievelingen', 'Kopers van een riad of kustwoning', 'Investeerders in vakantieverhuur met karakter'],
    voordelen: ['Unieke sfeer met medina aan zee', 'Internationaal koperspubliek', 'Aantrekkelijk voor karaktervol vakantievastgoed'],
    risicos: ['Wind en zilte lucht: onderhoud meewegen', 'Medina-panden vragen vaak renovatie', 'Seizoensinvloed op verhuur'],
    gebieden: [
      { naam: 'Medina', over: 'ommuurd centrum (UNESCO), riads en appartementen' },
      { naam: 'Buiten de muren / kustzone', over: 'modernere woningen en villa’s' },
    ],
    verhuur: 'De vakantieverhuurmarkt is aanwezig en internationaal georiënteerd. De potentie moet per object en seizoen worden ingeschat, met aandacht voor onderhoud aan de kust.',
    populairBij: 'Europese kopers en creatievelingen',
  },
  {
    slug: 'kenitra', naam: 'Kenitra', regio: 'Rabat-Salé-Kénitra',
    invalshoek: 'Opkomende groeimarkt dankzij de auto-industrie en de nabijheid van Rabat — interessant om vroeg in te stappen.',
    intro: 'Kenitra groeit hard dankzij de industrie (onder meer de Atlantic Free Zone met auto-industrie) en de goede verbinding met Rabat. De instapprijzen liggen doorgaans lager dan in de hoofdstad, wat de stad interessant maakt voor wie vroeg wil instappen in een groeimarkt.',
    voorWie: ['Investeerders die vroeg willen instappen', 'Kopers met een beperkter budget nabij de hoofdstad', 'Verhuurders gericht op werkenden in de industrie'],
    voordelen: ['Groeiende werkgelegenheid en industrie', 'Goede verbinding met Rabat', 'Vaak aantrekkelijke instapprijzen'],
    risicos: ['Groeiverwachting is geen garantie op waardestijging', 'Locatiekeuze binnen de stad bepaalt potentie sterk', 'Nieuwbouw en ontwikkelaar laten controleren'],
    gebieden: [
      { naam: 'Centrum', over: 'stedelijk appartementenaanbod' },
      { naam: 'Nieuwe woonzones', over: 'uitbreiding nabij werkgelegenheid' },
    ],
    verhuur: 'De verhuurvraag wordt gevoed door werkenden en studenten. Langjarige verhuur is gebruikelijk; het rendement moet per wijk en object worden doorgerekend.',
    populairBij: 'investeerders die vroeg willen instappen',
  },
  {
    slug: 'temara', naam: 'Temara', regio: 'Rabat-Salé-Kénitra',
    invalshoek: 'Betaalbaarder alternatief pal naast Rabat, met Atlantische stranden — populair bij forensen en gezinnen.',
    intro: 'Temara grenst aan Rabat en biedt een rustiger en vaak betaalbaarder alternatief, met stranden aan de Atlantische kust. De stad is populair als woonplaats voor forensen die in de hoofdstad werken.',
    voorWie: ['Forensen en gezinnen', 'Kopers die nabij Rabat willen wonen tegen lagere prijs', 'Wie kust en stad wil combineren'],
    voordelen: ['Nabijheid van Rabat tegen lagere prijzen', 'Atlantische stranden binnen bereik', 'Gezinsvriendelijke woonomgeving'],
    risicos: ['Waarde en leefbaarheid verschillen per wijk', 'Verkeer richting Rabat meewegen', 'Marktdata per zone beoordelen'],
    gebieden: [
      { naam: 'Centrum Temara', over: 'stedelijk woonaanbod' },
      { naam: 'Kustzone', over: 'woningen nabij de stranden' },
    ],
    verhuur: 'Verhuur richt zich vooral op langjarige huurders (forensen en gezinnen). De potentie is stabiel en moet per object worden bekeken.',
    populairBij: 'forensen en gezinnen',
  },
  {
    slug: 'skhirat', naam: 'Skhirat', regio: 'Rabat-Salé-Kénitra',
    invalshoek: 'Kustplaats tussen Rabat en Casablanca, bekend om strand en rust — gewild voor kustvastgoed.',
    intro: 'Skhirat ligt aan de Atlantische kust, tussen Rabat en Casablanca, en staat bekend om zijn strand en rustige uitstraling. De ligging tussen de twee grootste steden maakt de plaats interessant voor kustvastgoed.',
    voorWie: ['Kopers van een kustwoning tussen de grote steden', 'Wie rust aan zee zoekt binnen bereik van werk', 'Investeerders in kustvastgoed'],
    voordelen: ['Strategische ligging tussen Rabat en Casablanca', 'Kustligging met strand', 'Rustiger dan de grote steden'],
    risicos: ['Prijzen op toplocaties aan zee kunnen hoog liggen', 'Seizoensinvloed op verhuur', 'Aanbod kan beperkt zijn'],
    gebieden: [
      { naam: 'Kustzone', over: 'woningen en complexen nabij het strand' },
      { naam: 'Centrum', over: 'voorzieningen iets landinwaarts' },
    ],
    verhuur: 'Verhuur kent zowel een seizoenscomponent (zomer) als langjarige mogelijkheden door de nabijheid van werkgelegenheid. Potentie per object beoordelen.',
    populairBij: 'kopers van een kustwoning',
  },
  {
    slug: 'dakhla', naam: 'Dakhla', regio: 'Dakhla-Oued Ed-Dahab',
    invalshoek: 'Opkomende zuidelijke bestemming met lagune en watersport, gedragen door grote overheidsinvesteringen.',
    intro: 'Dakhla is de opkomende bestemming van het zuiden: een schiereiland aan een lagune, wereldwijd bekend bij watersporters, met omvangrijke overheidsinvesteringen in infrastructuur en haven. Voor pioniers kan dit een vroege groeimarkt zijn.',
    voorWie: ['Pioniers en watersportliefhebbers', 'Investeerders met een langere horizon', 'Wie inzet op toeristische ontwikkeling'],
    voordelen: ['Grote infrastructuur- en haveninvesteringen', 'Uniek natuur- en watersportprofiel', 'Vroege-fase kansen'],
    risicos: ['Afgelegen ligging: bereikbaarheid en beheer meewegen', 'Beperkte marktdata en liquiditeit', 'Toeristische ontwikkeling is nog in opbouw'],
    gebieden: [
      { naam: 'Centrum Dakhla', over: 'stedelijk aanbod' },
      { naam: 'Lagune-/kustzone', over: 'toeristisch georiënteerde ontwikkeling' },
    ],
    verhuur: 'De verhuurmarkt is nog in ontwikkeling en sterk gekoppeld aan toerisme en watersport. Potentie kan interessant zijn voor wie vroeg instapt, maar vraagt om een voorzichtige inschatting.',
    populairBij: 'pioniers en watersportliefhebbers',
  },
];
