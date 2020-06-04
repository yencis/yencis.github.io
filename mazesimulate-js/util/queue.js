// Credit: initjs.com

var Queue = function() {
    this.storage = {};
    this.count = 0;
    this.lowestCount = 0;
};

Queue.prototype.enqueue = function(value) {
    // Check to see if value is defined
    if (value) {
        this.storage[this.count] = value;
        this.count++;
    }
};

Queue.prototype.dequeue = function() {
    if (this.count - this.lowestCount === 0) {
        return undefined;
    }

    var result = this.storage[this.lowestCount];
    delete this.storage[this.lowestCount];
    this.lowestCount++;
    return result;
};

Queue.prototype.size = function() {
    return this.count - this.lowestCount;
};