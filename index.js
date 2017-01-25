class Transformer {
	constructor( original ) {
		this.original = original;
		this.outputLength = original.length;
		this.insertions = new Array();
		
		this.buffer = null;
		this.bufferIndex = 0;
		this.originalIndex = 0;
	}

	writeAt( text, index ) {
		this.insertions.push( {
			index: index,
			text: text
		} );
		this.outputLength += text.length;
	}
	
	_writeToBuffer( string ) {
		this.buffer.utf8Write( string, this.bufferIndex, string.length );
		this.bufferIndex += string.length;
	}
	
	getSource() {
		if( this.buffer === null ) {
			this.buffer = Buffer.allocUnsafe( this.outputLength );
			
			this.insertions.sort( ( a, b ) => a.index - b.index );
			
			for( let insert of this.insertions ) {
				this._writeToBuffer( this.original.utf8Slice( this.originalIndex, insert.index ) );
				this._writeToBuffer( insert.text );
				this.originalIndex = insert.index;
			}
			
			this.insertions = [];
			
			this._writeToBuffer( this.original.utf8Slice( this.originalIndex, this.original.length ) );
		}
		
		return this.buffer;
	}
}

module.exports = Transformer;