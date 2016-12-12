describe("Selector", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("Get non existing id", function() {
        var result = $("#fake");
        expect(result).toEqual(null);
    });

    it("Get element by id", function() {
        var result = $("#myDiv");
        var myDiv = document.getElementById("myDiv");
        expect(result.count()).toEqual(1);
        expect(result.get(0)).toBe(myDiv);
    });

    it("Get single element by class", function() {
        var result = $(".singleClass");
        var myClass = document.getElementsByClassName("singleClass")[0];
        expect(result.count()).toEqual(1);
        expect(result.get(0)).toBe(myClass);
    });

    it("Get multiple elements by class", function() {
        var result = $(".multiClass");
        var myClass = document.getElementsByClassName("multiClass");
        expect(result.count()).toEqual(myClass.length);
    });

    it("Get elements by tag", function() {
        var result = $("myTag");
        var myTags = document.getElementsByTagName("myTag");
        expect(result.count()).toEqual(myTags.length);
        expect(result.get(0)).toBe(myTags[0]);
    });

    it("Get elements by class in tag", function() {
        var result = $("containerTag .insideClass");
        var myElements = [];
        myElements[0] = document.getElementById("inside1");
        myElements[1] = document.getElementById("inside2");
        myElements[2] = document.getElementById("inside3");
        expect(result.count()).toEqual(3);
        for(var i = 0; i < myElements.length; i++) {
            expect(result.get(i)).toBe(myElements[i]);
        }
    });
});

describe("addClass", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("Add class to a single object", function() {
        $("#myDiv").addClass("newClass");
        var myDiv = document.getElementById("myDiv");
        expect(myDiv.getAttribute("class")).toEqual("newClass");
    });

    it("Add class to a single object with classes", function() {
        $("#divWithClass").addClass("newClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toEqual("oldClass newClass");
    });

    it("Add class to number of objects", function() {
        $("myTag").addClass("newClass");
        var myTags = document.getElementsByTagName("myTag");
        for(var i = 0; i < myTags.length; i++) {
            expect(myTags[i].getAttribute("class")).toEqual("newClass");
        }
    });

    it("Add existing class", function() {
        $("#divWithClass").addClass("oldClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toEqual("oldClass");
    });
});

describe("removeClass", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("Remove class to a single object", function() {
        $("#divWithClass").removeClass("oldClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toEqual("");
    });

    it("Remove class to object with few classes", function() {
        $("#divWithManyClass").removeClass("firstClass");
        var myDiv = document.getElementById("divWithManyClass");
        expect(myDiv.getAttribute("class")).toEqual("secondClass");
    });

    it("Remove class to number of objects", function() {
        $(".classToRemove").removeClass("classToRemove");
        var elements = document.getElementsByClassName("classToRemove");
        for(var i = 0; i < elements.length; i++) {
            expect(elements[i].getAttribute("class")).toEqual("");
        }
    });

    it("Remove non existing class", function() {
        $("#divWithClass").removeClass("newClass");
        var myDiv = document.getElementById("divWithClass");
        expect(myDiv.getAttribute("class")).toEqual("oldClass");
    });
});

describe("map", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it('check that map return the result of all the objects', function () {
        var result = $(".toMap").map(function(obj) {
            return obj.innerHTML;
        });
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual("1");
        expect(result[1]).toEqual("2");
        expect(result[2]).toEqual("3");
    })
});

describe("any", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("all elements passes", function () {
        var result = $(".toMap").any(function(obj) {
            return obj.innerHTML != "";
        });
        expect(result).toEqual(true);
    });

    it("only one elements passes", function () {
        var result = $(".toMap").any(function(obj) {
            return obj.innerHTML == "1";
        });
        expect(result).toEqual(true);
    });

    it("no elements passes", function () {
        var result = $(".toMap").any(function(obj) {
            return obj.innerHTML == "";
        });
        expect(result).toEqual(false);
    });

    it("element passes multi check functions", function () {
        var result = $(".toMap").any(function(obj) {
            return obj.innerHTML != "";
        }, function(obj) {
            return obj.innerHTML == "1"
        });
        expect(result).toEqual(true);
    });

    it("element passes only one check function", function () {
        var result = $(".toMap").any(function(obj) {
            return obj.innerHTML == "200";
        }, function(obj) {
            return obj.innerHTML == "1"
        });
        expect(result).toEqual(false);
    });
});

describe("all", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("all elements passes", function () {
        var result = $(".toMap").all(function(obj) {
            return obj.innerHTML != "";
        });
        expect(result).toEqual(true);
    });

    it("only one elements passes", function () {
        var result = $(".toMap").all(function(obj) {
            return obj.innerHTML == "1";
        });
        expect(result).toEqual(false);
    });

    it("no elements passes", function () {
        var result = $(".toMap").all(function(obj) {
            return obj.innerHTML == "";
        });
        expect(result).toEqual(false);
    });

    it("all elements passes multi check functions", function () {
        var result = $(".toMap").all(function(obj) {
            return obj.innerHTML != "";
        }, function(obj) {
            return obj.innerHTML.length > 0;
        });
        expect(result).toEqual(true);
    });

    it("element passes only one check function", function () {
        var result = $(".toMap").all(function(obj) {
            return obj.innerHTML != "";
        }, function(obj) {
            return parseInt(obj.innerHTML) > 1;
        });
        expect(result).toEqual(false);
    });
});

describe("filter", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it('all elements passes', function () {
        var result = $(".toMap").filter(function(obj) {
            return obj.innerHTML != "";
        });
        expect(result.count()).toEqual(3);
    });

    it('only one element passes', function () {
        var result = $(".toMap").filter(function(obj) {
            return parseInt(obj.innerHTML) > 2;
        });
        expect(result.count()).toBe(1);
        expect(result.get(0).innerHTML).toEqual("3");
    });

    it('no element passes', function () {
        var result = $(".toMap").filter(function(obj) {
            return parseInt(obj.innerHTML) > 5;
        });
        expect(result.count()).toEqual(0);
    });
});

describe("css", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it('change one element css', function () {
        $("#myDiv").css("color", "red");
        var myDiv = document.getElementById("myDiv");
        expect(myDiv.style["color"]).toEqual("red");
    });

    it('change number of elements css', function () {
        $(".multiClass").css("color", "red");
        var myElements = document.getElementsByClassName("multiClass");
        for(currElement of myElements) {
            expect(currElement.style["color"]).toEqual("red");
        }
    });
});

describe("appendChild", function() {
    beforeEach(function () {
        document.body.innerHTML = __html__['OfekQueryTestingPage.html'];
    });

    it("append a single child", function () {
        $("#myDiv").appendChild(document.getElementById("emptyDiv"));
        var myContainer = document.getElementById("myDiv");
        expect(myContainer.innerHTML).toEqual('<div id="emptyDiv"></div>');
    });
});