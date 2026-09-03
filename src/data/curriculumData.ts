import { DiagnosticQuestion, Misconception, SocraticLesson, PracticeQuestion, ConceptMastery, RoadmapNode } from '../types';

export const MISCONCEPTIONS_DATABASE: Record<string, Misconception> = {
  'larger-denominator-fallacy': {
    id: 'larger-denominator-fallacy',
    concept: 'Fractions - Comparison',
    title: {
      en: 'Larger Denominator = Larger Fraction Fallacy',
      hi: 'बड़ा हर = बड़ा भिन्न का भ्रम (Denominator Fallacy)',
      mr: 'मोठा छेद = मोठा अपूर्णांक हा गैरसमज',
    },
    description: {
      en: 'Student assumes 1/8 is greater than 1/4 because the number 8 is larger than 4.',
      hi: 'छात्र यह मान लेता है कि 1/8, 1/4 से बड़ा है क्योंकि 8, 4 से बड़ा अंक है।',
      mr: 'विद्यार्थी समजतो की 1/8 हे 1/4 पेक्षा मोठे आहे कारण 8 हा अंक 4 पेक्षा मोठा आहे.',
    },
    whyItHappens: {
      en: 'Overgeneralizing whole number ordering rules to fraction denominators without visualizing portion sizes.',
      hi: 'पूर्णांक संख्याओं के नियमों को सीधे भिन्न के हर पर लागू कर देना, बिना हिस्सों की कल्पना किए।',
      mr: 'अपूर्णांकांच्या भागांचा विचार न करता पूर्णांक संख्यांचे नियम छेद संख्येवर लावणे.',
    },
    remedialAction: {
      en: 'Visual pizza/bar cutting comparison showing that dividing into more slices makes each slice smaller.',
      hi: 'पिज़्ज़ा/पट्टी को अधिक टुकड़ों में काटकर दिखाना कि ज्यादा टुकड़े होने पर प्रत्येक हिस्सा छोटा हो जाता है।',
      mr: 'पिझ्झा किंवा पट्टीचे अधिक तुकडे करून दाखवणे की जेवढे जास्त तुकडे, तेवढा प्रत्येक तुकडा लहान होतो.',
    },
    exampleSnippet: '1/4 > 1/8 (1 slice out of 4 is twice the size of 1 slice out of 8)',
  },

  'decimal-length-fallacy': {
    id: 'decimal-length-fallacy',
    concept: 'Decimals - Place Value',
    title: {
      en: 'Longer Decimal = Greater Number Fallacy',
      hi: 'दशमलव में अधिक अंक = बड़ी संख्या का भ्रम',
      mr: 'दशांशात जास्त अंक = मोठी संख्या हा गैरसमज',
    },
    description: {
      en: 'Student assumes 0.35 is greater than 0.6 because 35 is larger than 6.',
      hi: 'छात्र सोचता है कि 0.35, 0.6 से बड़ा है क्योंकि 35, 6 से बड़ा होता है।',
      mr: 'विद्यार्थी मानतो की 0.35 हे 0.6 पेक्षा मोठे आहे कारण 35 ही संख्या 6 पेक्षा मोठी आहे.',
    },
    whyItHappens: {
      en: 'Ignoring place value columns (tenths vs hundredths) and treating decimal portions as independent whole numbers.',
      hi: 'दशांश और शतांश (tenths & hundredths) के स्थान मान को अनदेखा करके दशमलव के बाद की संख्या को पूर्णांक मान लेना।',
      mr: 'दशांश आणि शतांश या स्थानिक किमतींकडे दुर्लक्ष करून दशांशानंतरच्या संख्येला पूर्ण संख्या समजणे.',
    },
    remedialAction: {
      en: 'Place value grid visualization showing 0.6 = 0.60 (6 tenths = 60 hundredths vs 35 hundredths).',
      hi: 'स्थान मान ग्रिड से दिखाना कि 0.6 = 0.60 (6 दशांश = 60 शतांश, जो 35 शतांश से अधिक है)।',
      mr: 'स्थानिक किंमत तक्त्याद्वारे स्पष्ट करणे की 0.6 = 0.60 (6 दशांश = 60 शतांश, जे 35 शतांशांपेक्षा मोठे आहे).',
    },
    exampleSnippet: '0.6 (6/10) = 0.60 (60/100) > 0.35 (35/100)',
  },

  'decimal-word-problem-translation': {
    id: 'decimal-word-problem-translation',
    concept: 'Decimals - Word Problems & Application',
    title: {
      en: 'Decimal Representation Bottleneck in Word Problems',
      hi: 'दशमलव शाब्दिक प्रश्नों (Word Problems) में अनुप्रयोग की कठिनाई',
      mr: 'दशांश शाब्दिक उदाहरणांमध्ये मांडणीची अडचण',
    },
    description: {
      en: 'Student calculates pure decimal arithmetic correctly, but struggles to translate real-world context (currency, distances, weights) into decimal operations.',
      hi: 'छात्र साधारण दशमलव गुणा/भाग सही करता है, परंतु शाब्दिक प्रश्नों में स्थिति को समीकरण में बदलने में गलती करता है।',
      mr: 'विद्यार्थी साधे दशांश गुणाकार बरोबर करतो, पण शाब्दिक उदाहरणात (रुपये, वजन, अंतर) दशांश मांडणीत गोंधळतो.',
    },
    whyItHappens: {
      en: 'Cognitive overload between semantic reading comprehension and place-value unit alignment.',
      hi: 'प्रश्न को समझने और इकाई परिवर्तन (Units Alignment) को एक साथ करने में भ्रम।',
      mr: 'उदाहरणाचा अर्थ लावणे आणि एककांची जुळवणी (Units Alignment) एकाच वेळी करताना येणारा ताण.',
    },
    remedialAction: {
      en: 'Step-by-step 3-part Socratic scaffold: 1. Identify given units, 2. Convert to same decimal standard, 3. Execute single operation.',
      hi: '3-चरणीय सुकराती तरीका: 1. इकाइयां पहचानें, 2. मानक दशमलव में बदलें, 3. हल करें।',
      mr: '3 टप्प्यांची सुकरात पद्धत: 1. एकके ओळखा, 2. समान दशांश स्वरूपात आणा, 3. प्रत्यक्ष क्रिया करा.',
    },
    exampleSnippet: '3 notebooks at ₹24.50 each + 1 pen at ₹12.75 = 3 × 24.50 + 12.75',
  },

  'algebra-negative-distribution': {
    id: 'algebra-negative-distribution',
    concept: 'Basic Algebra - Parentheses Expansion',
    title: {
      en: 'Negative Sign Distribution Error',
      hi: 'ऋणात्मक चिन्ह (-ve) के वितरण में त्रुटि',
      mr: 'ऋण चिन्ह (-) कंसात गुणताना होणारी चूक',
    },
    description: {
      en: 'Student writes -(3x - 5) as -3x - 5 instead of -3x + 5.',
      hi: 'छात्र -(3x - 5) को -3x + 5 के बजाय -3x - 5 लिख देता है।',
      mr: 'विद्यार्थी -(3x - 5) चे रूपांतर -3x + 5 ऐवजी -3x - 5 असे करतो.',
    },
    whyItHappens: {
      en: 'Only multiplying the first term inside the parentheses with the negative sign and leaving the second term unaltered.',
      hi: 'केवल पहले पद को ऋण से गुणा करना और दूसरे पद के चिन्ह को अनदेखा करना।',
      mr: 'केवळ पहिल्या पदाला ऋण चिन्हाने गुणणे आणि दुसऱ्या पदाचे चिन्ह तसेच ठेवणे.',
    },
    remedialAction: {
      en: 'Visual distribution arrows showing -1 × (first term) and -1 × (second term).',
      hi: 'वितरण तीरों (Arrows) द्वारा दिखाना कि -1 दोनों पदों से अलग-अलग गुणा होता है।',
      mr: 'वितरण बाणांद्वारे (Distribution Arrows) दाखवणे की -1 हे दोन्ही पदांशी स्वतंत्रपणे गुणले जाते.',
    },
    exampleSnippet: '-(3x - 5) = (-1)(3x) + (-1)(-5) = -3x + 5',
  },
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-math-1',
    subject: 'Mathematics',
    topic: 'Fractions',
    subtopic: 'Comparison & Visualization',
    difficulty: 'Easy',
    cognitiveLevel: 'comprehension',
    questionText: {
      en: 'Rohan ate 1/4 of a pizza, and Siya ate 1/8 of the same size pizza. Who ate more pizza?',
      hi: 'रोहन ने एक पिज़्ज़ा का 1/4 भाग खाया और सिया ने उसी आकार के पिज़्ज़ा का 1/8 भाग खाया। किसने अधिक पिज़्ज़ा खाया?',
      mr: 'रोहनने एका पिझ्झाचा 1/4 भाग खाल्ला आणि सियाने त्याच आकाराच्या पिझ्झाचा 1/8 भाग खाल्ला. कोणाने जास्त पिझ्झा खाल्ला?',
    },
    visualAid: {
      type: 'fraction-pie',
      data: { fractions: [{ value: 0.25, label: '1/4' }, { value: 0.125, label: '1/8' }] },
    },
    options: [
      {
        id: 'opt-a',
        text: {
          en: 'Rohan ate more (1/4 > 1/8)',
          hi: 'रोहन ने अधिक खाया (1/4 > 1/8)',
          mr: 'रोहनने जास्त खाल्ला (1/4 > 1/8)',
        },
        isCorrect: true,
      },
      {
        id: 'opt-b',
        text: {
          en: 'Siya ate more (because 8 is greater than 4)',
          hi: 'सिया ने अधिक खाया (क्योंकि 8, 4 से बड़ा है)',
          mr: 'सियाने जास्त खाल्ला (कारण 8 हा 4 पेक्षा मोठा आहे)',
        },
        isCorrect: false,
        misconceptionId: 'larger-denominator-fallacy',
        misconceptionNote: {
          en: 'Caught by the Larger Denominator Fallacy!',
          hi: 'बड़े हर (Denominator) का भ्रम हुआ!',
          mr: 'मोठ्या छेदाचा गैरसमज आढळला!',
        },
      },
      {
        id: 'opt-c',
        text: {
          en: 'Both ate the exact same amount',
          hi: 'दोनों ने बिल्कुल बराबर मात्रा खाई',
          mr: 'दोघांनीही अगदी समान भाग खाल्ला',
        },
        isCorrect: false,
      },
      {
        id: 'opt-d',
        text: {
          en: 'Cannot be determined without knowing pizza weight',
          hi: 'पिज़्ज़ा का वजन जाने बिना निर्धारित नहीं किया जा सकता',
          mr: 'पिझ्झाचे वजन माहीत असल्याशिवाय सांगता येत नाही',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'When dividing a whole into 4 parts, each part is twice as large as dividing the same whole into 8 parts. Therefore 1/4 > 1/8.',
      hi: 'जब हम किसी वस्तु को 4 हिस्सों में बाँटते हैं, तो प्रत्येक हिस्सा 8 हिस्सों में बाँटने की तुलना में दोगुना बड़ा होता है। इसलिए 1/4 > 1/8.',
      mr: 'जेव्हा आपण एखाद्या वस्तूचे 4 समान भाग करतो, तेव्हा प्रत्येक भाग 8 भाग करण्यापेक्षा दुप्पट मोठा असतो. म्हणून 1/4 > 1/8.',
    },
    socraticHint: {
      en: 'Imagine cutting a cake into 4 big slices versus 8 smaller slices. Which slice is bigger?',
      hi: 'सोचिए केक के 4 बड़े टुकड़े किए जाएं या 8 छोटे टुकड़े। कौन सा टुकड़ा बड़ा होगा?',
      mr: 'कल्पना करा की केकचे 4 मोठे तुकडे केले किंवा 8 लहान तुकडे केले. कोणता तुकडा मोठा असेल?',
    },
  },

  {
    id: 'diag-math-2',
    subject: 'Mathematics',
    topic: 'Decimals',
    subtopic: 'Place Value & Ordering',
    difficulty: 'Medium',
    cognitiveLevel: 'analysis',
    questionText: {
      en: 'Which of the following decimals has the greatest value: 0.7, 0.45, 0.089, or 0.68?',
      hi: 'निम्न में से किस दशमलव का मान सबसे अधिक है: 0.7, 0.45, 0.089, या 0.68?',
      mr: 'खालीलपैकी कोणत्या दशांश संख्येचे मूल्य सर्वात जास्त आहे: 0.7, 0.45, 0.089, की 0.68?',
    },
    visualAid: {
      type: 'decimal-grid',
      data: { numbers: [0.7, 0.45, 0.089, 0.68] },
    },
    options: [
      {
        id: 'opt-a',
        text: {
          en: '0.089 (it has the most digits: 3 decimal places)',
          hi: '0.089 (इसमें सबसे अधिक अंक हैं: 3 दशमलव स्थान)',
          mr: '0.089 (यात सर्वात जास्त अंक आहेत: 3 दशांश स्थळे)',
        },
        isCorrect: false,
        misconceptionId: 'decimal-length-fallacy',
      },
      {
        id: 'opt-b',
        text: {
          en: '0.68 (68 is greater than 7 and 45)',
          hi: '0.68 (68, 7 और 45 से बड़ा है)',
          mr: '0.68 (68 हे 7 आणि 45 पेक्षा मोठे आहे)',
        },
        isCorrect: false,
        misconceptionId: 'decimal-length-fallacy',
      },
      {
        id: 'opt-c',
        text: {
          en: '0.7 (since 0.70 is greater than 0.68, 0.45, and 0.089)',
          hi: '0.7 (क्योंकि 0.70, 0.68, 0.45 और 0.089 से बड़ा है)',
          mr: '0.7 (कारण 0.70 हे 0.68, 0.45 आणि 0.089 पेक्षा मोठे आहे)',
        },
        isCorrect: true,
      },
      {
        id: 'opt-d',
        text: {
          en: '0.45',
          hi: '0.45',
          mr: '0.45',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Compare tenths place: 0.7 has 7 tenths (0.70), while 0.68 has 6 tenths. Thus 0.7 is the largest.',
      hi: 'दशांश स्थान (Tenths place) की तुलना करें: 0.7 में 7 दशांश (0.70) हैं, जबकि 0.68 में केवल 6 दशांश हैं। अतः 0.7 सबसे बड़ा है।',
      mr: 'दशांश स्थानाची तुलना करा: 0.7 मध्ये 7 दशांश (0.70) आहेत, तर 0.68 मध्ये 6 दशांश आहेत. म्हणून 0.7 सर्वात मोठे आहे.',
    },
    socraticHint: {
      en: 'Try writing all numbers with two decimal places: 0.70, 0.45, 0.08, 0.68. Now which one is largest?',
      hi: 'सभी संख्याओं को दो दशमलव स्थानों में लिखकर देखें: 0.70, 0.45, 0.08, 0.68. अब कौन सा सबसे बड़ा है?',
      mr: 'सर्व संख्या दोन दशांश स्थळांपर्यंत लिहून पहा: 0.70, 0.45, 0.08, 0.68. आता कोणती संख्या सर्वात मोठी आहे?',
    },
  },

  {
    id: 'diag-math-3',
    subject: 'Mathematics',
    topic: 'Decimals',
    subtopic: 'Word Problem Application',
    difficulty: 'Hard',
    cognitiveLevel: 'application',
    questionText: {
      en: 'A shopkeeper sells ribbon for ₹4.50 per meter. Ananya needs 3.2 meters of ribbon for a science project. How much does she need to pay?',
      hi: 'एक दुकानदार ₹4.50 प्रति मीटर की दर से रिबन बेचता है। अनन्या को प्रोजेक्ट के लिए 3.2 मीटर रिबन चाहिए। उसे कितने रुपये देने होंगे?',
      mr: 'एक दुकानदार ₹4.50 प्रति मीटर दराने रिबन विकतो. अनन्यला विज्ञानाच्या प्रकल्पासाठी 3.2 मीटर रिबन हवी आहे. तिला किती रुपये द्यावे लागतील?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          en: '₹14.40 (4.50 × 3.2)',
          hi: '₹14.40 (4.50 × 3.2)',
          mr: '₹14.40 (4.50 × 3.2)',
        },
        isCorrect: true,
      },
      {
        id: 'opt-b',
        text: {
          en: '₹7.70 (added 4.50 + 3.20)',
          hi: '₹7.70 (4.50 + 3.20 जोड़ दिया)',
          mr: '₹7.70 (4.50 + 3.20 बेरीज केली)',
        },
        isCorrect: false,
        misconceptionId: 'decimal-word-problem-translation',
        misconceptionNote: {
          en: 'Misidentified operation: Added unit rate instead of multiplying by quantity.',
          hi: 'क्रिया की गलत पहचान: गुणा करने के स्थान पर जोड़ दिया।',
          mr: 'क्रिया चुकली: गुणाकार करण्याऐवजी बेरीज केली.',
        },
      },
      {
        id: 'opt-c',
        text: {
          en: '₹144.00 (misplaced decimal point)',
          hi: '₹144.00 (दशमलव बिंदु का गलत स्थान)',
          mr: '₹144.00 (दशांश चिन्ह चुकीच्या जागी ठेवले)',
        },
        isCorrect: false,
        misconceptionId: 'decimal-length-fallacy',
      },
      {
        id: 'opt-d',
        text: {
          en: '₹13.50 (calculated 4.50 × 3 and forgot 0.2)',
          hi: '₹13.50 (4.50 × 3 किया और 0.2 भूल गए)',
          mr: '₹13.50 (4.50 × 3 केले आणि 0.2 विसरले)',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Total Cost = Rate × Quantity = 4.50 × 3.2 = 14.40. Notice there are 2 decimal places in the product.',
      hi: 'कुल मूल्य = दर × मात्रा = 4.50 × 3.2 = ₹14.40। उत्तर में 2 दशमलव स्थान होंगे।',
      mr: 'एकूण किंमत = दर × प्रमाण = 4.50 × 3.2 = ₹14.40. दशांश चिन्हांची योग्य जागा तपासा.',
    },
    socraticHint: {
      en: 'If 1 meter is ₹4.50, then 3 meters is ₹13.50. Now how much is the extra 0.2 meters (1/5th of 4.50)?',
      hi: 'यदि 1 मीटर ₹4.50 का है, तो 3 मीटर ₹13.50 का होगा। अब 0.2 मीटर (4.50 का 5वां हिस्सा) और जोड़ें।',
      mr: 'जर 1 मीटर ₹4.50 चा असेल, तर 3 मीटर ₹13.50 चे होतील. आता उरलेल्या 0.2 मीटरचे (₹0.90) मिळवा.',
    },
  },

  {
    id: 'diag-math-4',
    subject: 'Mathematics',
    topic: 'Basic Algebra',
    subtopic: 'Expanding Expressions',
    difficulty: 'Medium',
    cognitiveLevel: 'application',
    questionText: {
      en: 'Simplify the algebraic expression: -(4x - 7)',
      hi: 'बीजगणितीय व्यंजक को सरल कीजिए: -(4x - 7)',
      mr: 'बैजिक राशीचे सोपे रूप द्या: -(4x - 7)',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          en: '-4x + 7',
          hi: '-4x + 7',
          mr: '-4x + 7',
        },
        isCorrect: true,
      },
      {
        id: 'opt-b',
        text: {
          en: '-4x - 7',
          hi: '-4x - 7',
          mr: '-4x - 7',
        },
        isCorrect: false,
        misconceptionId: 'algebra-negative-distribution',
        misconceptionNote: {
          en: 'Negative sign was not distributed to the second term (-7).',
          hi: 'ऋणात्मक चिन्ह दूसरे पद (-7) के साथ वितरित नहीं हुआ।',
          mr: 'ऋण चिन्ह दुसऱ्या पदाला (-7) गुणले गेले नाही.',
        },
      },
      {
        id: 'opt-c',
        text: {
          en: '4x + 7',
          hi: '4x + 7',
          mr: '4x + 7',
        },
        isCorrect: false,
      },
      {
        id: 'opt-d',
        text: {
          en: '4x - 7',
          hi: '4x - 7',
          mr: '4x - 7',
        },
        isCorrect: false,
      },
    ],
    explanation: {
      en: 'Multiply every term inside the parentheses by -1: (-1 × 4x) + (-1 × -7) = -4x + 7.',
      hi: 'कोष्ठक के अंदर के प्रत्येक पद को -1 से गुणा करें: (-1 × 4x) + (-1 × -7) = -4x + 7.',
      mr: 'कंसातील प्रत्येक पदाला -1 ने गुणा: (-1 × 4x) + (-1 × -7) = -4x + 7.',
    },
    socraticHint: {
      en: 'Remember: a minus in front of parentheses acts like multiplying by -1. What is (-1) × (-7)?',
      hi: 'याद रखें: कोष्ठक के बाहर माइनस का मतलब -1 से गुणा करना है। (-1) × (-7) क्या होगा?',
      mr: 'लक्षात ठेवा: कंसाबाहेरील ऋण चिन्ह म्हणजे -1 ने गुणणे. (-1) × (-7) काय होईल?',
    },
  },
];

export const AARAV_BASELINE_CONCEPTS: ConceptMastery[] = [
  {
    conceptId: 'math-multiplication',
    conceptName: 'Multiplication & Arithmetic',
    subject: 'Mathematics',
    overallScore: 92,
    dimensions: { understanding: 95, application: 90, accuracy: 94, retention: 89 },
    status: 'strong',
    commonMistakes: ['Occasional speed calculation slip'],
  },
  {
    conceptId: 'math-fractions',
    conceptName: 'Fractions Fundamentals',
    subject: 'Mathematics',
    overallScore: 82,
    dimensions: { understanding: 85, application: 80, accuracy: 84, retention: 79 },
    status: 'strong',
    commonMistakes: ['Rare hesitation on uncommon denominators'],
  },
  {
    conceptId: 'math-algebra-basic',
    conceptName: 'Basic Algebra',
    subject: 'Mathematics',
    overallScore: 76,
    dimensions: { understanding: 80, application: 74, accuracy: 78, retention: 72 },
    status: 'strong',
    commonMistakes: ['Parentheses with negative coefficients'],
  },
  {
    conceptId: 'math-decimals',
    conceptName: 'Decimals in Word Problems',
    subject: 'Mathematics',
    overallScore: 43,
    dimensions: { understanding: 55, application: 32, accuracy: 48, retention: 37 },
    status: 'needs-attention',
    commonMistakes: [
      'Struggles when decimal math is embedded in multi-sentence real-world scenarios',
      'Confuses decimal place shifting in monetary conversions',
    ],
  },
  {
    conceptId: 'math-ratio',
    conceptName: 'Ratio & Proportion',
    subject: 'Mathematics',
    overallScore: 58,
    dimensions: { understanding: 64, application: 52, accuracy: 60, retention: 56 },
    status: 'developing',
    commonMistakes: ['Direct vs inverse variation setup'],
  },
];

export const AARAV_14DAY_ROADMAP: RoadmapNode[] = [
  {
    id: 'road-day-1',
    day: 1,
    subject: 'Mathematics',
    title: {
      en: 'Fractions & Decimal Bridge',
      hi: 'भिन्न और दशमलव का संबंध',
      mr: 'अपूर्णांक आणि दशांश यांचा सेतू',
    },
    description: {
      en: 'Connect 1/10 and 1/100 fractions directly to 0.1 and 0.01 place values.',
      hi: '1/10 और 1/100 भिन्नों को सीधे 0.1 और 0.01 स्थान मानों से जोड़ें।',
      mr: '1/10 आणि 1/100 अपूर्णांकांचा थेट 0.1 आणि 0.01 स्थानिक किमतींशी संबंध जोडा.',
    },
    focusConcept: 'Fractions to Decimals',
    status: 'completed',
    estimatedMinutes: 15,
    masteryTarget: 85,
    currentMastery: 88,
  },
  {
    id: 'road-day-2',
    day: 2,
    subject: 'Mathematics',
    title: {
      en: 'Decimals: Real-World Money & Measurement',
      hi: 'दशमलव: दैनिक जीवन में रुपये और माप',
      mr: 'दशांश: दैनंदिन जीवनातील रुपये आणि मापे',
    },
    description: {
      en: 'Master converting paise to rupees, grams to kg, and meters to cm using decimals.',
      hi: 'पैसे को रुपये में, ग्राम को किग्रा में और सेमी को मीटर में दशमलव द्वारा बदलें।',
      mr: 'पैसे ते रुपये, ग्रॅम ते किलोग्रॅम आणि मीटर ते सेंमी दशांशामध्ये रूपांतरित करणे शिका.',
    },
    focusConcept: 'Decimal Place Value',
    status: 'in-progress',
    estimatedMinutes: 15,
    masteryTarget: 80,
    currentMastery: 43,
    whyAssigned: {
      en: 'Assigned because diagnostic identified a gap in real-world decimal problem setups.',
      hi: 'निदान में शाब्दिक प्रश्नों में दशमलव संबंधी त्रुटि मिलने के कारण यह पाठ निर्धारित किया गया।',
      mr: 'चाचणीत शाब्दिक उदाहरणांमध्ये अडचण आल्यामुळे हा पाठ विशेष निवडला गेला.',
    },
  },
  {
    id: 'road-day-3',
    day: 3,
    subject: 'Mathematics',
    title: {
      en: 'Decimals: Multi-Step Word Problems',
      hi: 'दशमलव: बहु-चरणीय शाब्दिक प्रश्न',
      mr: 'दशांश: बहु-टप्पीय शाब्दिक उदाहरणे',
    },
    description: {
      en: 'Deconstruct word problems into simple 3-part algebraic statements.',
      hi: 'शाब्दिक प्रश्नों को 3 सरल चरणों में तोड़कर हल करना सीखें।',
      mr: 'शाब्दिक उदाहरणांचे 3 सोप्या गणितीय टप्प्यांत वर्गीकरण करून सोडवा.',
    },
    focusConcept: 'Word Problem Deconstruction',
    status: 'available',
    estimatedMinutes: 20,
    masteryTarget: 85,
  },
  {
    id: 'road-day-4',
    day: 4,
    subject: 'Mathematics',
    title: {
      en: 'Decimal Multiplication Mastery',
      hi: 'दशमलव गुणन में महारत',
      mr: 'दशांश गुणाकार प्राविण्य',
    },
    description: {
      en: 'Positioning decimal points rapidly without counting errors in multi-digit problems.',
      hi: 'बिना किसी त्रुटि के दशमलव बिंदु को सही स्थान पर लगाना।',
      mr: 'कोणतीही चूक न करता दशांश चिन्ह अचूक जागी ठेवण्याचे तंत्र.',
    },
    focusConcept: 'Decimal Multiplication',
    status: 'locked',
    estimatedMinutes: 15,
    masteryTarget: 85,
  },
  {
    id: 'road-day-5',
    day: 5,
    subject: 'Mathematics',
    title: {
      en: 'Ratio & Proportion Fundamentals',
      hi: 'अनुपात और समानुपात के मूल सिद्धांत',
      mr: 'गुणोत्तर आणि प्रमाण मूलभूत संकल्पना',
    },
    description: {
      en: 'Visualizing unit rates and scaling recipes up and down.',
      hi: 'इकाई दर और अनुपात के अनुप्रयोग को समझना।',
      mr: 'एकक दर आणि प्रमाणाचा व्यवहारात वापर.',
    },
    focusConcept: 'Ratio Setup',
    status: 'locked',
    estimatedMinutes: 20,
    masteryTarget: 80,
  },
  {
    id: 'road-day-6',
    day: 6,
    subject: 'Mathematics',
    title: {
      en: 'Cross-Concept Integration Challenge',
      hi: 'संयुक्त संकल्पना चुनौती (Fractions + Decimals + Ratios)',
      mr: 'एकत्रित संकल्पना सराव (अपूर्णांक + दशांश + प्रमाण)',
    },
    description: {
      en: 'Solve composite board-exam style scenario questions.',
      hi: 'बोर्ड परीक्षा स्तर के मिश्रित व्यावहारिक प्रश्न हल करें।',
      mr: 'बोर्ड परीक्षेच्या धर्तीवरील संमिश्र उदाहरणे सोडवा.',
    },
    focusConcept: 'Synthesis & Exam Readiness',
    status: 'locked',
    estimatedMinutes: 25,
    masteryTarget: 90,
  },
];

export const SOCRATIC_DECIMAL_LESSON: SocraticLesson = {
  id: 'lesson-decimals-word-problems',
  conceptId: 'math-decimals',
  conceptTitle: {
    en: 'Decimals in Real-Life Word Problems',
    hi: 'दैनिक जीवन में दशमलव और शाब्दिक प्रश्न',
    mr: 'दैनंदिन जीवनातील दशांश आणि शाब्दिक उदाहरणे',
  },
  subject: 'Mathematics',
  totalSteps: 3,
  steps: [
    {
      stepNumber: 1,
      aiExplanation: {
        en: 'Aarav, think of decimals like Indian currency! ₹1 is made of 100 paise. So 50 paise is ₹0.50, and 5 paise is ₹0.05. When a word problem mentions money, distances, or weights, decimals simply keep track of whole units and small parts.',
        hi: 'आरव, दशमलव को भारतीय रुपयों की तरह समझो! ₹1 में 100 पैसे होते हैं। इसलिए 50 पैसे को हम ₹0.50 लिखते हैं और 5 पैसे को ₹0.05। जब भी कोई शाब्दिक प्रश्न आता है, दशमलव केवल पूरे रुपये और छोटे पैसों का हिसाब रखता है।',
        mr: 'आरव, दशांशाचा विचार आपल्या पैशांसारखा कर! ₹1 म्हणजे 100 पैसे. म्हणून 50 पैसे म्हणजे ₹0.50 आणि 5 पैसे म्हणजे ₹0.05. जेव्हा शाब्दिक उदाहरणात रुपये, वजन किंवा अंतर येते, तेव्हा दशांश चिन्ह पूर्ण भाग आणि लहान सुटे भाग वेगळे ठेवते.',
      },
      realLifeAnalogy: {
        en: '🛒 Grocery Store Example: If you buy 3 chocolate bars at ₹15.50 each, you are paying 3 × ₹15 = ₹45 PLUS 3 × 50 paise = ₹1.50. Total = ₹46.50!',
        hi: '🛒 किराना दुकान का उदाहरण: यदि आप ₹15.50 की 3 चॉकलेट खरीदते हैं, तो आप 3 × ₹15 = ₹45 और 3 × 50 पैसे = ₹1.50 देंगे। कुल = ₹46.50!',
        mr: '🛒 किराणा दुकानाचे उदाहरण: जर तू ₹15.50 चे 3 चॉकलेट विकत घेतलेस, तर 3 × ₹15 = ₹45 आणि 3 × 50 पैसे = ₹1.50 देशील. एकूण = ₹46.50!',
      },
      visualWidget: {
        type: 'decimal-visualizer',
        defaultVal: { whole: 46, fractional: 50, currencySymbol: '₹' },
      },
      checkQuestion: {
        prompt: {
          en: 'Quick check: If you have ₹20 and buy an ice cream for ₹14.25, how many paise change will you get back along with whole rupees?',
          hi: 'छोटा सवाल: यदि आपके पास ₹20 हैं और आप ₹14.25 की आइसक्रीम खरीदते हैं, तो आपको रुपयों के साथ कितने पैसे वापस मिलेंगे?',
          mr: 'छोटा प्रश्न: जर तुझ्याकडे ₹20 आहेत आणि तू ₹14.25 चे आईस्क्रीम घेतलेस, तर तुला रुपयांसोबत किती सुटे पैसे परत मिळतील?',
        },
        options: [
          {
            id: 'chk-1a',
            text: {
              en: '75 paise (Total return: ₹5.75)',
              hi: '75 पैसे (कुल वापसी: ₹5.75)',
              mr: '75 पैसे (एकूण परतावा: ₹5.75)',
            },
            isCorrect: true,
            feedback: {
              en: 'Spot on! 100 paise - 25 paise = 75 paise. So ₹20.00 - ₹14.25 = ₹5.75.',
              hi: 'बिल्कुल सही! 100 पैसे - 25 पैसे = 75 पैसे। ₹20.00 - ₹14.25 = ₹5.75।',
              mr: 'अतिशय अचूक! 100 पैसे - 25 पैसे = 75 पैसे. म्हणून ₹20.00 - ₹14.25 = ₹5.75.',
            },
          },
          {
            id: 'chk-1b',
            text: {
              en: '25 paise (Total return: ₹6.25)',
              hi: '25 पैसे (कुल वापसी: ₹6.25)',
              mr: '25 पैसे (एकूण परतावा: ₹6.25)',
            },
            isCorrect: false,
            feedback: {
              en: 'Remember to borrow from the rupee! 100 paise minus 25 paise leaves 75 paise, not 25 paise.',
              hi: 'ध्यान दें: ₹1 से 100 पैसे उधार लिए, तो 100 - 25 = 75 पैसे बचेंगे!',
              mr: 'लक्षात घे: ₹1 मधून 100 पैसे उसने घेतले, तर 100 - 25 = 75 पैसे शिल्लक राहतील!',
            },
          },
        ],
      },
    },

    {
      stepNumber: 2,
      aiExplanation: {
        en: 'Now let’s tackle the 3-Step Word Problem Secret:\n1. Find the UNIT RATE (price per meter, cost per kg)\n2. Find the QUANTITY (how many meters, kg)\n3. Multiply: Total = Unit Rate × Quantity.',
        hi: 'अब 3-चरणीय शाब्दिक प्रश्न का रहस्य समझें:\n1. इकाई दर (प्रति मीटर मूल्य या प्रति किग्रा मूल्य) पहचानें\n2. मात्रा (कितने मीटर या किग्रा) पहचानें\n3. गुणा करें: कुल = दर × मात्रा।',
        mr: 'आता 3 टप्प्यांचे शाब्दिक सूत्र समजून घेऊया:\n1. एकक दर (प्रति मीटर किंवा प्रति किलोग्रॅम किंमत) ओळखा\n2. प्रमाण (किती मीटर किंवा किलोग्रॅम हवे आहे) ओळखा\n3. गुणाकार करा: एकूण = दर × प्रमाण.',
      },
      realLifeAnalogy: {
        en: '🧵 Fabric Example: 1 meter cloth = ₹20.50. If you buy 2.5 meters: (20.50 × 2 = 41) + (half of 20.50 = 10.25) = ₹51.25!',
        hi: '🧵 कपड़े का उदाहरण: 1 मीटर कपड़ा = ₹20.50। 2.5 मीटर कपड़ा = (20.50 × 2 = ₹41) + (20.50 का आधा = ₹10.25) = ₹51.25!',
        mr: '🧵 कापडाचे उदाहरण: 1 मीटर कापड = ₹20.50. 2.5 मीटर कापड = (20.50 × 2 = ₹41) + (20.50 चा अर्धा = ₹10.25) = ₹51.25!',
      },
      checkQuestion: {
        prompt: {
          en: 'A car travels 18.5 km on 1 liter of petrol. How far will it travel on 2.4 liters?',
          hi: 'एक कार 1 लीटर पेट्रोल में 18.5 किमी चलती है। 2.4 लीटर में वह कितनी दूर जाएगी?',
          mr: 'एक कार 1 लिटर पेट्रोलमध्ये 18.5 किमी धावते. 2.4 लिटर पेट्रोलमध्ये ती किती अंतर जाईल?',
        },
        options: [
          {
            id: 'chk-2a',
            text: {
              en: '44.4 km (18.5 × 2.4)',
              hi: '44.4 किमी (18.5 × 2.4)',
              mr: '44.4 किमी (18.5 × 2.4)',
            },
            isCorrect: true,
            feedback: {
              en: 'Brilliant! You multiplied rate by quantity and placed 2 decimal positions correctly!',
              hi: 'शानदार! आपने दर को मात्रा से गुणा किया और दशमलव सही लगाया!',
              mr: 'अप्रतिम! तू दर आणि प्रमाणाचा अचूक गुणाकार करून दशांश योग्य जागी ठेवलास!',
            },
          },
          {
            id: 'chk-2b',
            text: {
              en: '20.9 km (18.5 + 2.4)',
              hi: '20.9 किमी (18.5 + 2.4 जोड़ दिया)',
              mr: '20.9 किमी (18.5 + 2.4 बेरीज केली)',
            },
            isCorrect: false,
            feedback: {
              en: 'Careful! We must multiply kilometers per liter by number of liters, not add them.',
              hi: 'सावधानी! हमें गुणा करना है, जोड़ना नहीं।',
              mr: 'काळजीपूर्वक! आपल्याला गुणाकार करायचा आहे, बेरीज नाही.',
            },
          },
        ],
      },
    },

    {
      stepNumber: 3,
      aiExplanation: {
        en: 'You have conquered the foundation! Notice how word problems are just stories wrapped around basic decimal multiplications. Once you extract the numbers into (Rate × Quantity), you will never get stuck again.',
        hi: 'आपने बुनियादी समझ पर विजय पा ली है! देखा आपने, शाब्दिक प्रश्न केवल दशमलव गुणाकार की कहानियाँ हैं। जैसे ही आप (दर × मात्रा) निकालते हैं, प्रश्न तुरंत हल हो जाता है।',
        mr: 'तू मूलभूत संकल्पना जिंकलीस! पाहिलेस, शाब्दिक उदाहरणे ही साध्या दशांश गुणाकाराची रूपे असतात. एकदा (दर × प्रमाण) वेगळे काढले की उदाहरण सहज सुटते.',
      },
      realLifeAnalogy: {
        en: '🏆 Mastery Rule: Always do a quick sanity check. If 1 item is ~₹20 and you buy ~3 items, the answer MUST be close to ₹60!',
        hi: '🏆 नियम: हमेशा अनुमान लगाकर उत्तर जांचें। यदि 1 वस्तु ~₹20 की है और 3 वस्तुएं खरीदीं, तो उत्तर लगभग ₹60 ही होना चाहिए!',
        mr: '🏆 नियम: नेहमी उत्तराचा अंदाज घेऊन खात्री करा. जर 1 वस्तू ~₹20 ची आणि 3 वस्तू घेतल्या, तर उत्तर ₹60 च्या आसपासच असले पाहिजे!',
      },
      checkQuestion: {
        prompt: {
          en: 'Are you ready to attempt the adaptive practice questions and boost your mastery from 43% to 70%+?',
          hi: 'क्या आप अभ्यास प्रश्न हल करने और अपना स्कोर 43% से 70%+ तक ले जाने के लिए तैयार हैं?',
          mr: 'तू आता सराव प्रश्न सोडवून तुझा स्कोअर 43% वरून 70%+ पर्यंत वाढवण्यासाठी तयार आहेस का?',
        },
        options: [
          {
            id: 'chk-3a',
            text: {
              en: 'Yes! Let’s crush the practice session 🚀',
              hi: 'हाँ! अभ्यास शुरू करते हैं 🚀',
              mr: 'होय! सराव सुरू करूया 🚀',
            },
            isCorrect: true,
            feedback: {
              en: 'Let’s go! Loading practice questions tailored to your new skills...',
              hi: 'चलिए शुरू करते हैं! आपके स्तर के अनुसार प्रश्न लोड हो रहे हैं...',
              mr: 'चला सुरू करूया! तुझ्या नवीन कौशल्यांनुसार प्रश्न लोड होत आहेत...',
            },
          },
        ],
      },
    },
  ],
};

export const ADAPTIVE_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'prac-1',
    conceptId: 'math-decimals',
    subject: 'Mathematics',
    difficulty: 'Easy',
    prompt: {
      en: 'A pen costs ₹8.50. How much will 4 such pens cost in total?',
      hi: 'एक पेन की कीमत ₹8.50 है। ऐसे 4 पेनों की कुल कीमत कितनी होगी?',
      mr: 'एका पेनाची किंमत ₹8.50 आहे. अशा 4 पेनांची एकूण किंमत किती होईल?',
    },
    options: [
      {
        id: 'p1-a',
        text: { en: '₹34.00', hi: '₹34.00', mr: '₹34.00' },
        isCorrect: true,
      },
      {
        id: 'p1-b',
        text: { en: '₹12.50 (added 8.50 + 4)', hi: '₹12.50 (8.50 + 4 जोड़ दिया)', mr: '₹12.50 (8.50 + 4 बेरीज केली)' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-word-problem-translation',
      },
      {
        id: 'p1-c',
        text: { en: '₹32.50', hi: '₹32.50', mr: '₹32.50' },
        isCorrect: false,
      },
      {
        id: 'p1-d',
        text: { en: '₹340.00', hi: '₹340.00', mr: '₹340.00' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-length-fallacy',
      },
    ],
    hint: {
      en: 'Cost = Price per pen × Number of pens = 8.50 × 4.',
      hi: 'कुल लागत = प्रति पेन मूल्य × पेनों की संख्या = 8.50 × 4.',
      mr: 'एकूण किंमत = एका पेनाची किंमत × पेनांची संख्या = 8.50 × 4.',
    },
    stepByStepSolution: {
      en: '8 × 4 = 32 and 0.50 × 4 = 2.00. Total = 32 + 2 = ₹34.00.',
      hi: '8 × 4 = 32 और 0.50 × 4 = 2.00। कुल = 32 + 2 = ₹34.00।',
      mr: '8 × 4 = 32 आणि 0.50 × 4 = 2.00. एकूण = 32 + 2 = ₹34.00.',
    },
  },

  {
    id: 'prac-2',
    conceptId: 'math-decimals',
    subject: 'Mathematics',
    difficulty: 'Medium',
    prompt: {
      en: 'A juice vendor uses 0.35 kg of oranges for one glass of juice. How many kg of oranges are needed for 6 glasses?',
      hi: 'एक जूस विक्रेता एक ग्लास जूस के लिए 0.35 किग्रा संतरे का उपयोग करता है। 6 ग्लास जूस के लिए कितने किग्रा संतरे चाहिए?',
      mr: 'एक रस विक्रेता एका ग्लास रसासाठी 0.35 किलो संत्री वापरतो. 6 ग्लास रसासाठी किती किलो संत्री लागतील?',
    },
    options: [
      {
        id: 'p2-a',
        text: { en: '2.10 kg', hi: '2.10 किग्रा', mr: '2.10 किलो' },
        isCorrect: true,
      },
      {
        id: 'p2-b',
        text: { en: '6.35 kg (added 6 + 0.35)', hi: '6.35 किग्रा (6 + 0.35 जोड़ दिया)', mr: '6.35 किलो (6 + 0.35 बेरीज केली)' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-word-problem-translation',
      },
      {
        id: 'p2-c',
        text: { en: '21.0 kg', hi: '21.0 किग्रा', mr: '21.0 किलो' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-length-fallacy',
      },
      {
        id: 'p2-d',
        text: { en: '1.80 kg', hi: '1.80 किग्रा', mr: '1.80 किलो' },
        isCorrect: false,
      },
    ],
    hint: {
      en: 'Total kg = 0.35 × 6.',
      hi: 'कुल किग्रा = 0.35 × 6.',
      mr: 'एकूण किलो = 0.35 × 6.',
    },
    stepByStepSolution: {
      en: '35 × 6 = 210. Placing 2 decimal digits gives 2.10 kg.',
      hi: '35 × 6 = 210। 2 दशमलव स्थान लगाने पर 2.10 किग्रा प्राप्त होता है।',
      mr: '35 × 6 = 210. 2 दशांश स्थळे दिल्यास 2.10 किलो उत्तर मिळते.',
    },
  },

  {
    id: 'prac-3',
    conceptId: 'math-decimals',
    subject: 'Mathematics',
    difficulty: 'Hard',
    prompt: {
      en: 'A sports coach buys 8 tracksuits at ₹450.75 each and 1 football for ₹320.50. What is the total expenditure?',
      hi: 'एक स्पोर्ट्स कोच ₹450.75 प्रति सूट की दर से 8 ट्रैकसूट और ₹320.50 की 1 फुटबॉल खरीदता है। कुल खर्च कितना हुआ?',
      mr: 'एक क्रीडा शिक्षक प्रत्येकी ₹450.75 दराने 8 ट्रॅकसूट आणि ₹320.50 चा 1 फुटबॉल खरेदी करतात. एकूण खर्च किती झाला?',
    },
    options: [
      {
        id: 'p3-a',
        text: { en: '₹3,926.50', hi: '₹3,926.50', mr: '₹3,926.50' },
        isCorrect: true,
      },
      {
        id: 'p3-b',
        text: { en: '₹779.25', hi: '₹779.25', mr: '₹779.25' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-word-problem-translation',
      },
      {
        id: 'p3-c',
        text: { en: '₹3,606.00', hi: '₹3,606.00', mr: '₹3,606.00' },
        isCorrect: false,
      },
      {
        id: 'p3-d',
        text: { en: '₹39,265.00', hi: '₹39,265.00', mr: '₹39,265.00' },
        isCorrect: false,
        misconceptionTrigger: 'decimal-length-fallacy',
      },
    ],
    hint: {
      en: 'Calculate (8 × 450.75) first, then add 320.50.',
      hi: 'पहले (8 × 450.75) ज्ञात करें, फिर 320.50 जोड़ें।',
      mr: 'प्रथम (8 × 450.75) काढा, नंतर त्यात 320.50 मिळवा.',
    },
    stepByStepSolution: {
      en: '8 × 450.75 = ₹3,606.00. Adding ₹320.50 gives ₹3,926.50.',
      hi: '8 × 450.75 = ₹3,606.00। ₹320.50 जोड़ने पर ₹3,926.50 बनता है।',
      mr: '8 × 450.75 = ₹3,606.00. त्यात ₹320.50 मिळवल्यास एकूण ₹3,926.50 होतात.',
    },
  },
];
