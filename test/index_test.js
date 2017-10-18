const test = require('assert');
const sut = require('../build/arabic-cal');

describe('Arabic', () => {
  describe('To CAL', () => {
    it('General case usage, with one-to-one mapping', () => {
      const word = sut.toCal('دقسريا-دفيليفوس');
      const wordExpected = 'dqsry)-dpylypws';
      const vocalised = sut.toCal('دقِسَرِيَا-ذفِيلِيفُوس');
      const vocalisedExpected = 'dqisaryia)-d,pyilyipwus';
      test.strictEqual(word, wordExpected, 'sut.toCal_generic consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal_generic vocalised'
      );
    });
    it('Fatha Alif', () => {
      const vocalised = sut.toCal('دَاقِسَرِي-ذفِيلِيفُوس');
      const vocalisedExpected = 'd(oqisaryi-d,pyilyipwus';
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal_generic Fatha Alif'
      );
    });
    it('Madda case', () => {
      const word = sut.toCal('اار');
      const wordExpected = '))r';
      const vocalised = sut.toCal('آاَر');
      const vocalisedExpected = ')o)ar';
      test.strictEqual(word, wordExpected, 'sut.toCal_madda consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal_madda vocalised'
      );
    });
    it('Alef superscript', () => {
      const word = sut.toCal('شمك');
      const wordExpected = '$mk';
      const vocalised = sut.toCal('شمٰخ');
      const vocalisedExpected = '$mok,';
      test.strictEqual(word, wordExpected, 'sut.toCal_madda consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal_madda vocalised'
      );
    });
    it('Word with (yi) => (i;) mapping', () => {
      const word = sut.toCal('ديليدوته');
      const wordExpected = 'dylydwth';
      const vocalised = sut.toCal('دِيلِيذُوثِهِ');
      const vocalisedExpected = 'dyilyid,wut,ihi';
      test.strictEqual(word, wordExpected, 'sut.toCal_yi consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_yi vocalised');
    });
    it('Word with short Eastern (E) => (e) mapping', () => {
      const word = sut.toCal('اولد');
      const wordExpected = ')wld';
      const vocalised = sut.toCal('اَولِد');
      const vocalisedExpected = ')awlid';
      test.strictEqual(word, wordExpected, 'sut.toCal_yi consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_yi vocalised');
    });
    it('Word with (wu) => (uO) mapping', () => {
      const word = sut.toCal('لبعلدببيكون');
      const wordExpected = 'lb(ldbbykwn';
      const vocalised = sut.toCal('لَبعِلدبٰبَيكُون');
      const vocalisedExpected = 'lab(ildbobaykwun';
      test.strictEqual(word, wordExpected, 'sut.toCal_wu consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_wu vocalised');
    });
    it('Word with (wO) => (oO) mapping', () => {
      const word = sut.toCal('ابهوهي');
      const vocalised = sut.toCal('اَبٰهَوهي');
      const wordExpected = ')bhwhy';
      const vocalisedExpected = ')abohawhy';
      test.strictEqual(word, wordExpected, 'sut.toCal_wO consonant');
      test.strictEqual(vocalised, vocalisedExpected, 'sut.toCal_wO vocalised');
    });
    it('Word with Palestinian P', () => {
      const word = sut.toCal('افبهوهي');
      const vocalised = sut.toCal('اَفِبٰهَوهي');
      const wordExpected = ')pbhwhy';
      const vocalisedExpected = ')apibohawhy';
      test.strictEqual(word, wordExpected, 'sut.toCal_wO consonant');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal vocalised with P'
      );
    });
    it('Word with un-mapped chars', () => {
      const word = sut.toCal('AZAِDط');
      const wordExpected = 'AZAiDT';
      test.strictEqual(word, wordExpected, 'sut.toCal_wO un-mapped char');
    });
    it('Word with Hebrew Sin', () => {
      const word = sut.toCal('افبهوهس');
      const wordExpected = ')pbhwhs';
      const vocalised = sut.toCal('اَفِبٰهَوهسٰ');
      const vocalisedExpected = ')apibohawhso';
      test.strictEqual(word, wordExpected, 'sut.toCal consonant with Sin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal vocalised with Sin'
      );
    });
    it('Word with Hebrew Shin', () => {
      const word = sut.toCal('اجشا');
      const wordExpected = ')g$)';
      const vocalised = sut.toCal('آغشَا');
      const vocalisedExpected = ')og,$a)';
      test.strictEqual(word, wordExpected, 'sut.toCal consonant with Shin');
      test.strictEqual(
        vocalised,
        vocalisedExpected,
        'sut.toCal vocalised with Shin'
      );
    });
    it('Begadkepat', () => {
      const word = sut.toCal('بِجَدكِفَت');
      const wordExpected = 'bigadkipat';
      test.strictEqual(word, wordExpected, 'sut.toCal begadkepat');
    });
    it('Punctuation', () => {
      const word = sut.toCal('؛آاَر؟');
      const wordExpected = ';)o)ar?';
      test.strictEqual(word, wordExpected, 'sut.toCal punctuation');
    });
    it('Invalid Rukkakha', () => {
      const word = sut.toCal('افبهسوهس');
      const wordExpected = ')pbhswhs';
      test.strictEqual(word, wordExpected, 'sut.toCal invalid rukkakha');
    });
    it('Standalone Ou', () => {
      const word = sut.toCal('افبُهسُوهس');
      const wordExpected = ')pbuhswuhs';
      test.strictEqual(word, wordExpected, 'sut.toCal sandalone Ou');
    });
    it('Mapping to empty', () => {
      const word = sut.toCal('ّساثبْ');
      const wordExpected = 's)t,b';
      test.strictEqual(word, wordExpected, 'sut.toCal with empty');
    });
    it('Blank word returns blank', () => {
      const word = sut.toCal('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toCal_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toCal(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toCal_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toCal(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toCal_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toCal(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toCal_zero');
    });
  });
});

