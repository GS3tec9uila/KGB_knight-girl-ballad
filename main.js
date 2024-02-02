kaboom({
  width: 640,
  height: 420,
  scale: 2})
loadSound('bk', 'assets/player/sounds/track01.ogg')
loadSprite('idle-sprite', 'assets/player/idle.png', {
  sliceX: 4,
  sliceY: 1,
  anims:{ 'idle-anim': { from: 0, to: 3, loop: true },'idle-anim2': { from: 0, to: 3, loop: true }}})
loadSprite('run-sprite', 'assets/player/walk.png', {
  sliceX: 7,
  sliceY: 1,
  anims:{ 'run-anim': { from: 0, to: 6, loop: true }}})
loadSprite('jump-sprite', 'assets/player/jump.png', {
  sliceX: 6,
  sliceY: 1,
  anims:{ 'jump-anim': { from: 1, to: 3, loop: true }}})
loadSprite('atk-sprite', 'assets/player/atk.png', {
  sliceX: 6,
  sliceY: 1,
  anims:{ 'atk-anim': { from: 0, to: 5, loop: true }}})
loadSprite('block-sprite', 'assets/player/sh-idle.png', {
  sliceX: 4,
  sliceY: 1,
  anims:{ 'block-anim': { from: 0, to: 3, loop: true }}})
loadSprite('fall-sprite', 'assets/player/fall.png', {
  sliceX: 3,
  sliceY: 1,
  anims:{ 'fall-anim': { from: 0, to: 2, loop: true }}})
loadSpriteAtlas('assets/newTiles.png', {
  'platform-middle':{
    x: 112,
    y: 64,
    width: 16,
    height: 8},
  'ground':{
    x: 80,
    y: 144,
    width: 16,
    height: 16},
  'ground-deep':{
    x: 0,
    y: 144,
    width: 16,
    height: 16},
  'rockL':{
    x: 48,
    y: 59,
    width: 32,
    height: 18},
  'rockS':{
    x: 65,
    y: 86,
    width: 14,
    height: 8,}})
  loadSpriteAtlas('assets/grassTiles.png', {
    'grass0':{
      x: 12,
      y: 0,
      width: 96,
      height: 16,}})
setGravity(1000)
const rock0 = add([
  sprite('rockS'),
  scale(7),
  area(),
  pos(1175,1545),
])
const map = addLevel([
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4                                                           4 ',
  ' 4 000                                                       4 ',
  ' 4                          000            000               4 ',
  ' 4      000000                                               4 ',
  ' 4                 00000           0000                      4 ',
  ' 4                                                           4 ',
  ' 4             00                                            4 ',
  ' 4                                                           4 ',
  ' 4        00                                                 4 ',
  ' 4                                                         004 ',
  ' 4                                                           4 ',
  ' 3     3     3     3     3     3     3     3     3     3     3 '],{
tileWidth: 16,
tileHeight: 16,
tiles: {
  0: () => [
    sprite('platform-middle'),
    area(),
    body({isStatic: true})],
  3: () => [
    sprite('grass0'),
    area(),
    body({isStatic: true})],
  4: () => [
    sprite('ground-deep'),
    area(),
    body({isStatic: true})],
  5: () => [
    rect(16, 16),
    opacity(0),
    area(),
    body({isStatic: true})]}})
map.use(scale(4))
const player = add([
  sprite('idle-sprite'),
  area({shape: new Rect(vec2(0), 26, 32), offset: vec2(38,32)}),
  body(),
    pos(300,1480),
    scale(2.69),
  state('idle',['idle','atk','def','jump','fall','run',], {
    'idle': ['atk','run','jump','def','idle','fall'],
    'atk': ['idle','run','def','jump','atk','fall'],
    'def': ['idle','atk','jump','def','run','fall'],
    'jump': ['idle','fall','run','jump','atk','def'],
    'fall': ['idle','run','fall','jump','def','atk'],
    'run': ['idle','jump','run','fall','atk','def']}),
    {speed: 380,
     previousHeight: null,
     heightData: 0,
     direction: 'right'}])
player.onStateEnter('idle', () => {
player.use(sprite('idle-sprite'))
player.play('idle-anim')
wait(time, () => player.enterState())})
/* onKeyDown('space', () => {
  if (player.curAnim() !== 'jump-anim' && player.isGrounded()) {
    player.use(sprite('jump-sprite'))
    player.play('jump-anim')
    player.jump(420 + (0.69 * 69) * 4.20 - 4.20)}})
    onKeyRelease('space', () => {
      if (player.isFalling) {
        player.enterState('fall')
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
      }
      if (player.isGrounded) {
        player.enterState('idle')
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
      }
    }) */
onKeyDown('.', () => {
  if (player.curAnim() !== 'atk-anim' && player.isGrounded()) {
    player.use(sprite('atk-sprite'))
    player.enterState('atk')
    player.play('atk-anim')}})
onKeyRelease('.', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')
})
onKeyDown(',',() => {
  if (player.curAnim() !== 'block-anim' && player.isGrounded()) {
    player.use(sprite('block-sprite'))
    player.enterState('def')
    player.play('block-anim')}})
onKeyDown('d', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'right') player.direction = 'right'
  player.move(player.speed, 0)})
onKeyRelease('d', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})
onKeyDown('a', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'left') player.direction = 'left'
  player.move(-player.speed, 0)})
onKeyRelease('a', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle') })

player.onStateEnter('idle', () => {
  player.use(sprite('idle-sprite'))
  player.play('idle-anim')})
player.onStateEnter('jump', () => {
  player.use(sprite('jump-sprite'))
  player.play('jump-anim')})
player.onStateEnter('fall', () => {
    player.use(sprite('fall-sprite'))
    player.play('fall-anim')})
camScale(.5)

onUpdate(() => {
  const cameraLeftBound = 711
  const cameraRightBound = 3317
  const cameraVerticalOffset = player.pos.y - 198
  if (cameraLeftBound > player.pos.x) {
    camPos(cameraLeftBound, cameraVerticalOffset)} 
    else if (cameraRightBound < player.pos.x) {
    camPos(cameraRightBound, cameraVerticalOffset)} 
    else {
    camPos(player.pos.x, cameraVerticalOffset)}
    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
      player.use(sprite('fall-sprite'))
      player.enterState('fall')
      player.play('fall-anim')
    }
  if (player.direction === 'left') {
      player.flipX = true}
      else {
      player.flipX = false}})
player.onStateUpdate('idle', () => {
  if (isKeyDown('space')) {
  player.use(sprite('jump-sprite'))
  player.enterState('jump')
  player.play('jump-anim')
  player.jump(420 * 1.5)}})
player.onStateUpdate('jump', () => {
  if (player.isFalling()) {
    player.enterState('fall')}})
player.onStateUpdate('fall', () => {
  if (player.isGrounded()) {
    player.enterState('idle')}})