let grid = document.getElementById('tile-grid');
let gridName;
let ID;
let w = document.querySelector('#w.tile');
let t = document.querySelector('#t.tile');
let f = document.querySelector('#f.tile');
let tiles = document.querySelectorAll('.tile');

window.onload = function(){
	setTileGrid();
	startTileMotion()
}
window.addEventListener('resize', setTileGrid);

function setTileGrid(){
	let W = window.innerWidth;
	let H = window.innerHeight;

	let R = W/H, fontsize;

	if(1.5 <= R){
		gridName = 'c3r2-H';
		fontsize = H / 2.1;

		plotTiles( possible[gridName][1] )

	}else if(1 <= R && R <= 1.5){
		gridName = 'c3r2';
		fontsize = Math.min(W / 3, H / 2);

		if(1.25 <= R && R <= 1.5){
			plotTiles( possible[gridName][1] )
		}else if(1 <= R && R <= 1.25){
			plotTiles( possible[gridName][4] )
		}

	}else if(0.666 <= R && R <= 1){
		gridName = 'c3r3';
		fontsize = Math.min(W / 3, H / 3);

		if(0.8 <= R && R <= 1){
			plotTiles( possible[gridName][5] )
		}else if(0.666 <= R && R <= 0.8){
			plotTiles( possible[gridName][6] )
		}

	}else if(0.333 <= R && R <= 0.666){
		gridName = 'c2r3';
		fontsize = W / 2;

		if(0.5 <= R && R <= 0.666){
			plotTiles( possible[gridName][5] )
		}else if(0.333 <= R && R <= 0.5){
			plotTiles( possible[gridName][3] )
		}


	}else if(R <= 0.333){
		gridName = 'c1r3';
		fontsize = W;
		plotTiles( possible[gridName][0] )
	}

	grid.style.fontSize = fontsize + 'px';				
	grid.className = gridName;
	// moveTiles(gridName);
}


const possible = {
	'c3r1':[
			[ [1,1], [2,1], [3,1] ]
		],
	'c3r2-H':[
			[ [1,1], [2,1], [3,1] ],
			[ [1,1], [2,1], [3,2] ],
			[ [1,1], [2,1], [2,2] ],
			[ [1,1], [2,1], [1,2] ],

			[ [1,1], [2,2], [3,1] ],
			[ [1,1], [2,2], [3,2] ],

			[ [1,1], [1,2], [2,2] ]
		],
	'c3r2':[
			[ [1,1], [2,1], [3,1] ],
			[ [1,1], [2,1], [3,2] ],
			[ [1,1], [2,1], [2,2] ],
			[ [1,1], [2,1], [1,2] ],

			[ [1,1], [2,2], [3,1] ],
			[ [1,1], [2,2], [3,2] ],

			[ [1,1], [1,2], [2,2] ]
		],
	'c3r3':[
			[ [1,1], [2,1], [3,1] ],
			[ [1,1], [2,1], [3,2] ],
			[ [1,1], [2,1], [2,2] ],
			[ [1,1], [2,1], [1,2] ],

			[ [1,1], [2,2], [3,1] ],
			[ [1,1], [2,2], [3,2] ],
			[ [1,1], [2,2], [3,3] ],
			[ [1,1], [2,2], [2,3] ],
			[ [1,1], [2,2], [1,3] ],

			[ [1,1], [1,2], [2,2] ],
			[ [1,1], [1,2], [2,3] ],
			[ [1,1], [1,2], [1,3] ]
		],
	'c2r3':[
			[ [1,1], [2,1], [2,2] ],
			[ [1,1], [2,1], [1,2] ],

			[ [1,1], [2,2], [2,3] ],
			[ [1,1], [2,2], [1,3] ],

			[ [1,1], [1,2], [2,2] ],
			[ [1,1], [1,2], [2,3] ],
			[ [1,1], [1,2], [1,3] ]
		],
	'c1r3':[
			[ [1,1], [1,2], [1,3] ]
		]
}

function moveTiles(){
	let coord = possible[gridName];
	let random = coord[ Math.floor(Math.random() * coord.length) ];
	// plotTiles(random);
	for(let i = 0; i<tiles.length; i+=1){
		let style = window.getComputedStyle(tiles[i]);
		let newRow = random[i][1];
		let newCol = random[i][0];
		let curRow = style.getPropertyValue('grid-row-start');
		let curCol = style.getPropertyValue('grid-column-start');
		moveTile( tiles[i], newRow, newCol, Number(curRow), Number(curCol) )
	}
}

function moveTile(t, t1, l1, t2, l2){
	const { top: top1, left: left1 } = t.getBoundingClientRect();
    t.style.transition = '500ms';
    t.style['grid-row-start'] = t1;
    t.style['grid-row-end'] = t1 + 1;
    t.style['grid-column-start'] = l1;
    t.style['grid-column-end'] = l1 + 1;

    const { top: top2, left: left2 } = t.getBoundingClientRect();
    t.style['grid-row-start'] = t2;
    t.style['grid-row-end'] = t2 + 1;
    t.style['grid-column-start'] = l2;
    t.style['grid-column-end'] = l2 + 1;

    setTimeout(() => {
        t.style.transition = 'auto';
        t.style['grid-row-start'] = t1;
        t.style['grid-row-end'] = t1 + 1;
        t.style['grid-column-start'] = l1;
    	t.style['grid-column-end'] = l1 + 1;
        t.style.top = 0;
        t.style.left = 0;
    }, 500);

    t.style.left = (left2 - left1) + 'px';
    t.style.top = (top2 - top1) + 'px';
}

function plotTiles(array){

	w.style.gridColumnStart = array[0][0];
	w.style.gridColumnEnd = array[0][0] + 1;
	w.style.gridRowStart = array[0][1];
	w.style.gridRowEnd = array[0][1] + 1;

	t.style.gridColumnStart = array[1][0];
	t.style.gridColumnEnd = array[1][0] + 1;
	t.style.gridRowStart = array[1][1];
	t.style.gridRowEnd = array[1][1] + 1;

	f.style.gridColumnStart = array[2][0];
	f.style.gridColumnEnd = array[2][0] + 1;
	f.style.gridRowStart = array[2][1];
	f.style.gridRowEnd = array[2][1] + 1;
}



function startTileMotion() {
  if (!ID) {
    ID = setInterval(moveTiles, 2000);
  }
}

function stopTileMotion() {
  clearInterval(ID);
  ID = null;
}

let bodySection = document.querySelector('body > section');
bodySection.addEventListener('scroll', handleMotion);

function handleMotion(){
	if (bodySection.scrollHeight - bodySection.scrollTop - bodySection.clientHeight < 1) {
        stopTileMotion()
    }else{
    	startTileMotion()
    }
}

