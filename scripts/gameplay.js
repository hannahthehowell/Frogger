
////////////////////////// DEFINING GLOBALS //////////////////////////

let myKeyboard = input.Keyboard();
let previousTime = performance.now();

let canvasB = null;
let contextB = null;
let canvasF = null;
let contextF = null;

const COORD_SIZE_X = 1120;
const COORD_SIZE_Y = 1280;

///// Terrain /////
let grid = [];
let numRows = 16;
let numColumns = 14;
let cellSize = 80;

///// Images /////
let blueCarSrc = "Images/carBlue.png";
let purpleCarSrc = "Images/carPurple.png";
let truckSrc = "Images/carTruck.png";
let whiteCarSrc = "Images/carWhite.png";
let yellowCarSrc = "Images/carYellow.png";

let logLargeSrc = "Images/logLarge.png";
let logMediumSrc = "Images/logMedium.png";
let logShortSrc = "Images/logShort.png";

let volbeatSrc = "Images/volbeat.png";

let grass = new Image();
grass.src = "Images/grass.png";

let safeZone = new Image();
safeZone.src = "Images/safezone.png";
let safeZoneMid = new Image();
safeZoneMid.src = "Images/safezoneMiddle.png";

///// Sprite Sheets /////
let buizelSrcSS = "Images/buizelSpritesheet.png";
let ekansSrcSS = "Images/ekansSpritesheet.png";
let feraligatrEndSrcSS = "Images/feraligatrSpritesheet2.png";
let feraligatrSrcSS = "Images/feraligatrSpritesheet1.png";
let tirtougaSwimSrcSS = "Images/tirtougaSpritesheet1.png";
let tirtougaSinkSrcSS = "Images/tirtougaSinkSpritesheet.png";

let buizelFrameSpeed = 2;
let ekansFrameSpeed = 4;
let feraligatrFrameSpeed = 1;
let tirtougaFrameSpeed = 5;

///// Croagunk /////
let croagunk = "";
let croagunkSrc = "Images/croagunkOutlined.png";
let croagunkSit = new Image();
croagunkSit.src = "Images/croagunkOutlined.png";
let croagunkHop = new Image();
croagunkHop.src = "Images/croagunkHopOutlined.png";

let croagunkSafe = new Image();
croagunkSafe.src = "Images/croagunkSafe.png";
let croagunkMini = new Image();
croagunkMini.src = "Images/croagunkSmall.png";

let startX = 6 * cellSize;
let startY = 14 * cellSize;

let millisecondsPerHop = 250;

///// Entity Data /////
// Speeds
let blueCarSpeed = 2;
let purpleCarSpeed = 5;
let truckSpeed = 1;
let whiteCarSpeed = 4;
let yellowCarSpeed = 3;

let logLargeSpeed = 3;
let logMediumSpeed = 2;
let logShortSpeed = 1;

let buizelSpeed = logLargeSpeed;
let ekansSpeed = 1.5;
let feraligatrSpeed = logMediumSpeed;
let tirtougaSpeed2 = 3;
let tirtougaSpeed3 = 2;

// Milliseconds per Entity Interval
let msecondsPerBlueCar = 3000;
let msecondsPerPurpleCar = 2000;
let msecondsPerWhiteCar = 3000;
let msecondsPerYellowCar = 4000;
let msecondsPerTruck = 10000;
let msecondsPerLargeLogOrBuizel = 3000;
let msecondsPerMediumLogOrFeraligatr = 4000;
let msecondsPerShortLog = 7000;
let msecondsPer3Tirtougas = 3000;
let msecondsPer2Tirtougas = 2000;
let msecondsPerEkans = 25000;
let msecondsPerLurkingFeraligatrOrVolbeat = 20000;

// Chance of different entity
let chanceOfBuizel = 0.2;
let chanceOfFeraligatr = 0.3;
let chanceOfLurkingFeraligatr = 0.5;
let chanceOfSinkingTirtougas = 0.3;

let durationOfLurkingFeraligatr = 4000;
let durationOfVolbeat = 8000;
let lurkingFeraligatrs = [];
let bonusVolbeats = [];


///// Audio /////
let gameMusicSrc = 'Audio/GameCorner.mp3';
let gameMusic = new Audio(gameMusicSrc);
gameMusic.volume = 0.3;

let menuClickSound = new Audio('Audio/click.ogg');

let hopSoundSrc = 'Audio/sound-frogger-hop.wav';

let littleTimeRemainingSound = new Audio('Audio/sound-frogger-time.wav');

let crashSound = new Audio('Audio/sound-frogger-squash.wav');
let splashSound = new Audio('Audio/sound-frogger-plunk.wav');

let gameOverSound = new Audio('Audio/gameOver.wav');

let landingSound = new Audio('Audio/453-Croagunk.wav');
let winRoundSound = new Audio('Audio/EvolutionChime.mp3');

let extraLifeSound = new Audio('Audio/sound-frogger-extra.wav');

///// Particle Systems /////
let imageCoins = new Image();
imageCoins.src = 'Images/AmuletCoin.png';
let deathSystem = "";
let safeSystem = "";

///// Scoring /////
let score = 0;
let forwardStepPoints = 10;
let landedSafelyPoints = 50;
let pointsPerHalfSecond = 10;
let volbeatPoints = 200;
let wonRoundPoints = 1000;
let pointsPerNewLife = 20000;

///// Misc. /////
let timeLeft = 30;
let livesLeft = 3;
let numTotalFrames = 0;
let wonTheRound = false;

let intervals = [];
let entities = [];
let safeSquares = [];

let timer = "";


////////////////////////// GENERATING TERRAIN //////////////////////////

function makeGrid() {
    for (let row = 0; row < numRows; row++) {
        grid.push([]);
        for (let col=0; col < numColumns; col++) {
            grid[row].push([]);
            grid[row][col] = {
                type: ""
            };
        }
    }
}

function makeGrass() {
    for (let col=0; col < numColumns; col++) {
        grid[8][col].type = "grass";
        grid[14][col].type = "grass";
    }
}

