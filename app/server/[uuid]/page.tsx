export default function ServerPage({ params } : { params: { uuid: string } }) {
    return (
        <div>
            <h1>{params.uuid}</h1>
        </div>
    )
}