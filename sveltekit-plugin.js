import babel from '@babel/core';
import buildPlugin from 'babel-plugin-precompile-intl';
import path from 'path';

const intlPrecompiler = buildPlugin('svelte-intl-precompile');

function transformCode(code) {
	return babel.transform(code, { plugins: [intlPrecompiler] }).code;
}

function svelteIntlPrecompile(localesRoot) {  
	return {
	  	name: 'svelte-intl-precompile', // required, will show up in warnings and errors
		transform(code, id) {	
			if (id.includes(path.resolve(localesRoot))) {
				return transformCode(code);
			}
		}
	}
}

svelteIntlPrecompile.transformCode = transformCode;

export default svelteIntlPrecompile;
