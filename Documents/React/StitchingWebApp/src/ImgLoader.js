import React from 'react'
import { ImgSender } from './ImgSender'

export const ImgLoader = ({path, image}) => {
    let list = []

    for (let i in path) {
        list.push(<img src={path[i]} className="readImg" key={i} name="img" />)
    }
  return (
    <div>
      <div style={{marginTop: "30px"}}>
        <b>
          {list.length}枚の画像が読み込まれました
        </b>
      <p>{list}</p>
      </div>
      
      <form action="" name='img'>
        <ImgSender image={image}/>
      </form>
        
    </div>
    
  )
}
