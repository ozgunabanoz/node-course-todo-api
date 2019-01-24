const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo.js');

const todos = [{

    _id: new ObjectID(),
    text: 'First test to do'

}, {

    _id: new ObjectID(),
    text: 'Second test to do',
    completed: true,
    completedAt: 4506

}];

beforeEach((done) => {

    // Todo.remove({}).then(() => done()); -- this is for only the first two tests

    Todo.remove({}).then(() => { // this exists to avoid the first two tests not to block get test. 
                                // this whole beforeeach part exists only for test purposes

        return Todo.insertMany(todos);

    }).then(() => done());

});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {

        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {

                expect(res.body.text).toBe(text);

            })
            .end((err, res) => {

                if (err) {

                    return done(err);

                }

                Todo.find({text}).then((todos) => {

                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e) => done(e));

            });

    });

    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {

                if (err) {

                    return done(err);

                }

                Todo.find().then((todos) => {

                    expect(todos.length).toBe(2);
                    done();

                }).catch((e) => done(e));

            });
    });

});

describe('GET /todos', () => {

    it('should get all todos', (done) => {

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {

                expect(res.body.todos.length).toBe(2);

            })
            .end(done);

    });

});

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                // console.log(res.body.todo.text);
                expect(res.body.todo.text).toBe(todos[0].text);

            })
            .end(done);

    });

    it('should return a 404 if todo not found', (done) => {

        var tempId = new ObjectID();

        request(app)
            .get(`/todos/${tempId.toHexString()}`)
            .expect(404)
            .end(done);

    });

    it('should return 404 when non object ids', (done) => {

        var tempId = '456';

        request(app)
            .get('/todos/'+tempId)
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {

    it('should remove a todo', (done) => {

        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.doc._id).toBe(todos[0]._id.toHexString());

            })
            .end((err, res) => {

                if (err) {

                    return done(err);

                }

                Todo.findById(todos[0]._id.toHexString()).then((doc) => {

                    expect(doc).toBeFalsy();
                    done();

                }).catch((e) => {
                    
                    done(e);
                
                });

            });

    });

    it('should return 404 if todo not found', (done) => {

        var tempId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${tempId}`)
            .expect(404)
            .end(done);

    });

    it('should return 404 if object id is invalid', (done) => {

        var tempId = '456';

        request(app)
            .delete('/todos/'+tempId)
            .expect(404)
            .end(done);

    });

});

describe('PATCH /todos/:id', () => {

    it('should update the todo', (done) => {

        var id = todos[0]._id;
        var text = 'something something something';
        var completed = true;

        request(app)
            .patch(`/todos/${id}`)
            .send({text})
            .send({completed})
            .expect(200)
            .expect((res) => {

                expect(res.body.todo.text).toBeTruthy();
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
                
            })
            .end(done);

    });

    it('should clear completedAt when todo is not completed', (done) => {
        // it should grab id second todo item

        var id = todos[1]._id;
        var text = 'yallah';
        var completed = false;

        request(app)
            .patch(`/todos/${id}`)
            .send({text})
            .send({completed})
            .expect(200)
            .expect((res) => {

                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();

            })
            .end(done);

    }); 

});