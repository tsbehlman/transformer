const Transformer = require( "../index" );

describe( "Transformer", () => {
	it( "initializes", () => {
		const transformer = new Transformer( "test source" );
	} );
	
	it( "emits no code", () => {
		const transformer = new Transformer( "" );
		
		expect( transformer.getSource().toString() ).toBe( "" );
	} );
	
	it( "emits original content", () => {
		const transformer = new Transformer( "original" );
		
		expect( transformer.getSource().toString() ).toBe( "original" );
	} );
	
	it( "emits code at specified location", () => {
		const transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 4 );
		
		expect( transformer.getSource().toString() ).toBe( "orig<>inal" );
	} );
	
	it( "emits code at two specified locations in order", () => {
		const transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 0 );
		transformer.writeAt( "><", 8 );
		
		expect( transformer.getSource().toString() ).toBe( "<>original><" );
	} );
	
	it( "emits code at two specified locations out of order", () => {
		const transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 6 );
		transformer.writeAt( "><", 4 );
		
		expect( transformer.getSource().toString() ).toBe( "orig><in<>al" );
	} );
	
	if( "emits code at the correct index in a utf-8 string", () => {
		const transformer = new Transformer( "oﬁîgi•ñal" );
		
		transformer.writeAt( "<>", 6 );
		transformer.writeAt( "><", 7 );
		
		expect( transformer.getSource().toString() ).toBe( "oﬁîgi•ñ<>a><l" );
	} );
} );