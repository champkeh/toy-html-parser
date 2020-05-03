const Transducer = require('./transducer');

class HTMLLexer extends Transducer {
    constructor(s) {
        super(s, 'data');
        this.output.push('');
    }

    state_data(c) {
        if (c === '<') {
            this.append_word();
            this.append_char(c);
            this.transition('tag_open');
        } else {
            this.append_char(c);
        }
    }

    state_tag_open(c) {
        if (c === '/') {
            this.append_char(c);
            this.transition('tag_end_open');
        } else {
            this.append_char(c);
            this.transition('tag_start_open');
        }
    }

    state_tag_start_open(c) {
        if (c === ' ') {
            this.append_word();
            this.transition('attribute');
        } else if (c === '>') {
            this.append_char(c);
            this.append_word();
            this.transition('data');
        } else {
            this.append_char(c);
        }
    }

    state_attribute(c) {
        if (c === '>') {
            this.append_word();
            this.append_char(c);
            this.append_word();
            this.transition('data');
        } else if (/[a-zA-Z]/.test(c)) {
            this.append_char(c);
            this.transition('attribute_name');
        } else if (c === '/') {
            this.append_word();
            this.append_char(c);
            this.transition('tag_end_open');
        }
    }

    state_attribute_name(c) {
        if (c === '=') {
            this.append_char(c);
            this.transition('attribute_value');
        } else if (c === ' ') {
            this.append_word();
            this.transition('attribute')
        } else if (c === '>') {
            this.append_word();
            this.transition('data');
        } else {
            this.append_char(c);
        }
    }
    state_attribute_value(c) {
        if (c === '\'') {
            this.append_char(c);
            this.transition('attribute_value_start_single_quote');
        } else if (c === '"') {
            this.append_char(c);
            this.transition('attribute_value_start_double_quote');
        } else if (/[ >]/.test(c)) {
            this.append_word();
            this.transition('attribute');
        } else {
            this.append_char(c);
        }
    }
    state_attribute_value_start_single_quote(c) {
        if (c === '\'') {
            this.append_char(c);
            this.append_word();
            this.transition('attribute');
        } else {
            this.append_char(c);
        }
    }
    state_attribute_value_start_double_quote(c) {
        if (c === '"') {
            this.append_char(c);
            this.append_word();
            this.transition('attribute');
        } else {
            this.append_char(c);
        }
    }

    state_tag_end_open(c) {
        if (c === '>') {
            this.append_char(c);
            this.append_word();
            this.transition('data');
        } else {
            this.append_char(c);
        }
    }

    append_word() {
        if (this.output[this.output.length-1]) {
            this.output.push('');
        }
    }
    append_char(c) {
        this.output[this.output.length-1] += c;
    }
}

module.exports = HTMLLexer;
