var OfekQuery = function(objects) {
    this.objects = objects;
};

function $(selector) {
    if(selector == undefined || selector == null || selector == "")
        return;

    var result = [document];
    var selectors = selector.split(' ');
    for(currSelector of selectors) {
        var token = currSelector.charAt(0);
        var name = currSelector.substring(1);

        if(token == "#") {
            result = [document.getElementById(name)];
        } else {
            var newResult = [];
            for(currElement of result) {
                var newElements;
                if(token == ".")
                    newElements = currElement.getElementsByClassName(name);
                else
                    newElements = currElement.getElementsByTagName(currSelector);

                addCollection(newResult, newElements);
            }
            result = newResult;
        }
    }

    return new OfekQuery(result);
}

function addCollection(collection, colToAdd) {
    for(element of colToAdd) {
        collection.push(element);
    }
}

OfekQuery.prototype.addClass = function(className) {
    for(object of this.objects) {
        object.classList.add(className);
    }
};

OfekQuery.prototype.removeClass = function(className) {
    for(object of this.objects) {
        object.classList.remove(className);
    }
};

OfekQuery.prototype.each = function(func) {
    for(object of this.objects) {
        func(object);
    }
};

OfekQuery.prototype.map = function(func) {
    var results = [];
    for(object of this.objects) {
        results.push(func(object));
    }

    return results;
};

OfekQuery.prototype.any = function() {
    for(object of this.objects) {
        if(checkObject(object, arguments))
           return true;
    }

    return false;
};

OfekQuery.prototype.all = function() {
    for(object of this.objects) {
        if(!checkObject(object, arguments))
            return false;
    }

    return true;
};

OfekQuery.prototype.filter = function() {
    newObjects = [];
    for(object of this.objects) {
        if(checkObject(object, arguments))
            newObjects.push(object);
    }

    return new OfekQuery(newObjects);
};

OfekQuery.prototype.css = function(property, value) {
    this.each(function(obj) {
        obj.style[property] = value;
    });
};

OfekQuery.prototype.count = function() {
    return this.objects.length;
};

OfekQuery.prototype.appendChild = function(object) {
    this.each(function(obj) {
        obj.appendChild(object.cloneNode(true));
    });
};

OfekQuery.prototype.getAttribute = function(attributeName) {
    return this.map(function(obj) {
        return obj.getAttribute(attributeName);
    });
};

OfekQuery.prototype.setAttribute = function(attributeName, attributeValue) {
    this.each(function(obj) {
        obj.setAttribute(attributeName, attributeValue);
    });
};

OfekQuery.prototype.get = function(index) {
    return this.objects[index];
};

OfekQuery.prototype.value = function() {
    if (arguments.length > 0) {
        var val = arguments[0];
        this.each(function (obj) {
            obj.value = val;
        });
    } else {
        var results = this.map(function (obj) {
            return obj.value;
        });

        if (results.length == 1)
            results = results[0]

        return results;
    }
};

OfekQuery.prototype.replace = function(replace, value) {
    this.each(function(obj) {
        obj.innerHTML = obj.innerHTML.replace(replace, value);
    });
};

OfekQuery.prototype.clone = function() {
    var newObjects = this.map(function(obj) {
        return obj.cloneNode(true);
    });

    return new OfekQuery(newObjects);
};

OfekQuery.prototype.empty = function() {
    this.each(function(obj){
       obj.innerHTML = "";
    });
};

function checkObject(object, tests) {
    for(test of tests) {
        if(!test(object))
            return false;
    }

    return true;
}