describe('Arabic', () => {
  describe('To CAL', () => {
    it('Blank word returns blank', () => {
      const word = sut.toCal('');
      const wordExpected = '';
      test.strictEqual(word, wordExpected, 'sut.toCal_blank');
    });
    it('Null word returns null', () => {
      const word = sut.toCal(null);
      const wordExpected = null;
      test.strictEqual(word, wordExpected, 'sut.toCal_null');
    });
    it('Undefined word returns undefined', () => {
      const word = sut.toCal(undefined);
      const wordExpected = undefined;
      test.strictEqual(word, wordExpected, 'sut.toCal_undefined');
    });
    it('0 number as word returns 0', () => {
      const word = sut.toCal(0);
      const wordExpected = 0;
      test.strictEqual(word, wordExpected, 'sut.toCal_zero');
    });
  });
  describe('Mapped writing', () => {
    it('Consonants length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.consonants.length,
        sut.mapper.toWriting.consonants.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.consonants.length > 22,
        'Length greater than 22'
      );
    });
    it('Vowels length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.vowels.length,
        sut.mapper.toWriting.vowels.length,
        'Length differs'
      );
      test.ok(
        sut.mapper.fromWriting.vowels.length > 5,
        'Length greater than 5'
      );
    });
    it('Diacritics length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.diacritics.length,
        sut.mapper.toWriting.diacritics.length,
        'Length differs'
      );
      test.ok(
        (sut.mapper.fromWriting.diacritics.length = 4),
        'Length equals 4'
      );
    });
    it('Punctuation length', () => {
      test.strictEqual(
        sut.mapper.fromWriting.punctuation.length,
        sut.mapper.toWriting.punctuation.length,
        'Length differs'
      );
      test.ok(
        (sut.mapper.fromWriting.punctuation.length = 6),
        'Length equals 6'
      );
    });
  });
});
