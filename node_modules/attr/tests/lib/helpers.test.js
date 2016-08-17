/* eslint no-loop-func: 0*/
import 'chai';
import debug from 'debug';
import 'steal-mocha';
import {toString, set, get, setMany} from '../../lib/helpers';

const log = debug('attr:test:helpers');
const expect = chai.expect;
const testObjects = [
    {number: 100},
    {string: 'hello'},
    {boolean: false},
    {object: {name: 'juan'}}
];
const testMap = {};
let resp;
let testObj = {};

for (let i = 0; i < testObjects.length; i++) {
    const item = testObjects[i];
    const key = Object.keys(item)[0];
    testMap[key] = item[key];
}

describe('helpers', () => {
    beforeEach(() => {
        testObj = {};
        resp = undefined;
    });

    describe('toString function', () => {
        for (let i = 0; i < testObjects.length; i++) {
            const item = testObjects[i];
            const key = Object.keys(item)[0];

            it('returns a string type', () => {
                expect(typeof toString(item)).to.equal('string');
            });

            it(`converts ${key} to string`, () => {
                expect(toString(item)).to.equal(item.toString());
            });
        }
    });

    describe('when set function is called', () => {
        beforeEach(() => {
            resp = set(testObj, 'name', testObjects[3].name);
        });
        it('sets value', () => {
            expect(testObj.name).to.equal(testObjects[3].name);
        });

        it('returns value', () => {
            expect(resp).to.equal(testObjects[3].name);
        });
    });

    describe('setMany function', () => {
        beforeEach(() => {
            log('testMap', testMap);
            resp = setMany(testObj, testMap);
        });

        it('returns value', () => {
            expect(resp).to.eql(testMap);
        });

        for (let i = 0; i < testObjects.length; i++) {
            const item = testObjects[i];
            const key = Object.keys(item)[0];
            it('sets property value', () => {
                expect(resp[key]).to.equal(item[key]);
            });
        }
    });

    describe('get function', () => {
        beforeEach(() => {
            testObj.test = testMap.string;
        });

        it('gets value', () => {
            expect(get(testObj, 'test')).to.equal(testMap.string);
        });
    });
});
