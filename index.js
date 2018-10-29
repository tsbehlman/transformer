class Transformer {
	constructor( original ) {
		this.original = original;
		this.outputLength = original.length;
		this.insertions = new Array();
		
		this.output = "";
		this.bufferIndex = 0;
		this.originalIndex = 0;
	}

	writeAt( text, index ) {
		this.insertions.push( {
			index: index,
			order: this.insertions.length,
			text: text
		} );
		this.outputLength += text.length;
	}
	
	_writeToBuffer( string ) {
		this.buffer.utf8Write( string, this.bufferIndex, string.length );
		this.bufferIndex += string.length;
	}
	
	getSource() {
		if( this.output.length === 0 ) {
			this.insertions.sort( ( a, b ) => {
				let difference = a.index - b.index;
				if( difference === 0 ) {
					difference = a.order - b.order;
				}
				return difference;
			} );
			
			for( const insert of this.insertions ) {
				this.output += this.original.substring( this.originalIndex, insert.index );
				this.output += insert.text;
				this.originalIndex = insert.index;
			}
			
			this.insertions = [];
			
			this.output += this.original.substring( this.originalIndex, this.original.length );
		}
		
		return this.output;
	}
}

module.exports = Transformer;