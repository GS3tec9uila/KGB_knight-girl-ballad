/*
Knight Girl's Ballad -> alpha_7.3.1
(copyright 2024)

KlettGameStudios
(copyright 2023 - 2024)
Travis "tec9uila" Klett

Development began;
January 26th, 2024

1st Beta Published;
February 14th, 2024 -> Distributed to Early Supporters & Playtesters
February 15th, 2024 -> Personal Storefront
kbm controls:
Q = BLOCK
R = ATTACK
E = INVENTORY
F = INTERACT
W = JUMP
A = MOVE LEFT
S = CROUCH
D = MOVE RIGHT
*/

kaboom({
  width: 640,
  height: 420,
  scale: 1.75,
})
  // insert assets
loadSprite('1dummy', 'assets/dummies/xtrain.png')
loadSprite('1dummy-right', 'assets/dummies/xRtrain.png')
loadSprite('1dummy-iced', 'assets/dummies/xItrain.png')
loadSprite('sign0', 'assets/misc/sign0.png')
loadSprite('right', 'assets/buttons/right.png')
loadSprite('left', 'assets/buttons/left.png')
loadSprite('up', 'assets/buttons/up.png')
loadSprite('down', 'assets/buttons/down.png')
loadSprite('start', 'assets/buttons/start.png')
loadSprite('select', 'assets/buttons/select.png')
loadSprite('xboxA', 'assets/buttons/A.png')
loadSprite('xboxB', 'assets/buttons/B.png')
loadSprite('xboxX', 'assets/buttons/X.png')
loadSprite('xboxY', 'assets/buttons/Y.png')
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
const pushSign = add([
  sprite('sign0'),
  scale(3),
  area(),
  pos(420 - 50,1450)])
const pushSign0 = add([
  sprite('sign0'),
  scale(3),
  area(),
  pos(2120,1350)])
// tile mapping logic
const map = addLevel([
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 5                                                           5 ',
  ' 000000000000000000000000000000000000000000000000000         5 ',
  ' 5                                                        0000 ',
  ' 5                                                           5 ',
  ' 5                                                    0      5 ',
  ' 5                                                           5 ',
  ' 5                                                        0000 ',
  ' 5                                                           5 ',
  ' 5                                                    0      5 ',
  ' 5                                                           5 ',
  ' 5                                                        0000 ',
  ' 5                                                           5 ',
  ' 5                                                    0      5 ',
  ' 5                                                           5 ',
  ' 5          00                          000000            0000 ',
  ' 5                  000                                      5 ',
  ' 0000000                    00000000               00000000000 '],{
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
  pos(30,600),
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
// interactive object logic
const pushrock0 = add([
  sprite('rockS'),
  scale(6.9),
  area(),
  body(),
  pos(410,710)])
// enemy logic
const PUSHdummy = add([
  sprite('1dummy-iced'),
  scale(6),
  area(),
  body(),
  pos(2080,713),
  'enemy'])
const ATKdummy = add([
  sprite('1dummy-right'),
  scale(6),
  area(),
  body({isStatic: true}),
  pos(3000,450),
  'enemy'])
// game logic (starting state)
player.onStateEnter('idle', () => {
player.use(sprite('idle-sprite'))
player.play('idle-anim')
wait(time, () => player.enterState())})
// keyDown for touch controls
const keyDown = {
  left: false,
  right: false,
  up: false,
  down: false,
  start: false,
  select: false,
  Abtn: false,
  Bbtn: false,
  Xbtn: false,
  Ybtn: false}
// move right & move left
/* (onKeyDown) to retain in-air directional controls) */  
onKeyDown('d', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'right') player.direction = 'right'
  player.move(player.speed, 0)})
onKeyRelease('d', () => {
  if (player.isGrounded())
    player.enterState('idle')})
// move left
onKeyDown('a', () => {
  if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
      player.use(sprite('run-sprite'))
      player.enterState('run')
      player.play('run-anim')}
  if (player.direction !== 'left') player.direction = 'left'
  player.move(-player.speed, 0)})
onKeyRelease('a', () => {
  if (player.isGrounded())
    player.enterState('idle')})
// game logic (on enter player states)
/* ADDING 'ATK' CRASHES GAME -> Fixed approx. 30s after writing this comment */
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
player.onStateEnter('def', () => {
  player.use(sprite('block-sprite'))
  player.play('block-anim')})
player.onStateEnter('crouch', () => {
  player.use(sprite('crouch-sprite'))
  player.play('crouch-anim')})
player.onStateEnter('atk', () => {
  player.use(sprite('atk-sprite'))
  player.play('atk-anim')})
