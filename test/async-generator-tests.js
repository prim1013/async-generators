var assert = require( 'chai' ).assert;
var asyncGenerator = require( '../index' );

describe( 'Async Generator Tests', function () {

    it( 'should work', function ( done ) {
        var expected = {
            "user": {
                "id": 4,
                "name": "Sarah"
            },
            "friends": [
                {
                    "id": 201,
                    "rootID": 4,
                    "name": "Joanna"
                },
                {
                    "id": 301,
                    "rootID": 4,
                    "name": "Tricia"
                }
            ]
        };
        var makeAssertions = function ( value ) {
            assert.deepEqual( value, expected );
            done();
        };
        var onRejected = function () {
            assert.equal( 1, 0, 'async generator error' );
            done();
        };

        asyncGenerator.run().then( makeAssertions, onRejected );

    } );
} );