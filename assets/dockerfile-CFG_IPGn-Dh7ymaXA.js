import{k as o}from"./simple-mode-HGTvdazT-DiPDOxje.js";var e="from",l=new RegExp("^(\\s*)\\b("+e+")\\b","i"),n=["run","cmd","entrypoint","shell"],s=new RegExp("^(\\s*)("+n.join("|")+")(\\s+\\[)","i"),t="expose",x=new RegExp("^(\\s*)("+t+")(\\s+)","i"),g=["arg","from","maintainer","label","env","add","copy","volume","user","workdir","onbuild","stopsignal","healthcheck","shell"],k=[e,t].concat(n).concat(g),r="("+k.join("|")+")",a=new RegExp("^(\\s*)"+r+"(\\s*)(#.*)?$","i"),u=new RegExp("^(\\s*)"+r+"(\\s+)","i");const m=o({start:[{regex:/^\s*#.*$/,sol:!0,token:"comment"},{regex:l,token:[null,"keyword"],sol:!0,next:"from"},{regex:a,token:[null,"keyword",null,"error"],sol:!0},{regex:s,token:[null,"keyword",null],sol:!0,next:"array"},{regex:x,token:[null,"keyword",null],sol:!0,next:"expose"},{regex:u,token:[null,"keyword",null],sol:!0,next:"arguments"},{regex:/./,token:null}],from:[{regex:/\s*$/,token:null,next:"start"},{regex:/(\s*)(#.*)$/,token:[null,"error"],next:"start"},{regex:/(\s*\S+\s+)(as)/i,token:[null,"keyword"],next:"start"},{token:null,next:"start"}],single:[{regex:/(?:[^\\']|\\.)/,token:"string"},{regex:/'/,token:"string",pop:!0}],double:[{regex:/(?:[^\\"]|\\.)/,token:"string"},{regex:/"/,token:"string",pop:!0}],array:[{regex:/\]/,token:null,next:"start"},{regex:/"(?:[^\\"]|\\.)*"?/,token:"string"}],expose:[{regex:/\d+$/,token:"number",next:"start"},{regex:/[^\d]+$/,token:null,next:"start"},{regex:/\d+/,token:"number"},{regex:/[^\d]+/,token:null},{token:null,next:"start"}],arguments:[{regex:/^\s*#.*$/,sol:!0,token:"comment"},{regex:/"(?:[^\\"]|\\.)*"?$/,token:"string",next:"start"},{regex:/"/,token:"string",push:"double"},{regex:/'(?:[^\\']|\\.)*'?$/,token:"string",next:"start"},{regex:/'/,token:"string",push:"single"},{regex:/[^#"']+[\\`]$/,token:null},{regex:/[^#"']+$/,token:null,next:"start"},{regex:/[^#"']+/,token:null},{token:null,next:"start"}],languageData:{commentTokens:{line:"#"}}});export{m as dockerFile};
