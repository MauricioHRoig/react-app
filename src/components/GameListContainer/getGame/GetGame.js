import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GameCard from "../gameCard/GameCard"
import { collection, getDocs, getFirestore } from "firebase/firestore"


const GetGames = (props) => {

    const [games, setGames] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {

        const db = getFirestore()

        const gameCollection = collection(db, "games")

        const consulta = getDocs(gameCollection)

        consulta.then((res) => {
            const games = res.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => {
                    if (a.title > b.title) return 1
                    if (b.title > a.title) return -1
                    return 0
                })
            setGames(games)
        })
    }, [])

    return (
        <>
            {games.filter((g) => {
                if (categoryId === undefined) {
                    return true;
                } else {
                    return g.categoryId === categoryId;
                }
            }).map(g => <GameCard key={g.id} game={g} initial={props.props.initial} />)}
        </>
    )
}

export default GetGames