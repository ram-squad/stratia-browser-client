export default function isTileNeighbourAndCanMove(selectedEntityTile, tile,whoseTurn) {
    if(selectedEntityTile.data.entityCanMove=="true" && selectedEntityTile.data.ownership==whoseTurn)
    {
        if (selectedEntityTile.position.inGrid.x % 2 === 0) {
            return (
                (selectedEntityTile.position.inGrid.y + 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y - 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y - 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x + 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y - 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x - 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x + 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x - 1 === tile.position.inGrid.x)
            ) && tile.data.landType !== "water";
        } else {
            return (
                (selectedEntityTile.position.inGrid.y + 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y - 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x + 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x - 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y + 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x + 1 === tile.position.inGrid.x) ||
                (selectedEntityTile.position.inGrid.y + 1 === tile.position.inGrid.y && selectedEntityTile.position.inGrid.x - 1 === tile.position.inGrid.x)
            ) && tile.data.landType !== "water";
        }
    }
    return false
    
}
