const PcomQuebraLinha = ( {texto }) =>{
    return(
        <div>
            {texto.split('\n' || '\r\n').map((linha, index) =>(
                <p key={index}>{linha}</p>
            ))}
        </div>
    )
}

export { PcomQuebraLinha };