// camera scale -> set to half for desktop (0.5, 1/2)
camScale(.5)
// game logic (onUpdate function) 
/* flipping the player sprite depends on direction 
player is facing (i.e. the player moves left, 
so the players sprite flips left & visa-versa) */
onUpdate(() => {
  const cameraLeftBound = 711
  const cameraRightBound = 3317
  const cameraVerticalOffset = player.pos.y - -20
  if (cameraLeftBound > player.pos.x) {
    camPos(cameraLeftBound, cameraVerticalOffset)} 
    else if (cameraRightBound < player.pos.x) {
    camPos(cameraRightBound, cameraVerticalOffset)} 
    else {
    camPos(player.pos.x, cameraVerticalOffset)}
    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
      player.use(sprite('fall-sprite'))
      player.enterState('fall')
      player.play('fall-anim')}
  if (player.direction === 'left') {
      player.flipX = true}
      else {
      player.flipX = false}})
// game logic (onStateUpdate functions)
/* for controls & interacting with
the players surrounding envirmonment
(i.e. resources, enemies, etc.) */
player.onStateUpdate('idle', () => { 
  if (isKeyDown('w'))
  if (player.isGrounded()) {
    player.use(sprite('jump-sprite'))
    player.enterState('jump')
    player.play('jump-anim')
    player.jump(420 * 1.25)}
  if (isKeyDown('s')) {
    player.use(sprite('crouch-sprite'))
    player.enterState('crouch')
    player.play('crouch-anim')}
  if (isKeyDown('q')) {
    player.use(sprite('block-sprite'))
    player.enterState('def')
    player.play('block-anim')}
  if (isKeyDown('r')) {
    player.use(sprite('atk-sprite'))
    player.enterState('atk')
    player.play('atk-anim')}})
player.onStateUpdate('jump', () => {
  if (player.isFalling()) {
    player.enterState('fall')}})
player.onStateUpdate('fall', () => {
  if (player.isGrounded()) {
    player.enterState('idle')}})
player.onStateUpdate('run', () => {
  if (isKeyDown('w')) {
    player.enterState('jump')
    player.play('jump-anim')
    player.jump(420 * 1.25)}})
// game logic (onKeyRelease functions)
/* add functions here to make the control
a press-and-hold as apposed to a toggle */
onKeyRelease('s', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})
onKeyRelease('r', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})
onKeyRelease('q', () => {
  player.use(sprite('idle-sprite'))
  player.enterState('idle')
  player.play('idle-anim')})
// touch control logic
// dpad
const rgtbtn = add ([
  sprite('right'),
  scale(.9),
  opacity(.55),
  fixed(),
  area(),
  pos(130,360)])
const lftbtn = add ([
  sprite('left'),
  scale(.9),
  opacity(.55),
  fixed(),
  area(),
  pos(10,360)])
const upbtn = add([
  sprite('up'),
  scale(.9),
  opacity(.55),
  fixed(),
  area(),
  pos(70,304)])
const dwnbtn = add([
  sprite('down'),
  scale(.9),
  opacity(.55),
  fixed(),
  area(),
  pos(70,360)])
// start & select
const selbtn = add([
  sprite('select'),
  scale(1),
  opacity(.5),
  fixed(),
  area(),
  pos(306,380)])
const srtbtn = add([
  sprite('start'),
  scale(1),
  opacity(.5),
  fixed(),
  area(),
  pos(240,380)])
// Xbox buttons (A, B, X, Y)
const Abtn = add([
  sprite('xboxA'),
  scale(3),
  opacity(.75),
  fixed(),
  area(),
  pos(510,364)])
const Bbtn = add([
  sprite('xboxB'),
  scale(3),
  opacity(.75),
  fixed(),
  area(),
  pos(550,324)])
const Xbtn = add([
  sprite('xboxX'),
  scale(3),
  opacity(.75),
  fixed(),
  area(),
  pos(470,324)])
const Ybtn = add([
  sprite('xboxY'),
  scale(3),
  opacity(.75),
  fixed(),
  area(),
  pos(510,284)])
// touch controls (onTouchStart function)
onTouchStart((id, pos) => {
  if (rgtbtn.hasPoint(pos)) {
keyDown.right = true
rgtbtn.opacity = 1}
else if (lftbtn.hasPoint(pos)) {
  keyDown.left = true
  lftbtn.opacity = 1}
else if (upbtn.hasPoint(pos)) {
  keyDown.up = true
  upbtn.opacity = 1}
else if (dwnbtn.hasPoint(pos)) {
  keyDown.down = true
  dwnbtw.opacity = 1}})
// touch controls (onTouchEnd function)
onTouchEnd((_, pos) => {
  if (!rgtbtn.hasPoint(pos)) {
    keyDown.right = false
    rgtbtn.opacity = 0.5}
  if (!lftbtn.hasPoint(pos)) {
    keyDown.right = false
    lftbtn.opacity = 0.5}
  if (!upbtn.hasPoint(pos)) {
    keyDown.right = false
    upbtn.opacity = 0.5}
  if (!dwnbtn.hasPoint(pos)) {
    keyDown.right = false
    dwnbtn.opacity = 0.5}
})