/* eslint no-extend-native: 0*/
/* eslint no-use-extend-native/no-use-extend-native: 0*/
/* eslint babel/new-cap: 0*/

import 'chai';
import 'steal-mocha';
import Attr from '../attr';

const expect = chai.expect;
const testObj = {
    name: 'juan'
};
const myMap = {
    name: 'juan'
};
let attr;
let resp;

describe('attr', () => {
    describe('when using contructor method', () => {
        beforeEach(() => {
            attr = new Attr(testObj);
        });
        describe('when using attr as a getter', () => {
            beforeEach(() => {
                resp = attr('name');
            });
            it('returns correct value', () => {
                expect(resp).to.equal('juan');
            });
        });
        describe('when using attr to set a single value', () => {
            beforeEach(() => {
                resp = attr('name', 'Optimus');
            });
            it('returns correct value', () => {
                expect(testObj.name).to.equal('Optimus');
            });
        });
        describe('when using attr to set a many values at once', () => {
            beforeEach(() => {
                resp = attr({name: 'Optimus', allegiance: 'Autobots'});
            });
            it('sets correct values', () => {
                expect(testObj.name).to.equal('Optimus');
                expect(testObj.allegiance).to.equal('Autobots');
            });
        });
    });
    describe('when using prototype method', () => {
        beforeEach(() => {
            Object.prototype.attr = Attr();
        });
        describe('when using attr as a getter', () => {
            beforeEach(() => {
                resp = myMap.attr('name');
            });
            it('returns correct value', () => {
                expect(resp).to.equal('juan');
            });
        });
        describe('when using attr to set a single value', () => {
            beforeEach(() => {
                resp = myMap.attr('name', 'Optimus');
            });
            it('returns correct value', () => {
                expect(testObj.name).to.equal('Optimus');
            });
        });
        describe('when using attr to set a many values at once', () => {
            beforeEach(() => {
                resp = myMap.attr({name: 'Optimus', allegiance: 'Autobots'});
            });
            it('sets correct values', () => {
                expect(testObj.name).to.equal('Optimus');
                expect(testObj.allegiance).to.equal('Autobots');
            });
        });
    });
});
