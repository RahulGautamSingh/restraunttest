export default function Genre(props){
    return(
        <div className="genres-holder">
       { props.genre.map(elem=>{
           return <p className="genre-item">{elem}</p>
        })
    }
        </div>
    )
}