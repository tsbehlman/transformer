let Transformer = require( "../index" );

describe( "Transformer", () => {
	it( "initializes", () => {
		let transformer = new Transformer( "test source" );
	} );
	
	it( "emits no code", () => {
		let transformer = new Transformer( "" );
		
		expect( transformer.getSource().toString() ).toBe( "" );
	} );
	
	it( "emits original content", () => {
		let transformer = new Transformer( "original" );
		
		expect( transformer.getSource().toString() ).toBe( "original" );
	} );
	
	it( "emits code at specified location", () => {
		let transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 4 );
		
		expect( transformer.getSource().toString() ).toBe( "orig<>inal" );
	} );
	
	it( "emits code at two specified locations in order", () => {
		let transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 0 );
		transformer.writeAt( "><", 8 );
		
		expect( transformer.getSource().toString() ).toBe( "<>original><" );
	} );
	
	it( "emits code at two specified locations out of order", () => {
		let transformer = new Transformer( "original" );
		
		transformer.writeAt( "<>", 6 );
		transformer.writeAt( "><", 4 );
		
		expect( transformer.getSource().toString() ).toBe( "orig><in<>al" );
	} );
} );