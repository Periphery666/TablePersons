const assert = require("assert");
const request = require("supertest");
const fs = require("fs");
let app = require("../../server.js").app;

describe("Tests server", function(){
    describe("Post запрос /json", function(){
        it("should write array objects to persons.json", function(done){
            const persons = [];
            const expected = '[]';

            request(app)
                .post("/json")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.json", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.json", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}];
            const expected = '[{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}]';

            request(app)
                .post("/json")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.json", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.json", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}];
            const expected = '[{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}]';

            request(app)
                .post("/json")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.json", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });
    });

    describe("Post запрос /xml", function(){
        it("should write array objects to persons.xml", function(done){
            const persons = [];
            const expected = '';

            request(app)
                .post("/xml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.xml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.xml", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}];
            const expected = '<0>\n    <id>1567081018184</id>\n    <firstName>Tatyana</firstName>\n    <lastName>Havrykova</lastName>\n    <age>23</age>\n</0>';

            request(app)
                .post("/xml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.xml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.xml", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}];
            const expected = '<0>\n    <id>1567081018184</id>\n    <firstName>Tatyana</firstName>\n    <lastName>Havrykova</lastName>\n    <age>23</age>\n</0>\n<1>\n    <id>1567081033304</id>\n    <firstName>Kolya</firstName>\n    <lastName>Nana</lastName>\n    <age>45</age>\n</1>';

            request(app)
                .post("/xml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.xml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });
    });

    describe("Post запрос /yaml", function(){
        it("should write array objects to persons.yaml", function(done){
            const persons = [];
            const expected = '[]';

            request(app)
                .post("/yaml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.yaml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.yaml", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}];
            const expected = '[{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}]';

            request(app)
                .post("/yaml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.yaml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.yaml", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}];
            const expected = '[{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}]';

            request(app)
                .post("/yaml")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.yaml", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });
    });

    describe("Post запрос /csv", function(){
        it("should write array objects to persons.csv", function(done){
            const persons = [];
            const expected = '"id","firstName","lastName","age"';

            request(app)
                .post("/csv")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.csv", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.csv", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"}];
            const expected = '"id","firstName","lastName","age"\r\n1567081018184,"Tatyana","Havrykova","23"';

            request(app)
                .post("/csv")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.csv", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });

        it("should write array objects to persons.csv", function(done){
            const persons = [{"id":1567081018184,"firstName":"Tatyana","lastName":"Havrykova","age":"23"},{"id":1567081033304,"firstName":"Kolya","lastName":"Nana","age":"45"}];
            const expected = '"id","firstName","lastName","age"\r\n1567081018184,"Tatyana","Havrykova","23"\r\n1567081033304,"Kolya","Nana","45"';

            request(app)
                .post("/csv")
                .send(persons)
                .set('Content-Type', 'application/json')
                .expect(function(response){
                    const actual = fs.readFileSync("persons.csv", "utf8");
                    assert.deepEqual(actual, expected)
                })
                .end(done);
        });
    });
});