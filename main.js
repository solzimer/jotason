function serialize(o) {
	var map = {};
	buildDictionary({$root:o},map);
	walkdown({$root:o},map,{});
	console.log(o);
	console.log(JSON.stringify(o,null,2));
}

function buildDictionary(root,map) {
	for(var i in root) {
		var o = root[i];
		if(typeof(o)=="string") continue;
		else if(typeof(o)=="number") continue;
		else if(typeof(o)=="boolean") continue;
		else if(o.$$uid) continue;
		else {
			do {
				var uid = "#"+Math.random();
			}while(map[uid]);
			o.$$uid = uid;
			map[uid] = o;
			buildDictionary(o,map);
		}
	}
}

function walkdown(root,map,vis) {
	for(var i in root) {
		var o = root[i];
		if(i=="$$uid") continue;
		if(typeof(o)=="string") continue;
		else if(typeof(o)=="number") continue;
		else if(typeof(o)=="boolean") continue;
		else if(o.$$uid) {
			if(vis[o.$$uid]) {
				root[i] = "!href://"+o.$$uid;
			}
			else {
				vis[o.$$uid] = true;
				walkdown(o,map,vis);
			}
		}
	}
}

var a = {key:"paco",label:"antonio"};
var b = {
	user : "solzimer",
	email : "solzimer@gmail.com",
	elements : [a],
	others : [a]
}
b.elements.push(b);
b.others.push(b);
b.elemscopy = b.elements;

serialize(b);
