kaboom({
  width: 640,
  height: 420,
  scale: 1.75,
  background: [255, 255, 0,]})
  // insert assets
loadSprite('1dummy', 'assets/dummies/xtrain.png')
loadSprite('1dummy-right', 'assets/dummies/xRtrain.png')
loadSprite('1dummy-iced', 'assets/dummies/xItrain.png')
loadSprite('idle-sprite', 'assets/player/idle.png', {
  sliceX: 4,
  sliceY: 1,
  anims:{ 'idle-anim': { from: 0, to: 3, loop: true }}})
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
loadSprite('crouch-sprite', 'assets/player/c-idle.png', {
  sliceX: 3,
  sliceY: 1,
  anims:{ 'crouch-anim': { from: 0, to: 2, loop: true }}})
loadSpriteAtlas('assets/tiles/newTiles.png', {
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
  loadSpriteAtlas('assets/tiles/groundTile.png', {
    'grass0':{
      x: 12,
      y: 0,
      width: 96,
      height: 16,}})
setGravity(1000)
// Insert interactive sprites here:
const dummy0 = add([
  sprite('1dummy-iced'),
  scale(6),
  area(),
  body(),
  pos(310,1050),
  'enemy'])
  const dummy1 = add([
    sprite('1dummy-right'),
    scale(6),
    area(),
    body({isStatic: true}),
    pos(3500,450),
    'enemy'])
    const dummy2 = add([
      sprite('1dummy'),
      scale(6),
      area(),
      body({isStatic: true}),
      pos(2120,1410),
      'enemy'])
// tile mapping logic
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
  ' 000000000000000000000000000000000000000000000000000         4 ',
  ' 4                               4                        0000 ',
  ' 4                               4                           4 ',
  ' 4                               4                    0      4 ',
  ' 4                               4                           4 ',
  ' 4                               4                        0000 ',
  ' 4                               4                           4 ',
  ' 4                               4                    0      4 ',
  ' 4                               4                           4 ',
  ' 4                               4                        0000 ',
  ' 4                               4                           4 ',
  ' 4                               4                    0      4 ',
  ' 4                                                           4 ',
  ' 4         000                          000000            0000 ',
  ' 4                  000                                      4 ',
  ' 000000                     00000000               00000000000 '],{
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
    body({isStatic: true})],}})
map.use(scale(4))
// player logic
const player = add([
  sprite('idle-sprite'),
  area({shape: new Rect(vec2(0), 26, 32), offset: vec2(38,32)}),
  body(),
    pos(25,1050),
    scale(2.69),
  state('idle',['idle','atk','def','jump','fall','run','crouch'], {
    'idle': ['atk','run','jump','def','idle','fall','crouch'],
    'atk': ['idle','run','def','jump','atk','fall','crouch'],
    'def': ['idle','atk','jump','def','run','fall','crouch'],
    'jump': ['idle','fall','run','jump','atk','def','crouch'],
    'fall': ['idle','run','fall','jump','def','atk','crouch'],
    'run': ['idle','jump','run','fall','atk','def','crouch'],
    'crouch':['idle','jump','crouch','run','atk','def']}),
    {speed: 380,
     previousHeight: null,
     heightData: 0,
     direction: 'right'}])
// enemy logic
// game logic
player.onStateEnter('idle', () => {
player.use(sprite('idle-sprite'))
player.play('idle-anim')
wait(time, () => player.enterState())})

onKeyDown('.', () => {
  if (player.curAnim() !== 'atk-anim' && player.isGrounded()) {
    player.use(sprite('atk-sprite'))
    player.enterState('atk')
    player.play('atk-anim')
    player.onCollide('training_dummy', (enemy) => {
      destroy(enemy)
    })}})

onKeyRelease('.', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})

onKeyDown(',',() => {
  if (player.curAnim() !== 'block-anim' && player.isGrounded()) {
    player.use(sprite('block-sprite'))
    player.enterState('def')
    player.play('block-anim')}})

onKeyRelease(',', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})
    
onKeyDown('d', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'right') player.direction = 'right'
  player.move(player.speed, 0)})

onKeyDown('a', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'left') player.direction = 'left'
  player.move(-player.speed, 0)})

onKeyRelease('d', () => {
if (player.isGrounded())
  player.enterState('idle')})

onKeyRelease('a', () => {
if (player.isGrounded())
  player.enterState('idle')})

player.onStateEnter('idle', () => {
  player.use(sprite('idle-sprite'))
  player.play('idle-anim')})

player.onStateEnter('jump', () => {
  player.use(sprite('jump-sprite'))
  player.play('jump-anim')})

player.onStateEnter('fall', () => {
  player.use(sprite('fall-sprite'))
  player.play('fall-anim')})

player.onStateEnter('run', () => {
  player.use(sprite('run-sprite'))
  player.play('run-anim')})
// game logic ()
camScale(.5)
// game logic (update functions)
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
  if (isKeyDown('space'))
  if (player.isGrounded()) {
    player.use(sprite('jump-sprite'))
    player.enterState('jump')
    player.play('jump-anim')
    player.jump(420 * 1.25)}
  if (isKeyDown('s')) {
    player.use(sprite('crouch-sprite'))
    player.enterState('crouch')
    player.play('crouch-anim')}})
player.onStateUpdate('jump', () => {
  if (player.isFalling()) {
    player.enterState('fall')}})
player.onStateUpdate('fall', () => {
  if (player.isGrounded()) {
    player.enterState('idle')}})
player.onStateUpdate('run', () => {
  if (isKeyDown('space')) {
    player.enterState('jump')
    player.play('jump-anim')
    player.jump(420 * 1.25)}})
player.onStateUpdate('atk', () => {
  if (isKeyDown('.')) {
    get('enemy').forEach(enemy => {
      if (player.isColliding(enemy)) {
        destroy('enemy')}})}})
onKeyRelease('s', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})