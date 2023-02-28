import MENU from '@/constants/menuItem.js'
const RISKGROUP = [{
  label: 'Nguy cơ thấp (N1)',
  value: '1'
},
{
  label: 'Nguy cơ trung bình (N2)',
  value: '2'
},
{
  label: 'Nguy cơ cao (N3)',
  value: '3'
},
{
  label: 'Nguy cơ rất cao (N4)',
  value: '4'
}]
const BLOODFROUPRH = [
  {
    label: 'Rh (+)',
    value: '(+)'
  },
  {
    label: 'Rh (-)',
    value: '(-)'
  }
]
const BLOODFROUABO = [
  {
    label: 'Máu nhóm A',
    value: 'A'
  },
  {
    label: 'Máu nhóm B',
    value: 'B'
  },
  {
    label: 'Máu nhóm O',
    value: 'O'
  },
  {
    label: 'Máu nhóm AB',
    value: 'AB'
  }
]
// const OTHERTESTS = ['HIV(-)', 'HBV(-)', 'HCV(-)', 'Giang mai (-)', 'Sốt rét (-)']
const OTHERTESTS = [
  {
    label: 'HIV(-)',
    value: 'HIV(-)'
  },
  {
    label: 'HBV(-)',
    value: 'HBV(-)'
  },
  {
    label: 'HCV(-)',
    value: 'HCV(-)'
  },
  {
    label: 'Giang mai (-)',
    value: 'Giang mai (-)'
  },
  {
    label: 'Sốt rét (-)',
    value: 'Sốt rét (-)'
  },
  {
    label: 'Khác',
    value: 'Khác'
  }
]
const MAJORCROSS = [
  {
    value: 'Âm tính',
    label: 'Âm tính'
  },
  {
    value: 'Dương tính 1+',
    label: 'Dương tính 1+'
  },
  {
    value: 'Dương tính 2+',
    label: 'Dương tính 2+'
  },
  {
    value: 'Dương tính 3+',
    label: 'Dương tính 3+'
  },
  {
    value: 'Dương tính 4+',
    label: 'Dương tính 4+'
  },
  {
    value: 'Không thực hiện',
    label: 'Không thực hiện'
  }
]
const BLOODNAMES = [
  {
    value: 'Máu toàn phần',
    label: 'Máu toàn phần'
  },
  {
    value: 'Khối hồng cầu',
    label: 'Khối hồng cầu'
  },
  {
    value: 'Huyết tương tươi đông lạnh',
    label: 'Huyết tương tươi đông lạnh'
  },
  {
    value: 'Huyết tương giàu tiểu cầu',
    label: 'Huyết tương giàu tiểu cầu'
  },
  {
    value: 'Khối tiểu cầu POOL',
    label: 'Khối tiểu cầu POOL'
  },
  {
    value: 'Tủa lạnh',
    label: 'Tủa lạnh'
  },
  {
    value: 'Khối bạch cầu hạt POOL',
    label: 'Khối bạch cầu hạt POOL'
  },
  {
    value: 'Tủa lạnh yếu tố VIII bất hoạt virus',
    label: 'Tủa lạnh yếu tố VIII bất hoạt virus'
  },
  {
    value: 'Khối tiểu cầu gạn tách',
    label: 'Khối tiểu cầu gạn tách'
  },
  {
    value: 'Khối bạch cầu gạn tách',
    label: 'Khối bạch cầu gạn tách'
  },
  {
    value: 'Huyết tương đông lạnh',
    label: 'Huyết tương đông lạnh'
  }
]
const CROSSMATCH = [
  {
    value: 'Hòa hợp',
    label: 'Hòa hợp'
  },
  {
    value: 'Không hòa hợp',
    label: 'Không hòa hợp'
  }
]
const IPDIAAURELIDATA = [
  {
    vilabel: 'Không',
    enlabel: 'No religion',
    value: '1'
  },
  {
    vilabel: 'Phật giáo',
    enlabel: 'Buddism',
    value: '2'
  },
  {
    vilabel: 'Công giáo',
    enlabel: 'Christians',
    value: '3'
  },
  {
    vilabel: 'Tin lành',
    enlabel: 'Catholic',
    value: '4'
  },
  {
    vilabel: 'Hồi giáo',
    enlabel: 'Muslim',
    value: '5'
  },
  {
    vilabel: 'Khác',
    enlabel: 'Other',
    value: '6'
  }
]
const LANGUAGES = [
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  },
  {
    code: 'ab',
    name: 'Abkhaz',
    nativeName: 'аҧсуа'
  },
  {
    code: 'aa',
    name: 'Afar',
    nativeName: 'Afaraf'
  },
  {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans'
  },
  {
    code: 'ak',
    name: 'Akan',
    nativeName: 'Akan'
  },
  {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip'
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية'
  },
  {
    code: 'an',
    name: 'Aragonese',
    nativeName: 'Aragonés'
  },
  {
    code: 'hy',
    name: 'Armenian',
    nativeName: 'Հայերեն'
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া'
  },
  {
    code: 'av',
    name: 'Avaric',
    nativeName: 'авар мацӀ, магӀарул мацӀ'
  },
  {
    code: 'ae',
    name: 'Avestan',
    nativeName: 'avesta'
  },
  {
    code: 'ay',
    name: 'Aymara',
    nativeName: 'aymar aru'
  },
  {
    code: 'az',
    name: 'Azerbaijani',
    nativeName: 'azərbaycan dili'
  },
  {
    code: 'bm',
    name: 'Bambara',
    nativeName: 'bamanankan'
  },
  {
    code: 'ba',
    name: 'Bashkir',
    nativeName: 'башҡорт теле'
  },
  {
    code: 'eu',
    name: 'Basque',
    nativeName: 'euskara, euskera'
  },
  {
    code: 'be',
    name: 'Belarusian',
    nativeName: 'Беларуская'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা'
  },
  {
    code: 'bh',
    name: 'Bihari',
    nativeName: 'भोजपुरी'
  },
  {
    code: 'bi',
    name: 'Bislama',
    nativeName: 'Bislama'
  },
  {
    code: 'bs',
    name: 'Bosnian',
    nativeName: 'bosanski jezik'
  },
  {
    code: 'br',
    name: 'Breton',
    nativeName: 'brezhoneg'
  },
  {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'български език'
  },
  {
    code: 'my',
    name: 'Burmese',
    nativeName: 'ဗမာစာ'
  },
  {
    code: 'ca',
    name: 'Catalan; Valencian',
    nativeName: 'Català'
  },
  {
    code: 'ch',
    name: 'Chamorro',
    nativeName: 'Chamoru'
  },
  {
    code: 'ce',
    name: 'Chechen',
    nativeName: 'нохчийн мотт'
  },
  {
    code: 'ny',
    name: 'Chichewa; Chewa; Nyanja',
    nativeName: 'chiCheŵa, chinyanja'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文 (Zhōngwén), 汉语, 漢語'
  },
  {
    code: 'cv',
    name: 'Chuvash',
    nativeName: 'чӑваш чӗлхи'
  },
  {
    code: 'kw',
    name: 'Cornish',
    nativeName: 'Kernewek'
  },
  {
    code: 'co',
    name: 'Corsican',
    nativeName: 'corsu, lingua corsa'
  },
  {
    code: 'cr',
    name: 'Cree',
    nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ'
  },
  {
    code: 'hr',
    name: 'Croatian',
    nativeName: 'hrvatski'
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'česky, čeština'
  },
  {
    code: 'da',
    name: 'Danish',
    nativeName: 'dansk'
  },
  {
    code: 'dv',
    name: 'Divehi; Dhivehi; Maldivian;',
    nativeName: 'ދިވެހި'
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands, Vlaams'
  },
  {
    code: 'eo',
    name: 'Esperanto',
    nativeName: 'Esperanto'
  },
  {
    code: 'et',
    name: 'Estonian',
    nativeName: 'eesti, eesti keel'
  },
  {
    code: 'ee',
    name: 'Ewe',
    nativeName: 'Eʋegbe'
  },
  {
    code: 'fo',
    name: 'Faroese',
    nativeName: 'føroyskt'
  },
  {
    code: 'fj',
    name: 'Fijian',
    nativeName: 'vosa Vakaviti'
  },
  {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'suomi, suomen kieli'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'français, langue française'
  },
  {
    code: 'ff',
    name: 'Fula; Fulah; Pulaar; Pular',
    nativeName: 'Fulfulde, Pulaar, Pular'
  },
  {
    code: 'gl',
    name: 'Galician',
    nativeName: 'Galego'
  },
  {
    code: 'ka',
    name: 'Georgian',
    nativeName: 'ქართული'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch'
  },
  {
    code: 'el',
    name: 'Greek, Modern',
    nativeName: 'Ελληνικά'
  },
  {
    code: 'gn',
    name: 'Guaraní',
    nativeName: 'Avañeẽ'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી'
  },
  {
    code: 'ht',
    name: 'Haitian; Haitian Creole',
    nativeName: 'Kreyòl ayisyen'
  },
  {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa, هَوُسَ'
  },
  {
    code: 'he',
    name: 'Hebrew (modern)',
    nativeName: 'עברית'
  },
  {
    code: 'hz',
    name: 'Herero',
    nativeName: 'Otjiherero'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी, हिंदी'
  },
  {
    code: 'ho',
    name: 'Hiri Motu',
    nativeName: 'Hiri Motu'
  },
  {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar'
  },
  {
    code: 'ia',
    name: 'Interlingua',
    nativeName: 'Interlingua'
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia'
  },
  {
    code: 'ie',
    name: 'Interlingue',
    nativeName: 'Originally called Occidental; then Interlingue after WWII'
  },
  {
    code: 'ga',
    name: 'Irish',
    nativeName: 'Gaeilge'
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo'
  },
  {
    code: 'ik',
    name: 'Inupiaq',
    nativeName: 'Iñupiaq, Iñupiatun'
  },
  {
    code: 'io',
    name: 'Ido',
    nativeName: 'Ido'
  },
  {
    code: 'is',
    name: 'Icelandic',
    nativeName: 'Íslenska'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano'
  },
  {
    code: 'iu',
    name: 'Inuktitut',
    nativeName: 'ᐃᓄᒃᑎᑐᑦ'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語 (にほんご／にっぽんご)'
  },
  {
    code: 'jv',
    name: 'Javanese',
    nativeName: 'basa Jawa'
  },
  {
    code: 'kl',
    name: 'Kalaallisut, Greenlandic',
    nativeName: 'kalaallisut, kalaallit oqaasii'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ'
  },
  {
    code: 'kr',
    name: 'Kanuri',
    nativeName: 'Kanuri'
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'कश्मीरी, كشميري\u200e'
  },
  {
    code: 'kk',
    name: 'Kazakh',
    nativeName: 'Қазақ тілі'
  },
  {
    code: 'km',
    name: 'Khmer',
    nativeName: 'ភាសាខ្មែរ'
  },
  {
    code: 'ki',
    name: 'Kikuyu, Gikuyu',
    nativeName: 'Gĩkũyũ'
  },
  {
    code: 'rw',
    name: 'Kinyarwanda',
    nativeName: 'Ikinyarwanda'
  },
  {
    code: 'ky',
    name: 'Kirghiz, Kyrgyz',
    nativeName: 'кыргыз тили'
  },
  {
    code: 'kv',
    name: 'Komi',
    nativeName: 'коми кыв'
  },
  {
    code: 'kg',
    name: 'Kongo',
    nativeName: 'KiKongo'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어 (韓國語), 조선말 (朝鮮語)'
  },
  {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'Kurdî, كوردی\u200e'
  },
  {
    code: 'kj',
    name: 'Kwanyama, Kuanyama',
    nativeName: 'Kuanyama'
  },
  {
    code: 'la',
    name: 'Latin',
    nativeName: 'latine, lingua latina'
  },
  {
    code: 'lb',
    name: 'Luxembourgish, Letzeburgesch',
    nativeName: 'Lëtzebuergesch'
  },
  {
    code: 'lg',
    name: 'Luganda',
    nativeName: 'Luganda'
  },
  {
    code: 'li',
    name: 'Limburgish, Limburgan, Limburger',
    nativeName: 'Limburgs'
  },
  {
    code: 'ln',
    name: 'Lingala',
    nativeName: 'Lingála'
  },
  {
    code: 'lo',
    name: 'Lao',
    nativeName: 'ພາສາລາວ'
  },
  {
    code: 'lt',
    name: 'Lithuanian',
    nativeName: 'lietuvių kalba'
  },
  {
    code: 'lu',
    name: 'Luba-Katanga',
    nativeName: ''
  },
  {
    code: 'lv',
    name: 'Latvian',
    nativeName: 'latviešu valoda'
  },
  {
    code: 'gv',
    name: 'Manx',
    nativeName: 'Gaelg, Gailck'
  },
  {
    code: 'mk',
    name: 'Macedonian',
    nativeName: 'македонски јазик'
  },
  {
    code: 'mg',
    name: 'Malagasy',
    nativeName: 'Malagasy fiteny'
  },
  {
    code: 'ms',
    name: 'Malay',
    nativeName: 'bahasa Melayu, بهاس ملايو\u200e'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം'
  },
  {
    code: 'mt',
    name: 'Maltese',
    nativeName: 'Malti'
  },
  {
    code: 'mi',
    name: 'Māori',
    nativeName: 'te reo Māori'
  },
  {
    code: 'mr',
    name: 'Marathi (Marāṭhī)',
    nativeName: 'मराठी'
  },
  {
    code: 'mh',
    name: 'Marshallese',
    nativeName: 'Kajin M̧ajeļ'
  },
  {
    code: 'mn',
    name: 'Mongolian',
    nativeName: 'монгол'
  },
  {
    code: 'na',
    name: 'Nauru',
    nativeName: 'Ekakairũ Naoero'
  },
  {
    code: 'nv',
    name: 'Navajo, Navaho',
    nativeName: 'Diné bizaad, Dinékʼehǰí'
  },
  {
    code: 'nb',
    name: 'Norwegian Bokmål',
    nativeName: 'Norsk bokmål'
  },
  {
    code: 'nd',
    name: 'North Ndebele',
    nativeName: 'isiNdebele'
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली'
  },
  {
    code: 'ng',
    name: 'Ndonga',
    nativeName: 'Owambo'
  },
  {
    code: 'nn',
    name: 'Norwegian Nynorsk',
    nativeName: 'Norsk nynorsk'
  },
  {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk'
  },
  {
    code: 'ii',
    name: 'Nuosu',
    nativeName: 'ꆈꌠ꒿ Nuosuhxop'
  },
  {
    code: 'nr',
    name: 'South Ndebele',
    nativeName: 'isiNdebele'
  },
  {
    code: 'oc',
    name: 'Occitan',
    nativeName: 'Occitan'
  },
  {
    code: 'oj',
    name: 'Ojibwe, Ojibwa',
    nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ'
  },
  {
    code: 'cu',
    name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    nativeName: 'ѩзыкъ словѣньскъ'
  },
  {
    code: 'om',
    name: 'Oromo',
    nativeName: 'Afaan Oromoo'
  },
  {
    code: 'or',
    name: 'Oriya',
    nativeName: 'ଓଡ଼ିଆ'
  },
  {
    code: 'os',
    name: 'Ossetian, Ossetic',
    nativeName: 'ирон æвзаг'
  },
  {
    code: 'pa',
    name: 'Panjabi, Punjabi',
    nativeName: 'ਪੰਜਾਬੀ, پنجابی\u200e'
  },
  {
    code: 'pi',
    name: 'Pāli',
    nativeName: 'पाऴि'
  },
  {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی'
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'polski'
  },
  {
    code: 'ps',
    name: 'Pashto, Pushto',
    nativeName: 'پښتو'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português'
  },
  {
    code: 'qu',
    name: 'Quechua',
    nativeName: 'Runa Simi, Kichwa'
  },
  {
    code: 'rm',
    name: 'Romansh',
    nativeName: 'rumantsch grischun'
  },
  {
    code: 'rn',
    name: 'Kirundi',
    nativeName: 'kiRundi'
  },
  {
    code: 'ro',
    name: 'Romanian, Moldavian, Moldovan',
    nativeName: 'română'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'русский язык'
  },
  {
    code: 'sa',
    name: 'Sanskrit (Saṁskṛta)',
    nativeName: 'संस्कृतम्'
  },
  {
    code: 'sc',
    name: 'Sardinian',
    nativeName: 'sardu'
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'सिन्धी, سنڌي، سندھی\u200e'
  },
  {
    code: 'se',
    name: 'Northern Sami',
    nativeName: 'Davvisámegiella'
  },
  {
    code: 'sm',
    name: 'Samoan',
    nativeName: 'gagana faa Samoa'
  },
  {
    code: 'sg',
    name: 'Sango',
    nativeName: 'yângâ tî sängö'
  },
  {
    code: 'sr',
    name: 'Serbian',
    nativeName: 'српски језик'
  },
  {
    code: 'gd',
    name: 'Scottish Gaelic; Gaelic',
    nativeName: 'Gàidhlig'
  },
  {
    code: 'sn',
    name: 'Shona',
    nativeName: 'chiShona'
  },
  {
    code: 'si',
    name: 'Sinhala, Sinhalese',
    nativeName: 'සිංහල'
  },
  {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'slovenčina'
  },
  {
    code: 'sl',
    name: 'Slovene',
    nativeName: 'slovenščina'
  },
  {
    code: 'so',
    name: 'Somali',
    nativeName: 'Soomaaliga, af Soomaali'
  },
  {
    code: 'st',
    name: 'Southern Sotho',
    nativeName: 'Sesotho'
  },
  {
    code: 'es',
    name: 'Spanish; Castilian',
    nativeName: 'español, castellano'
  },
  {
    code: 'su',
    name: 'Sundanese',
    nativeName: 'Basa Sunda'
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili'
  },
  {
    code: 'ss',
    name: 'Swati',
    nativeName: 'SiSwati'
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'svenska'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు'
  },
  {
    code: 'tg',
    name: 'Tajik',
    nativeName: 'тоҷикӣ, toğikī, تاجیکی\u200e'
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย'
  },
  {
    code: 'ti',
    name: 'Tigrinya',
    nativeName: 'ትግርኛ'
  },
  {
    code: 'bo',
    name: 'Tibetan Standard, Tibetan, Central',
    nativeName: 'བོད་ཡིག'
  },
  {
    code: 'tk',
    name: 'Turkmen',
    nativeName: 'Türkmen, Түркмен'
  },
  {
    code: 'tl',
    name: 'Tagalog',
    nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔'
  },
  {
    code: 'tn',
    name: 'Tswana',
    nativeName: 'Setswana'
  },
  {
    code: 'to',
    name: 'Tonga (Tonga Islands)',
    nativeName: 'faka Tonga'
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe'
  },
  {
    code: 'ts',
    name: 'Tsonga',
    nativeName: 'Xitsonga'
  },
  {
    code: 'tt',
    name: 'Tatar',
    nativeName: 'татарча, tatarça, تاتارچا\u200e'
  },
  {
    code: 'tw',
    name: 'Twi',
    nativeName: 'Twi'
  },
  {
    code: 'ty',
    name: 'Tahitian',
    nativeName: 'Reo Tahiti'
  },
  {
    code: 'ug',
    name: 'Uighur, Uyghur',
    nativeName: 'Uyƣurqə, ئۇيغۇرچە\u200e'
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'українська'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو'
  },
  {
    code: 'uz',
    name: 'Uzbek',
    nativeName: 'zbek, Ўзбек, أۇزبېك\u200e'
  },
  {
    code: 've',
    name: 'Venda',
    nativeName: 'Tshivenḓa'
  },
  {
    code: 'vo',
    name: 'Volapük',
    nativeName: 'Volapük'
  },
  {
    code: 'wa',
    name: 'Walloon',
    nativeName: 'Walon'
  },
  {
    code: 'cy',
    name: 'Welsh',
    nativeName: 'Cymraeg'
  },
  {
    code: 'wo',
    name: 'Wolof',
    nativeName: 'Wollof'
  },
  {
    code: 'fy',
    name: 'Western Frisian',
    nativeName: 'Frysk'
  },
  {
    code: 'xh',
    name: 'Xhosa',
    nativeName: 'isiXhosa'
  },
  {
    code: 'yi',
    name: 'Yiddish',
    nativeName: 'ייִדיש'
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá'
  },
  {
    code: 'za',
    name: 'Zhuang, Chuang',
    nativeName: 'Saɯ cueŋƅ, Saw cuengh'
  }
]
const SENSE = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'V',
    value: 'V'
  },
  {
    label: 'P',
    value: 'P'
  },
  {
    label: 'U',
    value: 'U'
  }
]
const RESPIRATORY = [
  {
    label: 'Không',
    value: 'Không'
  },
  {
    label: 'Oxy mask',
    value: 'Oxy mask'
  },
  {
    label: 'Oxy kính',
    value: 'Oxy kính'
  }
]
const GENDER = ['Nữ', 'Nam', 'Khác']
const GENDERS = ['Nữ/ Female', 'Nam/ Male', 'Khác/ Other']
const GENDEREN = ['Female', 'Male', 'Other']

