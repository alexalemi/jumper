namespace SpriteKind {
    export const health = SpriteKind.create()
    export const Potion = SpriteKind.create()
    export const hammar = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    effects.confetti.startScreenEffect(5000)
    chestsleft += -1
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(2)
    sprites.destroy(otherSprite)
})
info.onScore(5, function () {
    info.changeLifeBy(3)
    info.setScore(0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Potion, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(myPotion)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    effects.confetti.endScreenEffect()
    level += 1
    if (level == levels.length) {
        scene.setBackgroundColor(7)
        game.setGameOverMessage(true, "VICTORY!")
        game.setGameOverEffect(true, effects.starField)
        game.setGameOverPlayable(true, music.melodyPlayable(music.baDing), false)
        game.gameOver(true)
    }
    tiles.setCurrentTilemap(levels[level])
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Potion)
    myFood = sprites.create(img`
        . . . . . . b b b b . . . . . . 
        . . . . . . b 4 4 4 b . . . . . 
        . . . . . . b b 4 4 4 b . . . . 
        . . . . . b 4 b b b 4 4 b . . . 
        . . . . b d 5 5 5 4 b 4 4 b . . 
        . . . . b 3 2 3 5 5 4 e 4 4 b . 
        . . . b d 2 2 2 5 7 5 4 e 4 4 e 
        . . . b 5 3 2 3 5 5 5 5 e e e e 
        . . b d 7 5 5 5 3 2 3 5 5 e e e 
        . . b 5 5 5 5 5 2 2 2 5 5 d e e 
        . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
        . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
        b d 3 2 d 5 5 5 d d d 4 4 . . . 
        b 5 5 5 5 d d 4 4 4 4 . . . . . 
        4 d d d 4 4 4 . . . . . . . . . 
        4 4 4 4 . . . . . . . . . . . . 
        `, SpriteKind.Food)
    myPotion = sprites.create(img`
        . . . 1 1 1 1 1 . . . . . . . . 
        . . . 1 1 1 1 1 . . . . . . . . 
        . . . 1 1 1 1 1 . . . . . . . . 
        . . . 1 . . . 1 . . . . . . . . 
        1 1 1 1 . . . 1 1 1 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 8 8 8 8 8 8 8 8 8 1 . . . . . 
        1 1 1 1 1 1 1 1 1 1 1 . . . . . 
        `, SpriteKind.Potion)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
    tiles.placeOnRandomTile(myFood, myFloors[level])
    tiles.placeOnRandomTile(myPotion, myFloors[level])
    tiles.placeOnRandomTile(myEnemy, myFloors[level])
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    for (let index = 0; index < 4; index++) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . 
            . . . 2 2 2 2 2 2 . . . . 
            . 2 2 2 2 2 2 2 2 2 . . . 
            . 2 2 2 2 2 2 2 2 2 2 . . 
            2 2 2 2 2 2 2 2 2 2 2 2 . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 . 
            2 2 2 2 2 b 2 2 2 2 2 2 . 
            2 2 2 2 2 1 2 2 2 2 2 . . 
            . 2 2 2 2 2 2 2 2 2 . . . 
            . 2 2 2 2 2 2 2 2 2 . . . 
            . 2 2 2 2 2 2 2 2 2 . . . 
            . 2 2 2 2 2 2 2 2 2 2 . . 
            . 2 2 2 2 2 2 2 2 2 2 . . 
            . . 2 2 . . . 2 2 2 . . . 
            `)
        pause(100)
        mySprite.setImage(img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f f . 
            f f e 4 e 1 f 4 4 f f . . 
            . f f f e 4 4 4 4 f . . . 
            . 4 4 4 e e e e f f . . . 
            . e 4 4 e 7 7 7 7 f . . . 
            . f e e f 6 6 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `)
    }
})
let myPotion: Sprite = null
let myFood: Sprite = null
let myEnemy: Sprite = null
let mySprite: Sprite = null
let level = 0
let myFloors: Image[] = []
let levels: tiles.TileMapData[] = []
levels = [
tilemap`level1`,
tilemap`level5`,
tilemap`level6`,
tilemap`level7`,
tilemap`level2`
]
myFloors = [
sprites.dungeon.darkGroundCenter,
sprites.builtin.coral1,
sprites.dungeon.hazardLava0,
sprites.dungeon.greenInnerSouthWest,
sprites.castle.tileGrass1
]
level = 0
mySprite = sprites.create(img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . f e e f 6 6 6 f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `, SpriteKind.Player)
myEnemy = sprites.create(img`
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . 2 f f f f f f 2 . . . . . . 
    . . 2 f f f f f f 2 . . . . . . 
    . . 2 f f f f f f 2 . . . . . . 
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . 2 2 2 2 2 2 2 2 . . . . . . 
    . . . 7 . 2 . . 8 . . . . . . . 
    . . . 7 . 2 . . 8 . . . . . . . 
    . . . 7 . 2 . . 8 . . . . . . . 
    . . . 7 . 2 . . 8 . . . . . . . 
    . . 7 7 . 2 2 . 8 . . . . . . . 
    7 7 7 . . . 2 . 8 8 8 8 8 8 8 8 
    . . . . . 2 2 . . . . . . . . . 
    `, SpriteKind.Enemy)
info.setScore(0)
controller.moveSprite(mySprite)
tiles.setCurrentTilemap(levels[level])
myEnemy.follow(mySprite, 15)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
scene.cameraFollowSprite(mySprite)
tiles.placeOnRandomTile(myFood, myFloors[level])
tiles.placeOnRandomTile(myEnemy, myFloors[level])
tiles.placeOnRandomTile(myPotion, myFloors[level])
myFood = sprites.create(img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `, SpriteKind.Food)
info.setLife(3)
let chestsleft = 2
forever(function () {
    if (chestsleft == 0) {
        tiles.setTileAt(tiles.getTileLocation(15, 0), sprites.dungeon.collectibleInsignia)
        chestsleft = 2
    }
})
