import house from "../images/Free A House on a Hill between Trees in the Countryside  Stock Ph.jpg"
import flowers from "../images/Free Brown Moth Hovering over Purple Flower Stock Photo.jpg"
import pinkFlowers from "../images/Free Close up of Pink Flowers Stock Photo.jpg"
import greenLeaves from "../images/Free Close-Up Photograph of Green Leaves Stock Photo.jpg"
import forest from "../images/Free Forest Stock Photo.jpg"
import grass from "../images/Free Green Grass Near Trees Stock Photo.jpg"
import valley from "../images/Free River Flowing in Green Valley Stock Photo.jpg"
import shore from "../images/Free Water around Rocks on Shore Stock Photo.jpg"
import tree from "../images/Free Yellow-leafed Tre Stock Photo.jpg"
import clouds from "../images/pexels-photo-12498026.jpeg"

export const placeholderImages = [
    house, flowers, pinkFlowers, greenLeaves, forest, grass, valley, shore, tree, clouds
]
let placeholderStack = [

    house, flowers, pinkFlowers, greenLeaves, forest, grass, valley, shore, tree, clouds

]

export function getPlaceholderImage(){
    if(placeholderStack.size() === 0){
        placeholderStack = [...placeholderImages]
    }
    return placeholderStack.pop()
}