const GENDERLIST = [
  {
    label: 'Nữ',
    value: 0
  },
  {
    label: 'Nam',
    value: 1
  }
]
const MOHOBJECT = [
  {
    label: '1. BHYT',
    value: 1
  },
  {
    label: '2. Thu phí',
    value: 2
  },
  {
    label: '3. Miễn',
    value: 3
  },
  {
    label: '4. Khác',
    value: 4
  }
]
const ALLERGY = [
  {
    label: 'Thực phẩm',
    value: '1'
  },
  {
    label: 'Thời tiết',
    value: '2'
  },
  {
    label: 'Thuốc',
    value: '3'
  },
  {
    label: 'Khác',
    value: '4'
  }
]
const EDHOTLINE = {
  'times_city': '+84 24 3974 3556',
  'hai_phong': '+84 225 7309 888',
  'ha_long': '+84 20 3382 8188',
  'nha_trang': '+84 25 8390 0168',
  'phu_quoc': '+84 29 7398 5588',
  'da_nang': '+84 23 6371 1111',
  'central_park': '+84 28 3622 1166'
}
const SITENAME = {
  'times_city': 'Times City',
  'hai_phong': 'Hải Phòng',
  'ha_long': 'Hạ Long',
  'nha_trang': 'Nha Trang',
  'phu_quoc': 'Phú Quốc',
  'da_nang': 'Đà Nẵng',
  'central_park': 'Central Park'
}
const SITENAMEEN = {
  'times_city': 'Times City',
  'hai_phong': 'Hai Phong',
  'ha_long': 'Ha Long',
  'nha_trang': 'Nha Trang',
  'phu_quoc': 'Phu Quoc',
  'da_nang': 'Da Nang',
  'central_park': 'Central Park'
}
const CHARGEPAYMENTSTATUS = {
  'COM': 'Complete',
  'INC': 'Incomplete',
  'POS': 'PostedToGL',
  'PSL': 'PostedToSubLedger',
  'TEMP': 'Temporary',
  'UNK': 'Unknown',
  'VOI': 'Voided'
}
const RADIOLOGYSCHEDULEDPROCEDURESTATUS = {
  'ARRIVED': 'Arrived',
  'CANCELLED': 'Cancelled',
  'PROCESSED': 'Processed',
  'SCHEDULED': 'Scheduled'
}
const CPOEPLACERORDERSTATUS = {
  'ABORT': 'Aborted',
  'ACTIV': 'Verified',
  'CANCL': 'Cancelled',
  'COMPL': 'Completed',
  'CON': 'CollectedAcquired',
  'HELD': 'Held',
  'NEW': 'New',
  'NULLI': 'Nullified',
  'OBSOL': 'Obsolete',
  'REPUB': 'ResultsPublished',
  'SUSPE': 'Suspended',
  'UNCON': 'FutureVisitOrder'
}
const SPECIMENSTATUSES = {
  'COL': 'Collected',
  'DEL': 'Deleted',
  'DIS': 'Discarded',
  'LST': 'OnCollectionList',
  'ORD': 'Created',
  'QRT': 'Quarantined',
  'RCL': 'MarkedForRecollection',
  'REC': 'LabReceived',
  'RJT': 'Rejected',
  'RTV': 'RetrievedFromRack',
  'SOT': 'SentOut',
  'STR': 'StoredInRack'
}
const MEDICALRECORDTYPE = {
  A01_034_050919_V: {
    name: 'NỘI KHOA',
    code: 'A01_034_050919_V'
  },
  Pediatric: {
    name: 'NHI KHOA',
    code: 'A01_037_050919_V'
  },
  Neonatal: {
    name: 'SƠ SINH',
    code: 'A01_038_050919_V'
  },
  Obstetrics: {
    name: 'SẢN KHOA',
    code: 'A01_035_050919_V'
  },
  Gynecological: {
    name: 'PHỤ KHOA',
    code: 'A01_036_050919_V'
  },
  A01_195_050919_V: {
    name: 'NGOẠI KHOA',
    code: 'A01_195_050919_V'
  },
  Oncology: {
    name: 'UNG BƯỚU',
    code: 'A01_196_050919_V'
  },
  A01_040_050919_V: {
    name: 'RĂNG HÀM MẶT',
    code: 'A01_040_050919_V'
  },
  A01_039_050919_V: {
    name: 'TAI MŨI HỌNG',
    code: 'A01_039_050919_V'
  },
  Eye: {
    name: 'MẮT',
    code: 'A01_041_050919_V'
  },
  CardiovascularForm: {
    name: 'TIM MẠCH',
    code: 'BMTIMMACH'
  }
}
const ORDERSET_FILTER_TYPE = [
  {
    label: 'Gói cá nhân',
    value: '1'
  },
  {
    label: 'Gói được chia sẻ',
    value: '2'
  }
]
export default {
  BLOODFROUPRH: BLOODFROUPRH,
  BLOODFROUABO: BLOODFROUABO,
  BLOODNAMES: BLOODNAMES,
  OTHERTESTS: OTHERTESTS,
  MAJORCROSS: MAJORCROSS,
  SENSE: SENSE,
  RESPIRATORY: RESPIRATORY,
  CROSSMATCH: CROSSMATCH,
  LANGUAGES: LANGUAGES,
  IPDIAAURELIDATA: IPDIAAURELIDATA,
  GENDER: GENDER,
  ALLERGY: ALLERGY,
  GENDERLIST: GENDERLIST,
  MOHOBJECT: MOHOBJECT,
  MENU: MENU,
  EDHOTLINE: EDHOTLINE,
  GENDEREN,
  SITENAME,
  SITENAMEEN,
  RISKGROUP,
  GENDERS,
  CHARGEPAYMENTSTATUS,
  RADIOLOGYSCHEDULEDPROCEDURESTATUS,
  CPOEPLACERORDERSTATUS,
  SPECIMENSTATUSES,
  MEDICALRECORDTYPE,
  ORDERSET_FILTER_TYPE
}