function makeRoad() {
   for (let col=0; col < numColumns; col++) {
        grid[9][col].type = "road";
        grid[10][col].type = "road";
        grid[11][col].type = "road";
        grid[12][col].type = "road";
        grid[13][col].type = "road";
    }
}

function makeWater() {
    for (let col=0; col < numColumns; col++) {
        grid[3][col].type = "water";
        grid[4][col].type = "water";
        grid[5][col].type = "water";
        grid[6][col].type = "water";
        grid[7][col].type = "water";
    }
}

function generateTerrain() {
    makeGrid();
    makeGrass();
    makeRoad();
    makeWater();
}


////////////////////////// MAKING CROAGUNK w/ MOVEMENT FUNCTIONS //////////////////////////

function makeCroagunk(spec) {
    let that = {};

    that.image = new Image();
    that.ready = false;

    that.image.onload = function() {
        that.height = cellSize;
        that.width = cellSize;

        that.hitBox = {
            center: {x: spec.center.x, y: spec.center.y},
            height: 12 * 5,  // 9*5
            width: 12 * 5,
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        };

        that.ready = true;
    };

    that.isHopping = false;
    that.image.src = spec.imageSrc;
    that.center = spec.center;
    that.isAfloat = false;
    that.isOverWater = false;

    that.moveUp = () => {
        if (!that.isHopping) {
            new Audio(hopSoundSrc).play();
            gameMusic.play();
            score += forwardStepPoints;
            that.isAfloat = false;
            that.facing = "up";
            that.center.y -= cellSize;
            that.isHopping = true;
            setTimeout(function() {
                that.isHopping = false;
            }, millisecondsPerHop);
        }
    };

    that.moveRight = () => {
        if (!that.isHopping) {
            new Audio(hopSoundSrc).play();
            gameMusic.play();
            that.isAfloat = false;
            that.facing = "right";
            that.center.x += cellSize;
            that.isHopping = true;
            setTimeout(function() {
                that.isHopping = false;
            }, millisecondsPerHop);
        }
    };

    that.moveDown = () => {
        if (!that.isHopping) {
            new Audio(hopSoundSrc).play();
            gameMusic.play();
            that.isAfloat = false;
            that.facing = "down";
            that.center.y += cellSize;
            that.isHopping = true;
            setTimeout(function() {
                that.isHopping = false;
            }, millisecondsPerHop);
        }
    };

    that.moveLeft = () => {
        if (!that.isHopping) {
            new Audio(hopSoundSrc).play();
            gameMusic.play();
            that.isAfloat = false;
            that.facing = "left";
            that.center.x -= cellSize;
            that.isHopping = true;
            setTimeout(function() {
                that.isHopping = false;
            }, millisecondsPerHop);
        }
    };

    return that;
}


////////////////////////// MAKING ENTITY //////////////////////////

function makeEntity(spec) {
    let that = spec;
    that.image = new Image();
    that.ready = false;
    that.image.onload = function() {
        that.ready = true;
    };
    that.image.src = spec.imageSrc;
    return that;
}


////////////////////////// ENTITIES SPECS //////////////////////////

///// Cars /////

