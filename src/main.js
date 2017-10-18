/** @module arabicCal */
import { Writing, Mapper } from 'aramaic-mapper';
import {
  allConsonants as arabicConsonants,
  vowels as arabicVowels,
  diacritics as arabicDiacritics,
  punctuation as arabicPunctuation,
  isDotted as isArabicDotted
} from 'arabic-code-util';
import { consonants as calConsonants } from 'cal-code-util';

/**
 * @private
 * Arabic source writing
 * @const
 * @type { Writing }
 */
const arabicWriting = new Writing(
  arabicConsonants,
  arabicVowels,
  arabicDiacritics,
  arabicPunctuation
);

const thehTo = 't,'; // ث ARABIC LETTER THEH
const khahTo = 'k,'; // خ ARABIC LETTER KHAH
const thalTo = 'd,'; // ذ ARABIC LETTER THAL
const ghainTo = 'g,'; // غ ARABIC LETTER GHAIN
const maddaTo = ')o'; // آ ARABIC LETTER ALEF WITH MADDA ABOVE
const multiples = Object.freeze([thehTo, khahTo, thalTo, ghainTo, maddaTo]);
/**
 * @private
 * CAL destination writing
 * @const
 * @type { Writing }
 */
const calWriting = new Writing(
  Object.freeze(
    calConsonants.concat([
      thehTo, // '\u062B', ث ARABIC LETTER THEH
      khahTo, // '\u062E', خ ARABIC LETTER KHAH
      thalTo, // '\u0630', ذ ARABIC LETTER THAL
      'd', // '\u0636', ض ARABIC LETTER DAD - emphatic D missing in Aramaic
      'z', // '\u0638', ظ ARABIC LETTER ZAH - emphatic ðˤ, missing in aramaic
      ghainTo, // '\u063A', غ ARABIC LETTER GHAIN
      't', // '\u0629', ة ARABIC LETTER TEH MARBUTA
      ')', // '\u0621', ء Arabic Letter Hamza  - Garshuni hamzah
      maddaTo, // '\u0622', آ ARABIC LETTER ALEF WITH MADDA ABOVE
      ')', // '\u0623', أ ARABIC LETTER ALEF WITH HAMZA ABOVE
      'w', // '\u0624', ؤ ARABIC LETTER WAW WITH HAMZA ABOVE
      ')', // '\u0625', إ ARABIC LETTER ALEF WITH HAMZA BELOW
      'y' // '\u0626' ئ ARABIC LETTER YEH WITH HAMZA ABOVE
    ])
  ),
  Object.freeze([
    'a', //  َ Arabic fatha - Garshuni: a
    'o', //  ٰ Arabic letter superscript alef - Garshuni: long a
    'i', //  ِ Arabic kasra - Garshuni: i
    'u', //  ُ Arabic damma - Garshuni: u
    'a', //  ً Arabic fathatan - Garshuni: an
    'i', //  ٍ Arabic kasratan - Garshuni: in
    'u' //  ٌ Arabic dammatan - Garshuni: un
  ]),
  Object.freeze([
    '', //  ّ Arabic shadda - Garshuni
    '', //  ْ ARABIC SUKUN
    '', //  ٓ Arabic maddah above - Garshuni
    '', //  ٔ Arabic hamza above - Garshuni
    '' //  َ Arabic hamza below - Garshuni
  ]),
  Object.freeze([
    // using ; because , indicates spirantization
    ';', // ، Arabic COMMA - also used with Thaana and Syriac in modern text
    ';', // ؛ Arabic Semicolon - also used with Thaana and Syriac in modern text
    '?', // ؟ Arabic Question Mark - also used with Thaana and Syriac in modern text
    '!' // ! Exclamation Mark - regular ASCII exclamation mark
  ])
);

/**
 * @private
 * Maps input character to Arabic char
 * @param { string } c input character
 * @param { Object.<string, string> } fromTo mapping dictionary
 * @returns { string } Arabic mapped char
 */
const to = (c, fromTo) => fromTo[c] || (fromTo[c] === '' ? '' : c);
const alef = '\u0627'; // ا ARABIC LETTER ALEF
const fatha = '\u064E'; //  َ Arabic fatha - Garshuni: a
const kasra = '\u0650'; //  ِ Arabic kasra - Garshuni: i
const damma = '\u064F'; //  ُ Arabic damma - Garshuni: u
const waw = '\u0648'; // و ARABIC LETTER WAW
const yeh = '\u064A'; // ي ARABIC LETTER YEH

/**
 * @private
 * Maps input character to CAL char
 * @param { string } c Arabic input character
 * @param { Object.<string, string> } fromTo mapping dictionary
 * @param { Object } wordProps optional word settings
 * @returns { string } CAL mapped char
 */
const mapCallback = (word, i, fromTo, wordProps) => {
  const c = word.charAt(i);
  if (!wordProps.isDotted) {
    return to(c, fromTo);
  }
  let m = '';
  const n = word.charAt(i + 1);
  switch (c) {
    case fatha:
      m =
        n === alef && word.length - 1 > i + 1 && word.charAt(i + 2) !== '-'
          ? '(o'
          : to(c, fromTo);
      break;
    case kasra:
      m =
        n === yeh
          ? 'yi' // Arabic stores as (iy)
          : to(c, fromTo);
      break;
    case damma:
      m =
        n === waw
          ? 'wu' // Arabic stores as (uw)
          : to(c, fromTo);
      break;
    default:
      m = to(c, fromTo);
      break;
  }
  return m;
};

/**
 * Arabic to CAL Mapper
 * @const
 * @type { Mapper }
 */
export const mapper = new Mapper(arabicWriting, calWriting, mapCallback);
mapper.multiples = multiples;

/**
 * Convert from Arabic to CAL code
 * @static
 * @param {string} word input word in Arabic Unicode
 * @returns {string} the input word converted to CAL
 */
export const toCal = word => {
  const wordProp = Object.freeze(
    Object.create(null, {
      isDotted: { value: isArabicDotted(word), enumerable: true }
    })
  );
  return mapper.map(word, wordProp);
};
