function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    

    return(
        <>
        <button
            style={styles}
            onClick={props.hold}
            aria-pressed = {props.isHeld}
            aria-label= {`This a Die with the value ${props.value} and it is ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
        </>
    )
}

export default Die