function getBlueCarSpecs() {
    return {
        class: "car",
        imageSrc: blueCarSrc,
        dx: -1,
        height: cellSize,
        width: cellSize,
        speed: blueCarSpeed,
        center: {
                x: COORD_SIZE_X + cellSize/2,
                y: 11 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: 15 * 5,
            height: 10 * 5,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getPurpleCarSpecs() {
    return {
        class: "car",
        imageSrc: purpleCarSrc,
        dx: 1,
        height: cellSize,
        width: cellSize,
        speed: purpleCarSpeed,
        center: {
                x: -cellSize/2,
                y: 10 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: 16 * 5,
            height: 14 * 5,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getWhiteCarSpecs() {
    return {
        class: "car",
        imageSrc: whiteCarSrc,
        dx: 1,
        height: cellSize,
        width: cellSize,
        speed: whiteCarSpeed,
        center: {
                x: -cellSize/2,
                y: 12 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: 14 * 5,
            height: 12 * 5,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getYellowCarSpecs() {
    return {
        class: "car",
        imageSrc: yellowCarSrc,
        dx: -1,
        height: cellSize,
        width: cellSize,
        speed: yellowCarSpeed,
        center: {
                x: COORD_SIZE_X + cellSize/2,
                y: 13 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: 16 * 5,
            height: 14 * 5,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getTruckSpecs() {
    return {
        class: "car",
        imageSrc: truckSrc,
        dx: -1,
        height: cellSize,
        width: cellSize*2,
        speed: truckSpeed,
        center: {
                x: COORD_SIZE_X + cellSize,
                y: 9 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: 27 * 5,
            height: 10 * 5,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getEkansSpecs() {
    return {
        class: "snake",
        type: "animated",
        frames: 4,
        frameSpeed: ekansFrameSpeed,
        imageSrc: ekansSrcSS,
        dx: -1,
        height: cellSize,
        width: cellSize*2,
        speed: ekansSpeed,
        center: {
                x: COORD_SIZE_X +cellSize/2+cellSize,
                y: 8 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize,
            height: cellSize,
            offset: {
                x: cellSize/2,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        },
        killHitBox: {
            isDeadly: true,
            width: cellSize,
            height: cellSize,
            offset: {
                x: -cellSize/2,
                y: 0,
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

///// Water Folk /////

function getLargeLogSpecs() {
    return {
        class: "log",
        imageSrc: logLargeSrc,
        dx: 1,
        height: cellSize,
        width: cellSize*4,
        speed: logLargeSpeed,
        center: {
                x: -cellSize*2,
                y: 5 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize*4,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getMediumLogSpecs() {
    return {
        class: "log",
        imageSrc: logMediumSrc,
        dx: 1,
        height: cellSize,
        width: cellSize*3,
        speed: logMediumSpeed,
        center: {
                x: -cellSize/2-cellSize,
                y: 3 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize*3,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getShortLogSpecs() {
    return {
        class: "log",
        imageSrc: logShortSrc,
        dx: 1,
        height: cellSize,
        width: cellSize*2,
        speed: logShortSpeed,
        center: {
                x: -cellSize,
                y: 6 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize*2,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getBuizelSpecs() {
    return {
        class: "seal",
        type: "animated",
        frames: 2,
        frameSpeed: buizelFrameSpeed,
        imageSrc: buizelSrcSS,
        dx: 1,
        height: cellSize,
        width: cellSize,
        speed: buizelSpeed,
        center: {
                x: -cellSize/2,
                y: 5 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: cellSize,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getFeraligatrSpecs() {
    return {
        class: "alligator",
        type: "animated",
        frames: 2,
        frameSpeed: feraligatrFrameSpeed,
        imageSrc: feraligatrSrcSS,
        dx: 1,
        height: cellSize,
        width: cellSize*3,
        speed: feraligatrSpeed,
        center: {
                x: -cellSize/2-cellSize,
                y: 3 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize*2,
            height: cellSize,
            offset: {
                x: -cellSize/2,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        },
        killHitBox: {
            isDeadly: true,
            width: cellSize,
            height: cellSize,
            offset: {
                x: cellSize,
                y: 0,
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getFeraligatrLurkingSpecs(zone) {
    return {
        class: "lurkingAlligator",
        type: "animated",
        frames: 2,
        frameSpeed: feraligatrFrameSpeed,
        imageSrc: feraligatrEndSrcSS,
        dx: 0,
        height: cellSize,
        width: cellSize,
        speed: 0,
        center: {
                x: cellSize + 240*zone,
                y: 2 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: true,
            width: cellSize,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getTirtougaSpecs(place, number, isSinking) {
    let row = 0;
    let tirtougaSpeed = 0;
    if (number === 2) {
        row = 4;
        tirtougaSpeed = tirtougaSpeed2;
    }
    else {
        row = 7;
        tirtougaSpeed = tirtougaSpeed3;
    }

    let source = "";
    let frames = 0;
    if (isSinking) {
        source = tirtougaSinkSrcSS;
        frames = 22;
    }
    else {
        source = tirtougaSwimSrcSS;
        frames = 3;
    }

    return {
        class: "turtle",
        type: "animated",
        isSinking: isSinking,
        frames: frames,
        frameSpeed: tirtougaFrameSpeed,
        imageSrc: source,
        dx: -1,
        height: cellSize,
        width: cellSize,
        speed: tirtougaSpeed,
        center: {
                x: COORD_SIZE_X + cellSize/2 + cellSize*place,
                y: row * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}

function getVolbeatSpecs(zone) {
    return {
        class: "bonusInsect",
        imageSrc: volbeatSrc,
        dx: 0,
        height: cellSize,
        width: cellSize,
        speed: 0,
        center: {
                x: cellSize + 240*zone,
                y: 2 * cellSize + cellSize/2
        },
        hitBox: {
            isDeadly: false,
            width: cellSize,
            height: cellSize,
            offset: {
                x: 0,
                y: 0
            },
            center: {
                x: null,
                y: null
            },
            corner: {
                topLeft: {x: null, y: null},
                topRight: {x: null, y: null},
                bottomLeft: {x: null, y: null},
                bottomRight: {x: null, y: null}
            }
        }
    };
}


////////////////////////// POPULATING THE MAP //////////////////////////

///// Beginning Entities /////
function populateInitial() {
    populateCars();
    populateWaterEntities();
}

function populateCars() {
    entities.push(makeEntity(getBlueCarSpecs()));
    entities.push(makeEntity(getPurpleCarSpecs()));
    entities.push(makeEntity(getTruckSpecs()));
    entities.push(makeEntity(getWhiteCarSpecs()));
    entities.push(makeEntity(getYellowCarSpecs()));
}

function populateWaterEntities() {
    entities.push(makeEntity(getLargeLogSpecs()));
    entities.push(makeEntity(getMediumLogSpecs()));
    entities.push(makeEntity(getShortLogSpecs()));

    addTirtougas(2);
    addTirtougas(3);
}

///// Additional Entities /////
function addNewEntities() {
    addCars();
    addWaterEntities();
    addMisc();
}

function addCars() {
    addBlueCar();
    addPurpleCar();
    addWhiteCar();
    addYellowCar();
    addTruck();
}

function addWaterEntities() {
    addLargeLogOrBuizel();
    addMediumLogOrFeraligatr();
    addShortLog();
    add3Tirtougas();
    add2Tirtougas();
}

function addMisc() {
    addEkans();
    addLurkingFeraligatrOrVolbeat();
}

function addBlueCar() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getBlueCarSpecs()));
    }, msecondsPerBlueCar));
}

function addPurpleCar() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getPurpleCarSpecs()));
    }, msecondsPerPurpleCar));
}

function addWhiteCar() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getWhiteCarSpecs()));
    }, msecondsPerWhiteCar));
}

function addYellowCar() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getYellowCarSpecs()));
    }, msecondsPerYellowCar));
}

function addTruck() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getTruckSpecs()));
    }, msecondsPerTruck));
}

function addLargeLogOrBuizel() {
    intervals.push(setInterval(function() {
        if (Math.random() > chanceOfBuizel) {
            entities.push(makeEntity(getLargeLogSpecs()));
        }
        else {
            entities.push(makeEntity(getBuizelSpecs()));
        }
    }, msecondsPerLargeLogOrBuizel));
}

function addMediumLogOrFeraligatr() {
    intervals.push(setInterval(function() {
        if (Math.random() > chanceOfFeraligatr) {
            entities.push(makeEntity(getMediumLogSpecs()));
        }
        else {
            entities.push(makeEntity(getFeraligatrSpecs()));
        }
    }, msecondsPerMediumLogOrFeraligatr));
}

function addShortLog() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getShortLogSpecs()));
    }, msecondsPerShortLog));
}

function add3Tirtougas() {
    intervals.push(setInterval(function() {
        if (Math.random() > chanceOfSinkingTirtougas) {
            addTirtougas(3, false);
        }
        else {
            addTirtougas(3, true);
        }
    }, msecondsPer3Tirtougas));


}

function add2Tirtougas() {
    intervals.push(setInterval(function() {
        if (Math.random() > chanceOfSinkingTirtougas) {
            addTirtougas(2, false);
        }
        else {
            addTirtougas(2, true);
        }
    }, msecondsPer2Tirtougas));
}

function addTirtougas(number, isSinking) {
    for (let i=0; i<number; i++){
        entities.push(makeEntity(getTirtougaSpecs(i, number, isSinking)))
    }
}

function addEkans() {
    intervals.push(setInterval(function() {
        entities.push(makeEntity(getEkansSpecs()));
    }, msecondsPerEkans));
}

function addLurkingFeraligatrOrVolbeat() {
    intervals.push(setInterval(function() {
        let unoccupiedSafeZones = [];
        for (let i =0; i<safeSquares.length; i++) {
            if (!safeSquares[i].hasFrog){
                unoccupiedSafeZones.push(i);
            }
        }
        unoccupiedSafeZones = shuffle(unoccupiedSafeZones);
        let pos = unoccupiedSafeZones[0];

        if (Math.random() > chanceOfLurkingFeraligatr) {
            let gatr = makeEntity(getFeraligatrLurkingSpecs(pos));
            lurkingFeraligatrs.push(gatr);
            setTimeout(function() {
                lurkingFeraligatrs = [];
            }, durationOfLurkingFeraligatr);
        }
        else {
            let bug = makeEntity(getVolbeatSpecs(pos));
            bonusVolbeats.push(bug);
            setTimeout(function() {
                bonusVolbeats = [];
            }, durationOfVolbeat);
        }
    }, msecondsPerLurkingFeraligatrOrVolbeat));
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


////////////////////////// BEGINNING //////////////////////////

function initialize() {
    setGlobals();
    generateTerrain();
    populateInitial();

    addNewEntities();

    croagunk = makeCroagunk({
        imageSrc: croagunkSrc,
        center: {x: startX+cellSize/2, y: startY+cellSize/2},
        width: cellSize,
        height: cellSize,
    });

    deathSystem = ParticleSystem({
        image: imageCoins,
        center: {x: 0, y: 0},
        size: {mean: 10, stdev: 3},
        speed: { mean: 0, stdev: 0.2},
        lifetime: { mean: 500, stdev: 50},
        range: {start: -Math.PI, end: Math.PI},
        type: "circle",
        isCreateNewParticles: false,
        finishSequence: true,
    });

    safeSystem = ParticleSystem({
        image: imageCoins,
        center: {x: 0, y: 0},
        size: {mean: 10, stdev: 3},
        speed: { mean: 0, stdev: 0.2},
        lifetime: { mean: 500, stdev: 50},
        range: {start: -Math.PI, end: Math.PI},
        type: "square",
        isCreateNewParticles: false,
        finishSequence: true,
    });

    document.getElementById("menu-page").style.display = "none";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "block";
    document.getElementById("enterHighScore-page").style.display = "none";

    canvasB = document.getElementById('canvas-background');
    contextB = canvasB.getContext('2d');

    canvasF = document.getElementById('canvas-foreground');
    contextF = canvasF.getContext('2d');

    renderTerrain();
    getControls();
    menuClickSound.play();
    startCountdown();
    requestAnimationFrame(gameLoop);
}

function start1() {
    livesLeft = 3;
    score = 0;
    clearInterval(timer);
    numTotalFrames = 0;
    intervals.push(setInterval(function() {
                    numTotalFrames++;
                    }, 500));
    initialize();
}

function setGlobals() {
    previousTime = performance.now();
    timeLeft = 30;
    pointsPerNewLife = 20000;
    grid = [];
    entities = [];
    lurkingFeraligatrs = [];
    bonusVolbeats = [];
    safeSquares = [];
    wonTheRound = false;
}

function startCountdown() {
    timer = setInterval(function() {
        timeLeft --;
    }, 1000);
    intervals.push(timer);
}


////////////////////////// ENDING //////////////////////////

function finish() {
    contextB.clearRect(0, 0, canvasB.width, canvasB.height);
    contextF.clearRect(0, 0, canvasF.width, canvasF.height);

    let runReport = document.getElementById("runReport");
    runReport.innerHTML = "";
    runReport.innerHTML += ('<div id="finalScore" class="header">' + 'Score:' + score + '</div>');

    document.getElementById("menu-page").style.display = "none";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "block";
}

function addHighScore() {
    document.getElementById("menu-page").style.display = "block";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";

    let name = document.getElementById('initials').value;

    MyGame.persistence.add(name, score);
    MyGame.persistence.report();
}

let MyGame = {
    persistence : (function () {
        'use strict';
        let highScores = {};
        let previousScores = localStorage.getItem('MyGame.highScores');

        if (previousScores !== null) {
            highScores = JSON.parse(previousScores);
        }

        function add(key, value) {
            highScores[key] = value;
            localStorage['MyGame.highScores'] = JSON.stringify(highScores);
        }

        function report() {
            let htmlNode = document.getElementById('highScoreReport');

            htmlNode.innerHTML = '';

            highScores = sortHighScores(highScores);

            for (let key in highScores) {
                htmlNode.innerHTML += ('<div class="score">' + highScores[key] + '....................' + key + '</div>');
            }

            htmlNode.scrollTop = htmlNode.scrollHeight;
        }

        return {
            add : add,
            report : report
        };
    }())
};

function sortHighScores(highScores) {
    let sortedHighScores = {};

    let items = Object.keys(highScores).map(function(key) {
        return [key, highScores[key]];
    });

    items.sort(function (first, second) {
        return second[1] - first[1];
    });

    let i = 0;
    for (let key in highScores) {
        sortedHighScores[items[i][0]] = items[i][1];
        i++;
    }

    return sortedHighScores;
}


////////////////////////// PARTICLE SYSTEMS //////////////////////////

function deathSequence(frogCenterAtDeath) {
    deathSystem.center.x = frogCenterAtDeath.x;
    deathSystem.center.y = frogCenterAtDeath.y;
    deathSystem.isCreateNewParticles = true;
    deathSystem.finishSequence = false;
    setTimeout(function() {
        deathSystem.isCreateNewParticles = false;
        setTimeout(function() {
            deathSystem.finishSequence = true;
        }, 1500);
    },200);
}

function safeSequence(zone) {
    safeSystem.center.x = zone.x + 40 + cellSize/2;
    safeSystem.center.y = zone.y + 40 + cellSize/2;
    safeSystem.isCreateNewParticles = true;
    safeSystem.finishSequence = false;
    setTimeout(function() {
        safeSystem.isCreateNewParticles = false;
        setTimeout(function() {
            safeSystem.finishSequence = true;
        }, 1500);
    },200);
}


////////////////////////// GAME LOOP //////////////////////////

///// Update /////

function update(elapsedTime) {
    for (let key in myKeyboard.keys) {
        if (myKeyboard.keys.hasOwnProperty(key)) {
            if (myKeyboard.handlers[key]) {
                myKeyboard.handlers[key](elapsedTime);
            }
        }
    }
    updateFrog();
    updateEntities();
    updateToggles();
    updateLives();
    if (!deathSystem.finishSequence) {
        deathSystem.update(elapsedTime);
    }
    if (!safeSystem.finishSequence) {
        safeSystem.update(elapsedTime);
    }
}

function updateFrog() {
    if (croagunk.ready) {
        if (croagunk.isHopping) {
            croagunk.image = croagunkHop;
        }
        else {
            croagunk.image = croagunkSit;
        }

        // Keep frog from leaving the board
        if (croagunk.isOverWater) {
            if (croagunk.center.x > COORD_SIZE_X) {
                croagunk.center.x = COORD_SIZE_X;
            }
            else if (croagunk.center.x < 0) {
                croagunk.center.x = 0;
            }
        }
        else {
            if (croagunk.center.x > COORD_SIZE_X-cellSize/2) {
                croagunk.center.x = COORD_SIZE_X-cellSize/2;
            }
            else if (croagunk.center.x < cellSize/2) {
                croagunk.center.x = cellSize/2;
            }
        }


        if (croagunk.center.y > startY + cellSize/2) {
            croagunk.center.y = startY + cellSize/2;
        }
        else if (croagunk.center.y < 2*cellSize + cellSize/2) {
            croagunk.center.y = 2*cellSize + cellSize/2;
        }

        // update hit box info
        croagunk.hitBox.center.x = croagunk.center.x;
        croagunk.hitBox.center.y = croagunk.center.y;
        updateHitBoxCorners(croagunk.hitBox);

        // determine if frog is over water
        if (croagunk.center.y >= 3*cellSize + cellSize/2 && croagunk.center.y <= 7*cellSize + cellSize/2) {
            croagunk.isOverWater = true;
        }
        else {
            croagunk.isOverWater = false;
        }
    }
}

function updateEntities() {
    let numTurtlesOn = 0;
    //let keep = [];
    for (let i=0; i<entities.length; i++) {
        let entity = entities[i];
        if (entity.ready) {
            // Update entity position
            entity.center.x += entity.dx * entity.speed;

            // Update entity hit box info
            entity.hitBox.center.x = entity.center.x + entity.hitBox.offset.x;
            entity.hitBox.center.y = entity.center.y + entity.hitBox.offset.y;
            updateHitBoxCorners(entity.hitBox);

            // If alligator or snake, update kill hit box info
            if (entity.class === "alligator" || entity.class === "snake") {
                entity.killHitBox.center.x = entity.center.x + entity.killHitBox.offset.x;
                entity.killHitBox.center.y = entity.center.y + entity.killHitBox.offset.y;
                updateHitBoxCorners(entity.killHitBox);
            }

            // if is on log etc, move frog
            if (entity.class === "log" || entity.class === "turtle" || entity.class === "alligator") {
                // if frog intersects w/ hit box, move with it.
                if (hitBoxesIntersect(croagunk.hitBox, entity.hitBox)) {
                    croagunk.center.x += entity.dx * entity.speed;
                    croagunk.isAfloat = true;
                    if (entity.class === "turtle") {
                        numTurtlesOn ++;
                        if (numTurtlesOn >= 2){
                            croagunk.center.x -= entity.dx * entity.speed;
                        }
                    }
                }
            }

            // if (entity.center.x > -(cellSize*5) && entity.center.x < (COORD_SIZE_X+cellSize*5)) {
            //     keep.push(entity);
            // }
        }
    }
    //entities = keep;
}

function updateToggles() {
    for (let i=0; i<bonusVolbeats.length; i++) {
        let entity = bonusVolbeats[i];
        if (entity.ready) {
            // Update volbeat position
            entity.center.x += entity.dx * entity.speed;

            // Update volbeat hit box info
            entity.hitBox.center.x = entity.center.x + entity.hitBox.offset.x;
            entity.hitBox.center.y = entity.center.y + entity.hitBox.offset.y;
            updateHitBoxCorners(entity.hitBox);

            if (hitBoxesIntersect(croagunk.hitBox, entity.hitBox)) {
                bonusVolbeats = [];
                score += volbeatPoints;
            }
        }
    }
    for (let i=0; i<lurkingFeraligatrs.length; i++) {
        let entity = lurkingFeraligatrs[i];
        if (entity.ready) {
            // Update lurking gatr position
            entity.center.x += entity.dx * entity.speed;

            // Update lurking gatr hit box info
            entity.hitBox.center.x = entity.center.x + entity.hitBox.offset.x;
            entity.hitBox.center.y = entity.center.y + entity.hitBox.offset.y;
            updateHitBoxCorners(entity.hitBox);
        }
    }
}

function updateHitBoxCorners(hitBox) {
    hitBox.corner.topLeft.x = hitBox.center.x - hitBox.width/2;
    hitBox.corner.topLeft.y = hitBox.center.y - hitBox.height/2;
    hitBox.corner.topRight.x = hitBox.center.x + hitBox.width/2;
    hitBox.corner.topRight.y = hitBox.center.y - hitBox.height/2;
    hitBox.corner.bottomLeft.x = hitBox.center.x - hitBox.width/2;
    hitBox.corner.bottomLeft.y = hitBox.center.y + hitBox.height/2;
    hitBox.corner.bottomRight.x = hitBox.center.x + hitBox.width/2;
    hitBox.corner.bottomRight.y = hitBox.center.y + hitBox.height/2;
}

function hitBoxesIntersect(frogHitBox, entityHitBox) {
    return !(entityHitBox.corner.topLeft.x > frogHitBox.corner.topRight.x ||
        entityHitBox.corner.topRight.x < frogHitBox.corner.topLeft.x ||
        entityHitBox.corner.topRight.y > frogHitBox.corner.bottomRight.y ||
        entityHitBox.corner.bottomRight.y < frogHitBox.corner.topRight.y);
}

function updateLives() {
    if (score >= pointsPerNewLife) {
        extraLifeSound.play();
        livesLeft ++;
        pointsPerNewLife += pointsPerNewLife;
    }
}


///// Render /////

function renderTerrain() {
    contextB.fillStyle = 'rgb(0, 0, 0)';
    contextB.fillRect(0, 0, COORD_SIZE_X, 120);
    contextB.fillRect(0, 1200, COORD_SIZE_X, 80);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
            if (grid[row][col].type === "grass"){
                contextB.drawImage(grass, col*cellSize, row*cellSize)
            }
            else if (grid[row][col].type === "road"){
                contextB.fillStyle = 'rgb(0, 0, 0)';
                contextB.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
            else if (grid[row][col].type === "water"){
                contextB.fillStyle = 'rgb(0, 0, 66)';
                contextB.fillRect(col*cellSize, row*cellSize, cellSize, cellSize);
            }
        }
    }

    let x = 0;
    let y = 120;
    contextB.fillStyle = 'rgb(0, 0, 66)';
    contextB.fillRect(0, 120, COORD_SIZE_X, 120);
    for (let i = 0; i < 13; i++){
        if (i % 3 === 0){
            contextB.drawImage(safeZone, x, y);
            safeSquares.push({
                x: x,
                y: y,
                width: 160,
                height: 120,
                hasFrog: false
            });
            x += 160;
        }
        else {
            contextB.drawImage(safeZoneMid, x, y);
            x += 40;
        }
    }

}

function renderSafeCroagunks() {
    for (let i=0; i<safeSquares.length; i++) {
        if (safeSquares[i].hasFrog) {
            contextF.drawImage(
            croagunkSafe,
            safeSquares[i].x + 40, safeSquares[i].y + 40,
            cellSize, cellSize);
        }
    }
}

function renderLivesLeft() {
    let x = 5;
    let y = 15 * cellSize + 5;
    for (let i=0; i<livesLeft; i++) {
        contextF.drawImage(croagunkMini, x, y, 35, 35);
        x += 45;
    }
}

function renderEntity(entity) {
    if (entity.ready) {
        if (entity.type === "animated") {
            let frameNumber = numTotalFrames % (entity.frames * 1.0);  // TODO make frame speed variable
            if (entity.class === "turtle" && entity.isSinking) {
                entity.hitBox.isDeadly = frameNumber === 13 || frameNumber === 14;
            }
            contextF.drawImage(
                entity.image,
                frameNumber*entity.width, 0,
                entity.width, entity.height,
                entity.center.x - entity.width / 2, entity.center.y - entity.height / 2,
                entity.width, entity.height);
        }
        else {
            contextF.drawImage(
            entity.image,
            entity.center.x - entity.width / 2,
            entity.center.y - entity.height / 2,
            entity.width, entity.height);
        }

        // Draw Hit box
        // contextF.beginPath();
        // contextF.rect(entity.hitBox.center.x-entity.hitBox.width/2,
        //     entity.hitBox.center.y-entity.hitBox.height/2,
        //     entity.hitBox.width, entity.hitBox.height);
        // contextF.lineWidth = 1;
        // if (entity.hitBox.isDeadly) {
        //     contextF.strokeStyle = 'red';
        // }
        // else {
        //     contextF.strokeStyle = 'white';
        // }
        //
        // contextF.stroke();
        //
        // // Draw Kill Hit box for alligators and snakes
        // if (entity.class === "alligator" || entity.class === "snake") {
        //     contextF.beginPath();
        //     contextF.rect(entity.killHitBox.center.x-entity.killHitBox.width/2,
        //         entity.killHitBox.center.y-entity.killHitBox.height/2,
        //         entity.killHitBox.width, entity.killHitBox.height);
        //     contextF.lineWidth = 1;
        //     contextF.strokeStyle = 'red';
        //     contextF.stroke();
        // }
    }
}

function renderCroagunk(entity) {
    if (entity.ready) {
        let rotation = 0;
        if (entity.facing === "up") {
            rotation = 0;
        }
        else if (entity.facing === "right") {
            rotation = Math.PI/2;
        }
        else if (entity.facing === "down") {
            rotation = Math.PI;
        }
        else if (entity.facing === "left") {
            rotation = 3*Math.PI/2;
        }

        contextF.save();
        contextF.translate(entity.center.x, entity.center.y);
        contextF.rotate(rotation);
        contextF.translate(-entity.center.x, -entity.center.y);

        contextF.drawImage(
            entity.image,
            entity.center.x - entity.width / 2,
            entity.center.y - entity.height / 2,
            entity.width, entity.height);

        // Draw Hit box
        // contextF.beginPath();
        // contextF.rect(entity.hitBox.center.x-entity.hitBox.width/2,
        //     entity.hitBox.center.y-entity.hitBox.height/2,
        //     entity.hitBox.width, entity.hitBox.height);
        // contextF.lineWidth = 1;
        // contextF.strokeStyle = 'white';
        // contextF.stroke();

        contextF.restore();
    }
}

function renderStats() {
    contextF.font = "50px FreeMano, monospace";
    contextF.fillStyle = "white";

    let timeText = "Time: ".concat(timeLeft.toString());
    contextF.fillText(timeText, COORD_SIZE_X - 250, 16 * cellSize - cellSize/3);

    contextF.fillStyle = "red";

    let scoreText = "Score: ".concat(score.toString());
    contextF.fillText(scoreText, 0, 2*cellSize/3);

    if (timeLeft === 10) {
        littleTimeRemainingSound.play();
    }
}

function render() {
    contextF.clearRect(0, 0, canvasF.width, canvasF.height);

    renderSafeCroagunks();
    renderLivesLeft();
    for (let i=0; i<entities.length; i++) {
        renderEntity(entities[i]);
    }
    for (let i=0; i<lurkingFeraligatrs.length; i++) {
        renderEntity(lurkingFeraligatrs[i]);
    }
    for (let i=0; i<bonusVolbeats.length; i++) {
        renderEntity(bonusVolbeats[i]);
    }
    renderCroagunk(croagunk);
    renderStats();

    if (!deathSystem.finishSequence) {
        deathSystem.render();
    }
    if (!safeSystem.finishSequence) {
        safeSystem.render();
    }
}

///// Game Loop /////

function gameLoop(time) {
    let elapsedTime = time - previousTime;
    previousTime = time;
    update(elapsedTime);
    render();

    if (livesLeft >= 0) {
        requestAnimationFrame(gameLoop);
        if (!isCrash()) {
            if (landedSafely()) {
                landingSound.play();
                score += landedSafelyPoints;
                score += timeLeft * 2 * pointsPerHalfSecond;
                timeLeft = 30;
                croagunk.center.x = startX + cellSize/2;
                croagunk.center.y = startY + cellSize/2;
                if (hasWonRound()) {
                    score += wonRoundPoints;
                    winRoundSound.play();
                    // reset end frog spots
                    for (let i=0; i<safeSquares.length; i++) {
                        safeSquares[i].hasFrog = false;
                    }
                }
            }
        }
        else {
            let frogX = croagunk.center.x;
            let frogY = croagunk.center.y;
            let frogCenterAtDeath = {
                x: frogX,
                y: frogY
            };
            deathSequence(frogCenterAtDeath);
            croagunk.center.x = startX + cellSize/2;
            croagunk.center.y = startY + cellSize/2;
            livesLeft --;
            timeLeft = 30;
        }
    }
    else {
        contextF.font = "100px Arial";
        contextF.fillStyle = "black";
        contextF.strokeStyle = "white";
        contextF.fillText("GAME OVER", COORD_SIZE_X/2 - 150, 100);
        contextF.strokeText("GAME OVER", COORD_SIZE_X/2 - 150, 100);
        contextF.fill();
        contextF.stroke();

        for (let i=0; i<intervals.length; i++) {
            clearInterval(intervals[i]);
        }
        gameMusic.pause();
        gameOverSound.play();

        setTimeout(function() {
            contextF.clearRect(0, 0, canvasF.width, canvasF.height);
            finish();
        }, 3000);
    }
}

function isCrash() {
    if (croagunk.ready) {
        for (let i=0; i<entities.length; i++) {
            let entity = entities[i];
            if (entity.ready) {
                if (hitBoxesIntersect(croagunk.hitBox, entity.hitBox)) {
                    if (entity.hitBox.isDeadly) {
                        crashSound.play();
                        return true;
                    }
                }
                if (entity.class === "alligator" || entity.class === "snake") {
                    if (hitBoxesIntersect(croagunk.hitBox, entity.killHitBox)) {
                        if (entity.killHitBox.isDeadly) {
                            crashSound.play();
                            return true;
                        }
                    }
                }
            }
        }
        for (let i=0; i<lurkingFeraligatrs.length; i++) {
            let entity = lurkingFeraligatrs[i];
            if (entity.ready) {
                if (hitBoxesIntersect(croagunk.hitBox, entity.hitBox)) {
                    crashSound.play();
                    return true;
                }
            }
        }
        if (croagunk.isOverWater && !croagunk.isAfloat) {
            splashSound.play();
            return true;
        }
        if (isInHedge()) {
            crashSound.play();
            return true;
        }
        if (timeLeft <= 0) {
            crashSound.play();
            return true;
        }
        if ((croagunk.center.x <= 0 || croagunk.center.x >= COORD_SIZE_X) && croagunk.isOverWater) {
            splashSound.play();
            return true;
        }
        return false;
    }
}

function landedSafely() {
    for (let i=0; i<safeSquares.length; i++) {
        if (intersectWithSafeZone(croagunk, safeSquares[i]) && !safeSquares[i].hasFrog) {
            safeSquares[i].hasFrog = true;
            safeSequence(safeSquares[i]);
            return true;
        }
    }
    return false;
}

function intersectWithSafeZone(frog, zone) {
    if (frog.ready){
        return !(zone.x > frog.hitBox.corner.topRight.x ||
        zone.x + zone.width < frog.hitBox.corner.topLeft.x ||
        zone.y > frog.hitBox.corner.bottomRight.y ||
        zone.y + zone.height < frog.hitBox.corner.topRight.y);
    }
}

function hasWonRound() {
    for (let i=0; i<safeSquares.length; i++) {
        if (!safeSquares[i].hasFrog) {
            return false;
        }
    }
    return true;
}

function isInHedge() {
    if (croagunk.center.y <= 2*cellSize + cellSize/2) {
        for (let i=0; i<safeSquares.length; i++) {
            if (intersectWithSafeZone(croagunk, safeSquares[i]) && !safeSquares[i].hasFrog){
                return false;
            }
        }
        return true;
    }
}


////////////////////////// CUSTOMIZING CONTROLS //////////////////////////

function getControls() {
    myKeyboard.registerCommand(MyGame1.persistence.getUp(), croagunk.moveUp);
    myKeyboard.registerCommand(MyGame1.persistence.getRight(), croagunk.moveRight);
    myKeyboard.registerCommand(MyGame1.persistence.getDown(), croagunk.moveDown);
    myKeyboard.registerCommand(MyGame1.persistence.getLeft(), croagunk.moveLeft);
}

function changeUp() {
    document.getElementById("newUpControl").value = "";
    document.getElementById("upDisplay").style.display = "none";
    document.getElementById("newUpControl").style.display = "inline-block";
    document.getElementById("enterNewUpControl").style.display = "inline-block";
}
function setUp() {
    let keyBind = document.getElementById("newUpControl").value;
    if (keyBind === "ArrowLeft" || keyBind === "ArrowRight" || keyBind === "ArrowUp" || keyBind === "ArrowDown") {
        MyGame1.persistence.add('up', keyBind);
    }
    else {
        MyGame1.persistence.add('up', keyBind.charAt(0));
    }

    MyGame1.persistence.report();
    document.getElementById("upDisplay").style.display = "inline-block";
    document.getElementById("newUpControl").style.display = "none";
    document.getElementById("enterNewUpControl").style.display = "none";
}

function changeRight() {
    document.getElementById("newRightControl").value = "";
    document.getElementById("rightDisplay").style.display = "none";
    document.getElementById("newRightControl").style.display = "inline-block";
    document.getElementById("enterNewRightControl").style.display = "inline-block";
}
function setRight() {
    let keyBind = document.getElementById("newRightControl").value;
    if (keyBind === "ArrowLeft" || keyBind === "ArrowRight" || keyBind === "ArrowUp" || keyBind === "ArrowDown") {
        MyGame1.persistence.add('right', keyBind);
    }
    else {
        MyGame1.persistence.add('right', keyBind.charAt(0));
    }
    MyGame1.persistence.report();
    document.getElementById("rightDisplay").style.display = "inline-block";
    document.getElementById("newRightControl").style.display = "none";
    document.getElementById("enterNewRightControl").style.display = "none";
}

function changeDown() {
    document.getElementById("newDownControl").value = "";
    document.getElementById("downDisplay").style.display = "none";
    document.getElementById("newDownControl").style.display = "inline-block";
    document.getElementById("enterNewDownControl").style.display = "inline-block";
}

function setDown() {
    let keyBind = document.getElementById("newDownControl").value;
    if (keyBind === "ArrowLeft" || keyBind === "ArrowRight" || keyBind === "ArrowUp" || keyBind === "ArrowDown") {
        MyGame1.persistence.add('down', keyBind);
    }
    else {
        MyGame1.persistence.add('down', keyBind.charAt(0));
    }
    MyGame1.persistence.report();
    document.getElementById("downDisplay").style.display = "inline-block";
    document.getElementById("newDownControl").style.display = "none";
    document.getElementById("enterNewDownControl").style.display = "none";
}

function changeLeft() {
    document.getElementById("newLeftControl").value = "";
    document.getElementById("leftDisplay").style.display = "none";
    document.getElementById("newLeftControl").style.display = "inline-block";
    document.getElementById("enterNewLeftControl").style.display = "inline-block";
}
function setLeft() {
    let keyBind = document.getElementById("newLeftControl").value;
    if (keyBind === "ArrowLeft" || keyBind === "ArrowRight" || keyBind === "ArrowUp" || keyBind === "ArrowDown") {
        MyGame1.persistence.add('left', keyBind);
    }
    else {
        MyGame1.persistence.add('left', keyBind.charAt(0));
    }
    MyGame1.persistence.report();
    document.getElementById("leftDisplay").style.display = "inline-block";
    document.getElementById("newLeftControl").style.display = "none";
    document.getElementById("enterNewLeftControl").style.display = "none";
}

let MyGame1 = {
    persistence : (function () {
        'use strict';
        let userControls = {};
        let previousControls = localStorage.getItem('MyGame1.userControls');

        if (previousControls !== null) {
            userControls = JSON.parse(previousControls);
        }
        else {
            userControls['up'] = 'ArrowUp';
            userControls['right'] = 'ArrowRight';
            userControls['down'] = 'ArrowDown';
            userControls['left'] = 'ArrowLeft';
        }

        function add(key, value) {
            userControls[key] = value;
            localStorage['MyGame1.userControls'] = JSON.stringify(userControls);
        }

        function getUp() {
            return userControls['up'];
        }
        function getRight() {
            return userControls['right'];
        }
        function getDown() {
            return userControls['down'];
        }
        function getLeft() {
            return userControls['left'];
        }


        function report() {
            let htmlNodeUp = document.getElementById('upDisplay');
            htmlNodeUp.innerHTML = userControls['up'];

            let htmlNodeRight = document.getElementById('rightDisplay');
            htmlNodeRight.innerHTML = userControls['right'];

            let htmlNodeDown = document.getElementById('downDisplay');
            htmlNodeDown.innerHTML = userControls['down'];

            let htmlNodeLeft = document.getElementById('leftDisplay');
            htmlNodeLeft.innerHTML = userControls['left'];
        }

        return {
            add : add,
            getUp : getUp,
            getRight : getRight,
            getDown: getDown,
            getLeft: getLeft,
            report : report
        };
    }())
};

function viewControls() {
    menuClickSound.play();
    MyGame1.persistence.report();
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";
    document.getElementById("controls-page").style.display = "block";
}


////////////////////////// MENU FUNCTIONS //////////////////////////

function viewHighScores() {
    menuClickSound.play();
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("highScore-page").style.display = "block";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";

    MyGame.persistence.report();
}

function viewCredits() {
    menuClickSound.play();
    document.getElementById("menu-page").style.display = "none";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("credits-page").style.display = "block";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";
}

function goBackToMenu() {
    menuClickSound.play();
    document.getElementById("menu-page").style.display = "block";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";
    document.getElementById("controls-page").style.display = "none";
}

function goBackToMenu1() {
    contextB.clearRect(0, 0, canvasB.width, canvasB.height);
    contextF.clearRect(0, 0, canvasF.width, canvasF.height);
    for (let i=0; i<intervals.length; i++) {
        clearInterval(intervals[i]);
    }
    menuClickSound.play();
    document.getElementById("menu-page").style.display = "block";
    document.getElementById("highScore-page").style.display = "none";
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("frogger-page").style.display = "none";
    document.getElementById("enterHighScore-page").style.display = "none";
}

function playGameMusic() {
    gameMusic.play();
}

