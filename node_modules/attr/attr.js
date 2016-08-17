import debug from 'debug';
import {set, get, setMany} from './lib/helpers';

const log = debug('attr:main');
const attr = function () {
    // determine mode
    let items;
    let key;
    let resp;
    let value;

    // No arguments means entire object is desired
    if (arguments.length === 0) {
        log('mode: no args');
        resp = this.serialize ? this.serialize() : this;
        log('resp', resp);
        return resp;
    }

    // One argument is a getter, unless type is an object, then setting multiple props
    if (arguments.length === 1) {
        log('mode: single argument');
        key = arguments[0];
        if (typeof key === 'object') {
            items = arguments[0];
            setMany(this, items);
            return this;
        } else {
            resp = get(this, key);
            log('resp', resp);
            return resp;
        }
    }

    // Two arguments, or more, means setter... but we ignore everything past
    // second argument.
    if (arguments.length > 1) {
        log('mode: multiple args');
        key = arguments[0];
        value = arguments[1];

        set(this, key, value);

        return value;
    }
};

const Attr = function (ctx) {
    log('constructor called...');
    // Creating new instance
    if (this instanceof Attr) {
        log('...with `new` keyword.');
        return function () {
            return attr.apply(ctx, arguments);
        };
    }
    log('...as a function.');
    return attr;
};

export default Attr;
