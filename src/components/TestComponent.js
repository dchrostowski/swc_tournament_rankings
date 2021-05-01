

import React, {useEffect, useState} from 'react'


export function TestComponent (props) {
    const [uid, setUid] = useState("")
    useEffect(() => {
        setUid(1)
    },[])

    

    return (
        <div>this is a test comopnent</div>
    )

}