var assert = require( 'chai' ).assert;
var asyncGenerator = require( '../index' );

describe( 'Async Generator Tests', function () {

    it( 'should work', function ( done ) {
        var expected = [
            {id: 4, name: 'Sarah'},
            [
                {id: 201, rootID: 4, name: 'Joanna'},
                {id: 301, rootID: 4, name: 'Tricia'}
            ]
        ];
        var getUser = function ( id ) {
            return Promise.resolve( {
                id: id,
                name: "Sarah"
            } );
        };
        var getFriends = function ( userID ) {

            if ( !userID ) {
                throw (new Error( 'No userID found' ));
            }

            return Promise.resolve( [{
                id: 201,
                rootID: userID,
                name: "Joanna"
            }, {
                id: 301,
                rootID: userID,
                name: "Tricia"
            }] );
        };
        var promises = [getUser, getFriends];
        var makeAssertions = function ( value ) {
            assert.deepEqual( value, expected );
            done();
        };
        var onRejected = function () {
            assert.equal( 1, 0, 'async generator error' );
            done();
        };

        asyncGenerator.run( 4, promises ).then( makeAssertions, onRejected );
    } );

} );