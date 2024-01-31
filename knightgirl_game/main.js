kaboom({
    width: 420,
    height: 840,
    scale: 1
})
loadSpriteAtlas('assets/tileset.png', {
    'platform-left': { x: 82, y: 64, width: 16,
        height: 8
    },
    'platform-middle': {
        x: 112,
        y: 64,
        width: 16,
        height: 8
    },
    'platform-right': {
        x: 142,
        y: 64,
        width: 16,
        height: 8
    },
    'smaller-tree': {
        x: 0,
        y: 80,
        width: 60,
        height: 65
    },
    'bigger-tree': {
        x: 170,
        y: 10,
        width: 115,
        height: 200
    },
    'ground': {
        x: 80,
        y: 144,
        width: 16,
        height: 16
    },
    'ground-deep': {
        x: 0,
        y: 144,
        width: 16,
        height: 16
    }
})
loadSprite('background-0', 'assets/background_0.png')
loadSprite('background-1', 'assets/background_1.png')
loadSprite('background-2', 'assets/background_2.png')
loadSprite('idle-sprite', 'assets/Idle.png', {
    sliceX: 4,
    sliceY: 1,
    anims: { 'idle-anim': { from: 0, to: 3, loop: true }}
})
loadSprite('run-sprite', 'assets/Run.png', {
    sliceX: 7,
    sliceY: 1,
    anims: { 'run-anim': { from: 0, to: 6, loop: true }}
})
loadSprite('jump-sprite', 'assets/Jump.png', {
    sliceX: 4,
    sliceY: 1,
    anims: { 'jump-anim': { from: 2, to: 3, loop: true }}
})
loadSprite('fall-sprite', 'assets/Fall.png', {
    sliceX: 2,
    sliceY: 1,
    anims: { 'fall-anim' : { from: 0, to: 1, loop: true }}
})
setGravity(1600)
add([
    sprite('background-1'),
    fixed(),
    scale(1.46)
]).flipY = true
const map = addLevel([
    '5                                                     5',
    '5                                                     5',
    '5                                                     5',
    '5  02                                                 5',
    '5                        012                  012     5',
    '5      011112                                         5',
    '5               11111               012               5',
    '5 1                                                   5',
    '5             1                                       5',
    '5333333                      012           012        5',
    '5444444   1                                           5',
    '5444444                                               5',
    '5333333333333333333333333333333333333333333333333333335',
    '5444444444444444444444444444444444444444444444444444445'
], {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
        0: () => [
            sprite('platform-left'),
            area(),
            body({isStatic: true})
        ],
        1: () => [
            sprite('platform-middle'),
            area(),
            body({isStatic: true})
        ],
        2: () => [
            sprite('platform-right'),
            area(),
            body({isStatic: true})
        ],
        3: () => [
            sprite('ground'),
            area(),
            body({isStatic: true})
        ],
        4: () => [
            sprite('ground-deep'),
            area(),
            body({isStatic: true})
        ],
        5: () => [
            rect(16, 16),
            opacity(0),
            area(),
            body({isStatic: true})
        ]
    }
})
map.use(scale(4))
const player = add([
    sprite('idle-sprite'),
    scale(2),
    area({shape: new Rect(vec2(0), 32, 32), offset: vec2(0,16)}),
    anchor('center'),
    body(),
    pos(900,0),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    }
])
player.play('idle-anim')
const tree = add([
    sprite('smaller-tree'),
    scale(5),
    pos(40, 260)
])
const tree2 = add([
    sprite('smaller-tree'),
    scale(5),
    pos(540, 450)
])
const biggerTree = add([
    sprite('bigger-tree'),
    scale(5),
    pos(900,105)
])
onKeyDown('d', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
        debug.log("Right")
    }

    if (player.direction !== 'right') player.direction = 'right'

    player.move(player.speed, 0)
})
onKeyRelease('d', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})
onKeyDown('a', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
        debug.log("Left")
    }

    if (player.direction !== 'left') player.direction = 'left'

    player.move(-player.speed, 0)
})
onKeyRelease('a', () => {
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})
onKeyPress('space', () => {
    if (player.isGrounded()) {
        player.jump()
        debug.log("JUMP: her little legs go brrr")
    }
})
camScale(0.75)
onUpdate(() => {

    if (player.previousHeight) {
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y

    const cameraLeftBound = 350
    const cameraRightBound = 3170
    const cameraVerticalOffset = player.pos.y - 300

    if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRightBound < player.pos.x) {
        camPos(cameraRightBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
    }

    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
    }

    if (player.curAnim() !== 'jump-anim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }

    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }

    if (player.direction === 'left') {
        player.flipX = true
    } else {
        player.flipX = false
    }
})