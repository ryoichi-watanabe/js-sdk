'use strict';

import * as assert from 'assert';
import { Answers, Question } from 'inquirer';
import { buildQuestions } from '../src/qa';

const getQuestion = (
  questions: Question[],
  predicate: (q: Question) => boolean
): Question => {
  return questions.find(predicate) as Question;
};

describe('qa', () => {
  describe('buildQuestions', () => {
    it('should return questions', () => {
      const questions = buildQuestions('dist', 'en');
      assert(Array.isArray(questions));
    });
    context('name.en', () => {
      it('should be set the default value of name.en based on the passed directory', () => {
        const questions = buildQuestions('foo/bar/dist', 'en');
        const nameEn = getQuestion(
          questions,
          ({ name }: Question) => name === 'name.en'
        );
        assert.equal(nameEn.default, 'dist');
      });
      it('should be able to validate name.en', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'name.en'
        );
        assert(
          typeof q.validate !== 'undefined' && q.validate('hoge') === true
        );
        assert(
          typeof q.validate !== 'undefined' &&
            q.validate('a'.repeat(64)) === true
        );
        assert(
          typeof q.validate !== 'undefined' &&
            typeof q.validate('') === 'string'
        );
        assert(
          typeof q.validate !== 'undefined' &&
            typeof q.validate('a'.repeat(65)) === 'string'
        );
      });
    });
    context('descripiion.en', () => {
      it('should be set the default value of description.en based on name.en', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'description.en'
        );
        assert.equal(q.default({ name: { en: 'foo' } }), 'foo');
      });
      it('should be able to validate description.en', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'description.en'
        );
        assert(
          typeof q.validate !== 'undefined' && q.validate('hoge') === true
        );
        assert(
          typeof q.validate !== 'undefined' &&
            q.validate('a'.repeat(200)) === true
        );
        assert(
          typeof q.validate !== 'undefined' &&
            typeof q.validate('') === 'string'
        );
        assert(
          typeof q.validate !== 'undefined' &&
            typeof q.validate('a'.repeat(201)) === 'string'
        );
      });
    });
    context('name.ja', () => {
      it('should be enabled only in anwers.ja is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'name.ja'
        );
        assert(typeof q.when === 'function' && q.when({ ja: false }) === false);
        assert(typeof q.when === 'function' && q.when({ ja: true }) === true);
      });
    });
    context('description.ja', () => {
      it('should be enabled only in anwers.ja is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'description.ja'
        );
        assert(typeof q.when === 'function' && q.when({ ja: false }) === false);
        assert(typeof q.when === 'function' && q.when({ ja: true }) === true);
      });
    });
    context('name.cn', () => {
      it('should be enabled only in anwers.cn is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'name.cn'
        );
        assert(typeof q.when === 'function' && q.when({ cn: false }) === false);
        assert(typeof q.when === 'function' && q.when({ cn: true }) === true);
      });
    });
    context('description.cn', () => {
      it('should be enabled only in anwers.cn is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'description.cn'
        );
        assert(typeof q.when === 'function' && q.when({ cn: false }) === false);
        assert(typeof q.when === 'function' && q.when({ cn: true }) === true);
      });
    });
    context('homepage_url.ja', () => {
      it('should be enabled only in anwers.ja is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'homepage_url.ja'
        );
        assert(typeof q.when === 'function' && q.when({ ja: false }) === false);
        assert(typeof q.when === 'function' && q.when({ ja: true }) === true);
      });
    });
    context('homepage_url.cn', () => {
      it('should be enabled only in anwers.cn is true', () => {
        const questions = buildQuestions('dist', 'en');
        const q = getQuestion(
          questions,
          ({ name }: Question) => name === 'homepage_url.cn'
        );
        assert(typeof q.when === 'function' && q.when({ cn: false }) === false);
        assert(typeof q.when === 'function' && q.when({ cn: true }) === true);
      });
    });
  });
});