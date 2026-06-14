const caseStudies = [
  {
    slug: "reebok",
    pillar: "Brand",
    title: "Every Street\nA Starting Line.",
    subtitle: "Reebok. A 60-second brand film for Southeast Asia, directed by Michael Wong.",
    heroImage: "/images/work/reebok-hero.jpg",
    heroAlt: "Boxer alone at ringside in a dark gymnasium, sepia-toned — Reebok brand film directed by Michael Wong",
    overview:
      "Shot across Southeast Asia in a warm super-8 grain that looks less like advertising and more like memory, this brand film for Reebok built its argument on one claim: the best athletes don't live in arenas. They live in these streets, these neighbourhoods, against these walls. Michael Wong cast real people rather than polished archetypes — a boxer alone at ringside before anyone else arrives, a woman at the wheel of a yellow van who smiles like she's been driving that road her whole life, a kid in a Reebok polo sitting in the shadow of a colonial building. The film didn't sell a shoe. It sold belonging.",
    approach:
      "Michael Wong shot on film and embraced the limits of the medium — the grain, the warmth, the motion blur, the double exposures that let two cities live inside the same frame. Bombay Blanc brought the Southeast Asian locations and cultural texture to life, working at street level rather than on set. Each shot was composed to hold still long enough for you to notice the person inside it. The Reebok wordmark arrived at the end like a signature, not a headline.",
    pullQuote: "The best athletes don't live in arenas. They live in these streets.",
    metadata: {
      client: "Reebok",
      format: "60-second brand film",
      director: "Michael Wong",
      role: "Production",
      year: "2015",
    },
    stills: [
      {
        src: "/images/work/reebok-van.jpg",
        alt: "Woman in baseball cap smiling at the wheel of a yellow van — Reebok brand film, Southeast Asia",
        caption: "On location · Southeast Asia · Super-8",
      },
      {
        src: "/images/work/reebok-train.jpg",
        alt: "Young man double-exposed against a passing train, wind in hair — Reebok brand film",
        caption: "Double exposure · Directed by Michael Wong",
      },
      {
        src: "/images/work/reebok-bw.jpg",
        alt: "Young woman in black-and-white double exposure against stacked crates — Reebok brand film",
        caption: "On location · Super-8 · Black and white",
      },
      {
        src: "/images/work/reebok-bicycle.jpg",
        alt: "Man in shirt and tie beside a bicycle against a pink wall — Reebok brand film, South Asia",
        caption: "On location · Street cast · Southeast Asia",
      },
      {
        src: "/images/work/reebok-polo.jpg",
        alt: "Young man in Reebok colour-block polo leaning against a colonial column — Reebok brand film",
        caption: "Reebok · Directed by Michael Wong · 2015",
      },
    ],
    seoTitle: "Reebok Brand Film — Southeast Asia | Bombay Blanc",
    seoDescription:
      "A 60-second brand film for Reebok, directed by Michael Wong. Shot across Southeast Asia in super-8 grain, celebrating real people in real streets. Produced by Bombay Blanc.",
    seoKeywords:
      "reebok brand film, michael wong director, southeast asia commercial, super-8 advertising, bombay blanc, brand film production, reebok campaign, analog film advertising",
  },
  {
    slug: "american-honey",
    pillar: "Stories",
    title: "Four Years.\nOne Hive.",
    subtitle: "American Honey. A vertical docuseries for Tubi, directed by Angel Garcia.",
    heroImage: "/images/work/american-honey-hero.jpg",
    heroAlt: "Aerial view of beekeepers working among hive boxes on a sun-drenched California orchard road — American Honey, Tubi",
    isVertical: true,
    overview:
      "American Honey is a vertical docuseries following commercial beekeepers across the American heartland — the people who keep the country's food supply alive, one hive at a time. Four years in the making, the series was conceived and directed by Angel Garcia for Tubi, shot entirely in 9:16 to meet audiences where they already watch: on their phones, in portrait, without compromise.",
    approach:
      "Angel Garcia embedded with working beekeepers across California and beyond, building trust over years rather than days. The result is access that feels earned, not staged. Every frame was composed for vertical — not adapted from horizontal footage, but conceived in 9:16 from the first shot. The visual language borrows from VHS texture and documentary grain, grounding the series in a warmth that matches its subject. Bombay Blanc provided production oversight and post-production, bringing the same editorial discipline to vertical storytelling that the studio applies to any format.",
    pullQuote: "The best stories don't ask you to turn your phone. They meet you where you are.",
    metadata: {
      client: "Tubi",
      platform: "Tubi",
      format: "9:16 vertical docuseries",
      director: "Angel Garcia",
      role: "Production & Post-Production",
      year: "2026",
    },
    stills: [
      {
        src: "/images/work/american-honey-aerial.jpg",
        alt: "Aerial view of beekeepers and hive boxes along orchard road — American Honey",
        caption: "On location · California · 9:16 vertical",
      },
      {
        src: "/images/work/american-honey-beekeeper.jpg",
        alt: "Beekeeper in white suit reaching toward camera with bee on glove — American Honey",
        caption: "Directed by Angel Garcia · Tubi",
      },
      {
        src: "/images/work/american-honey-vhs.jpg",
        alt: "Subject laughing against California hills — American Honey",
        caption: "On location · California · 9:16",
      },
      {
        src: "/images/work/american-honey-hilltop.jpg",
        alt: "Two people by vintage red truck overlooking valley landscape — American Honey",
        caption: "American Honey · Ashley Figgins · Tubi",
      },
    ],
    seoTitle: "American Honey — Tubi Vertical Docuseries | Bombay Blanc",
    seoDescription:
      "American Honey is a 9:16 vertical docuseries for Tubi, directed by Angel Garcia. Four years in the making, following commercial beekeepers across America. Produced by Bombay Blanc.",
    seoKeywords:
      "american honey, tubi docuseries, vertical video, 9:16 documentary, angel garcia director, beekeeping documentary, bombay blanc, vertical storytelling, tubi original",
  },
  {
    slug: "vanishing-trades",
    pillar: "Stories",
    title: "A Trade Measured\nin Seasons",
    subtitle: "Vanishing Trades. Episode: Rice Farmer, Japan. A 60-second vignette for Discovery Channel.",
    heroImage: "/images/work/vanishing-trades-hero.jpg",
    heroAlt: "Hands on film equipment — Vanishing Trades opening frame, Discovery Channel series produced by Bombay Blanc",
    // ── Film embed ──
    // After uploading to Vimeo, paste the numeric video ID below (e.g. "123456789").
    // Until an id is set, the page falls back to the hero image above — nothing breaks.
    video: {
      provider: "vimeo",            // "vimeo" or "youtube"
      id: "1201117111",             // Vimeo — vimeo.com/1201117111
      start: 1,                     // begin playback at 1s to skip the opening black frame
      aspectRatio: "4 / 3",         // native ratio of the 720×540 master — keeps the frame uncropped
      title: "Vanishing Trades: Rice Farmer, Japan — Discovery Channel",
    },
    overview:
      "In 2015, Bombay Blanc produced Vanishing Trades for Discovery Channel — a 20-part series of 60-second cinematic vignettes documenting trades disappearing across South East Asia and beyond. Each film was a portrait, not a profile. This episode follows the Japanese rice farmer through archival black-and-white footage: hands in wet earth, thatched roofs against winter light, tools shaped by centuries of repetition.",
    approach:
      "Hana Mattar produced the entire 20-part series — and wrote, directed, and researched this episode herself. The footage was sourced globally — archival film of rice paddies, cherry blossom festivals, farmhouses, and the quiet choreography of manual harvest. The directorial approach was observational, not explanatory: no narration that competed with the image, no score that told the viewer what to feel. Sixty seconds. One trade. The frame did the remembering.",
    pullQuote: "Some trades do not vanish. They are simply no longer watched.",
    metadata: {
      client: "Discovery Channel",
      network: "Discovery",
      format: "60-second cinematic vignettes",
      episodes: "20",
      role: "Producer (series) · Writer & Director (this episode)",
      year: "2015",
    },
    stills: [
      {
        src: "/images/work/vanishing-trades-rice-paddy.jpg",
        alt: "Japanese rice farmer wading into paddy field — archival footage, Vanishing Trades",
        caption: "Archival · 16mm · Japan · c. 1960s",
      },
      {
        src: "/images/work/vanishing-trades-farmer-cart.jpg",
        alt: "Farmer pulling cart through rural path — archival footage, Vanishing Trades",
        caption: "Archival · 16mm · Japan · c. 1960s",
      },
      {
        src: "/images/work/vanishing-trades-seedlings.jpg",
        alt: "Close-up of rice seedlings being planted in water — Vanishing Trades",
        caption: "Archival · 16mm · Japan · c. 1960s",
      },
      {
        src: "/images/work/vanishing-trades-festival.jpg",
        alt: "Cherry blossom festival with traditional lanterns — Vanishing Trades",
        caption: "Archival · 16mm · Japan · c. 1960s",
      },
      {
        src: "/images/work/vanishing-trades-farmhouse.jpg",
        alt: "Child before thatched farmhouse in rural Japan — Vanishing Trades",
        caption: "Archival · 16mm · Japan · c. 1960s",
      },
      {
        src: "/images/work/vanishing-trades-projector.jpg",
        alt: "Film projector light — Vanishing Trades opening sequence",
        caption: "16mm projector · Discovery Channel · 2015",
      },
      {
        src: "/images/work/vanishing-trades-title-card.jpg",
        alt: "Vanishing Trades title card — Discovery Channel series",
        caption: "Title card · Discovery Channel · 2015",
      },
      {
        src: "/images/work/vanishing-trades-discovery-logo.jpg",
        alt: "Discovery Channel logo — Explore Your World, Vanishing Trades end card",
        caption: "Discovery Channel · Explore Your World",
      },
    ],
    seoTitle: "Vanishing Trades — Discovery Channel | Bombay Blanc",
    seoDescription:
      "A 20-part series of 60-second cinematic vignettes for Discovery Channel, documenting vanishing trades across South East Asia. Produced by Hana Mattar across the full 20-part series, who also wrote and directed this episode.",
    seoKeywords:
      "vanishing trades, discovery channel, documentary vignettes, cinematic short film, rice farmer japan, bombay blanc, hana mattar, branded content production",
  },
  {
    slug: "celeb-ru-singapore",
    pillar: "Brand",
    title: "Singapore,\nBriefly Yours.",
    subtitle:
      "Singapore Tourism Board. “Celeb-ru, Singapore” — a destination campaign for the Japanese market, starring Manami Konishi.",
    heroImage: "/images/work/celeb-ru-singapore-stb-raffles-hotel-manami-konishi-hero.jpg",
    heroAlt:
      "The colonial courtyard and fountain of Raffles Hotel, Singapore — evoking the Singapore Tourism Board “Celeb-ru, Singapore” campaign starring Manami Konishi, produced by Bombay Blanc",
    overview:
      "In 2004, the Singapore Tourism Board set out to sell Singapore to Japan not as a stopover but as a state of mind — “Celeb-ru, Singapore,” an invitation to spend a few days living like the most fortunate version of yourself. Manami Konishi was the face of it: unhurried, luminous, at home in a city that was not hers. Bombay Blanc was the production partner on the ground — the studio that turned a Japanese creative vision into Singapore days that ran on time.",
    approach:
      "The shoot moved through the city's most composed addresses — high tea at Raffles Hotel, the green hush of Spa Botanica, the skyline from The Ritz-Carlton Millenia, the open light of Sentosa. Bombay Blanc handled the work that never reaches the screen: permits and locations, crew and call sheets, the quiet choreography that lets a visiting team shoot as though they had always known the place. The privilege was watching the Japanese crew light a set — patient, exact, unwilling to settle for a frame that was merely good. The image that stays is the simplest one: a pool filled, surface to edge, with rose petals. Someone's idea of luxury, made real for a camera.",
    pullQuote: "A visiting crew shoots best in a city that has already said yes.",
    metadata: {
      client: "Singapore Tourism Board",
      format: "Destination campaign · Japan market",
      role: "Production Services · Singapore",
      year: "2004",
    },
    stills: [
      {
        src: "/images/work/celeb-ru-singapore-rose-petal-pool-spa-bath.jpg",
        alt: "A spa bath filled surface to edge with red rose petals in a tropical garden — the signature image of the Singapore Tourism Board “Celeb-ru, Singapore” campaign, produced by Bombay Blanc",
        caption: "The signature image · Rose-petal pool",
      },
      {
        src: "/images/work/celeb-ru-singapore-spa-botanica-high-tea-tropical-garden.jpg",
        alt: "High tea served in a lush tropical garden — evoking Spa Botanica, Sentosa, for the Singapore Tourism Board “Celeb-ru, Singapore” campaign, Bombay Blanc",
        caption: "High tea · Tropical garden, Sentosa",
      },
    ],
    seoTitle: "Singapore Tourism Board — “Celeb-ru, Singapore” Campaign | Bombay Blanc",
    seoDescription:
      "Bombay Blanc provided production services in Singapore for the Singapore Tourism Board's “Celeb-ru, Singapore” campaign starring Manami Konishi — shot at Raffles Hotel, Spa Botanica, The Ritz-Carlton Millenia and Sentosa.",
    seoKeywords:
      "singapore tourism board campaign, celeb-ru singapore, manami konishi, japan market tourism film, production services singapore, raffles hotel shoot, sentosa film location, bombay blanc, line production singapore, destination campaign",
  },
];

// Display order: STB → Discovery → American Honey (vertical) → Reebok
const displayOrder = [
  "celeb-ru-singapore",
  "vanishing-trades",
  "american-honey",
  "reebok",
];

const orderedCaseStudies = displayOrder
  .map((slug) => caseStudies.find((cs) => cs.slug === slug))
  .filter(Boolean);

export default orderedCaseStudies;
