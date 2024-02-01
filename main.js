kaboom({
  width: 960,
  height: 440,
  scale: 2
})
loadSound('bk', 'assets/player/sounds/track01.ogg')
loadSprite('idle-sprite', 'assets/player/idle.png', {
  sliceX: 4,
  sliceY: 1,
  anims: { 'idle-anim': { from: 0, to: 3, loop: true }}
})
loadSprite('run-sprite', 'assets/player/walk.png', {
  sliceX: 7,
  sliceY: 1,
  anims: { 'run-anim': { from: 0, to: 6, loop: true }}
})
loadSprite('jump-sprite', 'assets/player/jump.png', {
  sliceX: 6,
  sliceY: 1,
  anims: { 'jump-anim': { from: 1, to: 3, loop: true }}
})
loadSprite('fall-sprite', 'assets/player/fall.png', {
  sliceX: 3,
  sliceY: 1,
  anims: { 'fall-anim' : { from: 0, to: 2, loop: true }}
})
loadSprite('atk-sprite', 'assets/player/atk.png', {
  sliceX: 6,
  sliceY: 1,
  anims: { 'atk-anim': { from: 0, to: 5, loop: true }}
})
loadSprite('block-sprite', 'assets/player/sh-idle.png', {
  sliceX: 4,
  sliceY: 1,
  anims: { 'block-anim': { from: 0, to: 3, loop: true }}
})
loadSprite('fall-sprite', 'assets/player/fall.png', {
  sliceX: 3,
  sliceY: 1,
  anims: { 'fall-anim': { from: 0, to: 2, loop: true }}
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
  'treeS': {
      x: 0,
      y: 80,
      width: 60,
      height: 65
  },
  'treeL': {
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
setGravity(1000)
const map = addLevel([
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 5 012                                                      5 ',
  ' 5                          012            012              5 ',
  ' 5      011112                                              5 ',
  ' 5                 01112           0112                     5 ',
  ' 5                                                          5 ',
  ' 5             02                                           5 ',
  ' 5                                                          5 ',
  ' 5        02                                                5 ',
  ' 5                                                          5 ',
  ' 5                                                          5 ',
  ' 544444444444444444444444444444444444444444444444444444444445 '
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
  area({shape: new Rect(vec2(0), 26, 32), offset: vec2(38,32)}),
  body(),
  pos(360,0),
  scale(2),
  state('idle',['idle','atk','def','jump','run'], {
    'idle': ['atk','run','jump','def'],
    'attack': 'idle',
    'run': ['idle', 'jump','run']
  }),
  {
    speed: 325,
    previousHeight: null,
    heightData: 0,
    direction: 'right'
  }
])
player.onStateEnter('idle', () => {
  player.play('idle-anim')
  wait(time, () => player.enterState())
  })
const tree0 = add([
  sprite('treeS'),
  pos(540, 1248),
  scale(5.5)
])
onKeyDown('space', () => {
  if (player.curAnim() !== 'jump-anim' && !player.isGrounded()) {
    player.use(sprite('jump-sprite'))
    player.enterState('jump')
    player.play('jump-anim')
  }
})
onKeyPress('.', () => {
  if (player.curAnim() !== 'atk-anim' && player.isGrounded()) {
    player.use(sprite('atk-sprite'))
    player.enterState('atk')
    player.play('atk-anim')
  }
})
onKeyPress(',',() => {
  if (player.curAnim() !== 'block-anim' && player.isGrounded()) {
    player.use(sprite('block-sprite'))
    player.enterState('def')
    player.play('block-anim')
  }
})
onKeyDown('d', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')
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
      player.enterState('run')
      player.play('run-anim')
      }
  if (player.direction !== 'left') player.direction = 'left'
  player.move(-player.speed, 0)
})
onKeyRelease('a', () => {
  player.use(sprite('idle-sprite'))
  player.play('idle-anim')
})
onKeyPress('space', () => {
  player.use(sprite('jump-sprite'))
  player.enterState('jump')
  player.jump(625)
})
camScale(.5)
onUpdate(() => {

    if (player.previousHeight) {
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y

    const cameraLeftBound = 1100
    const cameraRightBound = 2880
    const cameraVerticalOffset = player.pos.y - 300

    if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRightBound < player.pos.x) {
        camPos(cameraRightBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
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